# Research: Living wallet cards

## Base image plus vector overlay
- Decision: keep a webp base and overlay only the moving parts as inline SVG.
- Rationale: full art inline is heavy (Kanji 1,318 paths, Galaxy 2,900 circles, Telar 535 KB with textures); overlays stay small, filters stay in the baked base, and iPhone layer memory is protected.
- Alternatives: inline full SVG per card (too heavy, filters cost memory); video or animated webp (looping, large, cannot rest on the static picture or replay on open); canvas per card (extra backing stores on iPhone).

## Motion engine
- Decision: Web Animations API on transform, opacity and stroke-dashoffset, the same as Whiteboard.
- Rationale: compositor-friendly, cancellable through the mount's AbortController, no new dependency.
- Alternatives: CSS keyframes (harder to trigger per card and on open), a motion library (new dependency for no gain).

## Trigger
- Decision: reuse the wallet IntersectionObserver (threshold 0.5, once) and the open-card hook.
- Rationale: Whiteboard already behaves the way Noe liked.
