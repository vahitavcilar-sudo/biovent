# Biovent — international distributor website preview

A working, dependency-free static website preview. English, German, Turkish and Arabic; Arabic uses RTL layout. Starts with Smart Implant. Uses the original Biovent vector artwork extracted from the supplied Biovent catalogue, not a recreated text logo.

## Open the website

Extract the downloadable ZIP and open `index.html` in Chrome, Edge, Safari or Firefox. Keep the `assets` folder, `style.css`, `content.js` and `app.js` alongside it. No installation is needed for the preview.

For development, use the existing checkout (each cloud task is isolated; no Git worktree is needed):

```sh
cd /workspace/biovent
python -m http.server 8000 --bind 127.0.0.1
```

## Implemented

- Smart-focused home page, collection, Smart feature section and digital workflow section.
- Product collection, comparison table and four distinct product detail screens.
- Product overview/specification/document tabs with keyboard navigation.
- Source-backed Promx diameter/reference selector and Zygoma length/reference table.
- About page, original PDF resource library and document filters.
- Three-step distribution enquiry: company, territory/product interests, review/export.
- Required field validation, product-specific preselection, language switching without losing the active enquiry, safe text rendering and local TXT export.
- Responsive navigation, skip link, keyboard focus, RTL and reduced motion support.
- Privacy page accurately describing this preview's behavior.

## Product/source mapping

| Website product | Catalogue product | Source |
|---|---|---|
| Smart Implant | BIOSmart | BIOSmart catalogue |
| Zygoma Implant | Zygomatic | Biovent catalogue, PDF page 7 |
| Monoblock Implant | Compressive | Biovent catalogue, PDF page 5 |
| Promx Implant | VTX Two Piece | Biovent catalogue, PDF page 4 |

The user confirmed these names. Product image files and technical details are extracted from the supplied catalogues. The PDFs are unchanged copies. No certificate, clinical success rate, production origin or commercial support promise has been invented.

## Original Smart photograph

The inline photograph in the conversation was visible to the assistant, but its original binary file was not exposed as a downloadable file. The current homepage therefore uses an authentic BIOSmart catalogue illustration. An attempted generated presentation edit changed the product geometry and was excluded from the website.

The site is prepared for the original photograph: add its unchanged original file to `assets`, then set `MEDIA.smartHero` in `content.js` to the relative asset path. The homepage automatically uses the dark photography layout. It remains null until the actual source file is available. Product specification illustrations stay sourced from the catalogue.

## Preview limits

This is a locally reviewable prototype, not a published production website. The form explicitly does not send enquiries, and no analytics or tracking cookies are installed. Form entries remain in the active page and are cleared on navigation; downloading saves a local text file. No enquiries are silently retained.

All four languages have 169 translated copy entries and localized size-table labels. Native-language and technical terminology review remains necessary before publication. Catalogues are the original English PDFs, not translated catalogue files. Routes use hash navigation and a `lang` query parameter; production should use actual localized URLs and appropriate SEO metadata.

Before launch: obtain the original Smart photo file; verify current company/contact details and certificates; approve translations and product copy; implement the real enquiry recipient/backend with privacy information and abuse protection; prepare production localized URLs, SEO and hosting.

## Validation

See `VALIDATION.md`. Browser and accessibility tools are development-only; they are not required to open the site.
