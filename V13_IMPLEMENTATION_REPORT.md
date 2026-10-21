# BioVent V13 — corporate and engineering implementation

Version 13.0.0, final root build `BBD6KvV55GQMfAz6Py4ea`. Evolved from V12 source `3b86e5728d8db2460393f6652d6020be53a52594`, preserving the Next.js 16 / React 19 static architecture, original logo/media/catalogues, graphite design system and four languages. No new app runtime dependency or speculative rebrand.

## Resulting behavior

- The company profile, footer, legal/privacy content and Organization JSON-LD use the user-approved **Biovent Implant Systems GmbH**, **Am Hagelkreuz 23, 41469 Neuss**. Source documentation, engineering and partnership information replace generic About content. No German factory, production origin, registration number or certificate is inferred.
- Smart opens first. Four factual product headlines and compatible neutral studios improve visibility, including proportional long Zygoma framing. The original product pixels/geometry remain intact. Source lighting differences are documented rather than concealed with an invented render.
- Smart has seven distinct source-based engineering explanations, visible-image context, source-page links and purposeful inspection framing. All families have full/body/apex image views, keyboard zoom/reset, mouse pan, touch vertical scroll and reduced-motion behavior. This is genuine image inspection, not invented CAD/3D.
- Seven documented prosthetic categories/components have a selectable family/category/detail workbench, catalogue page, exact reference where published and family/component enquiry transfer. Unverified ProMX/Zygoma associations use a factual request path. No universal compatibility matrix is invented.
- Comparison includes documented body design and named component associations while preserving canonical dimensions, source references and mobile scrolling. Resources derive categories from actual metadata; exactly two original English PDFs remain available. Eight resource types are supported for later verified records.
- The professional and distributor forms remain separate. Both share a receipt contract with stable in-memory retry keys, explicit configuration/rate/network failures and no success without a receipt. Component intent survives URL/language/draft transfer and clears on family change; downloaded professional requests include the selected component.
- An opt-in PHP 8.1+ receiver validates fields and checksum-pinned catalogue data, rejects forged/cross-family selections, limits spam/rate, and atomically writes private durable receipts. A separate locked CLI worker handles retries, transport acceptance and approved retention cleanup. Defaults fail closed until approved recipients, sender, origin, private storage, salt and privacy settings exist. No real enquiry/email was sent here.
- Slider timing defaults to 5000 ms and can be rebuilt at 5000–15000 ms. The latest V13 brief's focus/manual-inspection pause supersedes the earlier V12 no-inspection behavior. Play resumes while focused; hover alone does not pause. Reduced-motion/data-saver modes still change products every five seconds using instant cuts.
- Below-fold product/cover images defer until near the viewport; unnecessary shared CTA/navigation prefetch is disabled. Font preload is locale-specific and the Arabic body font override is corrected. All public identity/SEO labels use BioVent / ProMX; the exact registered legal name and original BIOSmart source title are retained.

## Measured outcome

| Page | V12 LCP | V13 LCP | Performance | Accessibility | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| home | 3.048 s | 2.426 s | 97 | 100 | 0.000000 | 119 ms |
| smart | 2.592 s | 2.264 s | 99 | 100 | 0.000000 | 60 ms |
| products | 3.101 s | 2.775 s | 96 | 100 | 0.000000 | 60 ms |
| resources | 2.433 s | 2.711 s | 96 | 100 | 0.000650 | 56 ms |
| inquiry | 2.015 s | 2.412 s | 97 | 100 | 0.000000 | 119 ms |
| distributors | 1.959 s | 2.026 s | 99 | 100 | 0.000000 | 69 ms |
| arabic | 3.182 s | 2.562 s | 97 | 100 | 0.000987 | 59 ms |

English home LCP improves 3.048 → 2.426 s; Arabic 3.182 → 2.562 s. The 2.5 s target is met by four of seven measured pages; Arabic, collection and resources remain above it. All measured accessibility scores are 100 and CLS <0.1. Single local simulated-mobile runs are not field guarantees. INP requires field measurement and is not inferred from TBT. See `V13_TECHNICAL_QA.md` for method/limits.

## Files and delivery

New factual presentation lives in `ManufacturerProfile`, `ProstheticLibrary/Explorer`, localized `v13-copy`/`engineering-copy`, shared canonical component JSON and `deployment/form-backend`. Existing product, form, comparison, showroom and resource components were extended. Active styling remains in `styles/system`; previous archived styles remain inactive.

Deliverables: Windows review ZIP with standalone x64 launcher, complete source ZIP, static hosting ZIP, separate opt-in PHP backend ZIP and real before/after visual-review ZIP. No Natro/JetPress deployment occurred. Remaining legal, manufacturing, media and recipient requirements are documented in the readiness/content/resource reports.
