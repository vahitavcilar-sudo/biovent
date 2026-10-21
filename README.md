# BioVent V13 — Corporate & Engineering

A four-language manufacturer website built with Next.js 16, React 19 and TypeScript. V13 evolves V12: approved company identity, better genuine product framing, seven Smart engineering areas, documented prosthetic exploration, richer comparison/resources and an opt-in private PHP receipt/outbox service. Genuine product photography, original logo, 84 catalogue configurations, source PDFs, state transfer and separate enquiry contracts remain.

## Review on Windows

Download `biovent-v13-windows-test.zip`, extract **all** files, then open `biovent-v13-test/SITEYI-AC.bat`. Keep its console open. Node.js/Python are not required. Smart opens first; the showroom advances every five seconds. Focus or manual selection pauses it for inspection; Play resumes while focused, and hover alone does not pause it. Reduced motion uses instant changes. Forms are honest previews and do not send enquiries.

See [V13_LOCAL_RUNNING.md](V13_LOCAL_RUNNING.md). The launcher is cross-compiled for Windows x64; its shared source is tested with HTTP and Chromium on Linux, not physically executed on Windows here.

## Source workflow

Use Node 24 (minimum 20.9), in the directory containing `package.json`:

```sh
npm ci
npm run typecheck
npm run dev -- --port 3000
```

For exact static output, stop development, then:

```sh
npm run export
npm run package:draft
python scripts/serve-deployment.py --port 3100
```

The site is served from `deployment/wordpress-hosting/draft-public_html`. No persistent Node server is required for the exported site. `NEXT_PUBLIC_BASE_PATH` requires a new export when a subdirectory is used; `SITE_URL` controls canonical metadata.

## Verification

Serve the exact exported output before browser checks. `BIOVENT_TEST_URL` selects its URL, `BIOVENT_CHROMIUM` selects Chromium. Evidence paths follow the package version automatically. V11-named tests retain established catalogue and interaction contracts; retired V11 pinned-scene tests are historical and are not V13 acceptance tests. V13-specific corporate, playback, components, backend and configured-form suites exercise the new contracts.

```sh
npm test
npm run test:catalogue
npm run test:professional
npm run test:forms
npm run test:technical-viewer
npm run test:resources
npm run test:motion
node tests/configurations-v11.cjs
node tests/deep-links-v11.cjs
node tests/components-v13.cjs
node scripts/check-sources.cjs
npm run test:backend
npm run capture
```

`npm test` includes all-route responsive and complete-page accessibility checks; `test:a11y` is an alias for that same suite, not a separate additional test count. Run `npm run performance` **alone**, after browser suites finish. PHP backend tests require PHP 8.1+ CLI or BIOVENT_PHP pointing to a compatible verified runtime. This environment used PHP 8.5.10 WebAssembly via @php-wasm/cli 3.1.60, installed outside the source project. There is no added app runtime dependency. `tests/configured-forms-v13.cjs` requires a separate export built with both public receiver URLs, served separately; it intercepts local responses and never proves email delivery.

No independent frontend lint configuration exists; TypeScript, production compilation and browser checks are reported separately from linting.

## Design and delivery

- [Initial audit](V13_INITIAL_AUDIT.md)
- [Implementation report](V13_IMPLEMENTATION_REPORT.md)
- [Product asset audit](V13_PRODUCT_ASSET_AUDIT.md)
- [Product data audit](V13_PRODUCT_DATA_AUDIT.md)
- [Manufacturer content requirements](V13_MANUFACTURER_CONTENT_REQUIREMENTS.md)
- [Missing resources](V13_MISSING_RESOURCES.md)
- [Visual QA](V13_VISUAL_QA.md)
- [Technical QA](V13_TECHNICAL_QA.md)
- [Production readiness](V13_PRODUCTION_READINESS.md)
- [Windows instructions](V13_LOCAL_RUNNING.md)
- [Natro / JetPress and PHP backend setup](V13_DEPLOYMENT.md)

Active styles remain centralized in `styles/system/`. Genuine logo/PDFs and catalogue references are preserved. The legal name/address were approved by the user; this does not verify manufacture in Germany, certification or clinical claims. Missing factory/quality evidence, CAD, additional approved imagery, legal contacts and live receiver configuration remain explicit dependencies.

Default exported forms truthfully prepare/download unsent requests. The opt-in `deployment/form-backend` service validates server-side canonical catalogues, writes private durable receipts, handles idempotent retry and rate limiting, then uses a separate CLI outbox worker. Receipt acceptance and PHP mail transport acceptance are distinct from actual inbox delivery. Configure two approved recipients, a sender, private storage/JSON checksums, secret rate salt and approved privacy/retention before enabling. Never put secrets in public variables. Do not publish private configuration or real contact records.

`npm run package:hosting` prepares an Apache/LiteSpeed document root, not a WordPress theme/plugin. GitHub source/archive delivery does not publish or modify the live Natro website. `NEXT_PUBLIC_SHOWROOM_INTERVAL_MS` is a build-time setting, 5000 by default, valid 5000–15000; 8000 gives more reading time. User focus/selection pauses V13 as required by the latest brief.
