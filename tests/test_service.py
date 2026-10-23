import importlib
import os
from pathlib import Path
import sys
import tempfile
import unittest
import httpx

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
try:
    service=importlib.import_module('atlas.service')
except ModuleNotFoundError:
    service=None


class ServiceTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(service,'The read-only Atlas service has not been implemented')
        self.tmp=tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'))
        self.addCleanup(self.tmp.cleanup)

    def client(self,handler,key=None):
        return service.AtlasService(Path(self.tmp.name),transport=httpx.MockTransport(handler),key_provider=lambda:key)

    def test_read_transport_never_calls_scan_or_other_hosts(self):
        calls=[]
        def handler(req):
            calls.append(req)
            self.assertEqual(req.method,'GET')
            self.assertEqual(req.url.host,'www.vibeleak.app')
            if req.url.path=='/api/trust-index':return httpx.Response(200,json={'entries':[{'domain':'example.com','grade':'A','scanned_at':'2026-10-22T00:00:00Z'}],'uniqueDomains':1200})
            return httpx.Response(200,json={'ok':True,'data':{'visibility':{'domain':'example.com','hidden':False,'visible':True}}})
        app=self.client(handler)
        app.settings({'consent':True})
        result=app.snapshot('public',geography=False)
        self.assertEqual(len(result['sites']),1)
        self.assertTrue(all('scan-summary' not in r.url.path for r in calls))
        self.assertEqual(result['counts']['displayed'],1)
        self.assertTrue(result['readOnly'])

    def test_no_network_without_explicit_consent(self):
        def handler(req):self.fail('Network was used before consent')
        app=self.client(handler)
        self.assertEqual(app.snapshot('public')['state'],'consent-required')

    def test_missing_private_key_is_honest_and_no_network(self):
        def handler(req):self.fail('Network was used without a private credential')
        app=self.client(handler)
        app.settings({'consent':True})
        self.assertEqual(app.snapshot('fleet')['state'],'not-connected')

    def test_private_auth_denial_never_falls_back_to_public(self):
        seen=[]
        def handler(req):
            seen.append(req.url.path)
            return httpx.Response(403,json={'ok':False,'error':{'code':'forbidden','message':'Missing scope'}})
        app=self.client(handler,key='fixture-read-only-key')
        app.settings({'consent':True})
        result=app.snapshot('fleet')
        self.assertEqual(result['state'],'forbidden')
        self.assertEqual(result['sites'],[])
        self.assertNotIn('/api/trust-index',seen)

    def test_private_data_is_never_written_to_public_history(self):
        def handler(req):
            if req.url.path=='/api/v1/history':return httpx.Response(200,json={'ok':True,'data':{'scans':[{'id':'a','url':'https://private.example.com','grade':'D','score':44,'scannedAt':'2026-10-22T00:00:00Z'}]}})
            return httpx.Response(200,json={'ok':True,'data':{'events':[]}})
        app=self.client(handler,key='fixture-owner-a')
        app.settings({'consent':True})
        result=app.snapshot('fleet',geography=False)
        self.assertEqual(result['sites'][0]['domain'],'private.example.com')
        self.assertEqual(app.store.public_history(),[])
        self.assertNotIn('fixture-owner-a',str(result))

    def test_hidden_watch_domain_never_reaches_summary(self):
        paths=[]
        def handler(req):
            paths.append(req.url.path)
            if req.url.path=='/api/trust-index':return httpx.Response(200,json={'entries':[]})
            return httpx.Response(200,json={'ok':True,'data':{'visibility':{'hidden':True,'visible':False}}})
        app=self.client(handler)
        app.settings({'consent':True})
        app.store.add_watch('hidden.example.com')
        result=app.snapshot('watchlist',geography=False)
        self.assertEqual(result['sites'],[])
        self.assertNotIn('/api/public/scan-summary',paths)
        self.assertEqual(result['excluded'][0]['reason'],'privacy-hidden')

    def test_malformed_or_oversized_payload_is_not_a_success(self):
        app=self.client(lambda req:httpx.Response(200,content=b'not json'))
        app.settings({'consent':True})
        self.assertEqual(app.snapshot('public',geography=False)['state'],'unavailable')

    def test_detail_request_is_fixed_origin_and_redacted(self):
        def handler(req):
            if req.url.path.endswith('visibility'):return httpx.Response(200,json={'ok':True,'data':{'visibility':{'hidden':False}}})
            return httpx.Response(200,json={'domain':'example.com','grade':'A','score':94,'scanned_at':'2026-10-22T00:00:00Z','tip':'never public','findings':['secret']})
        app=self.client(handler)
        app.settings({'consent':True})
        result=app.site('example.com')
        self.assertEqual(result['site']['score'],94)
        self.assertNotIn('never public',str(result))
        self.assertNotIn('secret',str(result))

    def test_markdown_export_reads_real_text_contract(self):
        scan='11111111-1111-4111-8111-111111111111'
        def handler(req):
            if req.url.path.endswith('/markdown'):
                return httpx.Response(200,text='# Owned report\n\nReal Markdown body',headers={'Content-Type':'text/markdown; charset=utf-8'})
            return httpx.Response(200,json={'ok':True,'data':{'scan':{'id':scan,'url':'https://example.com','grade':'A','score':94}}})
        app=self.client(handler,key='fixture-owner-read-key')
        app.settings({'consent':True})
        result=app.markdown('example.com','fleet',scan)
        self.assertEqual(result['state'],'ready')
        self.assertEqual(result['markdown'],'# Owned report\n\nReal Markdown body')

    def test_status_binding_changes_when_private_credential_changes(self):
        key=['fixture-owner-A']
        app=service.AtlasService(Path(self.tmp.name),key_provider=lambda:key[0])
        self.addCleanup(app.close)
        before=app.status().get('privateVersion')
        key[0]='fixture-owner-B'
        after=app.status().get('privateVersion')
        self.assertIsNotNone(before)
        self.assertNotEqual(before,after)
        self.assertNotIn('fixture-owner',str(app.status()))

    def test_redirect_is_not_followed_to_arbitrary_host(self):
        app=self.client(lambda req:httpx.Response(302,headers={'location':'http://127.0.0.1/secrets'}))
        app.settings({'consent':True})
        self.assertEqual(app.snapshot('public',geography=False)['state'],'unavailable')


if __name__=='__main__':unittest.main()
