# V4 validation — 9 October 2026

**Draft, not a completed or visually approved V4 release.** The supplied professional Smart photograph is visible in chat but unavailable as a downloadable binary. Catalogue Smart is no longer used in product visuals. No new implant was generated, and no production hosting ZIP was fabricated.

## Verified independent work

- Strict TypeScript and 49-entry Next.js static export build passed; 44 localized page routes retained.
- Exact root draft folder served over HTTP: 44 routes × 10 viewport sizes = **440 responsive checks**, including original logo aspect ratio and optical width. Sizes: 1920×1080, 1440×900, 1366×768, 1280×800, 1024×768, 768×1024, 430×932, 390×844, 375×812, 360×800.
- A separate `/biovent/` build also passed the 440-layout functional suite. After the final footer/RTL pass, five representative subfolder routes were checked again for correct links, assets, hydration and zero browser errors.
- Root/default-locale and slash redirects, no-JavaScript HTML fallback, real HTTP 404 with exported error page, PDF access, resource filters, technical selector codes, keyboard tabs, mobile menu/Escape, locale preservation, preview form download and safe rendering passed.
- **47 axe WCAG A/AA page/state checks** passed: representative EN/DE/TR/AR desktop/mobile/tablet pages, open menu, form-error state and specifications. Automated coverage is not an accessibility certification.
- **9 mocked enquiry transport scenarios** passed. No real external enquiry was transmitted. Optional PHP example was prepared but not executed because PHP is not installed here.
- PDF SHA-256 checks and every Promx/Zygoma reference mapping are unchanged. Corrected primary vector logo matches its preserved exact-PDF-vector source copy.
- Original logo extraction defect was diagnosed against the rendered PDF: rectangle subpath direction had changed. V4 preserves the actual original path winding, group opacity and clipping, correcting damaged letters without redrawing or recolouring.
- Old catalogue Smart cannot be imported as the professional master: rejection was tested without modifying source state. Production folder/ZIP creation refuses absent original and checks its SHA-256 once available.
- Static responsive AVIF/WebP variants use srcset/sizes and never upscale source images. No Next image optimization server is required.
- Arabic subset covers all 44 Arabic codepoints in the locale content and retains GSUB/GPOS/variable axes. Original 165,960 bytes retained; subset is 149,980 bytes. The font is self-hosted and preloaded only for Arabic.
- Nine major desktop/mobile screenshots plus footer were captured and manually inspected. The corrected logo, paragraph rhythm, navigation, document library, graphite footer and RTL arrows were reviewed. Smart-dependent visual quality gates remain pending the photograph.

## Preliminary static-hosting Lighthouse

These scores are **draft measurements without the mandatory Smart master photo**, not final release acceptance. Build ID: uaPTxvpsvF37-pfcwtl91. Mobile simulated throttling, exact draft files over HTTP with gzip as prepared for Apache/LiteSpeed. The local helper verifies static HTTP behavior; it does not execute or certify Apache modules, .htaccess or PHP compatibility on the real host.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home | 94 | 100 | 100 | 69 | 3.07 s | 0.000 | 33 ms |
| smart | 97 | 100 | 100 | 69 | 2.47 s | 0.000 | 90 ms |
| products | 99 | 100 | 100 | 69 | 1.95 s | 0.000 | 35 ms |
| distributors | 100 | 100 | 100 | 69 | 1.75 s | 0.000 | 43 ms |
| arabic | 91 | 100 | 100 | 69 | 3.46 s | 0.000 | 57 ms |

The draft deliberately has `noindex,nofollow`, so Lighthouse SEO is 69; this is not a passing production SEO score. Canonical, hreflang, descriptions, sitemap and localized route structure passed functional checks. Production metadata becomes indexable when the verified original Smart photo is imported. The final SEO/performance run must be repeated with that real asset before release.

Draft performance targets were met with compression, but homepage and Arabic LCP remain above 2.5 s. CLS was 0 in these measurements. INP was not measured; TBT is a different lab metric. An uncompressed-static-server run scored 76–88 and is preserved separately; the prepared gzip transport improves this significantly. Ensure hosting compression is actually enabled and retest on the real destination.

## Prepared deployment structure

- `deployment/wordpress-hosting/draft-public_html/`: exact root draft, not approved for publication.
- `deployment/wordpress-hosting/draft-subfolder/`: separately built subfolder draft.
- `scripts/package-wordpress.cjs`: .htaccess, server root/default language handling, short HTML cache, versioned asset cache, compression and compatible headers; public output modes are 0644 files / 0755 directories.
- `tools/archive-hosting.py`: upload-only ZIP builder with source checksum/integrity verification; blocks without actual master photograph.
- `deployment/server/enquiry.php.example`: disabled, outside public package, server validation/origin checks/honeypot/rate limit/trusted server mail configuration.
- `DEPLOY-WORDPRESS-HOSTING.md`: backups, root replacement, preserving WordPress, subfolder/subdomain, SSL, cPanel/SFTP, endpoint setup and rollback.
- Cloud install/start draft updated for exact-folder static review. Saving is not publication; environment settings review/save/publication remain separate.

## Remaining required inputs/work

1. Actual user-supplied professional Smart JPG/PNG file. Import original, optimize derivatives, inspect all primary Smart contexts, finish homepage/Smart visual quality gates.
2. Repeat final screenshots, responsive/accessibility/Lighthouse checks using that asset; verify production indexing.
3. Produce the requested `biovent-production-wordpress-hosting.zip` from the final public_html contents only. It is not created yet because the mandatory photo is missing.
4. Confirm company legal/contact/privacy details and configure/test real enquiry delivery before any public launch. Certificate claims remain absent until verified.
5. Hosting provider Apache/LiteSpeed/PHP module behavior and actual domain/HTTPS configuration must be tested on staging. No live WordPress upload, overwrite, FTP, deployment or publication was performed.

The source archive is a **V4 draft source package**, not a finished visual release. Prior V3 archives are retained. No irreversible changes to the live website or Git remote were made.

## Smart image placement follow-up

Primary Smart stages now constrain the image to the full container with object-fit: contain and no image transform, clipping, blend or filter. Grid decoration is hidden when the real photo exists. TypeScript passed after this CSS-only update. The image attachment still provides no downloadable original file; the Smart master remains missing. Earlier build, screenshot and browser results precede this update. Final image integration and visual validation remain pending.
