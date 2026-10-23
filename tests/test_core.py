import importlib
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
try:
    core = importlib.import_module('atlas.core')
except ModuleNotFoundError:
    core = None


class CoreTests(unittest.TestCase):
    def setUp(self):
        self.assertIsNotNone(core, 'The Atlas core behavior has not been implemented')

    def test_domain_accepts_url_without_retaining_path_or_credentials(self):
        self.assertEqual(core.normalize_domain('https://WWW.Example.com/report?q=1'), 'example.com')
        with self.assertRaises(ValueError):
            core.normalize_domain('https://user:pass@example.com')

    def test_domain_rejects_internal_and_ip_targets(self):
        for value in ['localhost', 'secret.local', '127.0.0.1', '10.0.0.1', '[::1]', 'example.com:22', 'a..com', 'file:///etc/passwd', 'https://x.com\\@localhost', 'x.com\n.evil']:
            with self.subTest(value=value), self.assertRaises(ValueError):
                core.normalize_domain(value)

    def test_domain_preserves_subdomain_and_idna(self):
        self.assertEqual(core.normalize_domain('portal.nousresearch.com'), 'portal.nousresearch.com')
        self.assertEqual(core.normalize_domain('bücher.de'), 'xn--bcher-kva.de')

    def test_public_card_allowlists_fields(self):
        raw = {'id':'scan1','url':'https://example.com/private?token=hidden','grade':'A','score':94,'scanned_at':'2026-10-22T12:00:00Z','findings':[{'secret':'no'}], 'user_id':'private-owner','tip':'secret fix','security_headers':'private'}
        result = core.public_card(raw)
        text = json.dumps(result)
        for secret in ['private-owner','secret fix','security_headers','token=hidden','findings']:
            self.assertNotIn(secret, text)
        self.assertEqual(result['domain'], 'example.com')
        self.assertEqual(result['score'], 94)
        self.assertEqual(result['grade'], 'A')

    def test_grade_only_never_invents_score(self):
        result = core.public_card({'domain':'example.com','grade':'B','scanned_at':'2026-10-22T12:00:00Z'})
        self.assertIsNone(result['score'])

    def test_bad_grade_or_score_does_not_become_good(self):
        self.assertIsNone(core.public_card({'domain':'example.com','grade':'Z'}))
        result = core.public_card({'domain':'example.com','grade':'A','score':False})
        self.assertIsNone(result['score'])
        result = core.public_card({'domain':'example.com','grade':'S','score':4})
        self.assertIsNone(result['score'])

    def test_vibesignal_is_separate_from_trust(self):
        result=core.public_card({'domain':'example.com','grade':'N/A','score':90,'agent_readiness_score':72})
        self.assertIsNone(result['grade'])
        self.assertIsNone(result['score'])
        self.assertEqual(result['ai']['score'],72)

    def test_failed_scan_is_not_successful_posture(self):
        self.assertIsNone(core.public_card({'domain':'example.com','grade':'S','scan_failed':True}))

    def test_geo_never_returns_private_ips(self):
        result=core.geo_from_answers(['10.0.0.1','127.0.0.1','169.254.1.1'],lambda ip:'US',{'US':{'lat':38,'lon':-97,'name':'United States'}},'2026-10')
        self.assertEqual(result['status'],'unknown')
        self.assertNotIn('10.0.0.1',json.dumps(result))

    def test_geo_conflicting_countries_remain_unmapped(self):
        result=core.geo_from_answers(['8.8.8.8','1.1.1.1'],lambda ip:'US' if ip=='8.8.8.8' else 'AU',{'US':{'lat':38,'lon':-97,'name':'United States'},'AU':{'lat':-25,'lon':134,'name':'Australia'}},'2026-10')
        self.assertEqual(result['status'],'multi-region')
        self.assertIsNone(result['lat'])

    def test_geo_single_country_is_approximate_and_attributed(self):
        result=core.geo_from_answers(['8.8.8.8'],lambda ip:'US',{'US':{'lat':38,'lon':-97,'name':'United States'}},'2026-10')
        self.assertEqual(result['precision'],'country')
        self.assertEqual(result['country'],'US')
        self.assertEqual(result['source'],'DB-IP Country Lite')
        self.assertNotIn('8.8.8.8',json.dumps(result))

    def test_latest_per_domain_dedupes_without_grade_bias(self):
        rows=[{'domain':'example.com','grade':'F','scanned_at':'2026-10-23T00:00:00Z'},{'domain':'example.com','grade':'S','scanned_at':'2026-10-20T00:00:00Z'}]
        result=core.normalize_index(rows)
        self.assertEqual(len(result),1)
        self.assertEqual(result[0]['grade'],'F')

    def test_state_persists_watchlist_and_bounds_history(self):
        with tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR')) as d:
            store=core.LocalStore(Path(d)/'atlas.sqlite3')
            store.add_watch('https://example.com/path')
            self.assertEqual(store.watchlist(),['example.com'])
            for n in range(90):
                store.record_public([{'domain':'example.com','grade':'A','score':90+n%7,'scannedAt':str(n)}],captured_at=str(n))
            self.assertLessEqual(len(store.public_history()),64)
            self.assertEqual(core.LocalStore(Path(d)/'atlas.sqlite3').watchlist(),['example.com'])

    def test_identical_snapshots_do_not_fabricate_new_history(self):
        with tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR')) as d:
            store=core.LocalStore(Path(d)/'atlas.sqlite3')
            rows=[{'domain':'example.com','grade':'A','score':94,'scannedAt':'2026-10-22'}]
            store.record_public(rows,captured_at='first')
            store.record_public(rows,captured_at='second')
            self.assertEqual(len(store.public_history()),1)

    def test_history_redacts_removed_and_hidden_domains(self):
        with tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR')) as d:
            store=core.LocalStore(Path(d)/'atlas.sqlite3')
            store.record_public([{'domain':'example.com','grade':'A'},{'domain':'hidden.com','grade':'F'}],captured_at='a')
            result=store.public_history(allowed_domains={'example.com'})
            self.assertNotIn('hidden.com',json.dumps(result))

    def test_watchlist_cap_and_idempotence(self):
        with tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR')) as d:
            store=core.LocalStore(Path(d)/'atlas.sqlite3')
            for n in range(32):store.add_watch(f'site{n}.example.com')
            store.add_watch('site0.example.com')
            with self.assertRaises(ValueError):store.add_watch('overflow.example.com')
            store.remove_watch('site0.example.com')
            self.assertEqual(len(store.watchlist()),31)


if __name__=='__main__':unittest.main()
