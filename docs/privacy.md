# Privacy and data handling

## Local initiation is required

Atlas displays only results tied to a request explicitly approved and initiated by this installation. An API key, matching hostname, watchlist entry, public result or account-wide history is not local initiation. The active API has no arbitrary saved-scan import route. Legacy snapshot, site and handoff reads fail closed without fetching their old sources.

The native renderer requires the workbench protocol and local-scan-only backend policy before enabling the workflow. No scan-age display or unrelated website grades, scores, findings or reports are shown.

## External requests

The plugin connects only to the fixed VibeLeak origin. An approved assessment sends the exact HTTPS target shown in its confirmation, the one-unit budget and a persistent idempotency key. VibeLeak can then actively assess that target under its server policy. Later private reads use only scan identifiers already bound to a local receipt and current credential.

Preparing a dialog and listing local records make no upstream request. There are no public-index, account-history, monitoring-event or automatic target requests. The map renders without networking. A separately confirmed hosting lookup reads up to 12 latest successful local assessments and sends their hostnames to Cloudflare DNS; country attribution uses the bundled offline DB-IP database. It is optional, never an implied effect of opening a globe. Documentation or key-management links open only after a click.

## Credentials and private reports

The owner key stays in Hermes's backend secret provider. The renderer receives a per-installation HMAC binding, never the key. Every network operation pins its credential and read-consent epoch. Disconnects and changed credentials reject late responses. The native query cache is also scoped by connection, profile, activation, credential and consent.

Private findings stay in backend/renderer memory. Evidence is bounded, rendered as plain text and introduced as untrusted website data in a draft. Some recognizable secret patterns and the current credential are redacted, but review all evidence before exporting it. Redaction is not a guarantee that arbitrary report text contains no sensitive data.

Copying a handoff exports private evidence to the OS clipboard. Appending one exports it to a compatible same-profile, same-connection chat draft. Neither action submits an agent turn. Only a subsequent user submission follows the chat's selected model, provider and privacy policy.

## Local storage

The active backend profile stores `plugin-data/vibeleak-atlas/workbench.sqlite3`. It holds a random installation secret, a read-consent epoch, approved-request metadata, credential HMAC bindings, local/upstream scan identifiers, website hostnames, optional project hints and explicitly supplied PHP runtime evidence. It does not store the raw API key or findings. Completed records are bounded per credential; confirmation intents expire. Uncertain requests remain available for deliberate idempotent recovery.

The former viewer's `atlas.sqlite3` may remain in an upgraded profile. Its old watchlist/history is not imported or exposed by the workbench. Upgrades preserve profile data rather than silently deleting it.

These files rely on the OS account and filesystem. They are not an encrypted vault or proof of physical hardware identity. Anyone able to modify the user's local database can alter it. Copying/restoring a whole profile also copies its installation identity; it does not establish fresh scans on another machine.

Pausing result reads hides private rows and evidence without deleting the credential, receipts or upstream scans. Removing or rotating a credential isolates its earlier records rather than inferring account ownership.

## Limits

Authorization is a user's explicit attestation plus VibeLeak's API authorization, not an independent domain-ownership challenge. Saved assessments are observations. Incomplete coverage, changed rubrics, transient responses, hidden runtime versions and vendor backports limit conclusions. A grade change does not verify a vulnerability fix.


## Protected local folder inspection

Local inspection is a separate workflow from a website assessment. A native folder grant is followed by explicit approval of read-only inspection. The renderer uses only the native folder-scoped `list`, `stat` and `readText` operations. It does not execute project code, write project files, call a model, or send source or local findings to VibeLeak.

Raw environment files, credentials and private keys remain protected. Dependencies, generated output, Git internals and unsupported formats are excluded. The report separates excluded files and directories by reason, distinguishes native refusals from expected exclusions, and marks bounded or incomplete coverage. Excluded directories count once; their contents are not enumerated. The finding cap does not count omitted findings as skipped filesystem entries.

Local reports live in page memory. Scope changes, folder revocation and release clear the report. A reviewed redacted draft can be copied or appended unsent to a compatible chat. Sending that draft is a separate action and can share its contents with the selected model provider.

The website assessment's **Choose folder** button attaches the selected path as optional repository context. It does not start local inspection. That hint can be stored in the current Hermes backend's local request receipt, like a manually entered hint. The VibeLeak assessment request does not include project paths, source files or local findings. Native folder grants are managed by Hermes and can be revoked in its capabilities settings.
