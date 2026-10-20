# V9 authentic media intake and curation

V8 architecture audited: four-scene SSR-first showroom, centralized scene presentation, authoritative products/references, single-decoder media controller, native player, EN/DE/TR/AR, source-only documents, static export and Apache packaging preserved. V8 final evidence stays in artifacts/v8 and VALIDATION.md.

## Received, pending access

- `BioVent Videos (2).zip`: user supplied (sediment file_00000000ed7c821089d95ba0da3a49bd). Executor download rejected because file exceeds32MiB transfer limit. No contents read; no original SHA, codec, duration, audio or timestamp selection verified yet.
- `BioVent Monoblock DS V3.mp4`: user describes59MB,75s,1920×1080,H264/AAC24fps. These are unverified intake notes, not probe results.
- `BioVent Zygo.mp4`: user describes76MB,96.6s,1920×1080,H264/AAC24fps. These are unverified intake notes, not probe results.
- `promx-implant.png`: visual attached to chat, described353×707RGBA. Its original bytes are not yet available to the executor. Current547×1070 `assets/promx.png` is an older source and must not be relabelled as the new master.

Await smaller binary parts (<32MiB each) or an accessible direct download URL and original PNG. Preserve original source bytes outside public. Do not mark new production video approved until actual probing, frame/contact-sheet/audio review and segment selection. Never reuse QA WebMs or infer source frames/timestamps from the written description.

## Curation gate

For each master record exact filename, SHA256, size, probe streams/duration/codec/audio. Create timestamped contact sheets before selecting footage. Hero6–10s product-oriented only; full films retain16:9 and source logos; don't erase overlays, fabricate angles or repeat burned-in claims as verified HTML. Mobile may stay on authentic still if a safe crop cannot retain product/labels/logo.

Full films: native, explicit user play, preload none until request, no automatic sound, transcript/caption availability based on source audio review. Versioned web derivatives only in public; full master never copied to hosting. Final media budget/report and V9 QA require the actual sources.

## Prepared while originals are inaccessible

- scripts/import-promx-master.cjs: requires explicit visual-review flag and the described353×707 alpha PNG, preserves the master byte-for-byte and emits240/320/353px WebP derivatives without enlargement. Product data reads the approved new source centrally when imported. No new source has been imported yet.
- scripts/process-product-media.py: immutable master copy/hash/probe, exact5-second source-review frames, reviewed recipe gate, curated6–10s hero range, source-SHA validation, optional reviewed crop, H264/faststart/no-hero-audio, explicit poster time and byte budgets. Processing commands/provenance stay outside public. Only repeatable derivatives reach public.
- MediaStage: enabled gate for entry/pause/unmount, optional play-once/hold-end behavior and explicit narration/caption requirement. Existing informational defaults remain caption gated; reviewed speech-free films can use a descriptive transcript.
- TechnicalFilmSection: reusable16:9 poster-first native player, no source requests until user opens it, localized control labels, Escape/close, source catalogue access. It renders nothing until real source and transcript/caption approval; no fake availability badges or empty placeholder sections.
- Hero media starts only after the entry visibility delay and stops on explicit pause/offscreen/route/menu/preferences. Smart and Promx remain still scenes. Current Monoblock/Zygoma slots are disabled pending real source curation.

No V9 production delivery or media quality/performance approval yet. The current visible fallback continues V8; missing originals still block import, footage selection, poster/derivative quality review, the real mixed-media hero gate and final media-dependent QA.

## Source claim check before video access

Original portfolio PDF text was inspected. Zygomatic and Compressive entries are present. Text extraction did not locate micro-ring, axial-fixation, double-groove or enhanced-interlocking phrases. Extraction absence is not proof that a diagram lacks them; visually inspect authoritative catalogue pages before elevating burned-in video wording into HTML claims. Current verified Ø4.2 and35–55mm reference data remain unchanged.

Preparation static build and12 media-policy checks passed;528 exact-export responsive/function/SEO checks passed with current still fallbacks. Actual V9 clip quality, timestamps, soundtrack/captions, size/transfer metrics, source posters and final Lighthouse remain blocked by original-byte access. No prepared source or QA movie was published to GitHub/Natro or placed in real public media.


## V10 source access update — 2026-10-13

The refreshed environment successfully downloaded the authorized WeTransfer archive (135,782,442 bytes). CRC passes; SHA-256 `b5aef37a6e8688754d31f20dffe7bdbc45238da99114d07dede7c1d8091c34b9`. The two original MP4s are byte-preserved under `media-source/monoblock` and `media-source/zygoma`. They are **RECEIVED_UNREVIEWED**, with no approved segments or public derivatives. V10 explicitly supersedes video integration and uses stills only. The archive contains no Promx PNG; that original remains pending. `artifacts/v10/original-video-intake.json` records exact master hashes. Earlier V9 transfer-blocked entries are historical.
