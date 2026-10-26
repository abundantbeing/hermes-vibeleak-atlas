"""Pure policies and bounded local state for the Atlas native plugin."""
from __future__ import annotations

from contextlib import contextmanager
from datetime import datetime, timezone
import hashlib
import ipaddress
import json
from pathlib import Path
import re
import sqlite3
from urllib.parse import urlsplit

GRADES = ('S', 'A', 'B', 'C', 'D', 'F')
BANDS = {'S':(98,100),'A':(90,97),'B':(75,89),'C':(55,74),'D':(35,54),'F':(0,34)}


def utc_now():
    return datetime.now(timezone.utc).isoformat().replace('+00:00','Z')


def normalize_domain(value):
    if not isinstance(value,str) or not value or len(value)>2048:
        raise ValueError('Enter a public website hostname.')
    if any(ord(c)<33 for c in value) or '\\' in value:
        raise ValueError('Whitespace and backslashes are not valid in a hostname.')
    parsed=urlsplit(value if '://' in value else 'https://'+value)
    if parsed.scheme not in ('http','https') or parsed.username or parsed.password:
        raise ValueError('Use a public HTTP(S) hostname without credentials.')
    try:
        if parsed.port is not None:raise ValueError('Custom ports are not supported.')
        host=(parsed.hostname or '').rstrip('.').encode('idna').decode('ascii').lower()
    except (UnicodeError,ValueError) as exc:
        raise ValueError('Invalid public hostname.') from exc
    if host.startswith('www.'):host=host[4:]
    try:
        ipaddress.ip_address(host)
    except ValueError:
        pass
    else:
        raise ValueError('Use a public DNS hostname, not an IP literal.')
    if len(host)>253 or '.' not in host or host.endswith(('.local','.localhost','.internal','.test','.invalid','.example','.onion')):
        raise ValueError('Internal and reserved hostnames are not supported.')
    labels=host.split('.')
    if any(not re.fullmatch(r'[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?',label) for label in labels):
        raise ValueError('Invalid hostname labels.')
    if labels[-1].isdigit():raise ValueError('Invalid public domain suffix.')
    return host


def numeric(value):
    return isinstance(value,(int,float)) and not isinstance(value,bool) and 0<=value<=100


def clean_time(value):
    if not isinstance(value,str) or len(value)>60:return None
    try:
        parsed=datetime.fromisoformat(value.replace('Z','+00:00'))
        if parsed.tzinfo is None:return None
        return parsed.astimezone(timezone.utc).isoformat().replace('+00:00','Z')
    except ValueError:return None


def public_card(raw):
    if not isinstance(raw,dict) or raw.get('scan_failed') is True or raw.get('scanFailed') is True:return None
    try:domain=normalize_domain(raw.get('domain') or raw.get('url') or '')
    except ValueError:return None
    grade=raw.get('grade')
    vibe=raw.get('vibeSignal')
    ai_score=vibe.get('score') if isinstance(vibe,dict) else raw.get('agent_readiness_score',raw.get('vibesignal_score'))
    ai=None
    if numeric(ai_score):
        ai={'score':ai_score,'grade':vibe.get('grade') if isinstance(vibe,dict) and vibe.get('grade') in GRADES else None,'rubricVersion':str(vibe.get('rubricVersion','unknown'))[:80] if isinstance(vibe,dict) else 'unknown'}
    if grade is None:
        if ai is None:return None
        score=None
    else:
        if not isinstance(grade,str):return None
        grade=grade.strip().upper()
        if grade not in (*GRADES,'N/A'):return None
        score=raw.get('score')
        if grade=='N/A':grade,score=None,None
        elif not numeric(score) or not BANDS[grade][0]<=score<=BANDS[grade][1]:score=None
    scan_id=raw.get('scan_id',raw.get('id'))
    scan_id=scan_id if isinstance(scan_id,str) and re.fullmatch(r'[a-zA-Z0-9-]{1,80}',scan_id) else None
    return {'domain':domain,'grade':grade,'score':score,'scannedAt':clean_time(raw.get('scanned_at',raw.get('scannedAt'))),'scanId':scan_id,'ai':ai}


def normalize_index(rows,limit=100):
    latest={}
    if not isinstance(rows,list):raise ValueError('The source did not return an entry list.')
    for row in rows[:1000]:
        item=public_card(row)
        if item is None:continue
        old=latest.get(item['domain'])
        if old is None or (item['scannedAt'] or '')>(old['scannedAt'] or ''):latest[item['domain']]=item
    return sorted(latest.values(),key=lambda row:row['scannedAt'] or '',reverse=True)[:limit]


def unknown_geo(reason='No reliable country attribution.'):
    return {'status':'unknown','country':None,'name':None,'lat':None,'lon':None,'precision':'unknown','source':'DB-IP Country Lite','sourceVersion':None,'dnsObservedAt':None,'reason':reason,'attributionUrl':'https://db-ip.com'}


