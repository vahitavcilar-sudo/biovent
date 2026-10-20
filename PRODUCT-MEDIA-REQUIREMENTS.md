# Biovent V7 — authentic product media requirements

AVAILABLE: supplied Smart PNG/JPEG (originals preserved); responsive Smart derivatives; genuine catalogue Promx/Monoblock/Zygoma renders; source digital-workflow illustration and surface detail; official original logo; source PDF catalogues.
MISSING: all manufacturer product/company videos, matching first-frame video posters and authentic angle-frame sets. QA browser WebM files are NOT product media and must never enter public/media or hosting output.

| Slot | Status | Desired original assets | Budget / role |
| --- | --- | --- | --- |
| Smart hero | MISSING | smart-hero-desktop.webm/mp4, smart-hero-mobile.webm/mp4, approved matching posters | 6–12s, muted studio loop, ≤6MB desktop /≤3MB mobile |
| Smart inspection | MISSING | approved short inspection film, matching posters | scrub, metadata-first, ≤4MB |
| Smart connection/thread | OPTIONAL, MISSING | manufacturer macro loops and matching posters | 4–8s, ≤4MB each |
| Smart surface | OPTIONAL, MISSING | authentic source macro footage / surface imagery | no fake microscopy |
| Smart 360 | OPTIONAL, MISSING | authentic multi-angle frames or approved CAD-derived frames | drag/touch/keyboard/reset; no interpolation from one photo |
| Promx | MISSING | product loop, matching posters, optional authentic angles | ≤4MB; technical references remain separate |
| Monoblock | OPTIONAL, MISSING | authentic one-piece product loop | restrained, still fallback |
| Zygoma | MISSING | authentic full-length loop / angles | vertical geometry, no mirror |
| Digital workflow | MISSING | verified process/software footage and posters | ≤4MB; no invented UI |
| Brand | MISSING | biovent-brand-film-desktop.mp4, biovent-brand-film-mobile.mp4, matching poster files | user-controlled, localized captions + transcript required |
| Manufacturing / quality | OPTIONAL, MISSING | actual Biovent facility / inspection footage | no stock factory substitute |

Central mapping: data/media.ts. Product specifications stay in data/products.ts and references.json. Assets require approved=true, source provenance, actual file metadata (bytes/codec/resolution/duration/bitrate), genuine mobile variant and first-frame matching poster before activation. Mobile without a mobile alternative uses a still. Informational film without locale captions/transcript remains a still. Keep text in translated HTML, not burned into video.

Regenerate media report and verify hashes/file metadata when originals arrive. Do not manually label fabricated or QA footage as approved. Video validation requires native playback/seeking, Range206, mobile/Safari/Edge tests and performance budgets with the actual enabled assets. Real Natro behavior remains a separate deployment check.

## V8 four-system hero

| Production slot | Authentic still | Movie | Approval | Provenance |
| --- | --- | --- | --- | --- |
| smartHero | AVAILABLE | MISSING | Original still approved; video false | User professional transparent PNG, byte-preserved master |
| promxHero | AVAILABLE | MISSING | Existing genuine still retained; video false | V7 genuine Promx / VTX Two Piece render |
| monoblockHero | AVAILABLE | MISSING | Existing genuine still retained; video false | V7 Compressive render |
| zygomaHero | AVAILABLE | MISSING | Existing genuine still retained; video false | V7 Zygomatic render |

Only active hero mounts its MediaStage; outgoing mounts its still without a decoder. Other products are not preloaded as videos. Actual films require approved provenance, measured source metadata, poster and genuine mobile alternative. Initial Smart is server rendered with optimized responsive AVIF/WebP. Other renders mount on selection; no initial four-master preload. Geometry is never mirrored for Arabic. No new media files were fabricated.

## V9 intake — received but not accessible to the executor

BioVent Videos (2).zip was uploaded, but transfer to the workspace failed at the32MiB file limit. The user identifies Monoblock and Zygoma manufacturer films; their filenames/codec/duration/size are intake descriptions until actual probing. Status: RECEIVED_TRANSFER_BLOCKED, production derivatives not approved. Do not report them as verified or substitute QA recordings.

New353×707 Promx image is visible in chat but original PNG bytes are still required for byte-preserved import. Status: ORIGINAL_BYTES_PENDING. Old547×1070 asset is not the new original. Smart master, digital-workflow still and brand-film-missing status stay unchanged.

Prepared native technical-film and mixed-media components remain inactive until actual sources/curated posters, transcripts/captions and approved metadata are supplied. See MEDIA-MAP.md and MEDIA-PROCESSING-V9.md. V8 delivery and published ZIP links remain the current completed version.
