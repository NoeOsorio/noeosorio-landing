# Feature Specification: Automatic deploys

**Feature Branch**: `noe-558-ci`

**Created**: 2026-11-26

**Status**: Draft

**Input**: User description: Noe, 2026-11-26: «¿y si hacemos CI? Para que cada merge a main despliegue».

## Context (2026-11-26)

- Every deploy today is manual, run from the agent's machine. It builds from main with the site's Firebase settings read from a local checkout, then publishes. Previews use a manual channel.
- The repository has no automation, and main is not protected.
- The project's build command fails today on two existing type errors, so nothing automatic could use it yet.
- A build made without the site's Firebase settings once shipped a page that could not save to the waitlist. Nothing stopped it.
- The constitution says each live deploy needs Noe's explicit approval. This feature makes merging to main that approval.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Merging publishes (Priority: P1)

Noe merges a pull request into main. Without anyone running anything, the site is rebuilt from main and published to noeosorio.com within minutes.

**Why this priority**: it removes the manual step after every approval, which is the whole request.

**Independent Test**: merge a one-line change to main and see it on noeosorio.com without any manual command.

**Acceptance Scenarios**:

1. **Given** a merge into main, **When** the build passes, **Then** noeosorio.com serves the new version.
2. **Given** a merge into main, **When** the build fails or the site's Firebase settings are missing, **Then** nothing is published and the live site stays exactly as it was.
3. **Given** two merges in quick succession, **Then** the deploys run one after the other, never at the same time, and the live site ends on the newest one.

### User Story 2 - Every pull request has its own preview (Priority: P2)

Noe opens a pull request. A preview link appears on the pull request and updates with every new push. He reviews there before merging.

**Why this priority**: today the agent deploys previews by hand to one shared channel, which any later preview overwrites.

**Independent Test**: open a pull request and find a working preview link on it; push again and the same link shows the new version.

**Acceptance Scenarios**:

1. **Given** a new pull request, **Then** a comment on it links to a preview of that branch within minutes.
2. **Given** a new push to the branch, **Then** the same comment is updated and the preview shows the new version.
3. **Given** a preview, **Then** search engines are told not to index it, and it expires on its own after 7 days without pushes.

### User Story 3 - Noe sees whether it worked (Priority: P3)

Without opening a terminal, Noe can tell whether the last deploy worked, and if not, why.

**Independent Test**: open the pull request or the repository page and read the result of the last deploy.

**Acceptance Scenarios**:

1. **Given** a deploy, **Then** the pull request or the commit on GitHub shows a green or red check with a readable reason.
2. **Given** a failed deploy, **Then** the failure names the step that failed (build, settings, publish).

### Edge Cases

- **Pull request from someone else's fork:** gets no preview and no access to anything. The site is public, but publishing rights stay with the repository.
- **Manual deploy still needed:** the agent can still publish by hand from main if the automation is down.
- **A merge that only changes documentation or specs:** still deploys. That's harmless and keeps the rule simple.
- **The sign-in between GitHub and the hosting stops working:** the deploy fails visibly and the live site is untouched.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every push to main MUST build the site and, only if the build passes every check, publish it to production.
- **FR-002**: The build MUST fail when any required site setting is missing or when the result lacks the per-page HTML for every project page.
- **FR-003**: Every pull request from the repository itself MUST get a preview link posted on the pull request, updated on each push, expiring after 7 days.
- **FR-004**: Production deploys MUST never run at the same time. A failed deploy MUST leave the live site unchanged.
- **FR-005**: The automation MUST sign in to the hosting without a long-lived key stored anywhere. If that is impossible, it may use a key kept only in the repository's secret settings, with the monthly rotation added.
- **FR-006**: The site's settings MUST live in the repository's settings on GitHub, not in any file in the repository. Nobody types or prints their values.
- **FR-007**: The project's own build command MUST pass, so the automation runs the same build a person would.
- **FR-008**: The result of every run MUST be visible on GitHub as a check with a readable reason.

### Key Entities

- **Deploy run**: one build and publish, triggered by a push to main or a pull request. It has a result (passed or failed), a reason, and a link (the live site or a preview).

## Success Criteria *(mandatory)*

- **SC-001**: A merge to main is live on noeosorio.com within 5 minutes, with no manual step.
- **SC-002**: A build without the site's settings, or with a type error, is stopped before publishing, in 100% of attempts.
- **SC-003**: Every pull request shows a working preview link within 5 minutes of its latest push.
- **SC-004**: No stored key needs rotating for this feature, or exactly one with its rotation in the monthly round.

## Assumptions

- Merging into main is Noe's approval to publish. This amends the constitution's rule that each live deploy needs a separate explicit yes; the amendment is part of this feature and needs his approval.
- The site's Firebase web settings are public by nature (they ship inside the site's code), but they are still kept in GitHub settings and never printed.
- Firestore rules, functions and other repositories are out of scope.
- No test suites are added; checks are the build, the settings guard and the type check.
