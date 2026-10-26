"""Masked, profile-scoped owner-key setup. Never accepts a secret on argv."""
import argparse
import getpass
import os
from pathlib import Path
import re
import sys
import warnings

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--home',type=Path,help='Explicit Hermes profile home; defaults to the active home.')
args=parser.parse_args()
if args.home:os.environ['HERMES_HOME']=str(args.home.resolve())
try:
    from hermes_cli.config import save_env_value_secure
except ImportError:
    sys.exit("Use Hermes's Python environment, as for install_local.py.")
with warnings.catch_warnings():
    warnings.simplefilter('error',getpass.GetPassWarning)
    try:key=getpass.getpass('VibeLeak owner API key (hidden): ').strip()
    except (getpass.GetPassWarning,EOFError):sys.exit('Use an interactive terminal with hidden input. Nothing was saved.')
if not re.fullmatch(r'vlk_(?:live|test)_[a-f0-9]{12}_[A-Za-z0-9_-]{32,512}',key):
    sys.exit('Not a VibeLeak API key. Nothing was saved.')
result=save_env_value_secure('VIBELEAK_ATLAS_API_KEY',key)
key=None
if not result.get('success'):sys.exit('Hermes did not confirm saving the key.')
print('Owner key saved through Hermes credential configuration. No scan or account request was made.')
print('Open the Atlas workbench and refresh its connection. VibeLeak checks scan:write, scan:read and findings:read. No scan starts until you approve it in Atlas.')
