"""Offline PHP advisory guidance. Evidence is not an exploitation test."""
from __future__ import annotations
import re

REVIEWED_AT = '2026-10-25'
FIXES = {(8, 2): 35, (8, 3): 36, (8, 4): 27, (8, 5): 12}
SOURCES = [
    'https://www.php.net/archive/2026.php#2026-10-21-5',
    'https://www.php.net/archive/2026.php#2026-10-23-1',
    'https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w',
    'https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp',
]

def assess_php(version=None, *, source='unknown', vendor_fix_attested=False):
    if source not in ('unknown', 'public-header', 'owner-runtime'):
        raise ValueError('Choose a supported PHP evidence source.')
    if not isinstance(vendor_fix_attested, bool):
        raise ValueError('Vendor evidence must use a boolean value.')
    assessment = 'unknown'
    fixed = None
    if version is not None:
        if not isinstance(version, str) or not re.fullmatch(r'(?:5|7|8)\.[0-9]{1,2}\.[0-9]{1,3}', version):
            raise ValueError('Enter only the stable PHP version, such as 8.4.27. Keep vendor package evidence separate.')
        major, minor, patch = map(int, version.split('.'))
        branch = (major, minor)
        if branch in FIXES:
            fixed = f'{major}.{minor}.{FIXES[branch]}'
            assessment = 'upstream-fix-version-observed' if patch >= FIXES[branch] else 'potentially-affected'
        else:
            assessment = 'vendor-verification-required'
        if vendor_fix_attested:
            if source != 'owner-runtime':
                raise ValueError('Vendor backports require explicit owner runtime evidence.')
            assessment = 'vendor-fix-owner-attested'
    elif vendor_fix_attested:
        raise ValueError('A vendor attestation requires a runtime version.')
    return {
        'version': version, 'evidenceSource': source if version else 'unknown',
        'versionAssessment': assessment, 'upstreamFixedVersion': fixed,
        'vendorFixOwnerAttested': vendor_fix_attested,
        'vulnerabilityConfirmed': False, 'securityVerified': False,
        'catalogReviewedAt': REVIEWED_AT, 'sources': list(SOURCES),
        'advisories': ['CVE-2026-109618', 'CVE-2026-109619'],
        'configurationAdvisory': {
            'id': 'CVE-2026-115560', 'assessment': 'not-assessed',
            'guidance': 'The October 23 advisory also requires checking effective session upload-progress configuration and application serializer changes. A fixed version for the October 21 advisories alone does not resolve this assessment.',
        },
        'guidance': 'Confirm the serving runtime and hosting vendor package fixes. A public header may be missing, stale or rewritten. Vendor backports cannot be inferred from a version. Apply supported PHP or vendor updates and verify every serving worker. No target requests or exploit probes are made by this advisory evaluator.',
    }
