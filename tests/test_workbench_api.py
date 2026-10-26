import importlib
from pathlib import Path
import sys
import unittest
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
try: api = importlib.import_module('atlas.workbench_api')
except ModuleNotFoundError: api = None
from fastapi import FastAPI
from fastapi.testclient import TestClient

class WorkbenchAPITests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(api, 'The admitted workbench router is missing')
        class Service:
            def status(self): return {'workbenchProtocol': 1}
            def local_scans(self): return {'state':'empty','scans':[]}
        app = FastAPI()
        app.include_router(api.make_router(lambda:Service(), lambda request: request.headers.get('x-fixture-admitted') == 'yes'))
        self.client = TestClient(app)
        self.headers = {'x-fixture-admitted':'yes'}
    def test_routes_require_framework_admission(self):
        self.assertEqual(self.client.get('/status').status_code,401)
        self.assertEqual(self.client.post('/workbench/intents',json={'domain':'example.com'}).status_code,401)
    def test_sensitive_results_have_no_store_headers(self):
        response = self.client.get('/workbench/scans',headers=self.headers)
        self.assertEqual(response.status_code,200)
        self.assertEqual(response.headers['cache-control'],'private, no-store')
        self.assertEqual(response.json()['data']['scans'],[])
    def test_old_global_reads_cannot_be_used_as_a_backdoor(self):
        for route in ['/snapshot?mode=public','/site?domain=example.com&mode=fleet','/handoff?domain=example.com']:
            response = self.client.get(route,headers=self.headers)
            self.assertEqual(response.json()['data']['state'],'local-scan-required')
    def test_intent_payload_is_bounded_before_service_call(self):
        response = self.client.post('/workbench/intents',headers=self.headers,content='x'*4097)
        self.assertEqual(response.status_code,413)
if __name__ == '__main__': unittest.main()
