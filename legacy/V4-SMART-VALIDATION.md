# Biovent V4 — Smart photograph integrated

The original photograph is now available. This is a working local test build, not a published live site or a claim of completed real enquiry delivery.

## Source selection

Both user-uploaded files are 1320 × 1153. The lossless PNG was selected, with genuine alpha transparency (73.875% fully transparent pixels). The JPEG and PNG originals are preserved in assets/smart-user-originals. The selected PNG is preserved byte-for-byte at public/images/products/smart/smart-implant-original.png. SHA-256: a56f39ae5f888b6b957082c2f72df6a02ece10663dadcfaf092c30b01e0a8d67. WebP/AVIF derivatives only encode/resize without enlargement, geometry edits, new background removal or AI generation. Hero/Smart portfolio use the transparent source directly against the site background; primary product stages use object-fit: contain, no clip, transform, blend or filter.

## Current validation

Build ID: WgYw9gO07h-HlNCQuWW9b.

- Strict TypeScript and 49-entry static export passed, retaining 44 localized routes.
- 44 routes × 10 viewport sizes = 440 responsive checks passed on the local test server. Navigation, mobile menu/Escape, locale preservation, catalogue filters, product references, PDF access, form steps/draft download, safe rendering and reduced motion passed.
- 47 automated axe accessibility page/state checks passed, with zero detected violations; this is not a certification.
- 16 Smart page contexts across four languages / 28 Smart image placements were verified: master loaded, no missing-image placeholders, no cropping/filter/transform, indexable metadata.
- Original Smart checksum matched; original PDF/logo checksums and exact Promx/Zygoma references passed.
- Nine desktop/mobile screenshots were captured; homepage, Turkish/Arabic mobile and Smart product views were visually reviewed. User's final visual approval remains pending.
- Windows x64 executable rebuilt from the supplied Go source. Its PE32+ target was checked; the same server source was run and browser-tested on Linux. Windows runtime execution is not available here.
- Windows test ZIP contains actual exported pages, images/fonts/PDFs, dependency-free launcher, instructions, source, test report and per-file SHA-256 manifest. Every ZIP member is checksum-verified.
- Production static-folder/ZIP preparation now passes the original-photo gate; no live upload or WordPress overwrite was performed. Actual Apache/PHP/provider behavior remains untested.

## Mobile Lighthouse with the real Smart asset

Same exported files served through the gzip-enabled local HTTP review helper, simulating prepared Apache/LiteSpeed compression. This is not a measurement of real Natro hosting or the uncompressed Windows launcher. Final build ID matches all records.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| home | 92 | 100 | 100 | 100 | 3.025 s | 0 |
| smart | 93 | 100 | 100 | 100 | 2.066 s | 0 |
| products | 99 | 100 | 100 | 100 | 2.243 s | 0 |
| distributors | 99 | 100 | 100 | 100 | 1.805 s | 0 |
| arabic | 92 | 100 | 100 | 100 | 3.308 s | 0 |

Home/Arabic LCP remains above 2.5 seconds in these lab measurements. INP was not measured. No further live-host performance claim is made.

## Outstanding deployment work

Confirm company legal/contact/privacy details, configure and test actual enquiry delivery, review translations/medical content, and obtain final visual approval before public launch. Natro JetPress support for separate preview hosting is not confirmed. No live site publication was authorized or performed.

Previous pre-photo validation is retained in legacy/V4-PRE-SMART-VALIDATION.md.
