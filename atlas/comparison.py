"""Conservative report comparability. Never proves a deployed fix."""
import math

VERSIONS = ('fingerprintVersion', 'scannerVersion', 'checkPackVersion', 'scanProfile')

def assessment_context(raw):
    data = raw.get('comparisonContext')
    data = data if isinstance(data, dict) else {}
    versions = {field: data[field] if isinstance(data.get(field), str) and 0 < len(data[field]) <= 120 else None for field in VERSIONS}
    eligibility = data.get('baselineEligibility')
    eligible = isinstance(eligibility, dict) and eligibility.get('eligible') is True
    coverage = raw.get('coverage')
    normalized = None
    if isinstance(coverage, dict) and coverage.get('status') in ('complete', 'partial', 'failed'):
        def modules(field):
            values = coverage.get(field)
            return sorted(set(v for v in values[:32] if isinstance(v, str) and 0 < len(v) <= 80)) if isinstance(values, list) else []
        scope = coverage.get('scope')
        scope = {key: value for key, value in list(scope.items())[:64] if isinstance(key, str) and len(key) <= 80 and (type(value) is bool or (isinstance(value, str) and len(value) <= 512) or (type(value) in (int, float) and abs(value) <= 1e12 and math.isfinite(value)))} if isinstance(scope, dict) else {}
        normalized = {'status': coverage['status'], 'completedModules': modules('completedModules'), 'failedModules': modules('failedModules'), 'scope': scope}
    return {'coverage': normalized, 'versions': versions, 'baselineEligible': eligible}

def compare_context(before, after):
    reasons = []
    left, right = before['coverage'], after['coverage']
    if not left or not right:
        reasons.append('coverage-metadata-missing')
    else:
        if any(c['status'] != 'complete' or c['failedModules'] or not c['completedModules'] or not c['scope'] for c in (left, right)):
            reasons.append('coverage-incomplete')
        if not set(left['completedModules']).issubset(right['completedModules']):
            reasons.append('coverage-shrank')
        if left['scope'] != right['scope']:
            reasons.append('coverage-scope-mismatch')
    if not all(before['versions'][field] and after['versions'][field] for field in VERSIONS):
        reasons.append('version-metadata-missing')
    elif before['versions'] != after['versions']:
        reasons.append('version-mismatch')
    if not before['baselineEligible'] or not after['baselineEligible']:
        reasons.append('baseline-not-eligible')
    return {'comparable': not reasons, 'reasons': reasons}
