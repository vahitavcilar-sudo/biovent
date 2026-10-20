# V12 visual audit — before implementation

Source inspected: `428547792490a96e2b85830177f65fd81e612fda`, the actual five-second V11 slider release. Browser baseline: `artifacts/v12/before`, 1440×900 and 390×844, home, Smart, collection, resources, about, professional and distributor pages. Home and Smart also have full-page captures. These are genuine Chromium captures, with reduced motion and a paused home slider for consistent review.

## Observed defects and intended corrections

| V11 observation | V12 action |
|---|---|
| Ten active CSS files, 182,543 bytes of source, with repeated overrides to the same selectors | Replace active legacy sheets with a centralized token system and purpose-based sheets. Archive old styles; do not append another version override layer. |
| Bright white 104 px header interrupts a near-black hero; logo and links have disparate proportions | Compact 80 px charcoal header, original logo on an ivory plaque, legible 13 px navigation and a restrained contact action. |
| Giant SMART watermark competes with the actual product; mobile imagery precedes the product name | Remove decorative watermarks, use a concise product title/headline and consistent image studio; mobile order becomes title → product → statement → action → navigation. |
| Pitch-black/white/off-white sections alternate abruptly; saturated red dominates buttons and selected labels | Graphite/titanium tonal surfaces with selective light technical areas; muted burgundy buttons and compliant silver/rose text accents. |
| Long pinned Smart story and a second engineering viewer repeat product explanations | One compact, reusable engineering workbench with feature-specific framing, accurate hotspots and a genuine, native-sized catalogue surface sample. |
| Smart mobile first viewport shows text and controls while the product only begins at the bottom | Rebuild the product hero grid; give the original implant image a dedicated visible middle area. |
| Headings and labels vary wildly, while technical/nav text is often 9–12 px | Controlled type scale: 48–68 px desktop hero, 38–52 section headings, 16–18 body, 13–15 navigation; mobile hierarchy tuned independently. |
| Product collection is four tall repetitive editorial scenes with large empty regions | Curated two-column portfolio with aligned image studios, meaningful verified distinctions and direct product/compare paths. |
| PDF covers act as disproportionately large artwork | Compact document identifiers, native-size cover previews, clear title/language/product metadata and view/download controls. |
| Forms look disconnected from technical pages | Shared surfaces, field borders, labels, focus/error styling and consistent spacing; retain separate business flows and truthful preview behavior. |
| White brand footer strip, repeated slogans and multiple visually unrelated finales | Calm corporate footer and one clear two-path conversion section. |

## Preserved behavior and evidence

Keep all 48 localized routes; original logo, Smart master and other genuine product renders; 84 allowed catalogue configurations; exact known references and review holds; source PDFs; four languages/RTL; five-second Smart-first sequence; explicit play/pause, keyboard, touch and reduced-motion behavior; search/filter, two/three-product comparison, image zoom/pan/reset and hotspots; exact configuration-to-inquiry transfer; distinct professional/distributor drafts, validation and optional receiver contracts.

Existing manufacturing location, certification, CAD and new ProMX-master evidence remain incomplete. No German manufacturing statement is established by the logo, language or suggested theme. The new corporate story uses documented product engineering and original catalogues. Source facts remain governed by `V11_PRODUCT_DATA_AUDIT.md`.

## Reference access

All seven official Straumann/Nobel/MegaGen URLs in the V12 brief were attempted. The configured proxy returned CONNECT 403 for each. `artifacts/v12/references.json` records the outcomes. Current live competitor visual inspection is unavailable; no competitor layout/assets were copied and no successful live review is claimed. The user's stated design principles guide the original BioVent work.

## Review gates

A: central tokens, contrast and shared UI. B: actual home captures at 1440×900, 1280×800, 768×1024, 390×844 and full desktop/mobile. C: Smart hero, engineering, selected feature, dimensions, documents and full mobile. D: collection, other products, resources, about, both forms and legal routes reviewed together. Record observed defects and corrections in the final implementation/QA report; build success alone does not approve a gate.
