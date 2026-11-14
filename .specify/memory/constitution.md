# noeosorio.com Constitution

noeosorio.com is Noé Osorio's personal site and knowledge hub: his projects, videos, podcast, essays
and what he is learning, in English, in the first person. It is a React 19 + Vite + Tailwind v4 app on
Firebase Hosting.

## Core Principles

### I. Real, Never Invented

- Every claim, role, date, number and project on the site MUST be true and checkable against a
  source (a repo, a video, a published page, or Noe's own confirmation).
- Numbers appear only when they carry a source and help the visitor; no vanity metrics.
- Copy is first person ("I"). No agency voice ("we"), no service packages unless Noe adds them.
- Only projects Noe approved appear. Private, deleted or joke projects never appear, and no single
  project becomes his identity.

Rationale: the previous site was mostly invented content; the brand now rests on proof.

### II. Done Is What a Visitor Sees

- Every spec states an acceptance bar written from the screens a visitor sees at 1440, 768 and 390
  px wide, including what MUST NOT appear.
- A change is done only when it was exercised end to end in a real browser against a local or
  preview build and graded by reviewers who did not build it, with screenshots as evidence.
- No new unit tests are written; builds and type checks are the floor, not the proof.
- A plan names the root cause it fixes; patches that hide a symptom are rejected.

### III. Design in Paper First

- Every new or changed screen is designed in Paper and approved by Noe before it is coded.
- Code matches the approved design; deviations go back to Paper first.
- Any motion work loads the emil-design-eng skill before motion code is written, and all motion
  respects `prefers-reduced-motion`.

### IV. No AI Slop

These rules apply to copy, design, layer names, docs and commit messages:

- Never the middle dot as a separator.
- No numbering for its own sake; no cartoon titles; no invented terms or Yoda grammar.
- No colored accent bar on the left edge of anything; no box inside a box inside a card; no hairline
  dividers as default structure.
- Nothing said twice on one screen; shortcuts live in tooltips; no counters, dates or metadata that
  do not help the next action.
- One clear most-important thing per screen; things that act look like buttons.
- Never name vendors (model providers, tools) in what visitors see.

### V. Built for 1000 Items

Every collection (projects, videos, episodes, essays, notes) MUST work with 1000 items: search,
filters and a dense view, without relying on pagination alone.

### VI. Brand Fidelity

Color and mark come from Noe's brandbook: the hexagon monogram, lime #D6F35C, petrol #175462,
dark petrol #052D37 and white. Any other color needs a stated reason in the plan.

### VII. Nothing Broken Ships

- Every internal and external link resolves to a real destination.
- Unknown URLs render a real 404 page served with HTTP status 404.
- Each page ships its own title, description, canonical URL and preview image in the served HTML,
  not only after JavaScript runs.
- Analytics run only after the visitor consents, and declining is as easy as accepting.

### VIII. Accessible and Fast

WCAG AA contrast, visible focus, full keyboard reach, alt text on every meaningful image, and
Lighthouse performance, accessibility and SEO scores of at least 90 on the home page on mobile.

### IX. One Source of Truth for Content

Copy and content (projects, videos, episodes, essays) live in typed data files or a content folder.
Components only render them; the same fact is never typed in two places.

## Security and Release Constraints

- Secrets live in the macOS Keychain locally and in the host's variables in the cloud; never in a
  `.env`, commit, chat, log or command argument. `.env` holds only non-secret settings.
- Deploying to the live noeosorio.com, spending money, exposing anything new to the internet or
  writing production data requires Noe's explicit approval each time.

## Development Workflow

- Spec Kit flow: specify, clarify, plan, tasks, analyze, implement. Noe approves the spec and plan
  before any code. Opus plans and reviews; Sonnet subagents implement approved tasks.
- Work happens in a git worktree created from origin/main, never in the main checkout.
- Every commit names a Linear ticket ID. Files are staged by name.

## Governance

This constitution supersedes other practices for this repository. Amendments are proposed in
writing, approved by Noe, and versioned with semantic versioning: MAJOR for removed or redefined
principles, MINOR for new principles or materially expanded guidance, PATCH for wording. Every plan
includes a constitution check, and `/speckit-analyze` reports violations before implementation.

**Version**: 1.0.0 | **Ratified**: 2026-11-14 | **Last Amended**: 2026-11-14
