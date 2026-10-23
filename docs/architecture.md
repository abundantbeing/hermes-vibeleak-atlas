# Architecture

## Delivery

One standalone package provides a native disk plugin and a Python plugin backend. `plugin.yaml` declares the package. `desktop/plugin.js` is bundled ESM with SDK/React external imports. `dashboard/manifest.json` advertises `plugin_api.py` to the authenticated Hermes plugin router.

The native page, sidebar entry and palette command use the contribution SDK. All renderer reads go through `ctx.rest`, scoped to `/api/plugins/vibeleak-atlas`. No browser-held owner key, generic URL proxy, iframe dashboard, or independent auth implementation is needed.

## Data flow

```text
Hermes profile + connection + activation epoch
    |
    +-- native Atlas page / React Query
    |       |
    |       +-- globe / ASCII / list / inspector
    |       +-- saved-data preview -> clipboard or unsent chat draft
    |
    +-- authenticated plugin API
            |
            +-- fixed-origin VibeLeak GET client
            |       +-- recent public Trust Index
            |       +-- public visibility + saved summary
            |       +-- owner history / selected scan / Score Watch
            |       +-- owner-requested text/markdown report
            |
            +-- local profile SQLite
            |       +-- consent and read settings
            |       +-- 32-host watchlist
            |       +-- 64 changed public observations
            |
            +-- opt-in geography
                    +-- Cloudflare A + AAAA DNS-over-HTTPS
                    +-- discard non-global IP answers
                    +-- offline DB-IP Country Lite
                    +-- country label point or unknown/multi-region
```

## Trust and read boundaries

`atlas/service.py` fixes the origin to `https://www.vibeleak.app`, allows only declared saved-data paths, limits response bytes, refuses redirects, and uses GET only. There is no scan or billing path. Owner Markdown uses the actual text response contract, not invented JSON.

`atlas/api.py` requires framework admission on every route. Mutations modify only local settings/watchlist/history. JSON mutations are bounded and validate types. Responses are private/no-store. `dashboard/plugin_api.py` fails closed if Hermes's authentication integration is unavailable.

The backend obtains the owner key from `agent.secret_scope.get_secret`. The frontend receives a one-way binding identifier, not the key. Query identities include connection, profile, activation epoch, mode and key binding. Profile/connection changes remount the page and reject in-flight results belonging to the old scope. Query cache entries have zero inactive retention.

Public data projection allowlists fields and suppresses invalid, failed, or unassessed numeric scores. No score is invented from a letter grade. Private findings use a bounded projection. Report content renders as plain text and is introduced as untrusted evidence in an agent draft.

## Geographic honesty

Natural Earth points are generalized country labels. The plugin does not draw IP-level origin precision or attack paths. If usable DNS answers disagree on country, no single coordinate is assigned. Failed DNS, reserved answers, unavailable data, and unrepresented country codes stay unlocated.

Country clusters summarize the current observed site window. Their worst observed grade is not a national risk score. A CDN's country may differ from the website's actual origin.

## Renderer lifecycle

The renderer uses the host's React Query client and `createBudgetedLoop` at 20 frames per second. It respects document/container visibility, reduced motion, drag/zoom state, and pause. `ResizeObserver` updates backing size with a 1.5 pixel-ratio cap. Context loss stops drawing; restoration redraws. Teardown disconnects observers/listeners, cancels the loop, disposes geometries/materials and the renderer, and releases the WebGL context.

ASCII and list views unmount WebGL instead of hiding a running canvas. Ordered dithering applies only to the spherical artwork; text and controls remain accessible HTML.

## Deliberately absent

No broad web Atlas publication service, new scans, automatic remediation, third-party attack stream, background subscriptions, or global incident claims. Those require separate product/API scope and approval.
