"""Shipped code may import only documented Hermes surfaces plus one tracked private gate."""
import ast
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
SHIPPED = [ROOT / 'atlas', ROOT / 'dashboard', ROOT / 'scripts', ROOT / '__init__.py']
HERMES_ROOTS = ('hermes_cli', 'hermes_constants', 'agent', 'gateway', 'tools')
# Documented: secret access and constants, per the plugin developer guide.
DOCUMENTED = {'agent.secret_scope', 'hermes_constants'}
# Undocumented: route admission has no public helper yet. Tracked upstream as a seam request.
TRACKED_PRIVATE = {'hermes_cli.plugin_host_http_auth'}


def absolute_imports(path):
    tree = ast.parse(path.read_text(encoding='utf-8'), filename=str(path))
    names = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom) and node.level == 0 and node.module:
            names.add(node.module)
        elif isinstance(node, ast.Import):
            names.update(alias.name for alias in node.names)
    return names


class ImportSurfaceTest(unittest.TestCase):
    def test_hermes_imports_are_documented_or_the_tracked_gate(self):
        seen = set()
        for base in SHIPPED:
            files = [base] if base.is_file() else sorted(base.rglob('*.py'))
            for path in files:
                if '__pycache__' in path.parts:
                    continue
                seen |= {name for name in absolute_imports(path) if name.split('.')[0] in HERMES_ROOTS}
        self.assertEqual(seen - DOCUMENTED, TRACKED_PRIVATE,
                         'Shipped code must import only documented Hermes surfaces plus the tracked gate')

    def test_manifest_declares_the_owner_key_as_a_secret_field(self):
        text = (ROOT / 'plugin.yaml').read_text(encoding='utf-8')
        self.assertIn('config_schema:', text)
        self.assertIn('type: secret', text)
        self.assertIn('env: VIBELEAK_ATLAS_API_KEY', text)


if __name__ == '__main__':
    unittest.main()
