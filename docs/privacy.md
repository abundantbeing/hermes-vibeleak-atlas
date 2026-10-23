# Privacy and data handling

## Defaults

The read-only source and geography are off until enabled. Opening the plugin does not query VibeLeak, DNS, or a target website before source consent. Local status reads still check the authenticated Hermes backend.

## External recipients

- VibeLeak receives approved saved-data reads. Public index reads need no owner credential. Public watchlist/detail reads include the requested hostname.
- Cloudflare DNS-over-HTTPS receives hostnames for A/AAAA resolution only after geography opt-in.
- DB-IP enrichment uses the bundled offline country database. No runtime DB-IP request is made.
- The plugin makes no HTTP request to the target website and never starts a scan.
- External site/documentation links open only on an explicit click through the native OS URL handler.

## Private data

The owner API key stays in the backend's profile-scoped secret provider. It is not accepted or persisted by the renderer. Key changes replace the request binding. An authenticated Hermes transport is required for all plugin endpoints, including local watchlist changes.

Private saved scans, findings and events remain in backend/renderer memory, not the public SQLite history. The user can explicitly export a requested Markdown handoff to the clipboard or append it to a same-owner chat draft. The plugin does not submit the chat, infer ownership from a public domain, or send evidence to an inference provider by itself.

Report text may include sensitive information. Review the preview before copying or appending it. A later agent request follows that chat's selected model/provider and privacy policy.

## Local files

The active Hermes profile stores `plugin-data/vibeleak-atlas/atlas.sqlite3`. It holds consent settings, watchlist hostnames and at most 64 changed public-read snapshots. Files rely on the host's filesystem/account protection and are not a separate encrypted vault.

Clearing public history deletes local history rows. A later public read begins a new history. Removing a watchlist entry does not delete upstream scans or subscriptions. Private data is not written there.

## Limits

Public data may later be hidden by its owner. Current hidden public details are refused. Historical reads returned to the renderer are filtered to currently visible domains in the active source window. Previously stored local public reads are not a revocation-safe remote database, and screenshots or user exports cannot be recalled.

Hosting countries can be inaccurate, stale or ambiguous. The bundled database has a visible version and must be deliberately refreshed. Local read time and original scan time are different fields. A saved result is not a current security guarantee.
