# V11 product data audit

Audit date: 20 October 2026. Original company catalogues are the primary evidence. Page references below are **PDF page numbers**, not the printed portfolio page numbers. The V11 brief is also used to restrict choices when its newer supplied configuration list conflicts with a catalogue.

## Sources actually examined

- `public/documents/biosmart-catalog.pdf`, 24 pages. This PDF is raster-based: `pdftotext -layout` returns only 24 form-feed characters. PDF pages 2–14 were rendered and visually inspected; pages 3–8 establish the published Smart engineering and dimension facts, pages 10, 11, 13 establish family-level prosthetic categories.
- `public/documents/biovent-catalog.pdf`, 18 pages. Its text layer was extracted and reviewed. PDF page 5 was also rendered and visually inspected to resolve the two Ø3.3 Compressive rows. PDF 4 establishes VTX Two Piece dimensions/references and connection/surface; PDF 7 establishes Zygomatic dimensions/references.
- Existing `data/references.json` and source-preservation check: ProMX and Zygoma original reference strings are retained, including spaces and suffixes.
- Original Smart asset manifest `data/smart-asset.json` identifies the imported user original and its SHA-256. New Promx master manifest remains not ready; no substitute is described as that original upload.

Catalogue SHA-256:

- `biovent-catalog.pdf`: `d8ec25c0c315e4d40f060a2ee3b7945ff79daee90aac2ebc6f2a8667715c973f`
- `biosmart-catalog.pdf`: `b897cb059d85ada02ceaa7fe6d4fca1b2c92d13b3a2b9cab329c83af437be5cd`

## Central source of truth

`data/product-variants.json` is the committed configuration allowlist. `data/product-knowledge.ts` types and validates it, exports `getVariants(productOrId)` and `resolveVariant(id, diameter, length)`, and records source page, reference when unambiguous, standard/short grouping and `catalogue-listed` verification. The status describes a document listing; it is not stock availability, regulatory clearance or suitability for a patient.

`data/products.ts` keeps the existing public Product fields. All product diameter and length lists are now **derived from the same allowlist**, rather than maintained as a second numeric truth. Aggregate diameter/length lists do not imply that every Cartesian combination is offered. Only `resolveVariant` can validate a pair.

Published pair counts: Smart 17, ProMX 35, Monoblock 23, Zygoma 9 (84 total).

## Smart diameter correction and conflicts

V10 `data/products.ts` listed Ø5.0 mm. The actual BIOSmart PDF 7 states **Ø5.5 mm**, and PDF 8 shows the short group at Ø4.0, Ø4.5, Ø5.5. V11 corrects the model to Ø5.5. The localized Smart specifications have been checked and consistently refer to Ø5.5 in EN/DE/TR/AR.

| Diameter mm | Published lengths mm |
|---|---|
| 3.5 | 8, 10, 12.5 |
| 4 | 5, 8, 10, 12.5, 15 |
| 4.5 | 5, 8, 10, 12.5, 15 |
| 5.5 | 5, 8, 10, 12.5 |

Source mapping:

- Ø3.5 standard: PDF 4.
- Ø4.0 standard: PDF 5.
- Ø4.5 standard: PDF 6.
- Ø5.5 standard: PDF 7.
- Short 5 mm in Ø4.0, Ø4.5, Ø5.5: PDF 8.

**Unresolved newer-source conflict:** PDF 7 also shows Ø5.5 × 15 mm. The supplied V11 brief explicitly lists Ø5.5 only at 5, 8, 10 and 12.5 mm. V11 publishes the intersection of these sources, holds Ø5.5 × 15 for manufacturer confirmation, and rejects that configuration in `resolveVariant`. The original PDF remains unchanged and accessible. `configurationReviewHolds` records this decision in code. No implant SKU appears on these Smart dimension pages, so no Smart implant SKU is invented.

**Connection language conflicts:** BIOSmart PDF 2 has the header “Conical-Hex Connection,” but its body copy explicitly names DXL® implants and a “sealed-fit” interface and describes “SBAE.” PDF 3's BIOSmart engineering diagram directly names internal conical connection / platform switching and SLA. Its raster taper-angle text is not reliably consistent with the brief's “5-degree” request. V11 therefore publishes the clear neutral PDF 3 facts, not the DXL-specific sealed-fit language, numeric taper angle, or implied clinical outcomes. Five-degree/double-contact dimension claims require a legible approved engineering drawing.

