"""No account/public result is evidence of a scan initiated by this installation."""
import json
from pathlib import Path
import sys
import unittest
from fastapi import FastAPI
from fastapi.testclient import TestClient
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from atlas.api import make_router

class PrivacyBoundaryTests(unittest.TestCase):
    def client(self):
        class UntrackedService:
            def snapshot(self,*args,**kwargs):
                return {'state':'ready','sites':[{'domain':'unrelated.example.com','grade':'F','scannedAt':'2026-10-24T00:00:00Z','findings':['private evidence']}],'history':[{'grade':'F'}]}
            def site(self,*args,**kwargs):return {'state':'ready','site':{'domain':'unrelated.example.com','grade':'F','scannedAt':'2026-10-24T00:00:00Z'}}
            def markdown(self,*args,**kwargs):return {'state':'ready','markdown':'# unrelated.example.com\nVulnerability details'}
        app=FastAPI();app.include_router(make_router(lambda:UntrackedService(),lambda request:True))
        return TestClient(app)
    def test_public_and_owner_history_are_blocked_without_local_scan_provenance(self):
        with self.client() as client:
            for mode in ('public','watchlist','fleet'):
                with self.subTest(mode=mode):
                    data=client.get('/snapshot',params={'mode':mode}).json()['data']
                    self.assertEqual(data['state'],'local-scan-required')
                    self.assertEqual(data['sites'],[])
                    self.assertEqual(data['history'],[])
                    self.assertNotIn('unrelated.example.com',json.dumps(data))
    def test_arbitrary_domain_or_scan_id_cannot_unlock_site_detail(self):
        with self.client() as client:
            for mode in ('public','fleet'):
                data=client.get('/site',params={'domain':'unrelated.example.com','mode':mode,'scan_id':'11111111-1111-4111-8111-111111111111'}).json()['data']
                self.assertEqual(data['state'],'local-scan-required')
                self.assertIsNone(data['site'])
                self.assertNotIn('scannedAt',json.dumps(data))
    def test_untracked_report_export_is_blocked(self):
        with self.client() as client:
            data=client.get('/handoff',params={'domain':'unrelated.example.com','mode':'fleet','scan_id':'11111111-1111-4111-8111-111111111111'}).json()['data']
            self.assertEqual(data['state'],'local-scan-required')
            self.assertNotIn('markdown',data)
if __name__=='__main__':unittest.main()
