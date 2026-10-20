# Biovent V5 — motion architecture and review

V4 identity, original logo, source catalogues, clinical wording and the checksum-verified Smart PNG remain authoritative. V5 changes experience, not product geometry or branding.

## Audit and stack

V4 had static hero content, simple hover transforms, a resizing header and chapter selection via a local IntersectionObserver. It had no coordinated route exit/entry, repeatable section grammar, product depth, animated technical changes or directional form transitions.

V5 uses the browser's Web Animations API, CSS compositor animations and progressive native form View Transitions. No Motion/GSAP/Lenis dependency is added: the required 2D gestures and five-chapter story do not require a second animation engine. Scroll remains native. Unsupported form View Transitions fall back to a short Web Animations entrance; reduced motion and keyboard step changes are immediate.

## Central configuration

`lib/motion.ts` owns timings, easing, reveal threshold and stagger. The locale layout server-renders those same values as CSS custom properties, so CSS and JavaScript do not drift. Timings: 180 / 280 / 480 / 750 / 1100 ms. One shared scroll/resize scheduler batches active scene callbacks into requestAnimationFrame. No perpetual JavaScript animation loop runs without a pointer gesture or scroll/resize event.

## Scenes and components

- CinematicHero: masked headline lines, label/body/CTA hierarchy, whole-image entrance, desktop 3px/8s ambient movement, fine-pointer parallax capped at 6px, grid opposite movement and restrained scroll exit. Mobile disables ambient movement; coarse pointers disable pointer parallax.
- RevealRuntime: one IntersectionObserver and a shared declarative `data-reveal` grammar; different line, content, image, product and metadata entrances. Runs once, handles newly inserted route/filter content, and leaves no-JavaScript content visible. Focus or reduced motion clears pending masks.
- PageTransition: non-interactive graphite wipe with a 2px red accent; 240ms cover and 400ms clear. Latest requested navigation wins, overlays have a timeout, no body lock is introduced, modifiers/external links/downloads/hash navigation remain native. Direction reverses for Arabic.
- SmartStory: five verified chapters; laptop-height-aware sticky image, fine SVG leader lines, 2–4px physical markers, small whole-image poses, chapter label swap and progress indicator. Mobile is sequential and unpinned. The implant is never warped or recoloured.
- Portfolio: staggered title/metadata/CTA hierarchy, up to 24px viewport handoff and 4px fine-pointer depth. No tilt cards or scroll hijacking.
- Header/menu/footer: stable outer header geometry with transform-only compaction, growing navigation underlines, staggered menu opening, short mobile closing, restrained column reveal.
- AnimatedSwap and form: fast reference/length crossfades, RTL-aware step movement, 280ms scoped native form snapshots, animated progress and calm errors. Keyboard focus takes priority. A success check appears only for real accepted transport responses; preview mode never pretends to send mail.

## Hero benchmark gate

Before expanding motion across the site, the homepage hero, first light section and one Smart chapter were built, exported, recorded and reviewed through time-indexed video frames. Benchmark evidence: `artifacts/v5/benchmark/hero-first-story.webm` and timeline.jpg. Final clips cover first load, homepage scroll, Smart chapters, Products→Smart navigation, mobile menu, Promx selection and form progression.

## Accessibility and performance interpretation

Text/data and focus remain readable; critical CTA/facts do not use low-opacity animation. Automated axe scans wait for finite entrance animations to finish, as checking halfway through an opacity entrance produces transient contrast readings. Assertions and all 47 page/state checks remain enabled. Infinite decorative ambient movement is not waited on. Reduced-motion and keyboard paths receive separate live checks.

Only transform/opacity/masks are used for primary movement; SVG leaders use dash drawing. Native form snapshots can interpolate bounds without repeatedly relaying out the live form. No fake loading screen, heavy blur, particles, fake CAD, custom scroll engine or public deployment is added. Field INP and physical low-power Windows/mobile hardware performance cannot be inferred from lab browser checks.
