# V12 QA and design review

Final build: `A6XzWk-OM9yukSmEjiWDu`. Baseline source: `428547792490a96e2b85830177f65fd81e612fda`; baseline captures use V11 build `5-nU_CHV3J_5jn5pM5mRd`. Final report JSON files and after-capture metadata are checked against the final build during packaging.

## Executed checks

| Check | Result / scope |
|---|---|
| `npm run typecheck` | Passed; actual TypeScript check, separate from lint. |
| `npm run export` | Passed; production build and static export, 48 business routes across four languages. |
| `npm run package:draft` / `package:hosting` | Passed; exact standalone document roots, genuine Smart master checksum required for hosting. |
| `node scripts/check-sources.cjs` | Passed; original logo/PDF checksums and exact reference mappings preserved. |
| `npm test` | Passed; 48 real routes, 576 responsive layouts from 360 to 1920 px, SEO/canonical/hreflang/direction, logo proportions, header overlap, menus and Escape/focus return in four languages. |
| Complete-page axe scans within `npm test` | Passed; 96 page/viewport states, WCAG A/AA through 2.2, zero reported violations. This is automated coverage, not a manual WCAG certification. |
| `npm run test:catalogue` | Passed; 84 allowed configurations, exact mappings, source pages, invalid/held combinations rejected. |
| `node tests/configurations-v11.cjs` | Passed; all 84 actual UI selections, URL state, exact known references and four product-to-enquiry transfers. |
| `npm run test:professional` | Passed; catalogue/payload validation, forged/private URL data guards, mocked accepted/error contract and preview with no external transmission. |
| `npm run test:forms` | Passed; professional form 13 behavior groups and 16 responsive layouts; nine form/error axe states. Four-language distributor four-step flow, 16 axe states, validation/focus, safe review, saved drafts and preview downloads. Zero real POST submissions. |
| `node tests/deep-links-v11.cjs` | Passed; direct dimensions, four-language URL/hash/configuration retention, enquiry transfer and document tab links. |
| `npm run test:technical-viewer` | Passed; 32 family/locale/viewport cases, mouse pan/reset, keyboard zoom, reduced motion and eight axe states. Original source links respond. |
| `npm run test:resources` | Passed; 48 resource/comparison viewport checks, four-language filter intersection/reset/empty states, two/three-product focus, exact dimensions/source context, PDF links and 20 axe states. |
| `npm run test:motion` | Passed; actual timed five-second full product loop, explicit pause/resume, no hover/focus inspection pause, manual progression, reduced-motion/data-saver instant cuts, 16 axe states. |
| Shared Go launcher HTTP check | Passed; all 424 exported public files match exact hashes, four languages/RTL, gzip quality/HEAD, PDF 206 ranges, hidden/missing files and unsupported methods. Executed on Linux; Windows EXE cross-compiled. |
| `git diff --check` | Passed; no patch whitespace errors. |

The accessibility suites total 165 scanned states (96 + 9 + 16 + 8 + 20 + 16); overlapping scopes are deliberate and are not 165 distinct pages. Tests retain `-v11` filenames where they enforce unchanged business/data contracts; evidence paths use V12. Historical pinned Smart-scene tests are retired because that repeated composition was intentionally replaced. No independent lint configuration/script exists, so no standalone lint pass is claimed.

## Visual gates and actual screenshots

Gate A: centralized graphite/titanium surfaces, muted burgundy action, local fonts and original-logo plaque. Full-page automated contrast scans passed on desktop/mobile. Gate B: actual homepage at 1440×900, 1280×800, 768×1024, 390×844 and full pages. Gate C: Smart desktop/mobile hero, engineering, selected connection, native-size surface sample, specifications, documentation and full page. Gate D: all other products, collection, resources, company, professional/distributor pages and German/Arabic samples.

`artifacts/v12/before` contains 18 actual V11 images. `artifacts/v12/after` contains 58 final images: 24 screen/full-page pairs plus ten selected Smart detail states. The visual-review ZIP contains an offline `index.html` before/after gallery, original-size screenshots, reports and Lighthouse reports. Capture mode deliberately uses reduced motion and pauses the home carousel for stable comparisons; the separately executed playback tests verify motion.

Concrete observed defects and fixes are listed in `V12_IMPLEMENTATION_REPORT.md`: product-first mobile ordering, removal of decorative watermark/repeated scenes, corrected scroll offsets, German grid wrapping, RTL anti-spam overflow, mobile feature navigation, accessible product link names, stable image candidates, compact metadata and earlier mobile form access. These are visual/interaction findings, separate from successful compilation.

## Subjective design scorecard

