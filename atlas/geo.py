"""Opt-in DNS country attribution. No requests are made to target websites."""
from __future__ import annotations

import json
from pathlib import Path
import sys
import threading
import time
import httpx

from .core import geo_from_answers,normalize_domain,unknown_geo


class GeoEngine:
    def __init__(self,assets,*,transport=None):
        self.assets=Path(assets)
        self._cache={};self._lock=threading.RLock();self._reader=None
        self.client=httpx.Client(transport=transport,timeout=httpx.Timeout(6,connect=3),follow_redirects=False,headers={'User-Agent':'VibeLeak-Atlas/0.2 (+https://www.vibeleak.app)','Accept':'application/dns-json'},limits=httpx.Limits(max_connections=4,max_keepalive_connections=4))
        try:
            vendor=str(self.assets.parent/'vendor')
            if vendor not in sys.path:sys.path.append(vendor)
            from maxminddb.reader import Reader
            self._reader=Reader(str(self.assets/'country.mmdb'))
            self.countries=json.loads((self.assets/'countries.json').read_text(encoding='utf-8'))
            self.version=json.loads((self.assets/'country-metadata.json').read_text(encoding='utf-8'))['version']
        except (ImportError,OSError,ValueError,KeyError):
            if self._reader:self._reader.close()
            self._reader=None;self.countries={};self.version=None

    def available(self):return self._reader is not None

    def close(self):
        self.client.close()
        if self._reader:self._reader.close();self._reader=None

    def _country(self,ip):
        record=self._reader.get(ip)
        return record.get('country',{}).get('iso_code') if isinstance(record,dict) else None

    def resolve(self,value):
        domain=normalize_domain(value)
        with self._lock:
            cached=self._cache.get(domain)
            if cached and cached[0]>time.monotonic():return cached[1]
        if not self.available():return unknown_geo('Country database is unavailable.')
        answers=[];failed=False
        for record_type in ('A','AAAA'):
            try:
                with self.client.stream('GET','https://cloudflare-dns.com/dns-query',params={'name':domain,'type':record_type}) as response:
                    response.raise_for_status();body=bytearray()
                    for chunk in response.iter_bytes():
                        body.extend(chunk)
                        if len(body)>65536:raise ValueError('DNS response exceeds bound')
                    data=json.loads(body)
                    if not isinstance(data,dict) or data.get('Status')!=0:continue
                    for item in data.get('Answer',[])[:32]:
                        if isinstance(item,dict) and item.get('type') in (1,28) and isinstance(item.get('data'),str):answers.append(item['data'])
            except (httpx.HTTPError,ValueError,TypeError):failed=True
        result=geo_from_answers(answers,self._country,self.countries,self.version)
        if failed and result['status']=='unknown':result['reason']='DNS provider unavailable. No country is inferred.'
        with self._lock:
            self._cache[domain]=(time.monotonic()+(86400 if result['status']=='mapped' else 900),result)
            while len(self._cache)>256:self._cache.pop(next(iter(self._cache)))
        return result
