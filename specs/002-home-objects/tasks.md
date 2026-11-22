# Tasks: Home made of objects

**Input**: `specs/002-home-objects/` (plan.md, spec.md, research.md, data-model.md, contracts/section-mount.md, prototypes/)

**Tests**: none (constitution II). Every task ends with an observable check.

**Design source**: the HTML files in `specs/002-home-objects/prototypes/`. Code reproduces them; it does not redesign. Brand lime: every `#C6F06B` becomes `#D6F35C`.

## Phase 1: Setup

- [ ] T001 Commit `public/llms.txt` and the spec folder on branch `noe-558-home-objetos` (stage by name). Check: `git log -1` names NOE-558.

## Phase 2: Foundational (blocks every story)

- [ ] T002 Create `src/home/useMount.ts`: a hook that takes `(mount, data)` and returns a ref callback; on attach it calls `mount(root, data, { reduce })` once and on detach calls the cleanup (StrictMode safe). Follows `contracts/section-mount.md`. Check: `npx tsc --noEmit` clean.
- [ ] T003 Split the route in `src/App.tsx`: `/` renders `<ScrollToTop/>`, `<Suspense><Home/></Suspense>` and `<CookieConsent/>` outside `Layout` (like `/essay`), and still runs `useAnalytics` (call it inside `src/pages/Home.tsx`). Other routes unchanged. Check: `/about` still shows the old Navbar and Footer.
- [ ] T004 Rewrite `src/pages/Home.tsx`: keeps the current `SEO` block; renders, in order, `HomeTopBar`, `IdeaGalaxy`, `ProjectWallet`, `WorkPassport`, `LearningSlot`, `TipsAndFooter` (empty placeholder sections are fine until each story lands). Remove the old home sections from this page only. Check: build passes and the page shows the sections in order.
- [ ] T005 Create `src/home/HomeTopBar.tsx` from the bar in `prototypes/hero-galaxy.html` (logo mark link to `/`, lime Subscribe button that smooth-scrolls to `#subscribe`), absolutely positioned over the hero. Check: visible at 1440 and 390, Subscribe scrolls.

## Phase 3: User Story 1, the hero galaxy (P1)

**Goal**: the idea galaxy exactly as `prototypes/hero-galaxy.html`. **Independent test**: open `/`, wait 16 s, hover three stars, click the logo, reduced motion shows the finished state.

- [ ] T006 [P] [US1] Move the `CONTENT` block of `prototypes/hero-galaxy.html` to `src/home/data/galaxy.ts` (typed, exported).
- [ ] T007 [P] [US1] Port the hero CSS to `src/home/sections/idea-galaxy.css`, scoped under `.home-galaxy`, keyframes prefixed `galaxy-`, lime `#D6F35C`.
- [ ] T008 [US1] Port the hero script to `src/home/sections/idea-galaxy.mount.ts` per the contract: markup rendered into `root`, all lookups through `root`, listeners on one AbortController, rAF ids, timeouts and observers cancelled in cleanup; nav bar markup removed (lives in HomeTopBar). Lime `#D6F35C`.
- [ ] T009 [US1] Create `src/home/sections/IdeaGalaxy.tsx` using `useMount`. Check: the galaxy builds within 16 s, tooltips work, logo burst works, no console errors.

## Phase 4: User Story 2, wallet and passport (P1)

**Goal**: wallet and passport exactly as their prototypes. **Independent test**: open two projects and follow their actions; scroll the whole passport.

