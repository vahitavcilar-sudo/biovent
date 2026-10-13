# BioVent V10 validation

Final static build: `JUGBfrDwBL_Z7QkWWmPfy`. V10 uses authentic stills and no public product video.

## Functional and motion checks

- TypeScript and the 44-route static export passed. Exact root Apache/LiteSpeed hosting output was packaged.
- 528 route/viewport checks across EN/DE/TR/AR: localized SEO, overflow, navigation, technical selectors, reference tables, catalogues, preview forms and locale draft persistence.
- 192 hero product/locale/viewport combinations, plus manual interruption, roving keyboard, reduced motion and native mobile swipe scenarios.
- V10-specific actual-browser checks verified separate entry poses, RTL marker placement, uniform scaling and cleanup of the real-image route ghost, earlier copy withdrawal on scroll, visible unselected comparison data and zero decorative video players.
- Ten lifecycle scenarios and eight sticky-scene viewport sizes: autoplay policies, manual intent, visibility, data saver, resize, continuous Smart interpolation, reference subnav and latest route wins.
- 47 page/modal/form accessibility states plus 40 showroom/comparison states passed axe WCAG 2/2.1/2.2 A/AA checks. Automated coverage is not a full manual accessibility certification.

## Lighthouse

Local mobile simulated throttling, Chromium, exact packaged files served by the Go launcher with gzip. Other browser jobs were finished before measurement. This is lab evidence, not live Natro hosting or field INP.

| Page | Performance | Accessibility | SEO | LCP ms | CLS | TBT ms |
|---|---:|---:|---:|---:|---:|---:|
| home | 96 | 100 | 100 | 2750 | 0.000580 | 42 |
| smart | 96 | 100 | 100 | 2730 | 0.008062 | 74 |
| products | 97 | 100 | 100 | 2563 | 0.002132 | 56 |
| distributors | 98 | 100 | 100 | 2299 | 0.000019 | 74 |
| arabic | 92 | 100 | 100 | 3239 | 0.000000 | 62 |

The three primary English performance targets (home, Smart, Products) meet ≥95. Arabic home scored 92 in this run and does not meet the same target; LCP remains over 2.5s on several routes. Earlier diagnostics and the unsuccessful font-preload experiment are retained under artifacts/v10, not selected as final results. First visits preserve visible SSR content; route arrivals and below-fold elements retain entrance sequencing.

## Media and delivery

Twelve real-time Chromium QA recordings cover initial 30 seconds, all product transitions, rapid input, hero-to-engineering, continuous home/signature, Smart detail, Products, route continuation, mobile swipe, Arabic and reduced motion. QA recordings remain outside production public assets. Frame-sequence visual inspection and timing checks were performed; physical device testing and manual normal-speed playback certification are not claimed.

The actual original Smart PNG, official PDF vector logo, catalogues and product references pass their preservation checks. WeTransfer archive CRC and master SHA-256 pass; it contains two MP4 originals only. They are preserved privately under media-source and have no public derivatives. The newly posted Promx PNG original was not retrievable and is not imported; current authentic project imagery remains.

Windows x64 launcher is cross-compiled from the same code tested on Linux. Current-build files, EN/AR responses, gzip roundtrip, gzip q=0 and uncompressed HTML/PDF HTTP 206 range handling were verified. ZIP CRC and all archive manifest hashes are checked during packaging. No installation, persistent background service, real email sending or live deployment is performed.

Only installed Linux Chromium was available. Edge, Firefox, Safari, iOS Safari, Android Chrome on real devices, physical Windows execution and live Apache/Natro/JetPress behavior remain untested. Responsive and touch/RTL emulation do not replace those checks.

Reusable cloud startup instructions were saved in the environment draft. Draft saving does not publish the cloud environment or the website. GitHub delivery archives use a separate delivery branch; the live site remains unchanged.

## Frame cadence and transfer

Current build `JUGBfrDwBL_Z7QkWWmPfy`: initial encoded transfer 401,490 bytes; all four manually visited hero systems 513,066 bytes. Public MP4/WebM files: 0. RAF sample includes two product transitions: median 16.7ms, p95 16.8ms, frames over 50ms 0. This is desktop lab cadence, not physical-device or field INP certification.
