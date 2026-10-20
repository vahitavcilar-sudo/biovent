# Biovent V5 — local test validation

Build ID: `SOUiSaxsYtX-fw-nStp_D`. Original logo and verified Smart PNG are preserved; source integrity checks pass. V4 evidence is retained in `legacy/V4-SMART-VALIDATION.md`.

- Strict TypeScript and static export pass: 44 localized routes, 49 build entries.
- 440 responsive layout checks and navigation, catalogue, PDF, selector and preview-form flows pass.
- 47 axe page/state scans pass with zero detected violations after finite entrances settle. This is not certification.
- Motion tests pass: eight viewport sizes, desktop parallax ≤6px, fitting sticky chapters, sequential mobile story, rapid-route replacement, dynamic reduced-motion navigation, Arabic reduced motion and mobile menu body-unlock.
- Hero/first-story benchmark was recorded and visually reviewed before expanding motion. Seven final-build browser recordings cover homepage load/scroll, engineering, route transition, touch menu, selector and distributor form. Time-indexed route/menu/form frames were reviewed.
- Native scrolling, no additional animation dependency, central CSS/JavaScript timing tokens. Real medical/source facts remain unchanged.

## Mobile Lighthouse

Same final static export, local gzip-enabled HTTP server, simulated mobile throttling. Not real Natro or Windows hardware. Accessibility, best practices and SEO score 100 for all measured pages.

| Page | Performance | LCP (s) | CLS | TBT (ms) |
| --- | ---: | ---: | ---: | ---: |
| home | 98 | 2.277 | 0 | 81 |
| smart | 99 | 1.956 | 0 | 65 |
| products | 96 | 2.783 | 0 | 54 |
| distributors | 97 | 2.457 | 0 | 76 |
| arabic | 89 | 3.683 | 0 | 69 |

Compared with the saved V4 run: home 92→98, Smart 93→99, products 99→96, distributors 99→97, Arabic 92→89. Layout shift remains zero; blocking time is low. Arabic LCP (3.683s) and products LCP (2.783s) remain above 2.5s in this run; Arabic mobile optimization remains a follow-up. No field INP claim is made.

## Local delivery and limits

Windows x64 launcher is cross-compiled from the supplied standard-library Go source. Linux execution of that server and packaged-file browser checks verify the serving implementation; the Windows executable is not executed here. ZIP members are SHA-256 verified. Extract everything and run SITEYI-AC.bat; no Node/Python installation is required.

Forms are preview-only and do not send mail. Actual enquiry service, company legal/contact details, medical/translation approval and real Natro Apache/PHP behavior remain unverified. No live hosting or existing WordPress files were changed. GitHub archive delivery is separate from live publication.