Author review, 1–5; this is a design judgment rather than an automatic quality score or independent user study. Abbreviations: CP corporate professionalism, CH color harmony, TY typography, PP product presentation, IH information hierarchy, SC spacing/composition, CO consistency, MV mobile quality, MR motion restraint, MC manufacturer credibility.

| Page | CP | CH | TY | PP | IH | SC | CO | MV | MR | MC |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | 4 | 4.5 | 4 | 4 | 4 | 4 | 4.5 | 4 | 4.5 | 4 |
| Collection | 4 | 4.5 | 4 | 4 | 4.5 | 4 | 4.5 | 4 | 4.5 | 4 |
| Smart | 4 | 4.5 | 4 | 4 | 4.5 | 4 | 4.5 | 4 | 4.5 | 4 |
| ProMX | 4 | 4.5 | 4 | 4 | 4 | 4 | 4.5 | 4 | 4.5 | 4 |
| Monoblock | 4 | 4.5 | 4 | 4 | 4 | 4 | 4.5 | 4 | 4.5 | 4 |
| Zygoma | 4 | 4.5 | 4 | 4 | 4 | 4 | 4.5 | 4 | 4.5 | 4 |
| Resources | 4 | 4.5 | 4 | 4* | 4.5 | 4 | 4.5 | 4 | 4.5 | 4 |
| About | 4 | 4.5 | 4 | 4 | 4 | 4 | 4.5 | 4 | 4.5 | 3 |
| Professional enquiry | 4 | 4.5 | 4 | 4* | 4.5 | 4 | 4.5 | 4 | 4.5 | 4 |
| Distributors | 4 | 4.5 | 4 | 4* | 4 | 4 | 4.5 | 4 | 4.5 | 4 |

*For resource/form pages, product presentation assesses product association/configuration clarity rather than a hero photograph. About-page manufacturer credibility remains below the 4/5 aspiration: verified facilities, origin, quality/certification and legal/contact evidence were not supplied. The page was refined around real product/documentation evidence, but visual decoration cannot establish those facts. No invented factory, certificate, metric or testimonial fills the gap. Other family pages are also limited to genuine available imagery and approved facts, not newly supplied CAD or clinical proof. Five-point ratings would overstate the available asset/proof set.

## Performance

Seven mobile simulated-throttling Lighthouse runs, performed alone against the shared Go preview server and the final exported assets. These are single laboratory runs, not field percentiles or a guarantee for Natro. Full HTML/JSON reports are in the visual-review archive.

| Page | Performance | Accessibility | LCP (s) | CLS | TBT (ms) |
|---|---|---|---|---|---|
| home | 94 | 100 | 3.031 | 0.000000 | 53 |
| smart | 98 | 100 | 2.434 | 0.000000 | 58 |
| products | 96 | 100 | 2.857 | 0.000000 | 63 |
| resources | 99 | 100 | 2.016 | 0.000000 | 60 |
| inquiry | 96 | 100 | 2.563 | 0.000000 | 109 |
| distributors | 98 | 100 | 1.960 | 0.000000 | 115 |
| arabic | 92 | 100 | 3.010 | 0.000736 | 168 |

Accessibility is 100 on all seven runs. Best-practices and SEO are also 100. CLS is below 0.1 on every measured page; the enquiry page fell from 0.355 before its server-rendering fix to 0.000 in the final run. The 2.5 s LCP target is met for Smart, resources and distributors, but remains above target for home (3.031 s), collection (2.857 s), enquiry (2.563 s) and Arabic home (3.010 s). Font/image priority and document-cover sizing were improved; the remaining LCP budget is explicitly open and should be checked with real hosting delivery and representative devices. No repeat was selected to conceal the final measurements. INP requires interaction/field measurement and was not established; TBT is not a substitute for INP.


## Boundaries and delivery

- Native Windows/Edge, Safari, Firefox, physical devices, Apache/LiteSpeed/PHP/Natro and real enquiry delivery were not executed here. Linux Chromium, static HTTP and the shared local launcher were executed.
- Forms remain preview-only. The request/download/validation interfaces work; delivery, approved legal identity/contact information and any manufacturing/certification assertions require real configuration/evidence.
- Approved CAD, additional macro imagery, new ProMX original and standalone IFU/surgical manuals remain unavailable. Source-based fallbacks are described in the asset audit; no fake 3D/product movie is used.
- Official competitor reference requests returned proxy CONNECT 403. No successful live competitor visual review is claimed.
- Source, ready Windows, hosting and visual-review ZIPs receive CRC validation, complete SHA-256 file manifests and direct-link download verification. Exact archive/download results live in the delivery manifest and delivery-branch README.
- GitHub delivery does not modify the live WordPress/Natro website. Hosting instructions describe a separate staging/document-root deployment, not a theme/plugin upload.
