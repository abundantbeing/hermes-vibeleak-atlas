"""QA-only fixture, appended only to a disposable hosted entry. Never packaged."""
import httpx
import json
from pathlib import Path
import threading

QA_ROOT = ROOT.parents[2].resolve()
assert QA_ROOT.name == '.qa', 'Fixture refuses a non-QA installation'
FIXTURE_LOG = QA_ROOT/'fixture-requests.json'
FIXTURE_LOCK = threading.RLock()
FIXTURE_OPS = {}
FIRST = '11111111-1111-4111-8111-111111111111'
SECOND = '22222222-2222-4222-8222-222222222222'

def fixture_response(scan_id):
    hsts = {'id':'headers-hsts','title':'HSTS is missing','severity':'high','category':'headers','module':'ShieldCheck','description':'Fixture response did not advertise Strict-Transport-Security.','evidence':'strict-transport-security: absent [QA fixture]','remediation':'Review the HTTPS deployment and set an appropriate HSTS policy after checking subdomain support.','confidence':0.9}
    csp = {'id':'headers-csp','title':'Content Security Policy needs review','severity':'medium','category':'headers','module':'ShieldCheck','description':'Fixture response has no enforced content security policy.','evidence':'content-security-policy: absent [QA fixture]','remediation':'Inspect the app asset and script requirements before proposing a narrowly scoped policy.','confidence':0.8}
    return {'id':scan_id,'domain':'example.com','url':'https://example.com','grade':'D' if scan_id==FIRST else 'B','score':44 if scan_id==FIRST else 82,'scanFailed':False,'coverage':{'status':'complete','completedModules':['ShieldCheck'],'failedModules':[],'scope':{'profile':'public-passive-v1'}},'comparisonContext':{'fingerprintVersion':'v1','scannerVersion':'public-passive-scanner-v1','checkPackVersion':'public-passive-check-pack-v1','scanProfile':'public-passive-v1','baselineEligibility':{'eligible':True,'reasons':[]}},'scannedAt':'2026-10-25T00:00:00Z','securityHeaders':json.dumps({'x-powered-by':'PHP/8.4.26'}),'findings':[hsts,csp] if scan_id==FIRST else [csp]}

def fixture_transport(request):
    assert request.url.host == 'www.vibeleak.app', 'Unapproved fixture origin'
    record = {'method':request.method,'path':request.url.path}
    with FIXTURE_LOCK:
        if request.method == 'POST' and request.url.path == '/api/v1/scans':
            body=json.loads(request.content)
            assert body['url']=='https://example.com' and body['maxUnits']==1
            ident=request.headers['idempotency-key']
            if ident not in FIXTURE_OPS:
                FIXTURE_OPS[ident]=FIRST if not FIXTURE_OPS else SECOND
            record.update(url=body['url'],maxUnits=body['maxUnits'],idempotencyKey=ident)
            response=fixture_response(FIXTURE_OPS[ident])
        elif request.method == 'GET' and request.url.path in ('/api/v1/scans/'+FIRST,'/api/v1/scans/'+SECOND):
            response=fixture_response(request.url.path.rsplit('/',1)[1])
        else:
            raise AssertionError('Unexpected upstream request: '+request.method+' '+request.url.path)
        rows=json.loads(FIXTURE_LOG.read_text()) if FIXTURE_LOG.exists() else []
        rows.append(record)
        FIXTURE_LOG.write_text(json.dumps(rows,indent=2))
    return httpx.Response(201 if request.method=='POST' else 200,json={'ok':True,'data':{'scan':response}})

class FixtureGeo:
    def available(self): return True
    def resolve(self, domain):
        assert domain == 'example.com'
        country=json.loads((ROOT/'assets'/'countries.json').read_text())['DE']
        with FIXTURE_LOCK:
            path=QA_ROOT/'fixture-geo-requests.json'
            rows=json.loads(path.read_text()) if path.exists() else []
            rows.append(domain);path.write_text(json.dumps(rows))
        return {'status':'mapped','country':'DE','name':country['name'],'lat':country['lat'],'lon':country['lon'],'precision':'country','source':'QA fixture','sourceVersion':'fixture','reason':'QA fixture, not live DNS or a verified origin.'}

class FixtureService(service_module.WorkbenchService):
    def __init__(self, home):
        super().__init__(home, key_provider=lambda:'fixture-local-owner', transport=httpx.MockTransport(fixture_transport), geo=FixtureGeo())
    def prepare(self, domain, **kwargs):
        from urllib.parse import urlsplit
        host=urlsplit(domain if '://' in str(domain) else 'https://'+str(domain)).hostname
        if host != 'example.com':
            return {'state':'fixture-only','message':'This is an isolated QA preview, not the live plugin. Only example.com sample responses are available here. Your real website was not contacted. Configure an owner key in the real Hermes profile to run an authorized live assessment.'}
        return super().prepare(domain, **kwargs)
    def status(self):
        return dict(super().status(), testFixture=True)

_services[Path(get_hermes_home()).resolve()] = FixtureService(Path(get_hermes_home()).resolve())
