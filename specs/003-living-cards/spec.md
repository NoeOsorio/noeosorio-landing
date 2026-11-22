# Feature Specification: Living wallet cards

**Feature Branch**: `noe-558-cards-vivas`

**Created**: 2026-11-22

**Status**: Approved by Noe (concepts, 2026-11-22)

**Input**: User description: "Every project card in 'Everything I've built' gets the same kind of short 'in use' animation the Whiteboard card already has, playing once as the card loads. Card designs stay as they are. The Pyventa card is redesigned so it explains itself with no words."

Noe's words: «El de whiteboard me encantó porque tiene animación de cómo se está haciendo, como en uso. Podrías hacer lo mismo para todas las demás cards.» «Como una pequeña animación, no unos cuantos segundos. En lo que carga.» «Todo es autoexplicativo, nada de explicar con letras qué es.» On Pyventa: «no se entiende exactamente qué es», and the scribbled text «si te pasas, parece hebreo».

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Each card shows its project working (Priority: P1)

A visitor scrolls to "Everything I've built". As each card comes into view, its illustration plays a short moment of the product in use, then rests on the same finished picture the card shows today.

**Why this priority**: It is the request; Whiteboard already proves the idea works.

**Independent Test**: Scroll the home on a phone and on a desktop; every card animates once as it appears and ends on today's approved picture.

**Acceptance Scenarios**:

1. **Given** the cards rest stacked (only a top strip of each shows, except the front card), **When** a visitor opens a card, **Then** its full build-up plays once on the opened card, about 1.5 seconds, never longer than 2 seconds, like Whiteboard does today.
2. **Given** the front card of the stack (fully visible) comes half into view for the first time, **Then** it plays its build-up once.
3. **Given** cards behind the front one, **When** the stack scrolls into view, **Then** they stay still (no seven strips twitching at once) and show their finished picture.
4. **Given** a card already played on view, **When** the visitor scrolls away and back, **Then** it does not replay; opening it again replays.
5. **Given** the visitor prefers reduced motion, **When** the cards appear, **Then** they show the finished picture with no motion.

Per card, what plays:

- **Maiden OS**: redesigned (see User Story 3).
- **Essay Studio**: the scribbled lines write themselves, then the circle around a word, the "?" sticky note with its dotted line, the yellow highlight and the green underline.
- **Telar**: the cross-stitch thread weaves stitch by stitch from the left and branches at the diamonds, which light up as it reaches them.
- **Porter Galaxy**: the points fall into their orbits and the lime nodes light up.
- **Sim World**: one cell divides until it forms the colony while the other organisms drift in.
- **Kanji Study App**: 学 is painted stroke by stroke in correct stroke order, then the red seal stamps down.
- **Whiteboard**: unchanged.

### User Story 2 - The Pyventa card explains itself (Priority: P1)

A visitor sees the Pyventa card and understands it is a store checkout, with no words on the art.

**Why this priority**: Noe said the current card is not understood and its scribbles read like Hebrew.

**Independent Test**: Show the card's finished picture to someone who does not know the project; they can say "a store checkout receipt".

**Acceptance Scenarios**:

1. **Given** the card plays, **Then** a scanner laser sweeps the barcode, each product line prints onto the receipt with a price in digits and the sale completes with a total.
2. **Given** the finished picture, **Then** it has no words (no "OFFLINE" stamp) and no scribbles that look like a foreign script; product lines are short marks plus prices in digits.
3. **Given** the card sits in the stack, **Then** it keeps the warm paper receipt look and colors of today's card.

### User Story 3 - The Maiden OS card reads as an AI agent at work (Priority: P1)

Noe: «Maiden OS es más un agente de AI que estamos creando, así que debería ir con ese tipo de diseño; los switches no te dicen nada de Maiden.»

**Why this priority**: The current switches look like a settings panel; they say nothing about an AI agent.

**Independent Test**: Someone who does not know the project looks at the finished picture and says "an AI assistant doing tasks".

**Acceptance Scenarios**:

1. **Given** the card plays, **Then** a short request arrives in a chat, the agent answers with a brief "thinking" pulse, and its reply builds real work in place: a small table filling its cells, a page of lines and an audio waveform. A small approval check marks the work as done within limits.
2. **Given** the finished picture, **Then** it has no words, keeps today's dark obsidian look with lime light, and does not reuse the orbits of the hero.

### Edge Cases

