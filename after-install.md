# After installation

The desktop page starts off after installation. Turn on **VibeLeak Atlas** in **Settings ▸ Plugins**, then open it in the Hermes Desktop sidebar or command palette.

1. Create an owner API key with `scan:write`, `scan:read` and `findings:read`.
2. From the extracted package, run `python scripts/configure_owner.py` using Hermes's Python environment. The hidden prompt saves `VIBELEAK_ATLAS_API_KEY` through Hermes secrets. Do not paste it into chat or the renderer.
3. Refresh the connection, enter a website you own or are authorized to assess, and choose **Review assessment**. Preparing the dialog makes no upstream request.
4. Check the exact target, then explicitly approve website authorization and the ceiling of one VibeLeak scan unit. Only **Run approved assessment** starts the request.
5. Inspect the evidence and preview a fix-plan draft. Appending it does not submit it or change code. Confirm the intended repository and approve any subsequent changes in chat.
6. After an approved change and deployment, **Review rescan** requests a new confirmation. A comparison reports observations, not independently verified fixes.

Public and account-wide results are never imported. Pausing saved-result reads hides private evidence. If a request is uncertain, reuse **Review same approval** rather than starting a separate replacement scan.

If the renderer is missing, use **Reload desktop plugins**. If the workbench backend is not active, the page fails closed; copied files alone do not prove Python activation. Do not restart the gateway without deliberately saving work and arranging it.

Read [privacy](docs/privacy.md) before connecting an owner key.
