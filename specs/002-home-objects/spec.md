# Feature Specification: Home made of objects

**Feature Branch**: `noe-558-home-objetos`

**Created**: 2026-11-21

**Status**: Draft

**Input**: User description: "New home page for noeosorio.com built from the approved prototypes, on a new branch, so Noe can see it working. Order: hero idea galaxy, Everything I've built (project wallet), Where I've worked (passport), Learning out loud (slot machine), tips (terminal with the judged No tip), robots-only llms.txt, Subscribe (YouTube, design on hold), footer. Top bar on the home is only the logo and Subscribe. Copy stays short. Everything real. Other pages out of scope."

## Approved source

Noe approved each section as an interactive prototype during the NOE-558 session (2026-11-19 to 2026-11-21). The prototypes are the design: the code reproduces them, it does not redesign them.

| Section | Approved prototype |
|---|---|
| Hero, idea galaxy | https://claude.ai/artifact/VknqgQfken6rdA2nejsJ8o |
| Everything I've built (wallet) | https://claude.ai/artifact/NUY4pQKCXGSqcJRdkuqLZz |
| Where I've worked (passport) | https://claude.ai/artifact/5khwRRenki68d2pdepuy1n |
| Learning out loud (slot machine) | https://claude.ai/artifact/BZWvroQdFjc99LT78d7HCZ |
| Tips, robots, Subscribe, footer | https://claude.ai/artifact/2zDxVUneKXds6PkcmqsxNc |
| Whole home, assembled | https://claude.ai/artifact/RxWGRB2GFpYVin5eL8VsgK |

Subscribe is approved only as a placeholder: Noe put its design on hold (2026-11-21). It ships as the current YouTube button and is redesigned later in its own change.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A visitor gets who Noé is in one screen (Priority: P1)

A visitor lands on noeosorio.com. Words for Noé's main concepts appear, turn into stars and build his logo with orbits; then many real ideas (and a few jokes) rain in and settle as stars. The headline says who he is in one short line. Hovering or tapping a star shows the idea it came from.

**Why this priority**: the hero is the first impression and the piece Noe asked to put the most effort into; it carries the "mad scientist with too many ideas" identity.

**Independent Test**: open the home at 1440 and 390 px, watch 16 seconds, hover or tap three stars, click the logo.

**Acceptance Scenarios**:

1. **Given** a fresh visit, **When** the page loads, **Then** the six big concepts appear one by one, collapse into stars and become planets on orbits, and within 16 seconds the LED logo is complete.
2. **Given** the galaxy is built, **When** the visitor hovers (or taps) a star, **Then** a small label shows that star's idea.
3. **Given** the galaxy is built, **When** the visitor clicks the logo, **Then** it bursts into its stars and pulls itself back together.
4. **Given** the visitor prefers reduced motion, **When** the page loads, **Then** the finished galaxy appears without movement and labels still work.
5. **Given** the top bar, **Then** it shows only the logo and a Subscribe button.

### User Story 2 - A visitor explores what Noé built and where he worked (Priority: P1)

The visitor scrolls into "Everything I've built": a wallet of project passes. Choosing one plays the pay animation with Noé's logo and then shows a short pitch with the price or availability first and the real action (download, play, view code, request it). Further down, a passport opens on scroll; each page is one job with stamps for what he built there.

**Why this priority**: projects and work history are the proof behind the brand.

**Independent Test**: at 1440 and 390 px, open two projects in the wallet and follow their action links; scroll through the whole passport.

**Acceptance Scenarios**:

1. **Given** the wallet, **When** the visitor picks a project, **Then** the pay animation plays and the pitch shows price first, then the problem, how it works and what is unique, then platforms and stack.
2. **Given** a pitch, **When** the visitor presses its action, **Then** it goes to the real destination for that project.
3. **Given** the passport, **When** the visitor scrolls, **Then** the cover opens and the pages turn one job at a time, newest first, and the stamps land as each page appears.

### User Story 3 - A visitor picks a video and maybe leaves a tip (Priority: P2)

In "Learning out loud" the visitor pulls the lever; the reels land on a topic and a ticket prints a real video with a Watch link. A list next to it shows the latest videos with topic filters. Lower, a tip terminal offers three tips; choosing one plays a thank-you animation and then sends the visitor to the tip jar. Choosing "No tip" plays the judged sequence and offers subscribing on YouTube instead.

**Why this priority**: content and support matter, but after identity and proof.

**Independent Test**: pull the lever three times, filter the list, choose a tip, choose No tip.

