# Production validation — 2026-10-07

Final production build ID: `iI_wmbpGuNFvSqt23Qjlq`. No live website deployment or real enquiry delivery is claimed.

## Passed

- Frozen dependency installation (`npm ci`), strict TypeScript check, production build and production HTTP startup.
- 49 prerendered build entries, including 44 localized page routes, root redirect, fallback, robots and sitemap.
- All 44 page routes at 1440, 1280, 1024, 768, 430, 390 and 360 px: **308 layout checks** without page overflow. Scrollable comparison tables remain contained.
- Localized server HTML lang/dir, one H1, descriptions, canonical and five alternate-language links; valid navigation without old hash routes.
- Mobile navigation/Escape, resource filters, product tabs/keyboard arrows, Promx and Zygoma dimension/reference selection, catalogue HTTP availability, unknown-product 404 and reduced motion.
- Four-step form validation/focused error summary, product preselection, language-change/reload preservation, safely escaped user input, truthful preview status and downloaded enquiry.
- **47 automated axe WCAG A/AA page/state checks**: four locales at desktop/mobile/tablet representative sizes plus open menu, form errors and active specifications. Zero violations in the final run. This is automated coverage, not certification or a substitute for an assistive-technology review.
- **9 service adapter scenarios** with mocked requests: no endpoint/preview, honeypot, accepted reference, HTTP rejection, malformed/missing acknowledgement and network/JSON errors. No external enquiries were transmitted.
- Both PDF SHA-256 values and original vector logo match preserved source files. All Promx and Zygoma reference mappings match the previous verified data exactly.
- Static export built and independently served over HTTP; the full browser suite also passed against that version, including 308 layouts and interactive form/selector checks.
- Seven full-page final screenshots and a self-contained visual preview. Preview view selection and embedded image rendering were verified using browser DOM content; the managed Chromium browser blocks direct `file:` navigation, so desktop double-click opening was not tested here.

## Lighthouse

Mobile simulated throttling, local production server; final sequential measurement on 2026-10-07, after browser suites finished. Reports in `artifacts/lighthouse/`. These are lab measurements; real hosting, devices and networks can vary.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| English home | 98 | 100 | 100 | 100 | 2.34 s | 0.021 | 45 ms |
| Smart detail | 99 | 100 | 100 | 100 | 1.96 s | 0.021 | 42 ms |
| Products | 97 | 100 | 100 | 100 | 2.62 s | 0.021 | 43 ms |
| Distributors | 100 | 100 | 100 | 100 | 1.85 s | 0 | 37 ms |
| Arabic home | 92 | 100 | 100 | 100 | 3.31 s | 0 | 58 ms |

Performance and category-score targets were met across these measured pages. The LCP <2.5 s target was **not** met on products or Arabic home. The full self-hosted Arabic variable font remains a measurable cold-load cost. Production CDN caching and further font subsetting can be evaluated before launch. CLS <0.1 was met. TBT is reported as a lab metric; actual INP was not measured and no INP compliance is claimed.

An earlier measurement taken while other browser suites ran had a Smart score of 79 from high blocking time; that run is preserved separately in `artifacts/lighthouse-concurrent/`. The final sequential run used the identical application build and reduced Smart TBT from 827 to 42 ms. Performance measurements should run without competing browser suites. An intermediate invalid measurement during export/Node asset replacement was discarded; the final build was restored and the complete browser suite passed again.

## Visual review and refinements

Reviewed desktop home/hero, Turkish mobile, Arabic mobile, Smart and Promx details, product overview and distributor screenshots. Corrected Smart contrast on the dark hero, German headline wrapping, tablet footer intrinsic widths, navigation/table link targets and low-contrast engineering index. Corrected early interaction readiness and test waits for asynchronous navigation. Original Smart catalogue drawing is still the authentic fallback; it is not a replacement photograph.

## Remaining factual/configuration inputs

- Original attached Smart photograph binary for the cinematic photo treatment.
- Verified company legal identity, address, contact details, privacy controller/retention terms and certification evidence where applicable.
- HTTPS enquiry endpoint and confirmation of actual backend/CRM delivery; optional adapter code is implemented but live delivery is unconfigured.
- Final company review of all four translations and medical product wording.
- Production hosting/domain deployment. No publication or remote Git push was performed.

Cloud install/start instructions were saved in the environment configuration draft. Saving a draft does not publish either the environment or the website. The user can review/save the configuration in environment settings and publish the environment separately. The remote repository remains unborn; reproducibility depends on preserving/publishing the prepared snapshot or using the supplied source archive.
