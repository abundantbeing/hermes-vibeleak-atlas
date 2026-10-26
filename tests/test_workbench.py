import importlib
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
import httpx
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
try:module=importlib.import_module('atlas.workbench')
except ModuleNotFoundError:module=None
FIRST='11111111-1111-4111-8111-111111111111'
SECOND='22222222-2222-4222-8222-222222222222'
def card(scan_id=FIRST,domain='example.com',findings=None):
    return {'id':scan_id,'domain':domain,'url':'https://'+domain,'grade':'B','score':82,'scannedAt':'2026-10-25T00:00:00Z','scanFailed':False,'findings':findings if findings is not None else [{'id':'headers-hsts','title':'HSTS is missing','severity':'high','category':'headers','module':'ShieldCheck','description':'The response did not advertise HSTS.','evidence':'strict-transport-security absent','remediation':'Configure an appropriate HSTS policy.','confidence':.9}],'securityHeaders':json.dumps({'x-powered-by':'PHP/8.4.26'})}
class WorkbenchTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(module,'Owner workbench has not been implemented')
        self.tmp=tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'));self.addCleanup(self.tmp.cleanup)
        self.key=['fixture-owner-a'];self.calls=[];self.post_count=0;self.fail_post=False
        self.rows={FIRST:card(),SECOND:card(SECOND,findings=[])}
        def handler(req):
            self.calls.append(req)
            self.assertEqual(req.url.host,'www.vibeleak.app')
            self.assertEqual(req.headers.get('authorization'),'Bearer '+self.key[0])
            if req.method=='POST':
                self.assertEqual(req.url.path,'/api/v1/scans');self.post_count+=1
                if self.fail_post:raise httpx.ReadTimeout('fixture uncertain response')
                body=json.loads(req.content);self.assertEqual(body['url'],'https://example.com');self.assertEqual(body['maxUnits'],1)
                self.assertTrue(req.headers.get('idempotency-key'))
                return httpx.Response(201,json={'ok':True,'data':{'scan':self.rows[FIRST if self.post_count==1 else SECOND]}})
            self.assertTrue(req.url.path.startswith('/api/v1/scans/'))
            return httpx.Response(200,json={'ok':True,'data':{'scan':self.rows[req.url.path.rsplit('/',1)[1]]}})
        self.app=module.WorkbenchService(Path(self.tmp.name),transport=httpx.MockTransport(handler),key_provider=lambda:self.key[0])
        self.addCleanup(self.app.close)
    def prepare(self,**kwargs):return self.app.prepare('example.com',**kwargs)['operation']['id']
    def run_scan(self,**kwargs):return self.app.start(self.prepare(**kwargs),authorized=True,budget_approved=True)
    def test_open_and_prepare_do_not_call_upstream(self):
        self.assertEqual(self.app.local_scans()['scans'],[]);self.prepare();self.assertEqual(self.calls,[])
    def test_missing_credential_never_sends_scan(self):
        self.key[0]=None;self.assertEqual(self.app.prepare('example.com')['state'],'not-connected');self.assertEqual(self.calls,[])
    def test_scan_requires_both_strict_confirmations(self):
        op=self.prepare()
        for a,b in [(False,True),(True,False),('true',True),(True,'true')]:
            with self.assertRaises(ValueError):self.app.start(op,authorized=a,budget_approved=b)
        self.assertEqual(self.calls,[])
    def test_completed_receipt_is_durable_and_replay_does_not_charge_again(self):
        op=self.prepare();result=self.app.start(op,authorized=True,budget_approved=True)
        self.assertEqual(result['state'],'completed');local=result['receipt']['id']
        self.app.start(op,authorized=True,budget_approved=True);self.assertEqual(self.post_count,1)
        reopened=module.WorkbenchService(Path(self.tmp.name),transport=httpx.MockTransport(lambda req:self.fail('No network for local receipts')),key_provider=lambda:self.key[0]);self.addCleanup(reopened.close)
        rows=reopened.local_scans()['scans'];self.assertEqual(rows[0]['id'],local)
        self.assertNotIn('fixture-owner-a',json.dumps(rows));self.assertNotIn('scannedAt',json.dumps(rows))
    def test_arbitrary_saved_scan_id_is_not_a_local_receipt(self):
        self.assertEqual(self.app.detail(FIRST)['state'],'local-scan-required');self.assertEqual(self.calls,[])
    def test_account_rotation_isolates_receipts_and_prepared_intents(self):
        op=self.prepare();result=self.run_scan();self.key[0]='fixture-owner-b'
        self.assertEqual(self.app.local_scans()['scans'],[])
        self.assertEqual(self.app.detail(result['receipt']['id'])['state'],'local-scan-required')
        with self.assertRaises(ValueError):self.app.start(op,authorized=True,budget_approved=True)
    def test_another_profile_does_not_inherit_receipts(self):
        self.run_scan();other=module.WorkbenchService(Path(self.tmp.name)/'other',key_provider=lambda:self.key[0]);self.addCleanup(other.close)
        self.assertEqual(other.local_scans()['scans'],[])
    def test_uncertain_scan_is_not_automatically_retried(self):
        op=self.prepare();self.fail_post=True
        result=self.app.start(op,authorized=True,budget_approved=True)
        self.assertEqual(result['state'],'uncertain');self.assertEqual(self.post_count,1);self.assertEqual(self.app.local_scans()['scans'],[])
    def test_a_mismatched_target_cannot_create_a_receipt(self):
        self.rows[FIRST]=card(domain='other.example.com')
        self.assertEqual(self.run_scan()['state'],'uncertain');self.assertEqual(self.app.local_scans()['scans'],[])
    def test_detail_and_handoff_use_only_recorded_owner_result(self):
        receipt=self.run_scan()['receipt'];result=self.app.detail(receipt['id'])
        self.assertEqual(result['state'],'ready');self.assertEqual(result['scan']['findings'][0]['title'],'HSTS is missing')
        self.assertNotIn('scannedAt',json.dumps(result))
        handoff=self.app.handoff(receipt['id']);self.assertTrue(handoff['private']);self.assertIn('HSTS is missing',handoff['markdown'])
        self.assertNotIn('fixture-owner-a',handoff['markdown']);self.assertEqual(self.app.store.public_history(),[])
    def test_rescan_comparison_does_not_claim_an_issue_was_fixed(self):
        first=self.run_scan()['receipt'];second=self.run_scan(baseline_id=first['id'])['receipt']
        result=self.app.compare(second['id']);self.assertEqual(result['state'],'ready')
        self.assertEqual(len(result['notObserved']),1);self.assertFalse(result['fixesVerified'])
        self.assertEqual(result['coverageState'],'not-provided')
    def test_untracked_baseline_is_refused_without_network(self):
        with self.assertRaises(ValueError):self.prepare(baseline_id=FIRST)
        self.assertEqual(self.calls,[])
    def test_hosting_requires_a_matching_local_scan_and_explicit_dns_approval(self):
        calls=[]
        class Geo:
            def available(self): return True
            def resolve(self,domain):
                calls.append(domain)
                return {'status':'mapped','country':'DE','name':'Germany','lat':51.2,'lon':10.4,'precision':'country','source':'fixture','sourceVersion':'fixture','reason':'QA only'}
        self.app.geo=Geo()
        self.assertTrue(callable(getattr(self.app,'hosting',None)),'Owner-only hosting map is missing')
        with self.assertRaises(ValueError): self.app.hosting(approved=False)
        self.assertEqual(calls,[])
        first=self.run_scan()['receipt']
        self.run_scan(baseline_id=first['id'])
        result=self.app.hosting(approved=True)
        self.assertEqual(result['state'],'ready')
        self.assertEqual(len(result['sites']),1)
        self.assertEqual(calls,['example.com'])
        self.assertEqual(result['sites'][0]['geo']['country'],'DE')
        self.assertNotIn('scannedAt',json.dumps(result))
        self.key[0]='fixture-owner-b'
        self.assertEqual(self.app.hosting(approved=True)['sites'],[])
        self.assertEqual(calls,['example.com'])

    def test_uncertain_recovery_reuses_the_persisted_idempotency_key(self):
        op=self.prepare();self.fail_post=True
        self.assertEqual(self.app.start(op,authorized=True,budget_approved=True)['state'],'uncertain')
        self.fail_post=False
        self.assertEqual(self.app.start(op,authorized=True,budget_approved=True)['state'],'completed')
        posts=[request for request in self.calls if request.method=='POST']
        self.assertEqual(len(posts),2)
        self.assertEqual(posts[0].headers['idempotency-key'],posts[1].headers['idempotency-key'])

    def test_disconnect_during_a_saved_read_discards_private_data(self):
        receipt=self.run_scan()['receipt']
        old=self.app._get
        def disconnected(*args,**kwargs):
            result=old(*args,**kwargs);self.app.connect(False);return result
        self.app._get=disconnected
        result=self.app.detail(receipt['id'])
        self.assertEqual(result['state'],'consent-required')
        self.assertNotIn('findings',result)

    def test_result_from_another_saved_id_is_rejected(self):
        receipt=self.run_scan()['receipt']
        self.rows[FIRST]=card(SECOND)
        result=self.app.detail(receipt['id'])
        self.assertEqual(result['state'],'unavailable')
        self.assertNotIn('scan',result)

    def test_key_rotation_after_receipt_write_does_not_return_the_old_owner_result(self):
        original=self.app.receipts.complete
        def rotated(*args,**kwargs):
            result=original(*args,**kwargs)
            self.key[0]='fixture-owner-b'
            return result
        self.app.receipts.complete=rotated
        result=self.run_scan()
        self.assertNotIn('receipt',result)
        self.assertEqual(self.app.local_scans()['scans'],[])

    def test_status_identifies_the_loaded_workbench_build(self):
        result=self.app.status()
        self.assertRegex(result.get('backendBuild',''),r'^[0-9a-f]{64}$')
        self.assertEqual(result['workbenchProtocol'],1)

if __name__=='__main__':unittest.main()
