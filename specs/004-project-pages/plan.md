# Implementation Plan: Project pages

**Branch**: `noe-558-proyectos` | **Date**: 2026-11-23 | **Spec**: [spec.md](./spec.md)

## Summary

Seven project pages are approved as prototypes in the session scratchpad:

| Page | Approved prototype |
| --- | --- |
| Kanji | kanji-v3 |
| Pyventa | pyventa-v3 |
| Porter Galaxy | galaxy-v3 |
| Maiden OS | maiden-v3 |
| Telar | telar-v3 |
| Whiteboard | whiteboard-v3 |
| Essay | proj-design2/essay.html |

Each is a standalone HTML page with its own scroll world, check.mjs and perf script. The build ports each one into the site as a lazily loaded vanilla mount under a shared project shell. They keep the home's `Mount` pattern (root, data, `{reduce}`) => cleanup, and add routes at the URLs the wallet cards already use.

Sim World is skipped because it is a work in progress. Its card keeps its external «Play now» action and gets no page.

## Architecture

- **Routes:** `/kanji`, `/pyventa`, `/porter-galaxy`, `/maiden-os`, `/telar`, `/whiteboard`, and `/essay`, which replaces the current EssayPage.
  - Each route lazy-loads `src/projects/<id>/index.ts` (mount, CSS, data, assets), so a visitor downloads only that page.
  - The old `/portfolio/:id`, `/landing/:id`, `/b2b/:id` and `/open-source/:id` redirect to the matching new page, or to `/portfolio`.
  - The dead detail components and their data are deleted after a grep confirms no imports.
- **Shell** (`src/projects/ProjectShell.tsx`):
  - the home header (HomeTopBar with the ES/EN switch where the page has one) and the real home footer (tips-footer mount)
  - per-page meta: title, description, canonical, og:url, absolute og:image, og:locale per language
  - the star field only where the page uses it
  - scroll restoration
  - The header hides or flips once the footer reaches it. This fixes the footer-under-header overlap seen in every prototype.
- **Entrance:** a shared `cardFlight` helper (FLIP). Clicking «Abrir proyecto» in the wallet's details panel captures the card rect, navigates, and the page's hero runs its entrance from that rect.
  - Direct visits run the hero's own in-place intro.
  - Reduced motion skips the flight.
  - The wallet card's tap still opens the details panel with the pay animation, as today. The new action sits next to the existing CTA.
- **Assets:**
  - Imported from `src/projects/<id>/assets` so Vite hashes every file (the cache fix from PR 9).
  - The Galaxy scrub videos (h264 plus webm, poster) are imported the same way. Only the size-matching source loads.
  - No remote fonts beyond the ones the site already loads. The Whiteboard handwriting font and the Telar mono are self-hosted or replaced with loaded fonts.
- **Data:**
  - Each page's copy lives in `src/projects/<id>/data.ts` in ES and EN.
  - Shared facts (name, price, platforms, CTA) are read from `src/home/data/wallet.ts`, the single source of truth.
  - Telar's wallet pitch is updated to the engine framing: «Visual novels that remember.»
- **Essay:**
  - The immersive prototype becomes the new `/essay`.
  - It keeps the existing waitlist logic: same Firestore collection, schema and validation, through `src/config/firebase.ts`.
  - It keeps ES/EN with `?lang=` and localStorage.
  - The prototype's 3D stage replaces the old one. iPhone memory must stay under the home's level, because `/essay` crashed iPhones before.
- **/portfolio:** the full wallet from proj-design2: a grid of the home's real cards (art plus overlays), search by name and topic, topic chips, a dense view, and row virtualization for 1,000 items. Each card opens its page; Sim World opens its external link.

## Quality bar (Noe)

- Animations fluid and performant:
  - one rAF with one damped scroll value that stops when settled
  - cached layout, no layout reads in the loop
  - transform, opacity, clip-path and stroke-dashoffset only
  - will-change only while moving
- Every style error from the prototypes fixed.
- No screenshots of apps beyond those Noe approved (Kanji phone screens, Pyventa POS, Galaxy app video).
- No middle dots, no vendor names, no pill chips, lights fade to zero.

## Verification

- Each page's prototype `check.mjs` is adapted to run against the built site at 1440, 1024, 390 and 320 px (ES and EN where present). Pass is 0 violations.
- Perf trace per page: 0 frames over 20 ms in Chromium with GPU.
- e2e across the whole site, run in Chromium and WebKit, must show:
  - no console errors
  - no horizontal scroll
  - no link landing on not-found, checked in a real browser
  - nothing leaking across route changes (home, page, home, ten times)
  - the /essay waitlist validating as before (a real write only with Noe's yes)
- iPhone-size layer memory per page at 390×844 dsf 3, at or under the home's current peak (297 MB).
- Before Noe sees it: an independent reviewer, one per page, judges the build side by side with the approved prototype video.
- Preview channel first. Production only with Noe's explicit yes, after merging to main.

## Execution

Sonnet subagents build; Opus reviews each diff and the frame grids.

1. **Foundation (one agent, first):** shell, routes, redirects, meta, cardFlight, the wallet «Abrir proyecto» action, a header that avoids the footer, and the asset import pattern. It ports Kanji as the reference page.
2. **Pages (parallel after 1, each touching only `src/projects/<id>/`):**
   - agent A: Pyventa and Whiteboard
   - agent B: Porter Galaxy and Telar
   - agent C: Maiden OS
   - agent D: Essay, which touches `src/pages/essay` and the waitlist
3. **/portfolio (one agent):** after 1.
4. **Verification and preview:** Opus, with independent reviewers.
