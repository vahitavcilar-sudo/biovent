# Run BioVent V11 on Windows

## Ready-to-test package

Windows 10/11 x64: extract **all** of `biovent-v11-windows-test.zip`, open `biovent-v11-test`, then double-click `SITEYI-AC.bat`. Keep the console open while reviewing. The browser opens automatically; the console prints the address if it does not. Close the console to stop. This package requires neither Node nor Python and can browse the bundled site offline. It does not send enquiries in preview mode. The Windows binary is cross-compiled; the same launcher source is HTTP-tested on Linux, not physically executed on Windows in this environment.

## Source development — PowerShell or Command Prompt

Install Node.js **20.9 or newer** (Node 24 recommended; this runtime used 24.19.0). Extract the source ZIP and open a terminal in the directory that contains `package.json`.

```powershell
npm ci
npm run typecheck
npm run dev -- --port 3000
```

Open the development address printed in the terminal. Stop it with Ctrl+C before an export, since both workflows use `.next`.

```powershell
npm run export
npm run package:draft
```

These scripts are portable on Windows; `scripts/export-static.cjs` sets the export environment for the Next subprocess. The export is in `out`; the review hosting package is `deployment/wordpress-hosting/draft-public_html`. `npm run package:hosting` prepares the standard hosting folder after the original Smart asset gate. A persistent Node server is not required for the exported site.

For a local source preview after exporting, Python is optional:

```powershell
py scripts/serve-deployment.py --port 3100
```

Alternatively, use the ready-to-test Windows package. The Python helper emulates static HTTP, not PHP/Apache configuration.

## Optional environment configuration

No secret or endpoint is required for the default preview. Distributor adapter: `NEXT_PUBLIC_ENQUIRY_ENDPOINT`. Professional adapter: `NEXT_PUBLIC_PROFESSIONAL_ENQUIRY_ENDPOINT`. These are public receiving URLs, never mail passwords or API secrets. Keep server credentials on the receiver only. See `PROFESSIONAL-INQUIRY.md` and existing deployment notes. Legal/controller information must be verified before production collection.

Root export is the default. For a subdirectory build in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/biovent-preview'
npm run export
npm run package:draft
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

In Command Prompt use `set NEXT_PUBLIC_BASE_PATH=/biovent-preview`, run the same commands, then `set NEXT_PUBLIC_BASE_PATH=`. Use the same value for export and packaging. `SITE_URL` may override the default `https://biovent-implant.com` canonical origin during a build.

## Checks

With the exact packaged folder served locally and Chromium installed, the browser scripts accept `BIOVENT_TEST_URL`. The development/build commands are cross-platform; this environment's browser scripts default to Linux `/usr/bin/chromium`, so set their supported executable override or adapt that local test setting on Windows. See the QA report for what was actually executed. PHP and physical device/Windows execution were not available here.
