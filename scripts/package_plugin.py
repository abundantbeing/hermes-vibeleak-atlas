"""Create a distributable standalone plugin, excluding development state."""
from pathlib import Path
import hashlib,json,shutil,zipfile
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts';OUT.mkdir(exist_ok=True)
licenses=ROOT/'licenses';licenses.mkdir(exist_ok=True)
shutil.copy2(ROOT/'node_modules'/'three'/'LICENSE',licenses/'three.txt')
allow_files=['plugin.yaml','__init__.py','LICENSE','README.md','THIRD_PARTY_NOTICES.md','after-install.md','scripts/install_local.py','scripts/configure_owner.py']
allow_dirs=['atlas','assets','vendor','dashboard','desktop','licenses','docs','.github/assets/readme']
files=[ROOT/name for name in allow_files]
for directory in allow_dirs:
    files.extend(p for p in (ROOT/directory).rglob('*') if p.is_file() and not any(x in p.parts for x in ('__pycache__','.git')) and p.suffix!='.pyc' and p.name!='build-contract.md')
assert all(p.is_file() for p in files),'A required package document or entry point is missing'
for p in files:
    rel=str(p.relative_to(ROOT)).replace('\\','/')
    assert not any(t in rel for t in ('.env','sqlite','native-qa','paths.json'))
package=OUT/'vibeleak-atlas-0.2.0.zip'
with zipfile.ZipFile(package,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in sorted(set(files)):z.write(p,'vibeleak-atlas/'+str(p.relative_to(ROOT)).replace('\\','/'))
with zipfile.ZipFile(package) as z:
    assert z.testzip() is None
    for p in files:assert z.read('vibeleak-atlas/'+str(p.relative_to(ROOT)).replace('\\','/'))==p.read_bytes()
manifest={'filename':package.name,'bytes':package.stat().st_size,'sha256':hashlib.sha256(package.read_bytes()).hexdigest(),'files':len(set(files)),'privateStateIncluded':False}
(OUT/'package-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8');print(json.dumps(manifest,indent=2))