- [ ] T010 [P] [US2] `src/home/data/wallet.ts` from `prototypes/project-wallet.html` CONTENT (projects with pitch, price, action, platforms, stack).
- [ ] T011 [P] [US2] `src/home/sections/project-wallet.css` (scoped `.home-wallet`, keyframes `wallet-`, lime `#D6F35C`) and `src/home/sections/project-wallet.mount.ts` per the contract (scroll listeners via AbortController, cleanup).
- [ ] T012 [US2] `src/home/sections/ProjectWallet.tsx` using `useMount`. Check: pay animation, pitch with price first, action links real.
- [ ] T013 [P] [US2] `src/home/data/passport.ts` from `prototypes/work-passport.html` CONTENT.
- [ ] T014 [P] [US2] `src/home/sections/work-passport.css` (scoped `.home-passport`, keyframes `passport-`) and `src/home/sections/work-passport.mount.ts` (scroll-driven; listeners via AbortController; h2 and .sub lookups through `root`).
- [ ] T015 [US2] `src/home/sections/WorkPassport.tsx` using `useMount`. Check: the cover opens on scroll, six pages turn, stamps land.

## Phase 5: User Story 3, Learning out loud and tips (P2)

**Goal**: slot machine and tip terminal as their prototypes. **Independent test**: pull the lever three times, filter, choose a tip, choose No tip.

- [ ] T016 [P] [US3] `src/home/data/learning.ts` from `prototypes/learning-slot.html` CONTENT.
- [ ] T017 [P] [US3] `src/home/sections/learning-slot.css` (scoped `.home-learning`) and `src/home/sections/learning-slot.mount.ts` per the contract.
- [ ] T018 [US3] `src/home/sections/LearningSlot.tsx`. Check: reels stop in turn, ticket prints a different real video each pull, chips filter.
- [ ] T019 [US3] `src/home/data/tips.ts` from `prototypes/tip-terminal.html` CONTENT (tips, No tip lines, robots copy, Subscribe copy, footer links; the embedded `llms` text is dropped, see T022).
- [ ] T020 [US3] `src/home/sections/tips-footer.css` (scoped `.home-close`, lime `#D6F35C`) and `src/home/sections/tips-footer.mount.ts` per the contract, covering tip terminal, judged No tip, robots terminal, Subscribe button (`id="subscribe"` on its section) and footer. Cookie settings dispatches the existing `cookie-settings` window event; tip redirect uses the same-tab jump with the fallback button.
- [ ] T021 [US3] `src/home/sections/TipsAndFooter.tsx`. Check: tip flow, No tip flow, Subscribe opens YouTube, Back to top, Privacy, Cookie settings reopen consent.

## Phase 6: User Story 4, robots (P3)

- [ ] T022 [US4] In `tips-footer.mount.ts`, the robots terminal fetches `/llms.txt` at run time (single source, research R5) and shows a short fallback line if it fails; Open raw links to `/llms.txt`. Check: keyboard activation passes and the real file streams.

## Phase 7: Polish and cross-cutting

- [ ] T023 Remove now-unused home files (`src/sections/home/*`, `src/components/home/ServicesShowcase.tsx`) only after a search shows no other importer. Check: build passes.
- [ ] T024 [P] Export each approved section as a frame into Paper file 01M7DYS823S0HM6J3DY41TYTSE, page "Home objetos" (constitution III record).
- [ ] T025 End-to-end verification per `quickstart.md` at 1440, 768, 390: screenshots beside prototypes, console errors, horizontal scroll, leak check (home and About ten times), link crawl, Lighthouse mobile.
- [ ] T026 Independent reviewers (design fidelity, copy and facts, motion and reduced motion, code cleanup) score the home; fix below-minimum findings.
- [ ] T027 Push the branch and deploy a Firebase Hosting preview channel (approved by Noe); post the link and evidence in Linear NOE-558.

## Dependencies

- T001 → T002–T005 → stories. US1 (T006–T009), US2 (T010–T015) and US3 (T016–T021) touch disjoint files and run in parallel. US4 (T022) after T020. Polish after all stories.

## Parallel execution

- US1, US2 and US3 each go to their own Sonnet agent after Phase 2 lands.
- Inside a story, data and CSS tasks marked [P] can be done together.

## Implementation strategy

MVP is Phase 2 plus US1 (the new hero on the real route). Then US2, US3 and US4, each verified before the next merge into the branch.
