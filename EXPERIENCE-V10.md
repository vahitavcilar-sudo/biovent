# BioVent V10 — product motion refinement

V10 supersedes the pending V9 video integration. The public experience uses authentic stills, no product autoplay films, no new dependencies, and the existing Next/React/TypeScript static export. The first Smart scene remains server-rendered. Catalogue facts, references, four locales, official logo and original Smart master are preserved.

## Motion ownership

`lib/showroom.ts` centralizes stage poses, scene timing, responsive intensity, collection travel and signature stagger. `lib/motion.ts` supplies easing and shared UI/route tokens. WAAPI owns scene entry/exit on outer product, copy, word, accents and action nodes. Nested CSS owners handle pointer, subtle ambient drift and scroll handoff. Existing scroll subscribers share one RAF; scroll-bound numeric values update DOM styles without per-frame React rendering.

Smart exits upward and recedes; Promx exits laterally; Monoblock rises and exits vertically; Zygoma uses a vertical mask and retreats along its long axis. Product images are never reflected, stretched, deformed or regenerated. Mobile uses 45% motion travel. Manual input stays manual until explicit resume; latest interrupted selection wins; hover, focus, offscreen, hidden tab, reduced motion and data saver suppress autoplay.

A single persistent red navigation marker moves using measured logical positions (including RTL). The hero copy withdraws before the product during native page scroll. Smart inspection continuously blends catalogue-based views on desktop, with a complete static mobile inspection layout; callouts and leader lines transition independently. The editorial four-system assembly has staggered whole-image entries, including restrained mobile movement. Product collection scenes use distinct travel and depth; selected comparison systems remain emphasized while all four systems' technical information remains available.

Internal product navigation uses a temporary, aria-hidden clone of the actual source image above a graphite transition. The clone scales uniformly toward the detail stage and is removed after arrival or interruption. Modified clicks, external links, PDF downloads, hashes, keyboard focus and reduced motion retain normal navigation. Detail entrance sequencing and the sticky chapter underline use separate timing and transform owners. Direct document visits retain their already-visible server-rendered opening; only route arrivals and below-fold reveals animate in. This avoids hiding the LCP candidate after hydration. The local launcher negotiates gzip for text while keeping images, PDFs and range responses byte-preserving.

## Asset limitations

The verified original Smart photograph is present. The newly posted 353×707 Promx original has not been retrieved as binary. Existing authentic Promx imagery remains; no claim is made that the new upload was imported. The WeTransfer archive was successfully retrieved in the refreshed environment and CRC/SHA-256 checked; it contains two original MP4s and no Promx PNG. Videos are preserved outside public output and are not used by V10. V9 intake helpers remain outside the active experience for future authorized work.

## Deployment boundaries

Static files and `.htaccess` are packaged for Apache/LiteSpeed hosting; no live Natro/JetPress changes are made. The enquiry form remains preview mode. QA WebM recordings are review evidence outside production assets. Windows launcher is cross-compiled; a physical Windows execution and live hosting validation require that environment.
