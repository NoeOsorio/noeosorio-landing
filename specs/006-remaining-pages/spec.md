# Feature Specification: The remaining pages

**Feature Branch**: `noe-558-pantallas`

**Created**: 2026-11-27

**Status**: Draft. Contact direction set by Noe on 2026-11-27: business card, LinkedIn first, no email, saveable to Apple Wallet.

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

### User Story 1 - Noe's business card (Priority: P1)

A visitor wants to reach Noe or follow him. From any page's footer they open his business card. It's a card of the home's family that reads well on a phone and on a computer. Its main action is LinkedIn. It also shows his networks, and it can be saved to Apple Wallet, where it stays as a card with stamps in the style of a loyalty card.

Noe, 2026-11-27: «mi primera forma de contacto sea LinkedIn», no email («en correo es muy fácil hacer phishing… scams»), and «que la puedas guardar en tu Apple Wallet… como si fuera un sistema de puntos».

**Why this priority**: today the new site has no way to contact him, and the old page pushes email, which he does not want.

**Independent Test**:

- From the home, open the card in one click and reach LinkedIn in one more.
- On an iPhone, add the card to Apple Wallet and find it there with his networks.

**Acceptance Scenarios**:

1. **Given** the home or any project page, **Then** a link to the card is visible in the footer.
2. **Given** the card, **Then** its main action opens Noe's LinkedIn. **No email appears anywhere on it**, and the page does not say that email is not answered.
3. **Given** the card, **Then** YouTube, TikTok, Instagram and GitHub are reachable and recognizable by icon alone.
4. **Given** an iPhone or a Mac with Wallet, **When** the visitor taps «Add to Apple Wallet», **Then** the pass is added. It carries his name, a stamp-card front and his network links, and its code opens the card page.
5. **Given** /social (the bio link), **Then** it shows the same card page.

### User Story 2 - About in the new world (Priority: P2)

/about is redesigned as an object of the home's world. It shows what Noe builds and learns now, most recent first, with his past collapsed. It has no full-body photo, no skill chips and no stacked boxes. Its concept is proposed and approved separately.

### User Story 3 - Privacy and not found (Priority: P3)

The privacy page and the not-found page use the new frame (home header and footer, stars) with their current text. The not-found page answers with status 404.

### Edge Cases

- A browser or phone without Apple Wallet: the Wallet button is hidden or explains nothing. The card itself still works.
- A visitor with reduced motion sees the object in its final state.
- 320 px wide: nothing scrolls sideways, and the email stays on one line or wraps cleanly.

## Requirements *(mandatory)*

- **FR-001**: The new footer MUST link to contact on every page that uses it.
- **FR-002**: The card MUST lead with LinkedIn and list the other networks, read from the single source (`src/data/siteLinks.ts`). The email MUST NOT appear on any page of the site, including Privacy, About and the old footer.
- **FR-002a**: The card MUST offer an Apple Wallet pass, signed with Noe's Pass Type ID certificate. The certificate's private key stays in the Keychain and the signed pass is a static file served by the site.
- **FR-003**: /social MUST render the contact page with its own canonical URL.
- **FR-004**: Every page in this feature MUST use the new frame. The old Navbar, Footer, Layout and the Services code are removed once nothing imports them.
- **FR-005**: Each page MUST be designed in Paper and approved by Noe before it is built (constitution III), one page at a time, Contact first.
- **FR-006**: The not-found page MUST return HTTP 404 for unknown URLs (constitution VII).
- **FR-007**: No copy explains the design. There are no middle dots, pill chips or boxes in boxes.

## Success Criteria *(mandatory)*

- **SC-001**: A first-time visitor finds a way to contact Noe within 5 seconds of landing anywhere.
- **SC-002**: LinkedIn is one tap from the card. Saving to Apple Wallet takes two taps on an iPhone.
- **SC-003**: No page on the site uses the old frame.

## Assumptions

- The networks stay as they are, with LinkedIn first. The email is removed from what the site shows.
- Apple Wallet passes require an Apple Developer Program membership ($99 a year) and a Pass Type ID. Whether Noe already has the paid membership is to be confirmed.
- Google Wallet for Android is a later, separate proposal.
- The home header keeps only Subscribe; contact lives in the footer.
- The About concept, which needs Noe's pick, comes after Contact.
