import importlib
import unittest
try:comparison=importlib.import_module('atlas.comparison')
except ModuleNotFoundError:comparison=None

def report(**changes):
    value={'coverage':{'status':'complete','completedModules':['ShieldCheck'],'failedModules':[],'scope':{'profile':'public-passive-v1'}},'comparisonContext':{'fingerprintVersion':'v1','scannerVersion':'scanner-fixture','checkPackVersion':'pack-fixture','scanProfile':'public-passive-v1','baselineEligibility':{'eligible':True,'reasons':[]}}}
    value.update(changes);return value

class ComparisonContextTests(unittest.TestCase):
    def setUp(self):self.assertIsNotNone(comparison,'Comparison context policy is missing')
    def test_legacy_missing_context_cannot_verify_a_comparable_rescan(self):
        result=comparison.compare_context(comparison.assessment_context({}),comparison.assessment_context({}))
        self.assertFalse(result['comparable']);self.assertIn('coverage-metadata-missing',result['reasons'])
    def test_matching_complete_metadata_supports_report_comparison(self):
        result=comparison.compare_context(comparison.assessment_context(report()),comparison.assessment_context(report()))
        self.assertTrue(result['comparable']);self.assertEqual(result['reasons'],[])
    def test_changed_scanner_or_partial_coverage_is_not_comparable(self):
        changed=report();changed['comparisonContext']['scannerVersion']='changed'
        result=comparison.compare_context(comparison.assessment_context(report()),comparison.assessment_context(changed))
        self.assertFalse(result['comparable']);self.assertIn('version-mismatch',result['reasons'])
        changed=report();changed['coverage']['status']='partial'
        self.assertFalse(comparison.compare_context(comparison.assessment_context(report()),comparison.assessment_context(changed))['comparable'])
    def test_unknown_and_malformed_server_eligibility_stays_unknown(self):
        changed=report();changed['comparisonContext']['baselineEligibility']['eligible']='true'
        result=comparison.compare_context(comparison.assessment_context(report()),comparison.assessment_context(changed))
        self.assertFalse(result['comparable'])
if __name__=='__main__':unittest.main()
