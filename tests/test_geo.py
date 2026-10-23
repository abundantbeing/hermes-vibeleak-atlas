import importlib
from pathlib import Path
import sys
import unittest
import httpx
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
try:geo=importlib.import_module('atlas.geo')
except ModuleNotFoundError:geo=None

class GeoTests(unittest.TestCase):
    def setUp(self):self.assertIsNotNone(geo,'Country enrichment has not been implemented')
    def test_resolver_only_calls_fixed_dns_provider_and_suppresses_private_answers(self):
        seen=[]
        def handle(req):
            seen.append(req)
            self.assertEqual(req.url.host,'cloudflare-dns.com')
            self.assertEqual(req.method,'GET')
            return httpx.Response(200,json={'Status':0,'Answer':[{'type':1,'data':'127.0.0.1'}]})
        engine=geo.GeoEngine(Path(__file__).resolve().parents[1]/'assets',transport=httpx.MockTransport(handle))
        result=engine.resolve('example.com')
        self.assertEqual(result['status'],'unknown')
        self.assertNotIn('127.0.0.1',str(result))
        self.assertEqual(len(seen),2)
        engine.close()
    def test_dns_failure_is_unknown_and_cached(self):
        seen=[]
        def handle(req):seen.append(1);return httpx.Response(503)
        engine=geo.GeoEngine(Path(__file__).resolve().parents[1]/'assets',transport=httpx.MockTransport(handle))
        self.assertEqual(engine.resolve('example.com')['status'],'unknown')
        engine.resolve('example.com')
        self.assertLessEqual(len(seen),2)
        engine.close()
    def test_database_attribution_is_present_without_dns_leak(self):
        engine=geo.GeoEngine(Path(__file__).resolve().parents[1]/'assets',transport=httpx.MockTransport(lambda req:httpx.Response(200,json={'Status':0,'Answer':[{'type':1,'data':'8.8.8.8'}]})))
        result=engine.resolve('example.com')
        self.assertEqual(result['source'],'DB-IP Country Lite')
        self.assertNotIn('8.8.8.8',str(result))
        self.assertTrue(result['sourceVersion'])
        engine.close()
if __name__=='__main__':unittest.main()
