import importlib
from pathlib import Path
import os
import sys
import tempfile
import unittest
from fastapi import FastAPI
from fastapi.testclient import TestClient
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
try:api=importlib.import_module('atlas.api')
except ModuleNotFoundError:api=None

class ApiTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(api,'The scoped plugin routes have not been implemented')
        self.tmp=tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'));self.addCleanup(self.tmp.cleanup)
        from atlas.service import AtlasService
        self.service=AtlasService(Path(self.tmp.name));self.addCleanup(self.service.close)
    def app(self,admission):
        app=FastAPI();app.include_router(api.make_router(lambda:self.service,admission),prefix='/api/plugins/vibeleak-atlas');return TestClient(app)
    def test_all_routes_require_framework_admission(self):
        with self.app(lambda req:False) as c:
            for method,path in [('get','status'),('get','snapshot'),('post','settings'),('post','watchlist'),('get','site?domain=example.com'),('get','handoff?domain=example.com')]:
                self.assertIn(getattr(c,method)('/api/plugins/vibeleak-atlas/'+path).status_code,(401,403))
    def test_status_and_mutations_are_no_store_and_bounded(self):
        with self.app(lambda req:True) as c:
            r=c.get('/api/plugins/vibeleak-atlas/status');self.assertEqual(r.status_code,200);self.assertIn('no-store',r.headers['cache-control'])
            self.assertEqual(c.post('/api/plugins/vibeleak-atlas/watchlist',json={'domain':'https://example.com'}).status_code,200)
            self.assertEqual(c.post('/api/plugins/vibeleak-atlas/watchlist',json={'domain':'localhost'}).status_code,400)
            self.assertEqual(c.post('/api/plugins/vibeleak-atlas/settings',json={'consent':'true'}).status_code,400)
    def test_unapproved_mode_is_refused(self):
        with self.app(lambda req:True) as c:self.assertEqual(c.get('/api/plugins/vibeleak-atlas/snapshot?mode=admin').status_code,400)
if __name__=='__main__':unittest.main()
