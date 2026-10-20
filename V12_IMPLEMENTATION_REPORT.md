# BioVent V12 implementation

## Result

The redesign is implemented in the original Next.js/React/TypeScript application. It changes page composition and the active design architecture, not only the colors. All 48 localized routes remain. The original four implant families, original logo, supplied Smart master, exact known references, 84 catalogue-listed configurations and four-language/RTL behavior are retained.

The source baseline is `428547792490a96e2b85830177f65fd81e612fda`. V12 work is isolated on `design/v12-corporate-2026-10-20`; live Natro/JetPress was not changed. Build identity and final test evidence are recorded in the QA report and each generated archive.

## What changed

- **Active design system:** one entry point, `styles/system/index.css`, with centralized colors/type/grid and separate layout, showroom, editorial, product, resource and form sheets. Ten prior active sheets are archived under `legacy/styles-v11`, outside application imports. Active source CSS is about 61 KB, roughly two-thirds smaller than the 182,543-byte prior stack. No extra runtime dependency or heavyweight animation/3D framework was added.
- **Header/footer:** 80 px graphite header, 76 px mobile, original black/red/yellow logo on an ivory plaque, compact localized navigation and clear professional contact. Mega menu, mobile focus trap, Escape/return focus, locale and URL-state preservation remain. A new corporate footer replaces the bright logo strip and repeated finale compositions.
- **Homepage:** concise Smart-first product studio and integrated index; title → image → technical statement → actions → navigation on mobile. Manufacturer introduction, editorial two-column portfolio, one genuine-image engineering workbench, comparison, documented technical pathways, compact library, documentation/quality story and separate professional/distributor conversion follow.
- **Showroom behavior:** the existing five-second controller is retained, with restrained product choreography. Explicit pause/play works. Hover, focus and manual choice do not introduce inspection pauses. Reduced-motion/data-saving users get five-second still-image changes. Background/menu/route suspension remains to avoid hidden/overlapping playback. Outgoing scenes fade as a unit so their descriptions/actions cannot overlap the incoming copy.
- **Product collection:** four editorial image studios with aligned metadata, original imagery, verified distinctions, catalogue links and comparison entry. This replaces four repeated tall product scenes.
- **Shared product details:** a genuine-image hero, chapter navigation, feature-specific inspection, catalogue-based profile, default-visible dimensions/configuration tools, scoped prosthetic/source documentation, related systems and professional enquiry. Smart was reviewed as the pilot before final family review. Zygoma retains its full-length proportions.
- **Engineering:** selecting a feature changes framing and zoom around its source-defined location; keyboard zoom, mouse pan and reset remain. Mobile feature navigation sits above the image in a horizontal strip. The viewer requests a stable detailed image to avoid replacing its candidate during a selection. Smart's separate surface illustration is shown only at native size with a source caption. This is image inspection, not CAD/3D.
- **Resources:** compact genuine covers, useful metadata and consistent view/download actions. Search, product/category intersection, no-results/reset states and English PDF-language disclosure remain functional.
- **Forms:** the distinct professional and four-step distributor contracts, session drafts, validation, preview/download behavior and genuine accepted-response requirement remain. Shared field, error, consent and review styles apply across languages. On mobile the form precedes supporting sidebar explanations. Hidden anti-spam fields no longer create RTL document overflow.
- **Company/legal:** company introduction and shared corporate presentation were updated; existing privacy/legal pages inherit the full new system. No unverified entity, manufacturing origin, certification or clinical claim was supplied to fill evidence gaps.

## Visual review and corrections

Real Chromium before/after images are delivered in the visual-review ZIP. Gate A established the tokens and original-logo treatment. Gate B reviewed 1440×900, 1280×800, 768×1024 and 390×844 home captures and full pages. Gate C reviewed Smart hero, engineering, connection/surface selections, specifications and documents on desktop/mobile. Gate D reviewed the collection, ProMX/Monoblock/Zygoma, resources, company and both enquiry paths together, plus German and Arabic samples.

Concrete refinements from those reviews:

1. Removed the oversized product watermark and repeated pinned Smart story; the real implant is the main focal point.
2. Moved mobile product photography before long copy and CTA groups.
3. Replaced double-counted scroll offsets, which left unnecessary space above target sections.
4. Replaced a long vertical mobile feature list with a usable horizontal selector above the image.
5. Bounded German documentation grid columns and allowed long words to wrap, eliminating tablet overflow.
6. Removed the RTL off-screen anti-spam positioning that expanded the page to 11,440 px.
7. Included the visible product index in each portfolio image link's accessible name, fixing WCAG label/name mismatch.
8. Kept document artwork small and placed useful language/source metadata beside it.
9. Reduced enquiry hero height and moved mobile forms ahead of supporting text.
10. Fixed outgoing text/action opacity during slide changes and kept detailed viewer imagery stable during selection.
11. Performance testing exposed a 0.355 mobile CLS caused by a client-only form replacing a short fallback. The form now renders in the initial HTML; only its URL-intent reader suspends. Existing validation and state-transfer tests cover the change.
12. Preloaded the local Latin font and first collection image, sized library cover requests to their actual small display, and fixed heading levels reported by Lighthouse.

## Scope and evidence limits

The original source catalogue still governs factual content. Smart Ø5.5×15 stays held; unsupported Smart SKUs and ambiguous Monoblock Ø3.3 reference codes stay withheld. ProMX and Zygoma do not inherit Smart's connection/prosthetic assumptions.

No approved CAD, extra macro angles, standalone IFU/surgical manuals, verified factory/quality photographs, manufacturing-location proof or regulatory documents were available. Honest image/source fallbacks are documented in `V12_ASSET_AUDIT.md`. Live competitor pages returned proxy CONNECT 403; this is an original design guided by the brief, not a claim to have inspected those live pages successfully.

Forms remain preview-only until real receivers and legal information are configured and tested. Windows EXE was cross-compiled with the verified Go toolchain; the shared launcher was executed/tested on Linux. Native Windows/Edge, Safari, physical phones, live Apache/PHP/Natro and field INP are not claimed as verified. See `V12_QA_REPORT.md` and `V12_DEPLOYMENT.md`.
