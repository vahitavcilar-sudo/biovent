# BioVent V11 — reference access and implementation comparison

Research date: 20 October 2026. Read-only research; no competitor content, imagery, code or visual design was copied. The V10 source inspected below is the restored project under `/workspace/biovent`.

## Official reference access

All seven requested URLs were attempted using ordinary HTTPS GET requests through the configured environment proxy. Every attempt failed at the CONNECT tunnel with HTTP 403. This is a cloud egress restriction, not evidence of a removed page, expired URL, site-side denial, or the competitors' current UX. There is no usable browser/search connector available to this research agent. The following pages were **not visually inspected**:

| Reference | Official URL | Result |
|---|---|---|
| Straumann homepage | https://www.straumann.com/ | Proxy CONNECT 403 |
| Straumann iEXCEL | https://www.straumann.com/us/en/dental-professionals/products-and-solutions/dental-implants/iexcel.html | Proxy CONNECT 403 |
| Nobel N1 overview | https://www.nobelbiocare.com/en-int/nobel-biocare-n1-system | Proxy CONNECT 403 |
| Nobel N1 workflows | https://www.nobelbiocare.com/en-us/n1/workflows | Proxy CONNECT 403 |
| Nobel N1 resources | https://www.nobelbiocare.com/en-us/n1/resource-center | Proxy CONNECT 403 |
| MegaGen AnyRidge | https://www.megagen.com.tr/anyridge/ | Proxy CONNECT 403 |
| MegaGen product 1292 | https://www.megagen.com.tr/product/1292/ | Proxy CONNECT 403 |

Raw access outcomes are recorded in `/tmp/biovent-v11-references/results.json`. No downloaded page HTML was available. Do not label this deliverable a completed live competitor visual review. Implementation can proceed with the source-backed BioVent audit and the user's explicit information-architecture goals. Live reference review remains a nonblocking follow-up if access becomes available.

## Baseline from actual V10 code

| UX technique sought in the V11 brief | What exists in V10 | Safe V11 improvement |
|---|---|---|
| Product-first premium presentation | `components/motion/product-showroom.tsx`, `lib/showroom.ts`: four systems, distinct whole-image entry/exit poses, separate scene layers, persistent red marker, manual/keyboard/swipe controls, explicit pause and reduced-motion policies. `EXPERIENCE-V10.md` documents transform ownership. | Preserve the working stage rather than replacing it. Refine copy/context and product enquiry links; confirm rapid-input and reduced-motion behavior in actual browser tests. |
| Product-family storytelling | `components/sections/home.tsx`: hero → quiet statement → `SmartStory` → one four-product `SignatureScene` → comparison → workflow → documents → distributor finale. | Add verified professional product context and a distinct professional conversion path without repeating four identical introductions. Do not invent a production facility or German manufacture claim. |
| Technical product explanation | `components/product/smart-story.tsx`: continuous desktop Smart inspection, catalogue-supported chapters, callout/leader-line interactions and genuine photo. Other detail routes reuse `ProductVisual`, `ProductTabs`, dimensions and catalogue links. | Expand the existing product detail system with source-tagged features, accessible close-ups, a real 2D zoom/reset viewer and actual document relationships. Keep the static fallback complete. |
| Product configuration | `data/products.ts` supplies central product families and references; `components/product/dimensions.tsx` enables reference-backed configuration only for Promx and Zygoma. Smart/Monoblock have no `references`, so the component returns source notes instead of controls. | Model verified diameter/length combinations separately from optional SKU references. Permit real Smart configurations only after catalogue verification; never derive a Cartesian product of independent diameter/length lists. Carry selected values into professional inquiry. |
| Smart data consistency | Actual V10 `data/products.ts` includes Smart diameters `[3.5,4,4.5,5]`, no lengths. The V11 brief explicitly raises a 5.0 versus 5.5 conflict and provides diameter-specific lengths. | Resolve against the actual BIOSmart original and log the change. User-provided updates are evidence to investigate, not a reason to silently relabel a catalogue value or invent SKUs. |
| Comparison | `components/product/comparison.tsx`: selectable system buttons and a semantic table; all four columns remain visible and selection mainly dims unselected systems. Fields are design, connection, diameters and length range. | Evolve this component into actual two/three-system comparison, with consistent unknown values, source-tagged surface/prosthetic fields only when verified, catalogue links and a mobile table. Reuse the same product/variant source as detail pages. |
| Structured technical resources | `data/documents.ts` contains two genuine English catalogues; `components/sections/document-center.tsx` has all/Smart/portfolio filters, PDF metadata, working view/download links. | Add family/category filtering and search over available documents; show actual document language. Avoid empty downloadable manuals, IFUs, CAD libraries or certificate cards. Do not duplicate the PDFs. |
| Professional conversion | `components/forms/distributor-form.tsx` provides a multistep distributor form and product interest. `lib/enquiry-service.ts` posts only to an explicitly configured endpoint, otherwise returns `preview`. There is no separate professional/quotation form. | Highest-impact commercial addition: a distinct professional flow with name, company, country, email, optional phone/quantity, system, validated dimensions/reference, message and privacy consent. Keep distributor applications separate. No production-delivery claim without real endpoint credentials and end-to-end evidence. |
| Workflow clarity | Existing `Workflow`/`workflow-sequence` explains catalogue-based planning, component selection and prosthetic review using authentic assets. | Refine product/resource associations and explanatory hierarchy. Do not claim third-party CAD/planning software integration without compatible files and documentation. |
| International usability | Existing typed EN/DE/TR/AR copy, static localized routes, RTL layout, real source image proportions, native links, accessible controls and reduced-motion fallback. | Translate every new professional/configuration/resource label and validate mixed Latin references/numeric dimensions in Arabic. Never mirror the implants. |

