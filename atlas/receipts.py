"""Installation-scoped scan intent ledger. No findings, credentials or public index."""
from __future__ import annotations
from contextlib import contextmanager
import hashlib
import hmac
import json
from pathlib import Path
import secrets
import sqlite3
import time
import uuid

class ReceiptLedger:
    def __init__(self, path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.connection() as db:
            db.executescript('''
                CREATE TABLE IF NOT EXISTS identity (id INTEGER PRIMARY KEY CHECK(id=1), secret TEXT NOT NULL);
                CREATE TABLE IF NOT EXISTS connection (id INTEGER PRIMARY KEY CHECK(id=1), connected INTEGER NOT NULL, epoch INTEGER NOT NULL);
                CREATE TABLE IF NOT EXISTS intents (id TEXT PRIMARY KEY, owner TEXT NOT NULL, domain TEXT NOT NULL, project TEXT NOT NULL, baseline TEXT, state TEXT NOT NULL, created REAL NOT NULL, running_at REAL);
                CREATE TABLE IF NOT EXISTS receipts (seq INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT UNIQUE NOT NULL, owner TEXT NOT NULL, scan_id TEXT NOT NULL, domain TEXT NOT NULL, project TEXT NOT NULL, baseline TEXT, status TEXT NOT NULL, evidence TEXT NOT NULL DEFAULT '{}', UNIQUE(owner, scan_id));
            ''')
            db.execute('INSERT OR IGNORE INTO identity VALUES (1,?)', (secrets.token_hex(32),))
            db.execute('INSERT OR IGNORE INTO connection VALUES (1,0,0)')

    @contextmanager
    def connection(self):
        db = sqlite3.connect(self.path, timeout=5)
        db.row_factory = sqlite3.Row
        try:
            with db:
                yield db
        finally:
            db.close()

    def binding(self, key):
        if not key:
            return None
        with self.connection() as db:
            secret = db.execute('SELECT secret FROM identity WHERE id=1').fetchone()[0]
        return hmac.new(secret.encode(), key.encode(), hashlib.sha256).hexdigest()

    def connection_state(self):
        with self.connection() as db:
            row = db.execute('SELECT connected,epoch FROM connection WHERE id=1').fetchone()
        return bool(row[0]), row[1]

    def connect(self, connected):
        if not isinstance(connected, bool):
            raise ValueError('Connection consent must be a boolean.')
        with self.connection() as db:
            db.execute('UPDATE connection SET connected=?,epoch=epoch+1 WHERE id=1', (int(connected),))
        return self.connection_state()

    @staticmethod
    def public(row):
        return {key: row[key] for key in ('id', 'domain', 'project', 'status', 'baseline')} | {'baselineId': row['baseline']}

    def receipt(self, ident, owner):
        with self.connection() as db:
            row = db.execute('SELECT * FROM receipts WHERE id=? AND owner=?', (ident, owner)).fetchone()
        return dict(row) if row else None

    def list_receipts(self, owner):
        with self.connection() as db:
            rows = db.execute('SELECT * FROM receipts WHERE owner=? ORDER BY seq DESC LIMIT 200', (owner,)).fetchall()
        return [self.public(dict(row)) for row in rows]

    def pending(self, owner):
        with self.connection() as db:
            rows = db.execute("SELECT id,domain,state FROM intents WHERE owner=? AND state IN ('running','uncertain') ORDER BY created DESC LIMIT 20", (owner,)).fetchall()
        return [dict(row) for row in rows]

    def prepare(self, owner, domain, project, baseline):
        ident = str(uuid.uuid4())
        with self.connection() as db:
            db.execute('BEGIN IMMEDIATE')
            db.execute("DELETE FROM intents WHERE state='prepared' AND created<?", (time.time()-900,))
            if db.execute("SELECT count(*) FROM intents WHERE owner=? AND state='prepared'", (owner,)).fetchone()[0] >= 20:
                raise ValueError('Too many pending confirmation dialogs. Close them and wait for their expiration.')
            if db.execute('SELECT count(*) FROM receipts WHERE owner=?', (owner,)).fetchone()[0] >= 200:
                raise ValueError('The local receipt limit has been reached. Back up and review local data before adding more scans.')
            db.execute('INSERT INTO intents VALUES (?,?,?,?,?,?,?,NULL)', (ident, owner, domain, project, baseline, 'prepared', time.time()))
        return {'id': ident, 'domain': domain, 'url': 'https://'+domain, 'project': project, 'baselineId': baseline, 'maxUnits': 1}

    def claim(self, ident, owner):
        with self.connection() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute('SELECT * FROM intents WHERE id=? AND owner=?', (ident, owner)).fetchone()
            if not row:
                raise ValueError('This approval does not belong to the current connection.')
            row = dict(row)
            if row['state'] == 'completed':
                return row
            if row['state'] == 'running' and time.time()-(row['running_at'] or time.time()) < 180:
                return row
            if row['state'] == 'prepared' and time.time()-row['created'] > 900:
                raise ValueError('This approval expired. Review a new assessment request.')
            db.execute("UPDATE intents SET state='running',running_at=? WHERE id=?", (time.time(), ident))
            row['state'] = 'claimed'
            return row

    def uncertain(self, ident):
        with self.connection() as db:
            db.execute("UPDATE intents SET state='uncertain' WHERE id=? AND state='running'", (ident,))

    def complete(self, intent, scan_id, failed=False):
        with self.connection() as db:
            db.execute('BEGIN IMMEDIATE')
            db.execute('INSERT INTO receipts(id,owner,scan_id,domain,project,baseline,status) VALUES (?,?,?,?,?,?,?)', (intent['id'], intent['owner'], scan_id, intent['domain'], intent['project'], intent['baseline'], 'failed' if failed else 'completed'))
            db.execute("UPDATE intents SET state='completed' WHERE id=?", (intent['id'],))
        return self.public(self.receipt(intent['id'], intent['owner']))

    def save_evidence(self, ident, owner, evidence):
        with self.connection() as db:
            if db.execute('UPDATE receipts SET evidence=? WHERE id=? AND owner=?', (json.dumps(evidence), ident, owner)).rowcount != 1:
                raise ValueError('A matching local scan receipt is required.')
