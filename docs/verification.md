# Verification

## Reproducible checks

```sh
python -m unittest discover -s tests -q
npm test
npm run build
python scripts/package_plugin.py
```

Backend regressions cover explicit dual approval, durable installation-bound receipts, credential/profile isolation, missing provenance, exact target/ID validation, uncertain responses, idempotent recovery, local baselines, honest comparison and PHP evidence. API tests exercise framework admission, no-store responses, bounded payloads and blocked legacy reads. Pure frontend tests exercise approval policy, handoff identity and cross-owner draft refusal.

## Actual native QA

`prepare_workbench_qa.py` prepares a separate Hermes home without production credentials. Its QA-only transport fixture is appended only to the disposable backend entry and is excluded from the package. `serve_qa.py` and `launch_qa.mjs` run the actual Hermes backend and Desktop, with a separate user-data directory and no inference provider.

After connecting the isolated app, `node scripts/qa-workbench.mjs` exercises the native protocol, truthful fixture label, no upstream read on open/prepare, both approval checks, local receipt, private evidence, unsent fix-plan preview, owner PHP evidence, fresh rescan approvals, comparison, narrow layout and read-consent withdrawal. It also checks real WebGL painting, dither bypass, pause, ASCII/list switching, disposal of inactive canvases and a separately confirmed owner-only hosting lookup with no live DNS in QA. Its request ledger asserts only the explicitly approved fixture POSTs and recorded own-result GETs, never public/account-wide endpoints.

Screenshots come from the actual disk-loaded plugin. Capture waits for finite dialog animations and painted frames; blank captures are failures, not visual passes. Review wide, narrow, approval and comparison images separately. Native DOM checks, rendered pixels and user approval remain separate claims.

## Installation and acceptance gates

The ZIP uses explicit allowlists and excludes QA files, environment files, local databases, source caches, Git metadata and development dependencies. Integrity and byte equality are checked. Exercise the extracted installer through real Hermes enable APIs in a disposable home: fresh install, backed-up upgrade, preserved profile state, matching renderer and activation rollback. Windows in-use directory upgrades also preserve identical locked assets, back up both halves, atomically update changed files and roll them back on failure. Staging stays outside plugin-discovery roots, and activation must resolve the canonical plugin key.

The user install must be backed up before upgrade. A matching file hash is disk alignment, not proof of the serving Python version. Verify the actual workbench protocol on the current connection. Never restart the gateway implicitly.

Fixture security results are not live owner acceptance. That final gate requires an actual owner key, accepted scopes/entitlement and explicit authorization of a real target and its unit budget. No production scan, payment, model turn, deployment or release is part of fixture QA.


## Local inspection and layout regressions

`npm test` also covers local explicit approval, native-read-only access, path bounds, protected files, size/read budgets, cancellation, redaction, separate PHP runtime evidence, exclusion accounting and native repository-picker outcomes. Picker selection alone must not invoke list, stat, read or write operations.

For reproducible component layout QA, `node scripts/prepare_feedback_qa.mjs` installs an automated test-only route in the disposable Desktop home. `node scripts/qa-feedback.mjs` mounts the actual production local-inspection and repository-context components with controlled I/O, then checks approval, picker result handling, coverage explanations, and draft text/control bounds at wide and narrow widths. This does not exercise the OS permission dialog, a client project, or a live security assessment. Do not use these captures as real inspection evidence or product walkthrough footage.

The QA route waits for an exact build identifier to avoid testing a stale hot-reload generation. On a minimized isolated Electron window, CDP focus emulation can keep visibility-gated plugin discovery active without taking desktop focus. This does not grant folder permissions. Dialog tests check the native body box and portaled text independently; styles scoped only under the page cannot cover a portaled dialog.
