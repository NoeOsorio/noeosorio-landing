# Tasks: Automatic deploys

## Phase 1: Foundation (blocking)

- [ ] T001 Fix the two type errors in src/home/sections/tips-footer.mount.ts (lines 457 and 458, `effect` as `KeyframeEffect`). Done when `npx tsc -b` and `npm run build` both exit 0 with the settings present.
- [ ] T002 [P] Create scripts/check-build-env.mjs. Before the build it exits 1, naming each missing `VITE_FIREBASE_*`. With `--after` it exits 1 if the project id is missing from dist/assets/*.js or any of dist/{kanji,essay,pyventa,porter-galaxy,maiden-os,telar,whiteboard,portfolio}.html is missing. It never prints values. Done when it exits 1 with one variable unset and 0 with all of them set.
- [ ] T003 [P] Update .env.example: drop `VITE_API_URL` and `VITE_FIREBASE_DATABASE_URL`, and add a one-line note that CI reads the values from GitHub repository variables.

## Phase 2: Previews and production (US1, US2, US3)

- [ ] T004 [US1][US2][US3] Create .github/workflows/deploy.yml as described in plan.md:
  - Triggers: push to main, pull_request from this repository only, workflow_dispatch.
  - Pinning: actions pinned by SHA, minimal permissions.
  - Build job: npm ci, guard, npm run build, guard --after.
  - Sign-in: WIF auth with `create_credentials_file`.
  - Main: production deploy with the commit SHA as the message, concurrency group `production` with no cancel.
  - PRs: preview channel `pr-<number>` with 7d expiry, plus one PR comment edited on each push.

  Done when actionlint passes locally (or `gh workflow view` shows it after the push).
- [ ] T005 [P] Write docs/DEPLOY.md: how deploys work, where settings live, the manual fallback, and rollback. 15 lines at most.

## Phase 3: One-time setup and verification (Opus, after Noe's yes)

- [ ] T006 Run Noe's `gcloud auth login`, then create the service account, pool, provider and binding, and set the GitHub variables without printing values (plan.md steps 1 to 4).
- [ ] T007 Amend .specify/memory/constitution.md to v1.1.0 (a merge to main is the approval to deploy).
- [ ] T008 Verification 1: the settings match the live bundle by hash.
- [ ] T009 Verification 2: the preview appears on this PR and updates on push.
- [ ] T010 Verification 3: missing settings stop the run before publishing.
- [ ] T011 Verification 4 and 5: merge, live within 5 minutes, two quick merges deploy in order.
- [ ] T012 Update NOE-558 in Linear and the deploy memories, so merging is the deploy approval.

## Dependencies

T001 blocks T004's build step. T002, T003 and T005 run in parallel. T006 blocks T009 to T011.
