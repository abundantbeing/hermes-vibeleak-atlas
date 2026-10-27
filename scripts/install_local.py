"""Install an allowlisted native plugin without restarting Hermes."""
from pathlib import Path
from datetime import datetime,timezone
import argparse,json,os,shutil,subprocess,sys,tempfile

parser=argparse.ArgumentParser();parser.add_argument('--home',type=Path,help='Explicit Hermes home. Defaults to the active profile home.');parser.add_argument('--source',type=Path,default=Path(__file__).resolve().parents[1]);parser.add_argument('--upgrade',action='store_true',help='Back up and replace a recognized Atlas install; preserve profile data.');args=parser.parse_args()
if args.home:os.environ['HERMES_HOME']=str(args.home.resolve())
try:
    from hermes_constants import get_hermes_home
    import yaml
except ImportError:
    sys.exit('Run this with Hermes\'s Python environment. It needs Hermes and PyYAML.')
def enable_plugin(name):
    cli=Path(sys.executable).with_name('hermes.exe' if os.name=='nt' else 'hermes')
    cli=str(cli) if cli.is_file() else shutil.which('hermes')
    if not cli:raise RuntimeError(f'Hermes CLI not found. After installing, run: hermes plugins enable {name} --no-allow-tool-override')
    proc=subprocess.run([cli,'plugins','enable',name,'--no-allow-tool-override'],capture_output=True,text=True,timeout=180)
    detail=((proc.stderr or '').strip() or (proc.stdout or '').strip())[-300:]
    return {'ok':proc.returncode==0,'restart_required':True,'error':None if proc.returncode==0 else (detail or f'hermes plugins enable exited {proc.returncode}')}
source=args.source.resolve();home=Path(get_hermes_home());target=home/'plugins'/'vibeleak-atlas';desktop=home/'desktop-plugins'/'vibeleak-atlas'
manifest=yaml.safe_load((source/'plugin.yaml').read_text(encoding='utf-8'))
if manifest.get('name')!='vibeleak-atlas':sys.exit('Refusing a package with an unexpected plugin identifier.')
existing=target.exists() or desktop.exists()
if existing and not args.upgrade:sys.exit('Atlas already exists. Use --upgrade for a deliberate backed-up replacement.')
if existing:
    if target.is_symlink() or desktop.is_symlink():sys.exit('Symlinked installations cannot be upgraded.')
    try:old=yaml.safe_load((target/'plugin.yaml').read_text(encoding='utf-8'))
    except (OSError,ValueError):sys.exit('Existing folder is not a recognized Atlas package; nothing changed.')
    if not isinstance(old,dict) or old.get('name')!='vibeleak-atlas' or not (desktop/'plugin.js').is_file():sys.exit('Both recognized Atlas halves are required for upgrade; nothing changed.')
