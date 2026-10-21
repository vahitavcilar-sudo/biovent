# BioVent V13 — product and component data

V13 preserves `data/product-variants.json` and `data/references.json` byte-for-byte relative to V12. The 84 verified diameter/length pairs remain Smart 17, ProMX 35, Monoblock 23 and Zygoma 9. Exact product references remain source-derived; the Cartesian product of displayed dimensions is never treated as an availability list. `tests/product-data-v11.cjs` and `tests/configurations-v11.cjs` exercise the canonical data and actual selection controls.

The detailed provenance and deliberate ambiguity holds remain in `V11_PRODUCT_DATA_AUDIT.md`: Smart Ø5.5 × 15 is held against the supplied brief; two Monoblock Ø3.3 rows are not assigned ambiguous references; unprinted Smart implant SKUs are never invented. The original PDFs remain readable and unchanged.

Smart inspection expands to seven regions from BIOSmart PDF page 3: internal conical connection, platform switching, wide flat collar, tapered body, self-tapping thread, rounded apex and SLA surface. No numerical taper angle, Smart hex, sealed-fit, bone-loss, clinical success, treatment or healing claim is introduced. ProMX retains its own 2.42 mm internal hex and portfolio page 4 SLA listing; Monoblock remains one piece; Zygoma remains Ø4.2 mm with nine published lengths 35–55 mm. No Smart micrograph is reused as another family's proof.

`data/prosthetic-components.json` is the shared frontend/backend association registry:

| Family | Category/component | Source | Exact reference |
|---|---|---|---|
| Smart | Healing / temporary | BIOSmart PDF 10 | No category-level SKU assigned |
| Smart | Cemented / angled | BIOSmart PDF 11 | No category-level SKU assigned |
| Smart | Multi-unit | BIOSmart PDF 13 | No category-level SKU assigned |
| Monoblock | One-piece analog | BioVent portfolio PDF 5 | CAGM-215 |
| Monoblock | One-piece transfer | BioVent portfolio PDF 5 | CAGM-306 |
| ProMX / Zygoma | No model-specific association established | Await manufacturer matrix | None invented |

These seven records describe catalogue-family association, not universal platform, diameter, generation or third-party compatibility. Component enquiry URLs carry only the public family/component identifier and purpose. Client and PHP server reject unknown or cross-family component identifiers; the server derives canonical details from a checksum-pinned private registry. Configurations, contact details, free text and product references cannot be forged through a URL into accepted backend data.

Comparison now adds documented body design and named family component records; absent body specifications remain explicitly unavailable. Mobile comparison supports horizontal scrolling with a localized hint. The library has an extensible eight-category type, but only categories with genuine documents appear in its filter. There are exactly two downloadable original English PDFs; the four interface languages do not turn them into translated source files.