- A card is already on screen when the page loads (wide desktops): it plays as soon as the section is visible.
- The visitor scrolls fast past several cards: each plays once when it is half visible; none blocks scrolling.
- The window is resized mid-animation: the art stays correctly framed and ends on the finished picture.
- The tab is hidden during an animation: it finishes or jumps to the end; it never sticks half drawn.
- Many cards stacked on a phone: only the visible top part of each card plays; memory on iPhone stays within the limit.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each of the seven illustrated cards (Maiden OS, Essay Studio, Telar, Porter Galaxy, Sim World, Kanji, Pyventa) MUST play its "in use" build-up every time it is opened, and the front card of the stack MUST also play it once when it first comes half into view.
- **FR-002**: Each animation MUST last about 1.5 seconds and never more than 2 seconds, and MUST end on the approved finished picture of the card.
- **FR-003**: Animations MUST NOT loop and MUST NOT replay on scroll; cards hidden behind others in the stack MUST NOT animate.
- **FR-004**: With reduced motion, every card MUST show its finished picture with no motion.
- **FR-005**: The finished pictures of Essay Studio, Telar, Porter Galaxy, Sim World and Kanji MUST look the same as today's cards.
- **FR-006**: The Pyventa card MUST be redrawn with no words and no scribbled pseudo-text: barcode with scanner laser, receipt lines with prices in digits and a total. No offline icon.
- **FR-006b**: The Maiden OS card MUST be redrawn as an AI agent at work with no words: a chat request, a brief thinking pulse, a reply that builds a table, a page and an audio waveform, and an approval check; dark obsidian with lime light, no orbits.
- **FR-007**: The Whiteboard card and its animation MUST stay as they are.
- **FR-008**: The pay animation, the details panel, the stacking of cards and the card labels (name, topic, number, date, logo) MUST keep working unchanged.
- **FR-009**: The page MUST NOT scroll horizontally at any width, and no console errors may appear.
- **FR-010**: On an iPhone-sized screen the home's peak graphics memory MUST NOT rise above today's level by more than 10%.

### Key Entities

- **Card art**: the illustration of one project, with a finished state (today's picture) and a short sequence that builds up to it.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 7 of 7 illustrated cards play their build-up when opened, and the front card plays once on first view,, measured in a real browser at 390 px and 1440 px.
- **SC-002**: Every animation ends within 2 seconds of starting.
- **SC-003**: Finished pictures of the five unchanged cards are visually indistinguishable from today's cards side by side.
- **SC-004**: A reviewer who did not build it can tell what Pyventa and Maiden OS are from their finished pictures alone.
- **SC-005**: Zero console errors and no horizontal scroll at 320, 390, 768 and 1440 px, in Chromium and WebKit.
- **SC-006**: iPhone-size peak graphics memory within 10% of today's measurement.

## Assumptions

- The card illustrations already exist as hand-built vector drawings (the source of today's images), so they can be animated without redrawing the art.
- "As it loads" means when the card first comes into view, the same trigger Whiteboard uses today.
- Prices in digits on the Pyventa receipt are not "explaining with words"; they are what a receipt shows.
- Out of scope: the card back/details copy, the pitch text, other sections of the home.

## Added 2026-11-22 (same delivery)

### User Story 4 - Subscribe becomes a channel card that builds itself (Priority: P1)

Noe on the current Subscribe button: «De verdad odio este botón… no me gusta la idea del neumorfismo, no entona nada con el resto de la página.» Direction: «algo más a una card que se arma con el nombre del canal animado y lo de suscríbete».

**Acceptance Scenarios**:

1. **Given** the visitor reaches the Subscribe section, **When** it comes into view, **Then** a card in the same craft as the wallet cards builds itself once (about 1.5 s): his logo as the channel avatar, the channel name and handle animating in, and a Subscribe button that arrives last.
2. **Given** the card is built, **When** the visitor presses Subscribe, **Then** the YouTube subscribe link opens in a new tab.
3. **Given** the finished card, **Then** it has no neumorphism, no "Don't press this" plate, no invented numbers (no subscriber counts), and reduced motion shows it finished.

### User Story 5 - The whole page shares the space theme (Priority: P2)

Noe: «El background de toda la página no me gusta tanto, ¿por qué no le ponemos las estrellas o algo para que se sienta en el espacio, o algo que comparta temática?»

**Acceptance Scenarios**:

1. **Given** any section of the home, **Then** a quiet field of stars continues the hero's galaxy behind it, sparse and dim enough that text, cards and objects stay the focus.
2. **Given** each section's own lights (wallet pool, passport lamp, player glow), **Then** they stay and sit on top of the stars; every light still fades to zero before any edge.
3. **Given** an iPhone, **Then** layer memory stays within 10% of today and there is no horizontal scroll.

- **FR-011**: The Subscribe section MUST be a self-building channel card (logo avatar, real channel name and handle, Subscribe button to the existing YouTube link), replacing the neumorphic button.
- **FR-012**: The home background MUST carry a static, sparse star field consistent with the hero, under every section, without adding a full-page animated canvas.