if not (source/'desktop'/'plugin.js').is_file():sys.exit('Build the renderer first, or use the prepared release package.')
config=home/'config.yaml'
if config.is_file():
    backup=home/'backups'/('before-vibeleak-atlas-'+datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S-%f')+'.yaml');backup.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(config,backup)
target.parent.mkdir(parents=True,exist_ok=True);desktop.parent.mkdir(parents=True,exist_ok=True)
saved=home/'backups'/('vibeleak-atlas-upgrade-'+datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S-%f'))
staging=home/'cache'/'vibeleak-atlas-installs';staging.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(prefix='.atlas-install-',dir=staging) as tmp, tempfile.TemporaryDirectory(prefix='.atlas-ui-',dir=staging) as ui_tmp:
    stage=Path(tmp)/'vibeleak-atlas';stage.mkdir()
    for name in ('plugin.yaml','__init__.py','LICENSE','README.md','THIRD_PARTY_NOTICES.md','after-install.md'):
        if (source/name).is_symlink():sys.exit('Symlinked package entries are not supported.')
        shutil.copy2(source/name,stage/name)
    for name in ('atlas','assets','vendor','dashboard','desktop','licenses','docs','.github/assets/readme'):
        folder=source/name
        if not folder.is_dir():continue
        if folder.is_symlink() or any(p.is_symlink() for p in folder.rglob('*')):sys.exit('Symlinked package entries are not supported.')
        shutil.copytree(folder,stage/name,ignore=shutil.ignore_patterns('__pycache__','*.pyc','build-contract.md'))
    helper=source/'scripts'/'configure_owner.py'
    if helper.is_file():
        if helper.is_symlink() or helper.parent.is_symlink():sys.exit('Symlinked setup helpers are not supported.')
        (stage/'scripts').mkdir(exist_ok=True);shutil.copy2(helper,stage/'scripts'/'configure_owner.py')
    ui=Path(ui_tmp)/'vibeleak-atlas';ui.mkdir();shutil.copy2(source/'desktop'/'plugin.js',ui/'plugin.js')
    moved=[];installed=[];changed_files=[];created_dirs=[];in_place=False
    def atomic_copy(src,dst):
        missing=[];parent=dst.parent
        while not parent.exists():missing.append(parent);parent=parent.parent
        for folder in reversed(missing):folder.mkdir();created_dirs.append(folder)
        descriptor,name=tempfile.mkstemp(prefix='.atlas-patch-',dir=dst.parent);os.close(descriptor);temporary=Path(name)
        try:
            shutil.copy2(src,temporary);os.replace(temporary,dst)
        finally:
            if temporary.exists():temporary.unlink()
    try:
        if existing:
            saved.mkdir(parents=True)
            try:
                for old_path,name in ((target,'backend'),(desktop,'desktop')):
                    backup=saved/name;os.rename(old_path,backup);moved.append((old_path,backup))
            except PermissionError:
                for old_path,backup in reversed(moved):os.rename(backup,old_path)
                moved.clear();in_place=True
                for old_path,name in ((target,'backend'),(desktop,'desktop')):
                    if any(p.is_symlink() for p in old_path.rglob('*')):raise RuntimeError('Symlinked installed entries cannot be upgraded in place.')
                    shutil.copytree(old_path,saved/name,dirs_exist_ok=True)
                for prepared,destination,name in ((stage,target,'backend'),(ui,desktop,'desktop')):
                    files=[p for p in prepared.rglob('*') if p.is_file()]
                    files.sort(key=lambda p:(p.relative_to(prepared).as_posix()=='dashboard/manifest.json',p.relative_to(prepared).as_posix()))
                    for source_file in files:
                        relative=source_file.relative_to(prepared);dest=destination/relative
                        if dest.is_file() and dest.read_bytes()==source_file.read_bytes():continue
                        previous=saved/name/relative
                        atomic_copy(source_file,dest);changed_files.append((dest,previous if previous.is_file() else None))
        if not in_place:
            for prepared,destination in ((stage,target),(ui,desktop)):
                os.rename(prepared,destination);installed.append(destination)
        result=enable_plugin('vibeleak-atlas')
        if not result.get('ok'):raise RuntimeError('Hermes refused activation: '+str(result.get('error','unknown reason'))[:200])
    except Exception as exc:
        if in_place:
            for destination,previous in reversed(changed_files):
                if previous is None:
                    if destination.exists():destination.unlink()
                else:atomic_copy(previous,destination)
            for folder in reversed(created_dirs):
                try:folder.rmdir()
                except OSError:pass
        else:
            for destination in reversed(installed):shutil.rmtree(destination)
            for old_path,backup in reversed(moved):os.rename(backup,old_path)
        sys.exit(f'Installation failed ({type(exc).__name__}): {str(exc)[:300]}. Previous package files were restored. No gateway was restarted.')
result.update(installedPath=str(target),desktopPath=str(desktop),gatewayRestarted=False,upgraded=existing,backupPath=str(saved) if existing else None,backendReloadMayBeRequired=existing,upgradeMode='preserve-unchanged-files' if in_place else 'replace-directories')
print(json.dumps(result,indent=2))
if not result.get('ok'):sys.exit(1)