## Highest-impact implementation sequence

1. **Protect technical truth first.** Verify Smart 5.0/5.5 and valid combinations; retain proven Promx/Zygoma reference rows; record each new feature's source and verification status. Separate missing SKU evidence from known dimensional configurations.
2. **Connect configuration to commercial action.** Build the independent professional/quotation flow and validated product-selection transfer while preserving the current distributor funnel. An honest preview/export path is appropriate until a genuine compatible backend is configured.
3. **Upgrade the shared product detail architecture.** Use reusable technical feature lists/accordions, source page links, complete product documentation and a genuine-image zoom/reset interaction. Give each family distinct optical framing and allow users to understand differences without clinical overclaims.
4. **Improve discovery using existing components.** Refine the comparison component, resource filters/search and professional CTA hierarchy. Avoid competing comparison widgets or fake empty resource categories.
5. **Polish, then verify.** Keep existing four-scene motion and authentic imagery; refine mobile composition, context links and visual hierarchy. Re-run current real route, selector, rapid-navigation, RTL, form and accessibility checks, then measure performance with other browsers stopped.

## Asset and evidence boundaries

A file inventory of `public` and `assets` found the two genuine catalogue PDFs and no GLB, GLTF, OBJ, STL, STEP/STP or FBX models. This research did not find an approved 3D model, assembly model or technical cutaway. `data/smart-asset.json` identifies the imported professional Smart master; `data/promx-asset.json` remains not-ready for the newly supplied Promx original. The existing Promx asset must not be described as that new binary upload.

The absence of verified 3D/CAD assets means the V11 viewer should truthfully remain a 2D inspection/zoom experience. No fabricated 360° spin, split implant geometry, exploded assembly, anatomical trajectory or competitor geometry should be introduced. Real close-ups can use whole-image framing of genuine approved assets; they must not fabricate a connection interior or surface microscopy.

Manufacturing images, regulatory certificates, facility details, precise prosthetic compatibility and market availability need original supporting evidence before publication. A premium product/engineering composition with source-linked facts is a valid fallback. Missing information should be internal TODOs or omitted from public claims, not placeholder downloads or invented specifications.