Confirmed Smart geometry: internal conical connection/platform switching, wide flat collar, tapered body, self-tapping thread design, rounded apex, and an SLA surface identified by the source. Claims about prevention of crestal bone loss, faster osseointegration, low-density bone performance or reduced sinus perforation risk are not elevated into website assertions from catalogue marketing alone.

## ProMX / VTX Two Piece

PDF 4 lists: 2.42 mm internal hex screw-type connection, SLA surface treatment, cover screw and implant carrier. The 35 individual combinations and all `CMX` references match the original table. Ø3.3 × 6 mm is an explicit dash and is rejected. Diameters 3.75, 4.2, 4.7, 5.2, 6 mm have listed lengths 6, 8, 10, 11.5, 13, 16 mm; Ø3.3 starts at 8 mm.

The material line is printed “Titanium Alloy Ti 6Al 4V ELI | CaP.” Because the pipe/CaP interpretation and exact current product qualification are not explained, no new material/coating assertion is derived from it in the model. Smart-specific connection geometry is not applied to ProMX. No universal prosthetic compatibility is inferred from the later generic portfolio component pages.

## Monoblock / Compressive

PDF 5 confirms the one-piece platform, one-piece implant analog `CAGM-215`, and transfer `CAGM-306`. These two are documented family-level relationships, not a general compatibility matrix.

The dimension table contains **two separately illustrated Ø3.3 rows**, without clear variant names:

- Row 1: no 6 or 8 mm; references `MX 103`, `MX 1153`, `MX 133`, `MX 163` at 10, 11.5, 13, 16 mm.
- Row 2: no 6 mm; `MX 833`, `MX 1033`, `MX 11533`, `MX 1333`, `MX 1633` at 8, 10, 11.5, 13, 16 mm.

These establish Ø3.3 lengths 8–16, while the exact implant reference for several pairs depends on an unnamed subtype. V11 allows the documented dimensions but deliberately omits **all Ø3.3 implant SKUs**, including the unique 8 mm cell, to avoid implying an approved subtype choice. Manufacturer confirmation is required for the reference mapping. Ø3.3 × 6 is rejected.

The Ø3.75, Ø4.2 and Ø4.7 rows have unambiguous references at each of 6, 8, 10, 11.5, 13, 16 mm; these 18 codes are reproduced exactly. The component materials (analog stainless steel, transfer plastic) are **not** assigned to the implant itself. The page's immediate-loading, angulation and narrow-ridge statements are not expanded into surgical recommendations.

## Zygoma / Zygomatic

PDF 7 lists Ø4.2 mm and lengths 35, 37.5, 40, 42.5, 45, 47.5, 50, 52.5, 55 mm. All nine `CAITI` reference strings match the original source, including `CAITI3742` at 37.5 and `CAITI4242` at 42.5; no numeric pattern is used to invent references. Connection, surface, material, prosthetic compatibility and anatomical trajectory are not extrapolated from other product families. No anatomical illustration is generated.

## Prosthetic scope

Smart PDF 10 depicts healing and temporary abutments, PDF 11 cemented and angled abutments, and PDF 13 the multi-unit family. These are associated as “catalogue-family-only,” linked back to their source page. They do not declare every diameter, platform, component generation or third-party product interchangeable. Monoblock analog/transfer have the explicit PDF 5 association noted above. ProMX and Zygoma model-specific prosthetic maps remain absent until approved compatibility documentation is supplied.

## Other unpublished assertions and pending evidence

- No manufacturing location is inferred from flag colors, German language, a GmbH name, or generic factory imagery. No new “Manufactured in Germany” claim is approved by this audit.
- No CE/FDA/MDR/ISO certification or regulatory market availability is inferred from product catalogues; original regulatory documents are required.
- Surgical kits or component illustrations do not constitute an approved surgical manual/IFU. No newly invented drilling protocol, treatment selection or clinical outcome claim is published.
- CAD/GLB, exploded geometry, verified alternate views, cutaways and clinical anatomical orientations are missing. The image-based viewer preserves the genuine image and uses whole-image zoom/pan; it is not a 3D model or physical magnification measurement.
- Technical translations are editorial translations of the confirmed neutral source descriptions; they are not claimed to be manufacturer-certified IFU translations.

## Validation evidence

Original catalogue files are not modified. Existing original-reference preservation checks remain applicable for ProMX/Zygoma. Runtime allowlist validation rejects duplicate pairs, invalid measurements or missing source pages. Final source/build/browser tests are recorded separately in `V11_QA_REPORT.md` by the main implementation workflow.
