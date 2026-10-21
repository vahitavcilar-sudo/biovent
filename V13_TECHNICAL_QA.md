# BioVent V13 — technical QA

Final root build `BBD6KvV55GQMfAz6Py4ea`. Node 24.19.0 / npm 11.9.0 / Linux Chromium; static output served by the same shared Go launcher used for V12 baseline. Exact JSON evidence is in the source ZIP's `qa` folder and the visual-review ZIP; archived test files retain some V11 names because their catalogue contracts remain applicable.

## Executed validation

| Check | Executed scope |
|---|---|
| TypeScript and static production export | Passed; 53 generated outputs including 48 localized business routes |
| Complete-page QA | 48 routes × 12 widths = 576 layout checks; 96 full-page axe WCAG A/AA scans; four-language menu/Escape/focus behavior |
| Professional browser flow | 13 scenario groups, 16 layouts, validation focus, saved drafts, URL/reference guards, unsent download and separate storage |
| Professional accessibility | 9 form/page states |
| Distributor browser flow | Four locales, four steps, 16 axe states, validation, escaped review, saved draft and unsent download; zero external POSTs |
| Technical viewer | 32 family/locale/width checks, zoom/pan/reset/source links; 8 axe states |
| V13 prosthetic/engineering | Eight locale/width combinations, seven documented components, family guards, enquiry transfer, seven Smart features, body/apex views; 8 additional axe states |
| Comparison / resources | 48 responsive checks and 20 axe states; actual filters, source documents and horizontal comparison |
| Catalogue/configuration controls | 84 canonical pairs, exact references and holds; all 84 actual controls; four product-to-enquiry transfers |
| Deep links | Direct tabs, dimension hash/query, locale transfer and enquiry state |
| Showroom | Real approximately-five-second full loop, hover continuity, explicit pause, focus/manual inspection pause and focused Play resume; reduced-motion/data-saver instant cuts; 16 axe states |
| Interval configuration | Default 5000, valid 8000/15000 and invalid range/value rejection |
| PHP receiver/worker | 41 scenarios under real PHP 8.5.10 WebAssembly plus 7 PHP syntax checks; atomic private persistence, canonical validation, idempotency conflict/retry, spam/rate, privacy/config failure, mock transport retry/acceptance, retention purge |
| Configured browser adapters | Separate configured build `MpwRUKo09IdJD7rFMdL3M`; six local intercepted POST replies verify 503, 429, missing receipt rejection, accepted references and stable retry keys. No external submission |
| Launcher | Windows x64 cross-compiled with verified official Go 1.27.3; same source executed on Linux; all 425 exported public files checked by hash over HTTP, four languages/RTL, gzip/HEAD, PDF Range 206, redirects, failure routes and loopback-only binding |
| Source preservation | Original PDF/vector-logo hashes and full ProMX/Zygoma legacy reference mapping match |

Independent frontend ESLint is not configured and was not represented as run. TypeScript/build, PHP `-l`, actual browser/HTTP behavior and axe are separate checks. Automated accessibility results do not replace a human assistive-technology audit.

## Comparable local performance

Lighthouse 13, isolated Chromium per page, default mobile simulated throttling, same Go static server source and machine. Baseline before V13 changes; final measured without other browser QA running. Full HTML/JSON retained, including intermediary font/first-V13 trials to distinguish them from the final run.

| Page | V12 LCP | V13 LCP | Performance | Accessibility | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|
| home | 3.048 s | 2.426 s | 97 | 100 | 0.000000 | 119 ms |
| smart | 2.592 s | 2.264 s | 99 | 100 | 0.000000 | 60 ms |
| products | 3.101 s | 2.775 s | 96 | 100 | 0.000000 | 60 ms |
| resources | 2.433 s | 2.711 s | 96 | 100 | 0.000650 | 56 ms |
| inquiry | 2.015 s | 2.412 s | 97 | 100 | 0.000000 | 119 ms |
| distributors | 1.959 s | 2.026 s | 99 | 100 | 0.000000 | 69 ms |
| arabic | 3.182 s | 2.562 s | 97 | 100 | 0.000987 | 59 ms |

Target LCP ≤2.5 s: four of seven pages pass; collection 2.775 s, resources 2.711 s and Arabic home 2.562 s remain above target. Arabic improves about 19.5%, English home about 20.4%; performance 96–99 and all measured Accessibility/SEO/Best Practices 100. CLS remains well under 0.1; TBT is a lab metric, **not INP**. No field INP/CrUX or real-host latency is available; INP ≤200 ms remains a field-verification requirement. No metric was changed by removing an assertion or choosing a different final run for individual pages.

## Limits and dependencies

Physical Windows, native Edge/Firefox/Safari, actual mobile hardware, native PHP/Natro mail, Apache/LiteSpeed rules, domain TLS, real inbox delivery and platform fresh-task restoration were not executed. The configured adapter fixture build intentionally differs from the final preview-only build and its ID is reported separately. The PHP runtime executed real receiver code and temporary filesystem persistence, but mocked transport rather than a live mailbox; it does not establish Natro delivery. The PHP helper declares npm ≥11.16; installed npm 11.9 emitted warnings while installation and execution succeeded. No frontend runtime dependency was added.

Official company/reference HTTPS inspection attempts were blocked by proxy CONNECT 403. No current successful live visual review is claimed. Regulatory, factory, compatibility, legal-controller and retention assertions require approved source evidence.
