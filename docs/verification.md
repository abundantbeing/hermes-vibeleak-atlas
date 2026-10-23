# Verification

Tested against an isolated native Hermes Desktop build and a separate real Hermes Python backend. No production credentials, sessions or config were copied into QA. The plugin did not run a scan, make a paid data-feed request, submit an agent turn, deploy production code or restart the running gateway.

## Executed checks

- `python -m unittest discover -s tests -q`: 35 passing tests.
- `npm test`: 9 passing pure frontend policy tests.
- `npm run build`: bundled ESM. Only Hermes SDK, React and React JSX-runtime remain external.
- `node scripts/qa-ui.mjs`: 19 passing native integration checks, zero renderer exceptions and zero console warnings in the completed run.

Native checks used live saved public VibeLeak results and opt-in Cloudflare DNS plus offline DB-IP lookup. They exercised source consent, real country clusters, inspection, pause, dither bypass, ASCII/list switching, missing private credentials, reduced motion, a narrow pane with no horizontal overflow, public Markdown preview, non-overlapping labels, empty/recovered search, command-driven watch/unwatch, local read replay, three route-away/remount cycles and a native theme change.

Screenshots were captured from the real native plugin, not an iframe or an HTML imitation of Hermes. The completed vision review passed wide, narrow and light-theme renders. A separate earlier review identified overlapping labels and cramped narrow-pane metadata. The renderer now suppresses colliding/out-of-bounds labels, enlarges metadata and hit targets, and reduces globe height in a narrow pane. Browser-rendered CSS colors are sampled before conversion to Three.js colors so modern `color-mix()` theme values do not produce warnings.

## Private integration limits

No production owner credential was supplied to this plugin. Private happy paths and denied scopes use explicitly labeled HTTP transport fixtures. A missing key was exercised in the native UI, and the real public endpoint contracts were read from the VibeLeak source/live service. This is not a claim of a completed live owner-authenticated acceptance test.

## Packaging and installation

The ZIP packager uses an explicit allowlist, verifies archive integrity and byte equality, and excludes environment files, SQLite data, QA homes, credentials, source-cache downloads and development dependencies. The package manifest records the actual SHA-256 and file count.

The local installer copies an allowlisted package and uses Hermes's plugin enable API. It backs up profile config and never restarts a gateway. Installation was read back after the supported enable step completed. The backend is enabled, not disabled, the native renderer matches the built entry byte for byte, and Hermes discovers the plugin. Activation reported `gateway_reloaded: true` and `restart_required: false`; the original gateway process remained alive. No gateway restart was performed.
