# V11 implementation report

The clean, unborn runtime checkout was restored from the exact checksum-verified V10 source ZIP. `V11_BASELINE.md` records the actual source findings and initial successful install, type check, export, source-preservation checks and current baseline captures. Competitor pages were blocked by the network proxy; `V11_REFERENCE_RESEARCH.md` distinguishes those failures from the user's requested UX principles and observed BioVent code. No competitor assets or code were copied.

The retained architecture is Next 16.4 / React 19.3 / TypeScript with statically generated EN/DE/TR/AR routes, native RTL, local Inter/Arabic fonts, original media, CSS/WAAPI motion, local typed content and an optional external enquiry adapter. No database, CMS, animation library or 3D engine was introduced.

`data/product-variants.json` is the canonical allowlist. `data/product-knowledge.ts` supplies typed configuration resolution, source proofs, verified features, resources and explicitly scoped prosthetic relationships. `data/products.ts` derives its aggregate dimensions from that allowlist. Runtime validation fails on malformed/duplicate source entries; selectors and incoming enquiry intents resolve the exact pair rather than combining independent lists or trusting a URL SKU.

Reused components include ProductShowroom, SmartStory, SignatureScene, ProductVisual, StaticImage, ProductTabs, ProductChapters, Comparison, DocumentCenter, the distributor flow, shared motion controller and static export/deployment tooling. Targeted extensions preserve their existing behavior and APIs where practical.

New modules are ProductDossier/TechnicalViewer, ProfessionalConversion, TechnicalPathways/DocumentationIntegrity, the `/inquiry/` route and professional form/service, V11 typed localized copy and scoped styles. Viewers transform whole original images only; no 360-degree or exploded geometry is fabricated. The existing richer Smart journey remains, with an additional sourced technical workbench. Patient suitability, universal availability and implant/component cross-compatibility are not inferred from catalogue listings.

Professional and distributor submissions have separate drafts, payloads and endpoint configuration. The opt-in PHP example revalidates against a trusted copy of the catalogue allowlist and includes spam/rate controls, but it is outside the public package and has not been run on PHP or real hosting. Accepted UI state requires a receiver's explicit `accepted:true`; default mode reports not sent and offers a local copy. No external email was sent during tests.

Portable static export uses a Node subprocess wrapper, keeping the same Next configuration and frozen lockfile. Windows local review is packaged with a dependency-free launcher; the source project itself uses standard Node/npm commands documented in `V11_LOCAL_RUNNING.md`. Hosting notes and source evidence remain separate from live publication.

Known external dependencies and unverified areas: new Promx master, original CAD/cutaways/additional views, standalone manuals/IFU, complete per-variant prosthetic compatibility, official manufacturing/regulatory/legal evidence, production receiver credentials and physical cross-browser/device/Windows/live Natro checks. Exact executed checks and measurements are in `V11_QA_REPORT.md`.
