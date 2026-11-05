import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]


class DbIpCreditTest(unittest.TestCase):
    def test_bundled_renderer_shows_the_db_ip_credit_with_link(self):
        bundle = (ROOT / 'desktop' / 'plugin.js').read_text(encoding='utf-8')
        self.assertIn('IP Geolocation by DB-IP', bundle)
        self.assertIn('https://db-ip.com', bundle)


if __name__ == '__main__':
    unittest.main()
