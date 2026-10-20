# Migration audit

The existing HTML, CSS, rendering script, locale data, source PDFs, extracted product assets, enquiry flow, README and both browser/accessibility suites were inspected before replacement. The pre-migration files are preserved in `legacy/`; the complete asset-inclusive archive is `/workspace/biovent-before-next-migration.zip`, with every entry's SHA-256 verified before migration. Git metadata was not altered.

Preserve: all four locales and RTL, approved product naming, PDF contents, source references, specification tables, product enquiry preselection, entered data across language changes, accessible navigation/tabs, reduced motion, filters, truthful privacy.

Improve: page composition, actual local fonts, product scale, navigation, mobile layouts, dimension selection, form errors and workflow, source/document presentation.

Refactor: catalogue data into typed records; translations independent of presentation; shared server-rendered sections and small client interaction modules; enquiry through a service adapter.

Replace: HTML-string rendering and hash routing with Next.js App Router and real localized routes. No runtime dependency on the legacy prototype. Old assets remain preserved; optimized web copies live under public/.

Catalogue checks: Promx reference mapping matches Biovent PDF page 4. Zygoma references match page 7. Compressive page 5 includes a duplicated 3.3 mm row; do not silently reinterpret that row or manufacture a complete size matrix. BIOSmart page 3 supports the conical connection, tapered geometry, thread design and SLA label. BIOSmart page 2 includes DXL terminology; no DXL-specific clinical text is assigned to Smart without confirmation.

Missing factual inputs: original inline Smart photograph binary, current legal company/contact details, certification scope, live enquiry endpoint. These are configuration/asset inputs, not invented claims. The generated product edit from the earlier task is excluded.

## V4 art direction / hosting pass — 9 October 2026

Preserved App Router/TypeScript/locales/RTL/SEO/PDF/reference/form architecture. Added original-vector BrandLogo, source-verified corrected PDF path winding, new editorial hero/portfolio/scroll story/library/footer, static responsive picture pipeline, basePath-aware documents/fonts/SEO, WordPress hosting preparation and disabled PHP adapter. The professional Smart photograph remains unavailable as a file. Unlike V3, V4 has **no catalogue fallback** in primary product visuals. Master state is `data/smart-asset.json`; import and production packaging are gated. Final visual acceptance and deployment ZIP remain pending the genuine original.


## Smart master supplied in smart-foto.zip

Selected the 1320 × 1153 PNG as lossless master with genuine alpha transparency. Both source files are preserved. All primary Smart placements use the verified master; the hero and dark portfolio use the existing transparency without a rectangular background panel. No generated substitution or geometry/background editing was performed.


## V5 motion implementation

See MOTION-V5.md and VALIDATION.md. V4 sources/branding stay authoritative. Native CSS/Web Animations, shared scroll scheduling, five engineering chapters, route choreography and progressive scoped form View Transitions are added without a motion dependency. Preview forms remain explicitly non-sending; GitHub test archives do not publish the live site.


## V7 continuity refinement

Persistent hero object, open flagship story, one signature, distinct collection scenes and dark distributor opening. Static export and source truth unchanged. Arabic core font/layout shaping and responsive image preload are optimized. Final measured performance96–99; Arabic LCP2.560s remains marginally above2.5s. See ART-DIRECTION-V7.md and VALIDATION.md for gates, visual findings and exact limits. No live publication.
