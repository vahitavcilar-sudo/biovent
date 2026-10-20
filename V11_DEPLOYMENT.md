# V11 static hosting notes

This release prepares files; no Natro/JetPress/WordPress deployment has been performed.

1. Run `npm ci`, `npm run typecheck`, `npm run export`, then `npm run package:hosting` from the source.
2. Use the contents of `deployment/wordpress-hosting/public_html`, including `.htaccess`, or the static-hosting ZIP. Windows launcher files, source code, QA recordings and reports do not belong in the web root.
3. For an isolated preview folder, rebuild using its exact `NEXT_PUBLIC_BASE_PATH` and keep the export/package settings consistent. Do not overwrite an existing WordPress root as a preview step.
4. Apache/LiteSpeed must honor the supplied localized-route, trailing-slash, MIME, compression and cache directives. Verify all four language routes, asset paths, PDF links and HTTP range behavior on the actual host. A JetPress WordPress theme uploader is not a substitute for static-file hosting; use the host's supported file-manager/FTP workflow or a separately approved integration.
5. Forms remain preview-only unless each workflow's own receiver URL and server configuration are supplied. Professional payloads must route separately from distributor applications. The PHP example is opt-in, outside public output and requires a trusted copy of `data/product-variants.json`; follow `PROFESSIONAL-INQUIRY.md`, verify legal/privacy details, lint/run it on the actual PHP version and test real delivery/storage before enabling it.
6. Review the product audit and missing-assets report before publishing new clinical, manufacturing, origin, certificate or compatibility information. Existing genuine catalogue downloads are unchanged; no missing document has a fake download button.

Live PHP, mail delivery, Apache/LiteSpeed behavior, hosting cache/CDN and actual device Core Web Vitals remain deployment-stage checks. Local lab results are not production or field guarantees.
