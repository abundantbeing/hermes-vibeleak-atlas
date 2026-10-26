"""Versioned workbench entry. No cached legacy backend package is reused."""
import atexit
import importlib.util
from pathlib import Path
import sys
import threading
from hermes_constants import get_hermes_home
from agent.secret_scope import get_secret
from hermes_cli.plugin_host_http_auth import admitted_for_sensitive_route

ROOT = Path(__file__).resolve().parents[1]
NAME = '_vibeleak_workbench_backend_v1'
if NAME not in sys.modules:
    spec = importlib.util.spec_from_file_location(NAME, ROOT/'atlas'/'__init__.py', submodule_search_locations=[str(ROOT/'atlas')])
    module = importlib.util.module_from_spec(spec)
    sys.modules[NAME] = module
    spec.loader.exec_module(module)
api = __import__(NAME+'.workbench_api', fromlist=['make_router'])
service_module = __import__(NAME+'.workbench', fromlist=['WorkbenchService'])
geo_module = __import__(NAME+'.geo', fromlist=['GeoEngine'])
_geo = geo_module.GeoEngine(ROOT/'assets')
_lock = threading.RLock()
_services = {}

def service():
    home = Path(get_hermes_home()).resolve()
    with _lock:
        if home not in _services:
            _services[home] = service_module.WorkbenchService(home, key_provider=lambda: get_secret('VIBELEAK_ATLAS_API_KEY'), geo=_geo)
        return _services[home]

def cleanup():
    for item in list(_services.values()):
        item.close()
    _geo.close()
atexit.register(cleanup)
router = api.make_router(service, admitted_for_sensitive_route)
