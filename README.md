# VibeLeak Atlas

A native Hermes Desktop plugin for saved website-security observations.

Explore a dithered hosting-country globe, switch to an ASCII map or a list, inspect saved trust grades, keep a local watchlist, and preview a Markdown handoff for your agent.

Atlas reads VibeLeak's existing data. Opening a site never starts a scan. The map shows approximate hosting geography, not attacks, visitors, or a verified origin.

## What works

- Public index of recently published VibeLeak results.
- Local watchlist of up to 32 public website hostnames.
- Selectable globe, drag/zoom, pause, ordered-dither bypass, and country clusters.
- Geographic ASCII projection and accessible website table when WebGL is unavailable.
- Domain, grade, country, and unlocated filters. Trust and available AI-readiness observations stay separate.
- Site inspector with scan time, source, precision, and explicit unknown/multi-region geography.
- Up to 64 changed local public reads, with a replay selector and recorded grade changes.
- Private saved-scan history and Score Watch events with an owner read key.
- User-requested owner report export or public-observation handoff. Preview and copy it, or append it to a compatible chat draft without submitting.
- Native theme tokens, reduced-motion still frame, visibility-aware polling, and disposed GPU resources when you leave the page.

This is a desktop viewer, not a new worldwide publication backend. The public index is a recent sample. Private history shows the latest 100 saved scans before domain deduplication. A grade change does not prove a finding was fixed.

## Install

Requires Hermes Agent/Desktop 0.22.4 or later with the native plugin SDK and Python plugin backend support.

From the extracted release package or the source checkout, use Hermes's Python environment:

```sh
python scripts/install_local.py
```

The unified package contains `plugin.yaml`, `desktop/plugin.js`, and the Python API under `dashboard/`. The installer copies only allowlisted package files into the active home's `plugins/vibeleak-atlas` and `desktop-plugins/vibeleak-atlas` directories, then enables the backend through Hermes's plugin API. It does not copy a development checkout's `.qa`, `node_modules`, environment files, or Git metadata.

It backs up the current profile config first and never restarts the gateway. It refuses to replace an existing installation without a deliberate upgrade workflow. If activation reports that a restart is required, arrange it yourself after saving work. Hermes's `plugins install` command is for Git identifiers; an arbitrary extracted-directory path is not a Git identifier.

Open **VibeLeak Atlas** in the sidebar or **Open VibeLeak Atlas** in the command palette. If the desktop file watcher has not discovered it, use the palette's **Reload desktop plugins** command.

## First connection

1. Enable the read-only source in the plugin. Until then it makes no upstream VibeLeak or DNS requests.
2. Optionally enable hosting geography in **Config**. Cloudflare DNS-over-HTTPS receives the queried domain names. The bundled DB-IP Country Lite database performs the country lookup offline.
3. Select a saved observation or add a public hostname to your local watchlist.

Reserved hostnames, IP literals, credentials in URLs, and custom ports are refused. Atlas never connects to the target website. It connects only to fixed VibeLeak read endpoints and the fixed Cloudflare DNS resolver.

### Private fleet

Create a VibeLeak API key for your own account and store it as the profile-scoped Hermes secret `VIBELEAK_ATLAS_API_KEY`. Do not put a key in the renderer, a screenshot, chat, Git, or a website hostname.

Use the minimum scopes required for the action:

| Action | VibeLeak scopes |
|---|---|
| Saved scan list | `history:read` |
| Score Watch events | `monitor:read` |
| Selected owner scan | `scans:read` |
| Requested owner Markdown report | `reports:read`, `findings:read` |

Missing credentials, refused credentials, missing scopes, rate limits, and source failures have explicit states. A configured key is not a claim that VibeLeak has accepted it.

Private observations stay in memory and never enter the local public-history database. They leave the plugin only when you explicitly copy a report or append a chat draft.

## Terminal commands

```text
watch example.com
unwatch example.com
select example.com
view globe
view ascii
view list
refresh
reset
help
```

These are local Atlas commands. The command strip cannot execute a shell or JavaScript. `watch` saves a hostname; it does not create a monitoring subscription or run a scan.

## Development

```sh
npm ci
npm test
python -m unittest discover -s tests -q
npm run build
npm run package
```

The package includes prepared geographic assets and the pure Python MMDB reader. To deliberately refresh licensed inputs, run `npm run assets`, review `assets/country-metadata.json`, `assets/asset-sources.json`, and third-party licenses, then rebuild.

The renderer builds into one ESM file. Its only external imports are the Hermes SDK and the host's React runtime. It does not ship a second React copy, load an iframe dashboard, or require a renderer CDN.

See [architecture](docs/architecture.md), [privacy](docs/privacy.md), [verification](docs/verification.md), and [visual direction](docs/visual-direction.md).

## Licenses

Project code is MIT-licensed. Three.js is MIT, the vendored MaxMind reader is Apache-2.0, DB-IP Country Lite is CC BY 4.0, and Natural Earth is public domain. See [third-party notices](THIRD_PARTY_NOTICES.md).
