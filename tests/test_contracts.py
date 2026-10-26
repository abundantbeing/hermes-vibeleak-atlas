"""Regressions for the real saved-data contract, not generated scan results."""
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
import httpx
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from atlas.core import public_card
from atlas.service import AtlasService

SCAN = '11111111-1111-4111-8111-111111111111'
CARD = {'id': SCAN, 'domain': 'example.com', 'grade': 'A', 'score': 94, 'scannedAt': '2026-10-22T00:00:00Z'}

class ContractTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'))
        self.addCleanup(self.tmp.cleanup)
    def app(self, handler, key=lambda: None):
        app = AtlasService(Path(self.tmp.name), transport=httpx.MockTransport(handler), key_provider=key)
        self.addCleanup(app.close)
        app.settings({'consent': True})
        return app
    def test_ai_only_public_summary_keeps_readiness_without_inventing_trust(self):
        card = public_card({'domain': 'example.com', 'grade': None, 'score': None, 'vibeSignal': {'score': 83, 'grade': 'B', 'rubricVersion': 'v1'}})
        self.assertIsNotNone(card)
        self.assertIsNone(card['grade'])
        self.assertIsNone(card['score'])
        self.assertEqual(card['ai']['score'], 83)
    def test_invalid_trust_grade_without_ai_remains_rejected(self):
        self.assertIsNone(public_card({'domain': 'example.com', 'grade': None}))
        self.assertIsNone(public_card({'domain': 'example.com', 'grade': 'Z', 'vibeSignal': {'score': 83}}))
    def test_history_clear_drops_cached_history_and_does_not_restore_deleted_reads(self):
        app = self.app(lambda req: httpx.Response(200, json={'entries': [CARD]}))
        self.assertEqual(len(app.snapshot()['history']), 1)
        app.clear_history()
        self.assertEqual(app.store.public_history(), [])
        result = app.snapshot()
        self.assertEqual(len(result['history']), 1)
        self.assertEqual(result['history'][0]['id'], '2')
    def test_credential_rotation_discards_late_owner_snapshot(self):
        key = ['fixture-owner-a']
        def handle(req):
            if req.url.path == '/api/v1/history':
                key[0] = 'fixture-owner-b'
                return httpx.Response(200, json={'ok': True, 'data': {'scans': [CARD]}})
            return httpx.Response(200, json={'ok': True, 'data': {'events': []}})
        app = self.app(handle, lambda: key[0])
        result = app.snapshot('fleet')
        self.assertEqual(result['state'], 'connection-changed')
        self.assertEqual(result['sites'], [])
        self.assertEqual(app.store.public_history(), [])
    def test_credential_rotation_cannot_join_old_scan_to_new_account_report(self):
        key = ['fixture-owner-a']; reports = []
        def handle(req):
            if req.url.path.endswith('/markdown'):
                reports.append(req.headers.get('authorization'))
                return httpx.Response(200, text='# Different owner')
            key[0] = 'fixture-owner-b'
            return httpx.Response(200, json={'ok': True, 'data': {'scan': CARD}})
        app = self.app(handle, lambda: key[0])
        result = app.markdown('example.com', 'fleet', SCAN)
        self.assertEqual(result['state'], 'connection-changed')
        self.assertNotIn('markdown', result)
        self.assertEqual(reports, [])
    def test_disconnect_during_read_does_not_persist_or_return_observations(self):
        app = None
        def handle(req):
            app.settings({'consent': False})
            return httpx.Response(200, json={'entries': [CARD]})
        app = self.app(handle)
        result = app.snapshot()
        self.assertEqual(result['state'], 'consent-required')
        self.assertEqual(result['sites'], [])
        self.assertEqual(app.store.public_history(), [])
if __name__ == '__main__': unittest.main()
