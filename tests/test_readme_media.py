"""Prepared installations retain the README's real product media."""
from pathlib import Path
import unittest
import test_installer
ROOT=Path(__file__).resolve().parents[1]

class ReadmeMediaTests(unittest.TestCase):
    def test_installed_readme_keeps_its_media_and_credits(self):
        source=ROOT/'.github'/'assets'/'readme'
        self.assertTrue(source.is_dir(),'The README media directory is missing')
        fixture=test_installer.InstallerTests()
        fixture.setUp()
        try:
            self.assertEqual(fixture.invoke(),0)
            target=fixture.home/'plugins'/'vibeleak-atlas'/'.github'/'assets'/'readme'
            for original in source.iterdir():
                if original.is_file():
                    copied=target/original.name
                    self.assertTrue(copied.is_file(),f'Missing installed README media: {original.name}')
                    self.assertEqual(copied.read_bytes(),original.read_bytes())
        finally:
            fixture.doCleanups()

if __name__=='__main__':unittest.main()
