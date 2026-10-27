"""Installer filesystem tests use an explicit fake Hermes CLI, never the user's config."""
from contextlib import redirect_stdout
import io,json,os,runpy,sys,tempfile,types,unittest
from pathlib import Path
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1]
class InstallerTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(dir=os.environ.get('TMPDIR'));self.addCleanup(self.tmp.cleanup);self.home=Path(self.tmp.name);(self.home/'config.yaml').write_text('fixture: preserve\n',encoding='utf-8');self.calls=[];self.discovered=[]
    def invoke(self,*args,enable_ok=True):
        constants=types.ModuleType('hermes_constants');constants.get_hermes_home=lambda:self.home
        def fake_cli(command,**kwargs):
            self.discovered.append([str(p.relative_to(self.home/'plugins')) for p in (self.home/'plugins').rglob('plugin.yaml')]);self.calls.append(list(command))
            return types.SimpleNamespace(returncode=0 if enable_ok else 1,stdout='',stderr='' if enable_ok else 'fixture refused activation')
        with patch.dict(sys.modules,{'hermes_constants':constants}),patch.dict(os.environ,{'HERMES_HOME':str(self.home)}),patch('shutil.which',return_value='hermes'),patch('subprocess.run',side_effect=fake_cli),patch.object(sys,'argv',['install_local.py',*args]),redirect_stdout(io.StringIO()):
            try:runpy.run_path(str(ROOT/'scripts'/'install_local.py'),run_name='__main__');return 0
            except SystemExit as e:return e.code or 0
    def test_install_copies_only_runtime_files_and_uses_enable_api(self):
        self.assertEqual(self.invoke(),0)
        target=self.home/'plugins'/'vibeleak-atlas';desktop=self.home/'desktop-plugins'/'vibeleak-atlas'/'plugin.js'
        self.assertTrue((target/'dashboard'/'plugin_api.py').is_file());self.assertEqual(desktop.read_bytes(),(ROOT/'desktop'/'plugin.js').read_bytes());self.assertFalse((target/'.qa').exists());self.assertFalse((target/'node_modules').exists());self.assertEqual(self.calls[0][1:],['plugins','enable','vibeleak-atlas','--no-allow-tool-override']);self.assertTrue(list((self.home/'backups').glob('before-vibeleak-atlas-*.yaml')))
    def test_existing_install_is_preserved(self):
        target=self.home/'plugins'/'vibeleak-atlas';target.mkdir(parents=True);(target/'owned.txt').write_text('leave this file')
        self.assertNotEqual(self.invoke(),0);self.assertEqual((target/'owned.txt').read_text(),'leave this file');self.assertEqual(self.calls,[])
    def test_explicit_upgrade_preserves_profile_state_and_backs_up_both_halves(self):
        self.assertEqual(self.invoke(),0)
        target=self.home/'plugins'/'vibeleak-atlas';desktop=self.home/'desktop-plugins'/'vibeleak-atlas'/'plugin.js'
        desktop.write_text('// previous renderer',encoding='utf-8')
        state=self.home/'plugin-data'/'vibeleak-atlas';state.mkdir(parents=True);(state/'preserve.txt').write_text('local history and settings')
        self.assertEqual(self.invoke('--upgrade'),0)
        self.assertEqual(desktop.read_bytes(),(ROOT/'desktop'/'plugin.js').read_bytes())
        self.assertEqual((state/'preserve.txt').read_text(),'local history and settings')
        self.assertEqual((self.home/'config.yaml').read_text(),'fixture: preserve\n')
        backups=list((self.home/'backups').glob('vibeleak-atlas-upgrade-*/desktop/plugin.js'))
        self.assertEqual(len(backups),1);self.assertEqual(backups[0].read_text(),'// previous renderer')
    def test_failed_upgrade_activation_restores_previous_package(self):
        self.assertEqual(self.invoke(),0)
        desktop=self.home/'desktop-plugins'/'vibeleak-atlas'/'plugin.js';desktop.write_text('// preserved renderer',encoding='utf-8')
        self.assertNotEqual(self.invoke('--upgrade',enable_ok=False),0)
        self.assertEqual(desktop.read_text(),'// preserved renderer')
    def test_upgrade_refuses_an_unrecognized_folder(self):
        target=self.home/'plugins'/'vibeleak-atlas';target.mkdir(parents=True);(target/'owned.txt').write_text('leave this file')
        self.assertNotEqual(self.invoke('--upgrade'),0)
        self.assertEqual((target/'owned.txt').read_text(),'leave this file')
    def test_secure_setup_helper_is_available_in_the_installed_package(self):
        self.assertEqual(self.invoke(),0)
        helper=self.home/'plugins'/'vibeleak-atlas'/'scripts'/'configure_owner.py'
        self.assertTrue(helper.is_file())
        self.assertEqual(helper.read_bytes(),(ROOT/'scripts'/'configure_owner.py').read_bytes())

    def test_failed_upgrade_reports_the_failure_class(self):
        self.assertEqual(self.invoke(),0)
        result=self.invoke('--upgrade',enable_ok=False)
        self.assertIn('RuntimeError',str(result))

    def test_live_directory_lock_uses_backed_up_incremental_upgrade(self):
        self.assertEqual(self.invoke(),0)
        target=self.home/'plugins'/'vibeleak-atlas'
        desktop=self.home/'desktop-plugins'/'vibeleak-atlas'/'plugin.js'
        desktop.write_text('// old live renderer',encoding='utf-8')
        original=os.rename
        def locked(source,destination):
            if Path(source)==target:raise PermissionError('fixture live directory lock')
            return original(source,destination)
        with patch('os.rename',side_effect=locked):
            self.assertEqual(self.invoke('--upgrade'),0)
        self.assertEqual(desktop.read_bytes(),(ROOT/'desktop'/'plugin.js').read_bytes())
        backups=list((self.home/'backups').glob('vibeleak-atlas-upgrade-*/desktop/plugin.js'))
        self.assertEqual(backups[0].read_text(),'// old live renderer')

    def test_failed_locked_upgrade_restores_changed_files(self):
        self.assertEqual(self.invoke(),0)
        target=self.home/'plugins'/'vibeleak-atlas'
        desktop=self.home/'desktop-plugins'/'vibeleak-atlas'/'plugin.js'
        desktop.write_text('// preserved live renderer',encoding='utf-8')
        original=os.rename
        def locked(source,destination):
            if Path(source)==target:raise PermissionError('fixture live directory lock')
            return original(source,destination)
        with patch('os.rename',side_effect=locked):
            result=self.invoke('--upgrade',enable_ok=False)
        self.assertIn('RuntimeError',str(result))
        self.assertEqual(desktop.read_text(),'// preserved live renderer')
        self.assertEqual(len(self.calls),2)

    def test_locked_upgrade_staging_does_not_enter_plugin_discovery(self):
        self.assertEqual(self.invoke(),0)
        target=self.home/'plugins'/'vibeleak-atlas';original=os.rename
        def locked(source,destination):
            if Path(source)==target:raise PermissionError('fixture live directory lock')
            return original(source,destination)
        with patch('os.rename',side_effect=locked):self.assertEqual(self.invoke('--upgrade'),0)
        self.assertEqual(len(self.discovered[-1]),1)

if __name__=='__main__':unittest.main()
