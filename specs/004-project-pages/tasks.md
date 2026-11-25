# Tasks: Project pages (build)

No unit tests. Each task's done-check is the page running in a real browser, passing its adapted check.mjs with 0 violations and its perf trace.

## Phase 1: Foundation

- [ ] T001 Build the shared shell in `src/projects/ProjectShell.tsx`:
  - home header and footer
  - meta per page
  - a header that hides or flips when the footer reaches it
  - lazy routes in `src/App.tsx` for /kanji, /pyventa, /porter-galaxy, /maiden-os, /telar, /whiteboard
  - redirects for the old detail routes
- [ ] T002 Add the `cardFlight` FLIP helper in `src/projects/cardFlight.ts`, and the «Abrir proyecto» action in the wallet details panel (`src/home/sections/project-wallet.mount.ts`) for cards that have a page.
- [ ] T003 Port Kanji to `src/projects/kanji/` as the reference implementation of the pattern:
  - assets imported and hashed
  - ES/EN copy in data.ts
  - check.mjs adapted to the built URL

## Phase 2: Pages (parallel; each touches only its own folder)

- [ ] T004 [P] Port Pyventa to `src/projects/pyventa/`.
- [ ] T005 [P] Port Whiteboard to `src/projects/whiteboard/`. Self-host the handwriting font.
- [ ] T006 [P] Port Porter Galaxy to `src/projects/porter-galaxy/`. Include the scrub videos and the poster.
- [ ] T007 [P] Port Telar to `src/projects/telar/`. Update Telar's wallet pitch to «Visual novels that remember.»
- [ ] T008 [P] Port Maiden OS to `src/projects/maiden-os/`.
- [ ] T009 [P] Build the new /essay from the immersive prototype in `src/pages/essay/`. Keep the waitlist logic and the ES/EN switch, and fix the meta.

## Phase 3: Portfolio

- [ ] T010 Build the full wallet at /portfolio in `src/pages/Portfolio.tsx`:
  - search, topic chips, dense view
  - virtualization for 1,000 items
  - real card art plus overlays

## Phase 4: Clean up and verify

- [ ] T011 Delete the dead detail components and data once a grep shows no imports.
- [ ] T012 Run the whole-site checks:
  - e2e (errors, overflow, links opened in a real browser, leaks)
  - iPhone memory per page
  - every page's check.mjs and perf trace
  - an independent reviewer per page against its prototype video
- [ ] T013 Build with the Firebase env and deploy the preview channel. Production only with Noe's yes.
