# API compatibility

Atlas uses the existing VibeLeak API at the fixed origin `https://www.vibeleak.app`. The workbench needs no separate identity service.

| Operation | Contract | Required scopes |
|---|---|---|
| Approved assessment | `POST /api/v1/scans`, JSON `url`, `maxUnits: 1`, generated `idempotencyKey`; matching `Idempotency-Key` header; HTTP 201 `ok: true`, `data.scan` | `scan:write` |
| Own locally initiated saved result | `GET /api/v1/scans/<uuid>`, JSON `data.scan`; returned ID and normalized target must match the local receipt | `scan:read`, `findings:read`, server owner authorization |

Requests do not follow redirects. Responses are bounded. Missing credentials, changed credentials, revoked read consent, malformed IDs and mismatched targets fail closed. No account/public fallback exists.

The workbench never calls the public index, public saved-summary endpoint, account history, monitor events or separate Markdown report endpoint. Its private fix-plan draft projects the selected local report's bounded evidence. Literal `scans:read` and `monitor:read` are not valid setup guidance.

## Native backend

`dashboard/manifest.json` selects `workbench_api.py`, which imports a separate versioned backend namespace. The native renderer requires `workbenchProtocol: 1`, `privacyScope: locally-initiated-scans-only` and current profile/credential binding. Legacy `/snapshot`, `/site` and `/handoff` reads return `local-scan-required` without a source read.

The admitted plugin namespace exposes `/workbench/intents`, `/workbench/intents/<local-id>/execute`, `/workbench/scans`, own receipt detail/handoff/compare, bounded owner PHP evidence and read-consent changes. It accepts no arbitrary upstream saved ID. All routes require Hermes framework admission. Responses are private/no-store; JSON mutations are bounded.

An interrupted POST remains uncertain. Deliberate retries reuse the same persisted idempotency key; opening the page never retries it. The server's reservation/idempotency contract is required for safe recovery. Source compatibility and local fixtures do not establish the state of a production deployment or a real owner's entitlement.
