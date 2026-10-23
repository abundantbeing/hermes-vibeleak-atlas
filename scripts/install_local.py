"""Install an allowlisted native plugin without restarting Hermes."""
from pathlib import Path
from datetime import datetime,timezone
import argparse,json,os,shutil,sys,tempfile

parser=argparse.ArgumentParser();parser.add_argument('--home',type=Path,help='Explicit Hermes home. Defaults to the active profile home.');parser.add_argument('--source',type=Path,default=Path(__file__).resolve().parents[1]);args=parser.parse_args()
if args.home:os.environ['HERMES_HOME']=str(args.home.resolve())
try:
    from hermes_constants import get_hermes_home
    from hermes_cli.plugins_cmd import dashboard_set_agent_plugin_enabled
    import hermes_yaml as yaml
except ImportError:
    sys.exit('Run this with Hermes\'s Python environment. It needs the installed Hermes plugin enable API.')
source=args.source.resolve();home=Path(get_hermes_home());target=home/'plugins'/'vibeleak-atlas';desktop=home/'desktop-plugins'/'vibeleak-atlas'
manifest=yaml.safe_load((source/'plugin.yaml').read_text(encoding='utf-8'))
if manifest.get('name')!='vibeleak-atlas':sys.exit('Refusing a package with an unexpected plugin identifier.')
if target.exists() or desktop.exists():sys.exit('An Atlas installation already exists. This installer will not replace it or restart its backend.')
if not (source/'desktop'/'plugin.js').is_file():sys.exit('Build the renderer first, or use the prepared release package.')
config=home/'config.yaml'
if config.is_file():
    backup=home/'backups'/('before-vibeleak-atlas-'+datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')+'.yaml');backup.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(config,backup)
target.parent.mkdir(parents=True,exist_ok=True);desktop.parent.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(prefix='.atlas-install-',dir=target.parent) as tmp:
    stage=Path(tmp)/'vibeleak-atlas';stage.mkdir()
    for name in ('plugin.yaml','__init__.py','LICENSE','README.md','THIRD_PARTY_NOTICES.md','after-install.md'):
        if (source/name).is_symlink():sys.exit('Symlinked package entries are not supported.')
        shutil.copy2(source/name,stage/name)
    for name in ('atlas','assets','vendor','dashboard','desktop','licenses','docs'):
        folder=source/name
        if not folder.is_dir():continue
        if folder.is_symlink() or any(p.is_symlink() for p in folder.rglob('*')):sys.exit('Symlinked package entries are not supported.')
        shutil.copytree(folder,stage/name,ignore=shutil.ignore_patterns('__pycache__','*.pyc','build-contract.md'))
    os.rename(stage,target)
with tempfile.TemporaryDirectory(prefix='.atlas-ui-',dir=desktop.parent) as tmp:
    ui=Path(tmp)/'vibeleak-atlas';ui.mkdir();shutil.copy2(source/'desktop'/'plugin.js',ui/'plugin.js');os.rename(ui,desktop)
result=dashboard_set_agent_plugin_enabled('vibeleak-atlas',enabled=True)
result.update(installedPath=str(target),desktopPath=str(desktop),gatewayRestarted=False)
print(json.dumps(result,indent=2))
if not result.get('ok'):sys.exit(1)
