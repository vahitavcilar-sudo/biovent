# BioVent V11 QA report

Test date: 20 October 2026. Final root export build: `KXldNxO4xHvsHwuHH227N`.
Tests ran against the actual static hosting files, not a development server.
No live Natro/JetPress/WordPress site was changed and no external enquiry was sent.

## Executed checks

| Area | Result and scope |
|---|---|
| Dependencies / TypeScript | Frozen `npm ci` succeeded; final `npm run typecheck` passed. Node 24.19.0 / npm 11.9.0. Dependency versions retained. |
| Production export | `npm run export`, `npm run package:draft`, `npm run package:hosting` passed; 48 localized routes plus root/system routes, four languages, static HTML/CSS/JS/assets. |
| Original source integrity | `node scripts/check-sources.cjs` passed: catalogue/logo checksums and original ProMX/Zygoma reference mappings preserved. |
| Routes / responsive / SEO | `tests/production-v11.cjs`: 576 checks across 48 routes × 12 viewport sizes, 360–1920 px, localized metadata/canonical/hreflang, navigation, PDFs, selectors, form behavior, RTL and reduced motion; no captured page errors. |
| Four-system hero | `tests/showroom-v11.cjs`: 192 product/locale/viewport combinations plus keyboard, touch/swipe, rapid changes and no-JavaScript fallback. |
| Motion / lifecycle | Choreography, lifecycle and motion V11 scripts passed: real-image route continuity, RTL marker, hover/menu/offscreen/hidden-document pauses, manual selection, resize during transitions, route cleanup and reduced motion. Ten lifecycle scenarios and eight motion viewports. |
| Canonical product data | `tests/product-data-v11.cjs`: all 84 catalogue pairs, source pages and exact known reference strings; invalid/held pairs rejected, including Smart Ø5.5×15 and ProMX/Monoblock Ø3.3×6. |
| Actual configuration controls | `tests/configurations-v11.cjs`: all 84 combinations selected in the browser; correct SKU or explicitly unavailable SKU, URL state and all four product-to-enquiry transfers. |
| Technical viewers | `tests/technical-viewer-v11.cjs`: 32 product/locale/viewport checks, original image decoding/proportions, keyboard zoom/reset, mouse pan/reset, source links and reduced motion. Genuine still-image inspection; no 3D rotation claim. |
| Professional request contract | `tests/professional-enquiry-v11.cjs`: local validation, canonical references, private-data/URL separation, preview zero-network behavior, mock transport failures and explicit `accepted:true` contract. |
| Professional form in browser | `tests/professional-form-v11.cjs`: 12 scenario groups, 16 responsive four-language layouts, draft separation/persistence, validation focus, preview download, mocked successful/failed/delayed replies; **zero external POSTs**. |
| Resources / comparison | `tests/resources-comparison-v11.cjs`: 48 viewport checks; genuine two-PDF search, family/category filters, empty/reset states, source links and file language; actual 2–3-system focus/min/max/reset and Arabic dimensions. |
| Automated accessibility | axe WCAG A/AA: 47 existing page/modal states + 40 hero/comparison states + 8 viewer states + 9 professional form states + 20 resource/comparison states = **124 checked states, zero reported violations**. These overlap and are not 124 distinct pages. |
| Deep links / language changes | `tests/deep-links-v11.cjs`: directly opened technical/reference/document tabs, four-language selection and hash preservation, exact Ø4×5 transfer into inquiry. |
| Subdirectory build | Separate export build `KjdyVxf1qXL7d_l-XxOzv`, `/biovent-preview`: 20 pages across four languages; prefixed internal links/canonicals, direct selected tab and inquiry transfer passed. Rebuilt root afterward; delivery is the root build above. |
| Portable launcher | Official checksum-verified Go 1.27.3 built Windows x64 EXE and Linux helper from the same committed source. Linux HTTP check verified exact content of **425 exported files**, four-language HTML/RTL, root redirect, HEAD, gzip/q=0 and PDF Range/206. Listener binds 127.0.0.1. |

