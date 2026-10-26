# Verification

## Reproducible checks

```sh
python -m unittest discover -s tests -q
npm test
npm run build
python scripts/package_plugin.py
```

Backend regressions cover explicit dual approval, durable installation-bound receipts, credential/profile isolation, missing provenance, exact target/ID validation, uncertain responses, idempotent recovery, local baselines, honest comparison and PHP evidence. API tests exercise framework admission, no-store responses, bounded payloads and blocked legacy reads. Pure frontend tests exercise approval policy, handoff identity and cross-owner draft refusal.

## Installation and package checks

The ZIP uses explicit allowlists and excludes environment files, local databases, source caches, Git metadata and development dependencies. Integrity and byte equality are checked. The installer tests exercise fresh installation, backed-up upgrade, preserved profile state, matching renderer bytes and activation rollback. Windows in-use directory upgrades preserve identical locked assets, back up both halves, atomically update changed files and roll them back on failure. Staging stays outside plugin-discovery roots, and activation resolves the canonical plugin key.

The user install is backed up before upgrade. A matching file hash is disk alignment, not proof of the serving Python version. Verify the workbench protocol on the active connection. Never restart the gateway implicitly.

## Local inspection regressions

`npm test` covers local explicit approval, native-read-only access, path bounds, protected files, size/read budgets, cancellation, redaction, separate PHP runtime evidence, exclusion accounting and native repository-picker outcomes. Picker selection alone never invokes list, stat, read or write operations.
