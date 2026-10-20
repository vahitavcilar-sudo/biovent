# BioVent V12 — Dark Titanium Corporate

A four-language manufacturer website built with Next.js 16, React 19 and TypeScript. V12 replaces the accumulated active styles and redesigns the homepage, product collection, four shared product details, technical library, company pages, forms, header and footer. Genuine product photography, original logo, 84 catalogue configurations, source PDFs, state transfer and separate enquiry contracts remain.

## Review on Windows

Download `biovent-v12-windows-test.zip`, extract **all** files, then open `biovent-v12-test/SITEYI-AC.bat`. Keep its console open. Node.js/Python are not required. Smart opens first; the showroom advances every five seconds. Reduced motion uses instant changes. Forms are honest previews and do not send enquiries.

See [V12_LOCAL_RUNNING.md](V12_LOCAL_RUNNING.md). The launcher is cross-compiled for Windows x64; its shared source is tested with HTTP and Chromium on Linux, not physically executed on Windows here.

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

Serve the exact exported output before browser checks. `BIOVENT_TEST_URL` selects its URL, `BIOVENT_CHROMIUM` selects Chromium. Evidence paths follow the package version automatically. V11-named tests retain established catalogue and interaction contracts; retired V11 pinned-scene tests are historical and are not V12 acceptance tests.

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
node scripts/check-sources.cjs
npm run capture
```

`npm test` includes all-route responsive and complete-page accessibility checks; `test:a11y` is an alias for that same suite, not a separate additional test count. Run `npm run performance` **alone**, after browser suites finish. No independent lint configuration exists; TypeScript, production compilation and browser checks are reported separately from linting.

## Design and delivery

- [Visual audit](V12_VISUAL_AUDIT.md)
- [Design system](V12_DESIGN_SYSTEM.md)
- [Asset audit](V12_ASSET_AUDIT.md)
- [Implementation report](V12_IMPLEMENTATION_REPORT.md)
- [QA report](V12_QA_REPORT.md)
- [Windows instructions](V12_LOCAL_RUNNING.md)
- [Natro / JetPress deployment](V12_DEPLOYMENT.md)

Active styles are only `styles/system/`. Previous styles are archived in `legacy/styles-v11/` and are not imported. No extra runtime dependency was introduced.

Original catalogue/reference provenance remains in `V11_PRODUCT_DATA_AUDIT.md`. No new clinical, German-origin, certification or universal compatibility claims were introduced. CAD, additional approved imagery, verified corporate/legal details and real form delivery require the corresponding evidence/configuration. See `PROFESSIONAL-INQUIRY.md` for the optional receiving contract. No secrets belong in public variables.

`npm run package:hosting` prepares an Apache/LiteSpeed document root, not a WordPress theme or plugin. GitHub source/archive delivery does not publish or modify the live Natro website.
