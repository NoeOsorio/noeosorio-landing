# Feature Specification: The remaining pages

**Feature Branch**: `noe-558-pantallas`

**Created**: 2026-11-27

**Status**: Draft. Contact concept pending Noe's pick.

**Input**: Noe, 2026-11-27: «¿Qué pantallas faltan? Antes de hacer el CI». «Ejemplo, no tenemos contact». «Contact first».

## Context (inventory, 2026-11-27)

Five screens still use the old site frame (old navbar, old footer, pill labels, bordered boxes):

| Screen | Today | Who reaches it |
| --- | --- | --- |
| /contact | «Say hi» card with the email, a copy button and five network buttons | Nothing on the new site. The new home shows no email anywhere. |
| /social | Link-in-bio list with a full-body photo | Nothing on the new site, likely the bio link on networks |
| /about | Full-body photo, skill chips, six job boxes, «Learning out loud» | The home footer |
| /privacy-policy | Plain text | The home footer and the cookie banner |
| Not found | «This page doesn't exist» with gradient buttons | Unknown URLs |

Also present:

- Dead code from the old Services pages (the route redirects to /portfolio).
- The old Navbar and Footer, used only by these pages.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reach Noe (Priority: P1)

A visitor wants to write to Noe or follow him. From anywhere on the site they find the contact page. There they copy his email or open it in their mail app in one tap, and see his networks. The page is one object from the home's world, not a form or a card with buttons.

**Why this priority**: today the new site has no way to contact him.

**Independent Test**: from the home, reach contact in one click, copy the email, and open each network.

**Acceptance Scenarios**:

1. **Given** the home or any project page, **Then** a link to contact is visible in the footer.
2. **Given** the contact page, **When** the visitor taps the email, **Then** it is copied and the page shows that it was. A second action opens the mail app.
3. **Given** the contact page, **Then** each network (YouTube, TikTok, Instagram, LinkedIn, GitHub) opens in a new tab and is recognizable by its icon alone.
4. **Given** /social (the bio link), **Then** it shows the same contact page, so there is one page to keep.

### User Story 2 - About in the new world (Priority: P2)

/about is redesigned as an object of the home's world. It shows what Noe builds and learns now, most recent first, with his past collapsed. It has no full-body photo, no skill chips and no stacked boxes. Its concept is proposed and approved separately.

### User Story 3 - Privacy and not found (Priority: P3)

The privacy page and the not-found page use the new frame (home header and footer, stars) with their current text. The not-found page answers with status 404.

### Edge Cases

- The email copy is blocked by the browser: the email stays selectable and the mail link still works.
- A visitor with reduced motion sees the object in its final state.
- 320 px wide: nothing scrolls sideways, and the email stays on one line or wraps cleanly.

## Requirements *(mandatory)*

- **FR-001**: The new footer MUST link to contact on every page that uses it.
- **FR-002**: Contact MUST show the email with copy and open-in-mail actions, and the five networks, read from the existing single source (`src/data/siteLinks.ts`).
- **FR-003**: /social MUST render the contact page with its own canonical URL.
- **FR-004**: Every page in this feature MUST use the new frame. The old Navbar, Footer, Layout and the Services code are removed once nothing imports them.
- **FR-005**: Each page MUST be designed in Paper and approved by Noe before it is built (constitution III), one page at a time, Contact first.
- **FR-006**: The not-found page MUST return HTTP 404 for unknown URLs (constitution VII).
- **FR-007**: No copy explains the design. There are no middle dots, pill chips or boxes in boxes.

## Success Criteria *(mandatory)*

- **SC-001**: A first-time visitor finds a way to contact Noe within 5 seconds of landing anywhere.
- **SC-002**: Copying the email takes one tap, on a phone and on a computer.
- **SC-003**: No page on the site uses the old frame.

## Assumptions

- The contact data (email, five networks) stays as it is.
- The home header keeps only Subscribe; contact lives in the footer.
- The About concept, which needs Noe's pick, comes after Contact.
