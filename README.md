# BioVent V11

Current playback correction: see `V11_MOTION_FIX.md`. The updated Windows review ZIP makes explicit play work while the pointer and focus remain on the control, and explains device motion constraints.

A four-language, product-focused dental implant manufacturer website built on Next.js 16, React 19 and TypeScript. The existing Smart-first motion stage, continuous engineering journey, official logo, genuine products, catalogues, responsive/RTL behavior and static hosting architecture are preserved.

V11 adds authentic-image technical dossiers for all four implant systems, 84 catalogue-listed configurations, exact product-to-enquiry transfer, separate professional information/quotation and distributor workflows, focused comparison, searchable resources and improved conversion/navigation. Technical claims and conflicts are recorded in `V11_PRODUCT_DATA_AUDIT.md`; missing assets are not represented as completed.

## Local source workflow

Node >=20.9 (Node 24 recommended). From the folder containing this file:

```sh
npm ci
npm run typecheck
npm run dev -- --port 3000
```

For static output, stop development first and run:

```sh
npm run export
npm run package:draft
```

The export launcher works on Windows and POSIX. The exact review output is `deployment/wordpress-hosting/draft-public_html`; use `python scripts/serve-deployment.py --port 3100` if Python is available. No persistent Node server is needed for the exported site. See `V11_LOCAL_RUNNING.md` for Windows commands, environment variables and optional subdirectory builds.

## Ready-to-test Windows ZIP

Extract all of `biovent-v11-windows-test.zip`, open `biovent-v11-test/SITEYI-AC.bat` and keep its console open. Node/Python are not required. The launcher is cross-compiled; its shared source is HTTP-tested on Linux, not physically executed on Windows here.

## Verification

Serve the exact static output before browser tests. Tests use installed Linux Chromium by default; `BIOVENT_TEST_URL` selects the server.

```sh
npm run test:catalogue
npm run test:professional
npm test
npm run test:a11y
npm run test:technical-viewer
npm run test:resources
npm run test:motion
```

Additional configuration, hero and form scripts live in `tests/*-v11.cjs`. Run `npm run performance` alone after other browser jobs finish. Measurements, boundaries and unrun checks are in `V11_QA_REPORT.md`. QA browser recordings are review artifacts outside production media.

## Forms and publishing

Preview is the default; no enquiry is sent. Professional and distributor workflows use separate drafts and receiving URL settings. Never put credentials in public variables. `PROFESSIONAL-INQUIRY.md` documents the professional request contract and opt-in PHP example. Actual delivery/storage, legal details and PHP/Natro integration require configuration and end-to-end validation.

`npm run package:hosting` prepares the Apache/LiteSpeed output. Existing WordPress is not modified automatically. See `V11_DEPLOYMENT.md`; Windows launcher and QA files do not belong in the hosting root.

## Reports

- `V11_BASELINE.md`, `V11_REFERENCE_RESEARCH.md`
- `V11_CHANGELOG.md`, `V11_IMPLEMENTATION_REPORT.md`
- `V11_PRODUCT_DATA_AUDIT.md`, `V11_REQUIRED_ASSETS.md`
- `V11_QA_REPORT.md`, `V11_LOCAL_RUNNING.md`, `V11_DEPLOYMENT.md`

Original master media, logo and catalogue provenance remain in their existing manifests/documents. No genuine CAD or new Promx PNG was available for this release. No fake 3D geometry, compatibility, manufacturing origin, certification or clinical outcomes are published. Live hosting publication is separate from GitHub source/archive delivery.
