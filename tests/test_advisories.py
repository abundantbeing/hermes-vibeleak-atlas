import importlib
from pathlib import Path
import sys
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
try:advisories=importlib.import_module('atlas.advisories')
except ModuleNotFoundError:advisories=None
class AdvisoryTests(unittest.TestCase):
    def setUp(self):self.assertIsNotNone(advisories,'PHP advisory evaluator has not been implemented')
    def test_missing_php_evidence_is_unknown_not_safe(self):
        result=advisories.assess_php();self.assertEqual(result['versionAssessment'],'unknown');self.assertFalse(result['securityVerified'])
    def test_fixed_supported_branches_match_official_upstream_release(self):
        for branch,fix in [('8.2',35),('8.3',36),('8.4',27),('8.5',12)]:
            before=advisories.assess_php(f'{branch}.{fix-1}',source='public-header')
            after=advisories.assess_php(f'{branch}.{fix}',source='owner-runtime')
            self.assertEqual(before['versionAssessment'],'potentially-affected')
            self.assertEqual(after['versionAssessment'],'upstream-fix-version-observed')
            self.assertFalse(after['securityVerified'])
    def test_a_banner_never_confirms_vulnerability(self):
        result=advisories.assess_php('8.4.26',source='public-header')
        self.assertEqual(result['evidenceSource'],'public-header');self.assertFalse(result['vulnerabilityConfirmed'])
    def test_vendor_backport_is_owner_attested_not_inferred(self):
        result=advisories.assess_php('8.4.26',source='owner-runtime',vendor_fix_attested=True)
        self.assertEqual(result['versionAssessment'],'vendor-fix-owner-attested');self.assertFalse(result['securityVerified'])
    def test_old_unsupported_branches_need_vendor_verification(self):
        self.assertEqual(advisories.assess_php('7.4.33')['versionAssessment'],'vendor-verification-required')
    def test_configuration_followup_remains_not_assessed_even_on_fixed_versions(self):
        result=advisories.assess_php('8.5.12',source='owner-runtime')
        self.assertEqual(result['configurationAdvisory']['id'],'CVE-2026-115560');self.assertEqual(result['configurationAdvisory']['assessment'],'not-assessed')
    def test_invalid_runtime_evidence_is_rejected(self):
        for value in ['PHP <script>','8.4','8.4.27;curl bad','8.4.27-vendor','9.0.0']:
            with self.assertRaises(ValueError):advisories.assess_php(value,source='owner-runtime')
    def test_sources_and_catalog_date_are_always_present(self):
        result=advisories.assess_php('8.3.35');self.assertTrue(result['sources']);self.assertEqual(result['catalogReviewedAt'],'2026-10-25');self.assertIn('CVE-2026-109618',result['advisories'])
if __name__=='__main__':unittest.main()
