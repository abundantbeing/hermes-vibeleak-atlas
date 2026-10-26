# Architecture

One standalone package supplies the native Desktop plugin and authenticated Python backend. The renderer is bundled ESM with only the host React runtime and Hermes SDK left external. The page, sidebar and palette entry use native contribution APIs, not an iframe.

## Data flow

```text
Hermes connection + profile + activation
    native owner workbench / scoped React Query
        review target and project hint
        explicit authorization + one-unit approval
            authenticated plugin API
                persisted local intent / idempotency key
                    fixed-origin VibeLeak POST
                        validated same-target saved scan ID
                            installation/credential-bound local receipt
                                own saved-result GET
                                    bounded evidence / offline PHP guidance
                                        preview -> clipboard or unsent chat draft
                                        separately approved rescan -> comparison
```

`atlas/workbench.py` reuses the fixed-origin HTTP client while admitting only the scan POST and receipt-bound private detail in its active workflow. `atlas/receipts.py` stores metadata in a separate SQLite ledger with atomic intent claims, persistent idempotency keys, installation HMAC identity and read-consent epochs. Findings and credentials are not persisted there.

`atlas/workbench_api.py` requires Hermes framework admission for every route. Mutations have bounded JSON bodies. Long-running execution runs in a threadpool instead of blocking the API event loop. `dashboard/workbench_api.py` uses a versioned filename/package namespace so the new protocol does not accidentally reuse the old viewer's imported package.

The renderer's query identities include connection, profile, activation, credential and consent. Account changes remount private state. Consent changes hide evidence and invalidate previews. Late results cannot populate another selection or owner. Inactive private queries have no cache retention.

## Evidence and verification

Report fields are bounded and rendered as plain text. Known secret patterns and the current credential are redacted, but arbitrary source text still needs user review. Drafts explicitly label website content as untrusted and ask for a repository-specific plan before changes. The plugin does not read the project hint as a path or execute it.

PHP guidance is an offline dated catalog with source URLs and separate evidence classes. The runtime, vendor package and effective configuration are not remotely verified by this evaluator.

A comparison admits only its persisted same-site local baseline and current receipt. It reports persisting, newly observed and not-observed findings. It never sets `fixesVerified` true. Missing coverage, truncation, changing rubrics and deployment differences require explicit investigation.

## Deliberately absent

No global viewer, account-wide import, arbitrary scan-ID lookup, automatic scan, model call, repository write, deployed runtime patch, background monitoring or release publication. Dithered globe, ASCII and list views navigate only owner-local assessments. Optional DNS geography has a separate confirmation, a 12-domain bound and offline DB-IP attribution. Inactive map variants unmount WebGL; the render loop gates on visibility, pause and reduced motion and disposes on teardown.
