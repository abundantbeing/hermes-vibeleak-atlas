"""The owner key is entered interactively, never on argv or in renderer storage."""
import contextlib
import io
import os
from pathlib import Path
import runpy
import sys
import tempfile
import types
import unittest
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1]
class OwnerSetupTests(unittest.TestCase):
    def invoke(self,key):
        writes=[];config=types.ModuleType('hermes_cli.config')
        def save(name,value):writes.append((name,value));return {'success':True}
        config.save_env_value_secure=save
        output=io.StringIO()
        with patch.dict(sys.modules,{'hermes_cli.config':config}),patch('getpass.getpass',return_value=key),patch.object(sys,'argv',['configure_owner.py']),contextlib.redirect_stdout(output):
            try:runpy.run_path(str(ROOT/'scripts'/'configure_owner.py'),run_name='__main__');code=0
            except SystemExit as exc:code=exc.code or 0
        return code,writes,output.getvalue()
    def test_valid_owner_key_is_saved_only_through_native_secret_configuration(self):
        key='vlk_test_'+('0'*12)+'_'+('x'*32)
        code,writes,text=self.invoke(key)
        self.assertEqual(code,0);self.assertEqual(writes,[('VIBELEAK_ATLAS_API_KEY',key)]);self.assertNotIn(key,text)
    def test_invalid_input_is_not_persisted(self):
        code,writes,text=self.invoke('not-a-vibeleak-api-key')
        self.assertNotEqual(code,0);self.assertEqual(writes,[])
if __name__=='__main__':unittest.main()