Browser environment: installed Linux Chromium via Playwright, desktop/mobile/RTL/touch/reduced-motion emulation. Checks prove the listed behavior in that environment, not native platform certification. There is no configured repository lint command; TypeScript/build and actual browser tests were used rather than claiming a lint run.

## Final performance measurement

`npm run performance` ran alone after the functional browser jobs completed, with Lighthouse mobile simulated throttling and the same compressed local static HTTP helper used for the restored-source baseline. These are single lab runs, not field 75th-percentile measurements. Best-practice, SEO and accessibility scores were **100 on all five measured pages**.

| Page | Performance | LCP | CLS | TBT |
|---|---:|---:|---:|---:|
| English home | 95 | 2811 ms | 0.00058 | 51 ms |
| Smart detail | 96 | 2558 ms | 0.01062 | 72 ms |
| Product collection | 96 | 2638 ms | 0.00213 | 65 ms |
| Distributor | 99 | 1963 ms | 0.00002 | 57 ms |
| Arabic home | 95 | 2785 ms | 0 | 60 ms |

The fresh restored-source baseline, measured in this environment before V11 edits, was: home 96/2664 ms, Smart 98/2258 ms, products 93/3098 ms, distributor 97/2308 ms, Arabic home 96/2635 ms (performance/LCP). Historical numbers in the V11 brief are not substituted for that baseline. Single-run variation and the added functionality must be considered; no across-the-board performance improvement is claimed.

CLS and accessibility lab targets pass. **The 2.5-second LCP target is not met on four of these five lab pages.** No production field p75 LCP or INP data was available, so field Core Web Vitals acceptance is unverified. TBT and frame timing do not establish INP.

`scripts/profile-v11.cjs` measured 419,987 encoded bytes for initial home review and 532,511 bytes after all four hero products, with **zero production video files**. A 360-frame desktop sample including two product transitions had median/p95 frame intervals of 16.7/16.7 ms and zero intervals above 50 ms. This is a local sample, not lower-powered-device or field evidence.

## Review and delivery evidence

Final screenshot captures and browser motion recordings are outside production output under `artifacts/v11`. The Windows review package contains the browser recordings as QA evidence; they are never product media. Source and hosting archives contain fresh per-file SHA-256 manifests and are checked for ZIP CRC errors, duplicate paths and byte-for-byte manifest agreement. Archive sizes/hashes and GitHub download verification are recorded separately in delivery JSON files.

The ready-to-test package includes `SITEYI-AC.bat`, the local executable, complete static site, launcher source, Turkish instructions and QA reports. The source ZIP includes the working project, frozen lockfile, original media/PDFs, V11 reports and preview captures. The hosting ZIP contains the public static files and `.htaccess`; source, QA movies, Windows executables and optional PHP example are excluded from that public root.

## Unrun checks and remaining dependencies

- The Windows EXE is cross-compiled; it was **not executed on physical Windows** here. Native Edge, Firefox, Safari, iOS, Android and low-powered physical-device tests were unavailable.
- PHP is not installed. The opt-in professional receiver example was **not PHP-linted or executed**, and actual mail/storage delivery was not tested. Mocked acceptance is not a real delivery result. Default forms truthfully remain preview-only.
- Actual Apache/LiteSpeed `.htaccess`, Natro/JetPress hosting/cache/TLS/domain behavior, live deployment and field p75/INP remain unverified.
- All seven competitor URLs were blocked by proxy CONNECT 403; no completed live competitor visual review is claimed. See `V11_REFERENCE_RESEARCH.md`.
- Approved CAD/alternate-angle/cutaway assets, the new ProMX original binary, exact outstanding SKU/component compatibility documents, legal/controller details and manufacturing/regulatory evidence remain as listed in `V11_REQUIRED_ASSETS.md` and the product audit.
- Technical translations received code/content consistency checks, not manufacturer certification or native professional medical translation approval.

No fabricated CAD, exploded geometry, new product codes, manufacturing origin, certificates, universal compatibility or clinical outcome claims are introduced to close these evidence gaps.
