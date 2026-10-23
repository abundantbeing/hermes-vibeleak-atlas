"""Fixed-origin, read-only VibeLeak transport. Never runs a scan."""
from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
import re
import threading
import time
from urllib.parse import quote

import httpx
from .core import LocalStore, clean_time, normalize_domain, normalize_index, public_card, unknown_geo, utc_now

ORIGIN='https://www.vibeleak.app'
UA='VibeLeak-Atlas/0.1 (+https://www.vibeleak.app)'
MAX_RESPONSE=2*1024*1024
READ_PATHS={'/api/trust-index','/api/public/scan-summary','/api/v1/trust-index/visibility','/api/v1/history','/api/v1/monitor-events'}
ID_PATTERN=r'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'


class SourceError(Exception):
    def __init__(self,state='unavailable'):
        self.state=state
        super().__init__({'unauthorized':'The VibeLeak credential was refused.','forbidden':'This credential lacks the required scope or entitlement.','not-found':'No saved public result was found.','rate-limited':'VibeLeak rate-limited this read. Retry later.','unavailable':'VibeLeak did not return a usable response.'}.get(state,'The source is unavailable.'))


class AtlasService:
    def __init__(self,home,*,transport=None,key_provider=lambda:None,geo=None):
        self.store=LocalStore(Path(home)/'plugin-data'/'vibeleak-atlas'/'atlas.sqlite3')
        self.key_provider=key_provider
        self.geo=geo
        self.client=httpx.Client(transport=transport,timeout=httpx.Timeout(16,connect=6),follow_redirects=False,headers={'User-Agent':UA,'Accept':'application/json'},limits=httpx.Limits(max_connections=6,max_keepalive_connections=4))
        self._lock=threading.RLock()
        self._last={}
        self._identity=None

    def close(self):self.client.close()

    def settings(self,patch=None):
        result=self.store.settings(patch)
        if patch is not None:
            with self._lock:self._last.clear()
        return result

    def _credential(self):
        try:value=self.key_provider()
        except Exception:value=None
        return value if isinstance(value,str) and value.strip() else None

    def status(self):
        key=self._credential()
        return {'privateVersion':hashlib.sha256(key.encode()).hexdigest()[:16] if key else None,'version':'0.1.0','readOnly':True,'settings':self.settings(),'privateConfigured':bool(key),'geographyAvailable':self.geo is not None and self.geo.available(),'watchlist':self.store.watchlist(),'apiOrigin':ORIGIN,'historyPolicy':'Public reads only, at most 64 changed snapshots. Private data is never written to history.'}

    def _get(self,path,params=None,*,key=None,text=False):
        if path not in READ_PATHS and not re.fullmatch(r'/api/v1/(?:scans/'+ID_PATTERN+r'|reports/'+ID_PATTERN+r'/markdown)',path):
            raise ValueError('That upstream path is not an approved read operation.')
        headers={'Authorization':'Bearer '+key} if key else {}
        try:
            with self.client.stream('GET',ORIGIN+path,params=params,headers=headers) as response:
                if response.status_code!=200:
                    raise SourceError({401:'unauthorized',403:'forbidden',404:'not-found',429:'rate-limited'}.get(response.status_code,'unavailable'))
                chunks=[];length=0
                for chunk in response.iter_bytes():
                    length+=len(chunk)
                    if length>MAX_RESPONSE:raise SourceError()
                    chunks.append(chunk)
                body=b''.join(chunks)
                if text:
                    if not re.fullmatch(r'/api/v1/reports/'+ID_PATTERN+r'/markdown',path):raise ValueError('Text responses are limited to saved report export.')
                    return body.decode('utf-8')
                data=json.loads(body)
                if not isinstance(data,dict) or data.get('ok') is False:raise SourceError()
                return data
        except SourceError:raise
        except (httpx.HTTPError,ValueError,UnicodeError,TypeError) as exc:raise SourceError() from exc

    def _visibility(self,domain):
        data=self._get('/api/v1/trust-index/visibility',{'domain':domain})
        result=data.get('data',{}).get('visibility')
        if not isinstance(result,dict) or not isinstance(result.get('hidden'),bool):raise SourceError()
        return not result['hidden']

    def _public_site(self,domain):
        if not self._visibility(domain):return None,'privacy-hidden'
        try:
            data=self._get('/api/public/scan-summary',{'domain':domain})
        except SourceError as exc:
            if exc.state=='not-found':return None,'no-saved-result'
            raise
        site=public_card(data)
        if site is None or site['domain']!=domain:raise SourceError()
        return site,None

    def site(self,value,mode='public',scan_id=None):
        domain=normalize_domain(value)
        if not self.settings()['consent']:return {'state':'consent-required','site':None}
        try:
            if mode=='fleet':
                key=self._credential()
                if not key:return {'state':'not-connected','site':None}
                if not isinstance(scan_id,str) or not re.fullmatch(ID_PATTERN,scan_id):raise ValueError('A valid saved scan ID is required.')
                payload=self._get('/api/v1/scans/'+scan_id,key=key)
                raw=payload.get('data',{}).get('scan')
                if not isinstance(raw,dict):raise SourceError()
                site=public_card(raw)
                if not site or site['domain']!=domain:raise SourceError()
                site['private']=True
                site['findings']=self._safe_findings(raw.get('findings'))
                return {'state':'ready','site':site}
            site,reason=self._public_site(domain)
            return {'state':reason or 'ready','site':site}
        except SourceError as exc:return {'state':exc.state,'site':None,'message':str(exc)}

    @staticmethod
    def _safe_findings(rows):
        result=[]
        if not isinstance(rows,list):return result
        for row in rows[:80]:
            if not isinstance(row,dict):continue
            result.append({'title':str(row.get('title','Finding'))[:300],'severity':row.get('severity') if row.get('severity') in ('critical','high','medium','low','info') else 'info','remediation':str(row.get('remediation',''))[:4000]})
        return result

    def _events(self,key):
        data=self._get('/api/v1/monitor-events',{'limit':50,'includeAcknowledged':'false'},key=key)
        rows=data.get('data',{}).get('events')
        if not isinstance(rows,list):raise SourceError()
        events=[]
        for row in rows[:50]:
            if not isinstance(row,dict):continue
            try:domain=normalize_domain(row.get('domain',''))
            except ValueError:continue
            events.append({'id':str(row.get('id',''))[:80],'domain':domain,'kind':str(row.get('eventType','recorded-change'))[:80],'severity':str(row.get('severity','info'))[:20],'occurredAt':clean_time(row.get('lastSeenAt',row.get('firstSeenAt'))),'count':row.get('occurrenceCount') if isinstance(row.get('occurrenceCount'),int) and not isinstance(row.get('occurrenceCount'),bool) else 1})
        return events

    def snapshot(self,mode='public',geography=None,force=False):
        if mode not in ('public','watchlist','fleet'):raise ValueError('Unsupported Atlas mode.')
        options=self.settings()
        base={'mode':mode,'sites':[],'events':[],'history':[],'excluded':[],'readOnly':True,'fetchedAt':utc_now(),'counts':{'displayed':0,'mapped':0,'unknown':0},'watchlist':self.store.watchlist()}
        if not options['consent']:return dict(base,state='consent-required')
        key=self._credential() if mode=='fleet' else None
        if mode=='fleet' and not key:return dict(base,state='not-connected')
        identity=hashlib.sha256(key.encode()).hexdigest() if key else 'public'
        use_geo=options['geography'] if geography is None else bool(geography)
        cache_key=(mode,identity,use_geo,tuple(base['watchlist']))
        with self._lock:
            if identity!=self._identity:
                self._last.clear()
                self._identity=identity
            cached=self._last.get(cache_key)
            if cached and not force and time.monotonic()-cached[0]<10:return cached[1]
            try:
                events=[];event_state='not-applicable';excluded=[];raw_count=0;source_domains=None
                if mode=='public':
                    data=self._get('/api/trust-index',{'view':'recent'})
                    if data.get('gated') is True:sites=[]
                    else:sites=normalize_index(data.get('entries'),100)
                    raw_count=len(data.get('entries',[])) if isinstance(data.get('entries'),list) else 0
                    source_domains=data.get('uniqueDomains') if type(data.get('uniqueDomains')) is int else None
                elif mode=='watchlist':
                    def read(domain):
                        try:return domain,*self._public_site(domain)
                        except SourceError as exc:return domain,None,exc.state
                    with ThreadPoolExecutor(max_workers=4) as pool:answers=list(pool.map(read,base['watchlist']))
                    sites=[]
                    for domain,item,reason in answers:
                        if item:sites.append(item)
                        else:excluded.append({'domain':domain,'reason':reason})
                    raw_count=len(base['watchlist'])
                else:
                    data=self._get('/api/v1/history',{'limit':100},key=key)
                    raw=data.get('data',{}).get('scans')
                    sites=normalize_index(raw,100)
                    raw_count=len(raw) if isinstance(raw,list) else 0
                    try:events=self._events(key);event_state='ready'
                    except SourceError as exc:event_state=exc.state
                    for site in sites:site['private']=True
                if use_geo and self.geo is not None and self.geo.available():
                    with ThreadPoolExecutor(max_workers=4) as pool:
                        geos=list(pool.map(self.geo.resolve,[s['domain'] for s in sites]))
                    for site,location in zip(sites,geos):site['geo']=location
                else:
                    for site in sites:site['geo']=unknown_geo('Geography is disabled.' if not use_geo else 'Country database is unavailable.')
                allowed={row['domain'] for row in sites}
                history=[]
                if mode=='public':
                    self.store.record_public(sites)
                    history=self.store.public_history(allowed_domains=allowed)
                result=dict(base,state='ready' if sites else 'empty',sites=sites,events=events,eventState=event_state,history=history,excluded=excluded,sourceDomains=source_domains,sourceReturned=raw_count,windowLimited=mode=='fleet' and raw_count>=100,geographyEnabled=use_geo,geographyAvailable=self.geo is not None and self.geo.available(),connectionVersion=hashlib.sha256(identity.encode()).hexdigest()[:16])
                result['counts']={'displayed':len(sites),'mapped':sum(s['geo']['status']=='mapped' for s in sites),'unknown':sum(s['geo']['status']!='mapped' for s in sites)}
                self._last[cache_key]=(time.monotonic(),result)
                while len(self._last)>8:self._last.pop(next(iter(self._last)))
                return result
            except SourceError as exc:
                self._last.pop(cache_key,None)
                return dict(base,state=exc.state,message=str(exc))

    def markdown(self,domain,mode='public',scan_id=None):
        result=self.site(domain,mode,scan_id)
        site=result.get('site')
        if not site:return result
        if mode=='fleet':
            key=self._credential()
            if not key:return {'state':'not-connected'}
            try:
                markdown=self._get('/api/v1/reports/'+scan_id+'/markdown',key=key,text=True)
                if not isinstance(markdown,str) or len(markdown)>MAX_RESPONSE:raise SourceError()
                return {'state':'ready','markdown':markdown,'private':True}
            except SourceError as exc:return {'state':exc.state,'message':str(exc)}
        text='\n'.join(['# VibeLeak public observation: '+site['domain'],'','Source: '+ORIGIN+'/site/'+quote(site['domain'],safe=''),'Observed scan time: '+str(site['scannedAt'] or 'unknown'),'Public trust grade: '+str(site['grade'] or 'not assessed'),'Trust score: '+(str(site['score'])+'/100' if site['score'] is not None else 'not provided'),'','This is a saved public observation, not a new scan, proof of ownership, attack telemetry, or a security guarantee.','Private findings and remediation were not accessed.','To investigate a fix, authenticate as the scan owner, review the original evidence, prepare an approved change, and verify with a comparable rescan.'])
        return {'state':'ready','markdown':text,'private':False}
