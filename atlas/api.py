"""Framework-admitted, profile-scoped API routes for the native plugin."""
from fastapi import APIRouter,Depends,HTTPException,Request
from fastapi.responses import JSONResponse


def make_router(service_provider,admission):
    def require_admission(request:Request):
        if not admission(request):raise HTTPException(status_code=401,detail='Authenticated Hermes transport required.')
    router=APIRouter(dependencies=[Depends(require_admission)])
    def reply(call):
        try:
            return JSONResponse({'ok':True,'data':call()},headers={'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'})
        except ValueError as exc:
            return JSONResponse({'ok':False,'error':str(exc)[:300]},status_code=400,headers={'Cache-Control':'no-store'})
    def service():return service_provider()

    @router.get('/status')
    def status():return reply(lambda:service().status())

    @router.get('/snapshot')
    def snapshot(mode:str='public',force:bool=False):return reply(lambda:service().snapshot(mode,force=force))

    @router.get('/site')
    def site(domain:str,mode:str='public',scan_id:str|None=None):
        if mode not in ('public','watchlist','fleet'):raise HTTPException(status_code=400,detail='Unsupported mode.')
        return reply(lambda:service().site(domain,mode,scan_id))

    @router.get('/handoff')
    def handoff(domain:str,mode:str='public',scan_id:str|None=None):
        if mode not in ('public','watchlist','fleet'):raise HTTPException(status_code=400,detail='Unsupported mode.')
        return reply(lambda:service().markdown(domain,mode,scan_id))

    @router.post('/settings')
    async def settings(request:Request):
        body=await small_json(request)
        return reply(lambda:service().settings(body))

    @router.post('/watchlist')
    async def watch(request:Request):
        body=await small_json(request)
        return reply(lambda:{'domain':service().store.add_watch(body.get('domain')),'watchlist':service().store.watchlist()})

    @router.delete('/watchlist')
    def unwatch(domain:str):return reply(lambda:(service().store.remove_watch(domain),{'watchlist':service().store.watchlist()})[1])

    @router.delete('/history')
    def clear_history():return reply(lambda:(service().store.clear_history(),{'cleared':True})[1])
    return router


async def small_json(request):
    body=bytearray()
    async for chunk in request.stream():
        body.extend(chunk)
        if len(body)>4096:raise HTTPException(status_code=413,detail='Request exceeds size limit.')
    import json
    try:
        data=json.loads(body)
        if not isinstance(data,dict):raise ValueError()
        return data
    except (ValueError,UnicodeError):raise HTTPException(status_code=400,detail='A JSON object is required.')
