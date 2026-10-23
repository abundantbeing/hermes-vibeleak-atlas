# Third-party notices

VibeLeak Atlas code is MIT-licensed. Data and vendored libraries retain their own licenses.

## Three.js

- Version 0.170.0, bundled into `desktop/plugin.js`.
- MIT license. Original license is included at `licenses/three.txt`.
- https://github.com/mrdoob/three.js

## MaxMind DB reader

- maxminddb 3.2.0, pure Python files under `vendor/maxminddb`.
- Apache License 2.0. Original license at `vendor/maxminddb-LICENSE`; package metadata at `vendor/maxminddb-3.2.0.dist-info/METADATA`.
- Source archive SHA-256 is pinned by `scripts/prepare_assets.py`. No C extension is bundled and the Python source is unmodified.
- https://github.com/maxmind/MaxMind-DB-Reader-python

## DB-IP Country Lite

- Bundled country database, October 2026 edition. Actual metadata and checksum at `assets/country-metadata.json`.
- CC BY 4.0, https://creativecommons.org/licenses/by/4.0/.
- Attribution: IP Geolocation by DB-IP, https://db-ip.com.
- The interface displays this attribution. Refresh the database deliberately with `npm run assets`, review its version and license, then rebuild/package. The plugin never auto-downloads a database.
- This is approximate DNS hosting-country enrichment. It does not identify a verified origin, attack location, visitor, or owner.

## Natural Earth

- Public-domain 1:110m land and admin-0 geography, https://www.naturalearthdata.com/about/terms-of-use/.
- Converted into land points, ASCII land-mask rows, and country label positions. Displayed country borders and locations are generalized.
- Download sources and content hashes are recorded in `assets/asset-sources.json`.

VibeLeak results remain subject to VibeLeak's own publication, access, and service policies. The plugin reads existing saved observations. It does not republish private reports or grant scan ownership.
