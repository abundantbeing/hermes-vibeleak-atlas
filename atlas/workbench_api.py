"""Framework-admitted routes. Only installation-bound results are readable."""
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse
from .api import small_json
from .service import SourceError
from .workbench import DENIED

def make_router(service_provider, admission):
    def require_admission(request: Request):
        if not admission(request):
            raise HTTPException(status_code=401, detail='Authenticated Hermes transport required.')
    router = APIRouter(dependencies=[Depends(require_admission)])
    def reply(call):
        headers = {'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff'}
        try:
            return JSONResponse({'ok': True, 'data': call()}, headers=headers)
        except ValueError as exc:
            return JSONResponse({'ok': False, 'error': str(exc)[:300]}, status_code=400, headers=headers)
        except SourceError as exc:
            return JSONResponse({'ok': True, 'data': {'state': exc.state, 'message': str(exc)}}, headers=headers)

    @router.get('/status')
    def status():
        return reply(lambda: service_provider().status())

    @router.get('/snapshot')
    @router.get('/site')
    @router.get('/handoff')
    def legacy_read():
        return reply(lambda: dict(DENIED, sites=[], events=[], history=[], counts={'displayed': 0, 'mapped': 0, 'unknown': 0}))

    @router.post('/workbench/connection')
    async def connection(request: Request):
        body = await small_json(request)
        return reply(lambda: service_provider().connect(body.get('connected')))

    @router.post('/workbench/hosting')
    async def hosting(request: Request):
        body = await small_json(request)
        return await run_in_threadpool(reply, lambda: service_provider().hosting(approved=body.get('approved')))

    @router.get('/workbench/scans')
    def scans():
        return reply(lambda: service_provider().local_scans())

    @router.post('/workbench/intents')
    async def prepare(request: Request):
        body = await small_json(request)
        return reply(lambda: service_provider().prepare(body.get('domain'), project=body.get('project', ''), baseline_id=body.get('baselineId')))

    @router.post('/workbench/intents/{ident}/execute')
    async def execute(ident: str, request: Request):
        body = await small_json(request)
        return await run_in_threadpool(reply, lambda: service_provider().start(ident, authorized=body.get('authorized'), budget_approved=body.get('budgetApproved')))

    @router.get('/workbench/scans/{ident}')
    def detail(ident: str):
        return reply(lambda: service_provider().detail(ident))

    @router.get('/workbench/scans/{ident}/handoff')
    def handoff(ident: str):
        return reply(lambda: service_provider().handoff(ident))

    @router.get('/workbench/scans/{ident}/compare')
    def compare(ident: str):
        return reply(lambda: service_provider().compare(ident))

    @router.post('/workbench/scans/{ident}/runtime-evidence')
    async def runtime_evidence(ident: str, request: Request):
        body = await small_json(request)
        return reply(lambda: service_provider().save_runtime_evidence(ident, body.get('version'), vendor_fix_attested=body.get('vendorFixAttested', False)))
    return router
