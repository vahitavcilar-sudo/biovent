# BioVent V12 — Dark Titanium Corporate

The active system is `styles/system/`: tokens, base, layout, showroom, editorial, product, resources and forms. Legacy sheets are archived and are not imported by the application.

- Background `#111820`; secondary `#19232C`; elevated `#26323D`; borders `#35424C`.
- Text `#E8ECEF`; secondary `#A9B5BE`; light technical surface `#E7E9E8` with ink `#1B252D`.
- Burgundy action `#914149` with light text; accessible rose emphasis `#E5A6AC` on dark surfaces. The provisional `#A34B50` is reserved for decorative borders, not small body text. Contrast is checked in real browser states.
- Original black/red/yellow logo remains byte-identical, displayed on an ivory plaque rather than recolored for a dark background.
- Inter and the existing local Noto Sans Arabic remain; no new font family or runtime dependency. Hero 48–68 px, section 38–52, technical 28–36, body 16–18, navigation 13–15. Mobile hero 36–44, section 30–38 and body 15–17.
- Content width 1320 px, responsive gutters 24–64 px; sections 88–112 px desktop and 60–76 mobile. 80 px main header; 52 px product section navigation; explicit scroll offsets.
- Buttons have consistent minimum 48 px targets, quiet squared corners, one burgundy primary and restrained outlined/text alternatives. Focus outlines are clearly visible on both surface families.
- Main corporate pages use tonal graphite surfaces. Light surfaces are concentrated in technical tables, source references and selected product image studios; avoid rapid white/black alternation.
- Hero is an actual two-part product composition with a stable studio and integrated index. Mobile content has an explicit title/image/statement/action order. Product photos retain object-fit contain and are never mirrored or stretched.
- Portfolio uses an editorial two-column index, not four repetitive full-screen scenes. Resources prioritize metadata over enlarged cover imagery. Forms share the technical surface and field system.
- Motion: feedback 180 ms, interface 280 ms, reveal 480–650 ms, product 760 ms. Five-second rotation remains. No scroll hijack, ambient spin, neon glow or blocking preloader. Reduced motion uses instant product changes and static framing; explicit pause remains available.

Design gate review and corrections are documented in `V12_QA_REPORT.md`; palette alone does not establish visual quality. The 70/30 dark/neutral direction is a composition guide, not a measured area claim.