def geo_from_answers(answers,lookup,countries,version):
    codes=set()
    for answer in list(answers)[:32]:
        try:
            ip=ipaddress.ip_address(answer)
            if not ip.is_global:continue
            code=lookup(str(ip))
            if code in countries:codes.add(code)
        except (ValueError,KeyError,OSError):continue
    result=unknown_geo()
    result.update(sourceVersion=version,dnsObservedAt=utc_now())
    if len(codes)>1:
        result.update(status='multi-region',reason='Resolved addresses map to different countries; no single point is claimed.')
    elif len(codes)==1:
        code=next(iter(codes));country=countries[code]
        result.update(status='mapped',country=code,name=country['name'],lat=country['lat'],lon=country['lon'],precision='country',reason='Approximate country of DNS-resolved addresses. May be a CDN edge, not a verified origin.')
    return result


class LocalStore:
    def __init__(self,path):
        self.path=Path(path)
        self.path.parent.mkdir(parents=True,exist_ok=True)
        with self.connection() as db:
            db.executescript('CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY CHECK(id=1), data TEXT NOT NULL); CREATE TABLE IF NOT EXISTS watchlist (domain TEXT PRIMARY KEY); CREATE TABLE IF NOT EXISTS snapshots (id INTEGER PRIMARY KEY AUTOINCREMENT, captured_at TEXT NOT NULL, digest TEXT NOT NULL, data TEXT NOT NULL);')

    @contextmanager
    def connection(self):
        db=sqlite3.connect(self.path,timeout=5)
        db.execute('PRAGMA busy_timeout=5000')
        try:
            with db:
                yield db
        finally:
            db.close()

    def settings(self,patch=None):
        with self.connection() as db:
            if patch is not None:db.execute('BEGIN IMMEDIATE')
            row=db.execute('SELECT data FROM settings WHERE id=1').fetchone()
            current={'consent':False,'geography':False,'refreshSeconds':60}
            if row:
                try:current.update(json.loads(row[0]))
                except (ValueError,TypeError):pass
            if patch is not None:
                for key in ('consent','geography'):
                    if key in patch:
                        if not isinstance(patch[key],bool):raise ValueError('Settings must use boolean values.')
                        current[key]=patch[key]
                if 'refreshSeconds' in patch:
                    value=patch['refreshSeconds']
                    if isinstance(value,bool) or value not in (30,60,120,300):raise ValueError('Choose a supported refresh interval.')
                    current['refreshSeconds']=value
                db.execute('INSERT OR REPLACE INTO settings VALUES (1,?)',(json.dumps(current),))
            return current

    def watchlist(self):
        with self.connection() as db:return [r[0] for r in db.execute('SELECT domain FROM watchlist ORDER BY domain')]

    def add_watch(self,value):
        domain=normalize_domain(value)
        with self.connection() as db:
            db.execute('BEGIN IMMEDIATE')
            exists=db.execute('SELECT 1 FROM watchlist WHERE domain=?',(domain,)).fetchone()
            if not exists and db.execute('SELECT count(*) FROM watchlist').fetchone()[0]>=32:raise ValueError('The local watchlist is limited to 32 sites.')
            db.execute('INSERT OR IGNORE INTO watchlist VALUES (?)',(domain,))
        return domain

    def remove_watch(self,value):
        domain=normalize_domain(value)
        with self.connection() as db:db.execute('DELETE FROM watchlist WHERE domain=?',(domain,))

    def record_public(self,rows,captured_at=None):
        safe=[]
        for row in rows[:100]:
            safe.append({key:row.get(key) for key in ('domain','grade','score','scannedAt','geo')})
        encoded=json.dumps(sorted(safe,key=lambda row:row.get('domain') or ''),sort_keys=True,separators=(',',':'))
        digest=hashlib.sha256(encoded.encode()).hexdigest()
        with self.connection() as db:
            db.execute('BEGIN IMMEDIATE')
            last=db.execute('SELECT digest FROM snapshots ORDER BY id DESC LIMIT 1').fetchone()
            if last and last[0]==digest:return
            db.execute('INSERT INTO snapshots(captured_at,digest,data) VALUES (?,?,?)',(captured_at or utc_now(),digest,encoded))
            db.execute('DELETE FROM snapshots WHERE id NOT IN (SELECT id FROM snapshots ORDER BY id DESC LIMIT 64)')

    def public_history(self,allowed_domains=None):
        with self.connection() as db:rows=db.execute('SELECT id,captured_at,data FROM snapshots ORDER BY id').fetchall()
        result=[]
        for ident,captured,data in rows:
            sites=json.loads(data)
            if allowed_domains is not None:sites=[row for row in sites if row.get('domain') in allowed_domains]
            if sites:result.append({'id':str(ident),'capturedAt':captured,'sites':sites})
        return result

    def clear_history(self):
        with self.connection() as db:db.execute('DELETE FROM snapshots')