**Acceptance Scenarios**:

1. **Given** the slot machine, **When** the visitor pulls the lever (click, drag or keyboard), **Then** three reels stop in turn on one topic and a ticket prints a real video different from the one shown before.
2. **Given** a tip amount, **When** the visitor chooses it, **Then** the thank-you animation plays and the visitor is taken to the tip jar, with a fallback button if the jump is blocked.
3. **Given** No tip, **When** the visitor chooses it, **Then** the judged sequence plays and ends offering the YouTube channel.

### User Story 4 - A robot reads the site (Priority: P3)

An AI agent (or a curious person) presses "I'm a robot". If the movement looks human it fails with a joke; otherwise a terminal shows the site's llms.txt with Copy and Open raw.

**Why this priority**: a delightful extra, already approved.

**Independent Test**: activate it with the keyboard (passes) and with a long mouse path (fails).

**Acceptance Scenarios**:

1. **Given** the reverse captcha, **When** it is activated from the keyboard, **Then** it passes and the terminal types the request and shows the llms.txt lines.
2. **Given** the terminal, **When** Open raw is used, **Then** /llms.txt opens and is served by the site.

### Edge Cases

- Reduced motion: every section shows its finished state; nothing moves except fades.
- Small screens (390 px): no horizontal scroll; every target at least 44 px.
- Tab hidden or section off screen: loops pause.
- Leaving the home and coming back (client-side navigation): no duplicated loops, listeners or canvases.
- A redirect to the tip jar or YouTube is blocked: a visible fallback link remains.
- Slow fonts: the galaxy waits for fonts before measuring words.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home MUST show, in this order: hero (idea galaxy), Everything I've built, Where I've worked, Learning out loud, tips with the robots extra, Subscribe, footer.
- **FR-002**: Each section MUST look and behave like its approved prototype at 1440, 768 and 390 px.
- **FR-003**: The home top bar MUST contain only the logo (link to home) and a Subscribe button that scrolls to the Subscribe section.
- **FR-004**: All words, projects, jobs, videos, prices and links MUST come from editable content data per section, and MUST be real (no invented facts).
- **FR-005**: Section copy MUST stay short: one-line subtitles, status messages of two to five words.
- **FR-006**: Every motion MUST respect reduced-motion and MUST pause when off screen or when the tab is hidden.
- **FR-007**: Navigating away from the home and back MUST NOT leave running loops, timers or listeners behind.
- **FR-008**: Footer links (site and elsewhere), Back to top, Privacy and Cookie settings MUST work; Cookie settings MUST reopen the existing cookie consent.
- **FR-009**: /llms.txt MUST be served by the site.
- **FR-010**: Other pages (About, Portfolio, Essay, Contact, Social, Privacy, 404) MUST keep working exactly as today, with their current navigation and footer.
- **FR-011**: No link on the home may be broken; every internal and external link is checked before the preview is shared.
- **FR-012**: No vendor names, no middle dots, no repeated information on the home.

### Key Entities

- **Concept / Idea**: a label that becomes a star (heavy concepts become planets; ideas and jokes become stars).
- **Project pass**: name, card art, price or availability, action, pitch lines, platforms, stack.
- **Job page**: city, company, dates, main stamp, skill stamps.
- **Video**: id, topic, title, date, length.
- **Tip**: amount, label, icon, destination.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor sees the finished galaxy logo within 16 seconds of landing, without any input.
- **SC-002**: Side-by-side screenshots of each section (live branch vs. approved prototype) show no visible difference in layout, copy or color at 1440 and 390 px.
- **SC-003**: Zero console errors and zero horizontal scroll at 1440, 768 and 390 px across the full home and every interaction in the user stories.
- **SC-004**: 100% of links on the home resolve (no 404s, no dead anchors).
- **SC-005**: After ten home-to-About-and-back navigations, the page uses no more animation loops than on the first visit.
- **SC-006**: Independent reviewers (design, copy, motion, code) each score the home at or above their minimum before Noe sees it.

## Assumptions

- The prototypes' content (projects, pitches, jobs, videos, tips, llms.txt) is the approved content; it moves as is.
- Subscribe ships as the current YouTube button; its redesign is a separate change.
- Only the home changes; the shared navigation and footer of other pages stay as they are.
- The preview is a local build first; a shareable preview link needs Noe's yes (it is reachable on the internet).
- Brand lime: the prototypes use #C6F06B; the constitution names #D6F35C. Noe decides which one the home uses (see plan).
