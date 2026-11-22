# Quickstart: verify living cards

1. Build with the Firebase env (see 002 quickstart) and serve with `npx vite preview` from the worktree.
2. Scroll to "Everything I've built" at 390 (WebKit iPhone 15 Pro) and 1440 (Chromium). Every card animates once as it becomes half visible, ending within 2 s on its finished picture. Scroll back: no replay.
3. Open a card: its build-up plays once on the open card; the pay animation and details work as before.
4. Turn on reduced motion: finished pictures, no motion.
5. Compare finished frames with today's webp for Essay, Telar, Galaxy, Sim World and Kanji.
6. Run `e2e-final.mjs` (errors, overflow, links, leaks) and `homemem2.mjs` (layer memory within 10% of today).
