"""Installer filesystem tests use an explicit fake Hermes enable API, never the user's config."""
from contextlib import redirect_stdout
import io,json,os,runpy,sys,tempfile,types,unittest
from pathlib import Path
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1]
class InstallerTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'));self.addCleanup(self.tmp.cleanup);self.home=Path(self.tmp.name);(self.home/'config.yaml').write_text('fixture: preserve\n',encoding='utf-8');self.calls=[]
    def invoke(self):
        constants=types.ModuleType('hermes_constants');constants.get_hermes_home=lambda:self.home
        commands=types.ModuleType('hermes_cli.plugins_cmd')
        commands.dashboard_install_plugin=lambda *a,**kw:{'ok':False,'error':'The unit fixture rejects the wrong Git installer.'}
        def enable(name,*,enabled):self.calls.append((name,enabled));return {'ok':True,'restart_required':False,'activation':'unit-fixture-only'}
        commands.dashboard_set_agent_plugin_enabled=enable
        with patch.dict(sys.modules,{'hermes_constants':constants,'hermes_cli.plugins_cmd':commands}),patch.dict(os.environ,{'HERMES_HOME':str(self.home)}),patch.object(sys,'argv',['install_local.py']),redirect_stdout(io.StringIO()):
            try:runpy.run_path(str(ROOT/'scripts'/'install_local.py'),run_name='__main__');return 0
            except SystemExit as e:return e.code or 0
    def test_install_copies_only_runtime_files_and_uses_enable_api(self):
        self.assertEqual(self.invoke(),0)
        target=self.home/'plugins'/'vibeleak-atlas';desktop=self.home/'desktop-plugins'/'vibeleak-atlas'/'plugin.js'
        self.assertTrue((target/'dashboard'/'plugin_api.py').is_file());self.assertEqual(desktop.read_bytes(),(ROOT/'desktop'/'plugin.js').read_bytes());self.assertFalse((target/'.qa').exists());self.assertFalse((target/'node_modules').exists());self.assertEqual(self.calls,[('vibeleak-atlas',True)]);self.assertTrue(list((self.home/'backups').glob('before-vibeleak-atlas-*.yaml')))
    def test_existing_install_is_preserved(self):
        target=self.home/'plugins'/'vibeleak-atlas';target.mkdir(parents=True);(target/'owned.txt').write_text('leave this file')
        self.assertNotEqual(self.invoke(),0);self.assertEqual((target/'owned.txt').read_text(),'leave this file');self.assertEqual(self.calls,[])
if __name__=='__main__':unittest.main()
