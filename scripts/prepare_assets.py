"""Fetch licensed public geographic inputs and a pure Python MMDB reader."""
from pathlib import Path
import gzip,hashlib,io,json,math,re,tarfile
import httpx

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'assets';CACHE=ROOT/'vendor-source-cache';VENDOR=ROOT/'vendor'
for p in (ASSETS,CACHE,VENDOR):p.mkdir(parents=True,exist_ok=True)
client=httpx.Client(timeout=60,headers={'User-Agent':'VibeLeak-Atlas/0.1 (+https://www.vibeleak.app)'},follow_redirects=False)
manifest=[]
def download(url,path,cap=20_000_000):
    if not path.exists():
        with client.stream('GET',url) as response:
            response.raise_for_status();body=bytearray()
            for chunk in response.iter_bytes():
                body.extend(chunk)
                if len(body)>cap:raise ValueError('Asset exceeds size bound')
        path.write_bytes(body)
    body=path.read_bytes();manifest.append({'url':url,'path':str(path.relative_to(ROOT)).replace('\\','/'),'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()});return body

reader_url='https://files.pythonhosted.org/packages/b9/34/0923a42cce579398890058775ea145214acf80dd3340c26cfb0f16989300/maxminddb-3.2.0.tar.gz'
archive=download(reader_url,CACHE/'maxminddb-3.2.0.tar.gz')
assert hashlib.sha256(archive).hexdigest()=='d28e0073fd1dd637c8b95947bc864b5625eca9f8f2db1538145e33b2a1cd4b92'
with tarfile.open(fileobj=io.BytesIO(archive),mode='r:gz') as package:
    for item in package.getmembers():
        prefix='maxminddb-3.2.0/maxminddb/'
        if item.isfile() and item.name.startswith(prefix) and item.name.endswith('.py'):
            rel=Path(item.name[len(prefix):])
            if len(rel.parts)!=1 or '..' in rel.parts:raise ValueError('Unexpected package path')
            out=VENDOR/'maxminddb'/rel;out.parent.mkdir(parents=True,exist_ok=True);out.write_bytes(package.extractfile(item).read())
        elif item.name in ('maxminddb-3.2.0/LICENSE','maxminddb-3.2.0/NOTICE'):
            (VENDOR/('maxminddb-'+Path(item.name).name)).write_bytes(package.extractfile(item).read())
        elif item.name=='maxminddb-3.2.0/PKG-INFO':
            metadata=VENDOR/'maxminddb-3.2.0.dist-info';metadata.mkdir(exist_ok=True)
            (metadata/'METADATA').write_bytes(package.extractfile(item).read())
if len(list((VENDOR/'maxminddb').glob('*.py')))<5:raise RuntimeError('Vendored reader was not extracted.')

page=client.get('https://db-ip.com/db/download/ip-to-country-lite');page.raise_for_status()
links=re.findall(r'https://download\.db-ip\.com/free/dbip-country-lite-(\d{4}-\d{2})\.mmdb\.gz',page.text)
if not links:raise RuntimeError('No current DB-IP country database is advertised. Do not guess a source.')
version=max(links);url=f'https://download.db-ip.com/free/dbip-country-lite-{version}.mmdb.gz'
compressed=download(url,CACHE/f'dbip-country-lite-{version}.mmdb.gz')
with gzip.GzipFile(fileobj=io.BytesIO(compressed)) as stream:
    binary=stream.read(20_000_001)
    if len(binary)>20_000_000:raise ValueError('Country database exceeds bound')
(ASSETS/'country.mmdb').write_bytes(binary)
(ASSETS/'country-metadata.json').write_text(json.dumps({'source':'DB-IP Country Lite','version':version,'license':'CC BY 4.0','attributionUrl':'https://db-ip.com','licenseUrl':'https://creativecommons.org/licenses/by/4.0/','sha256':hashlib.sha256(binary).hexdigest()},indent=2),encoding='utf-8')

land=json.loads(download('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson',CACHE/'land.geojson'))
admin=json.loads(download('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',CACHE/'countries.geojson'))
countries={}
for feature in admin['features']:
    p=feature['properties'];code=p.get('ISO_A2_EH',p.get('ISO_A2'))
    if not isinstance(code,str) or not re.fullmatch('[A-Z]{2}',code):continue
    countries[code]={'name':p.get('NAME_EN') or p.get('NAME'),'lat':p.get('LABEL_Y'),'lon':p.get('LABEL_X')}
(ASSETS/'countries.json').write_text(json.dumps(countries,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
polygons=[]
for f in land['features']:
    g=f['geometry'];groups=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
    for rings in groups:
        r=rings[0];polygons.append((r,(min(x[0] for x in r),min(x[1] for x in r),max(x[0] for x in r),max(x[1] for x in r)),rings[1:]))
def inside(x,y,ring):
    hit=False
    for i in range(len(ring)):
        a,b=ring[i-1],ring[i]
        if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:hit=not hit
    return hit
def is_land(x,y):
    for ring,b,holes in polygons:
        if b[0]<=x<=b[2] and b[1]<=y<=b[3] and inside(x,y,ring) and not any(inside(x,y,h) for h in holes):return True
    return False
points=[]
for i in range(91):
    lat=-82+i*1.9
    for j in range(190):
        lon=-180+j*1.9+(i%2)*.95
        if lon<=180 and is_land(lon,lat):points.append([round(lat,2),round(lon,2)])
grid=[]
for row in range(29):
    lat=82-row*5.7
    grid.append(''.join(':' if is_land(-178+col*4.5,lat) else ' ' for col in range(80)))
(ROOT/'desktop-src'/'generated').mkdir(parents=True,exist_ok=True)
(ROOT/'desktop-src'/'generated'/'world.json').write_text(json.dumps({'points':points,'ascii':grid,'countries':countries},ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(ASSETS/'asset-sources.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'countryVersion':version,'countryBytes':len(binary),'countryCount':len(countries),'landDots':len(points),'readerFiles':len(list((VENDOR/'maxminddb').glob('*.py')))},indent=2))
