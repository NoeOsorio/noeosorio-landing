# Implementation Plan: Automatic deploys

**Branch**: `noe-558-ci` | **Date**: 2026-11-26 | **Spec**: [spec.md](./spec.md)

## Summary

Every push to main builds and publishes noeosorio.com, and every pull request gets its own preview link. Both run on GitHub Actions and sign in to Google without any stored key (Workload Identity Federation).

The build fails before publishing if settings are missing, types are wrong, or the per-page HTML is missing. Today all of this is done by hand from the agent's machine.

## Root cause

Publishing depends on one machine with a local checkout that holds the site settings and a logged-in CLI. So every merge needs a separate manual step, previews share one manually deployed channel, and nothing structural stops a build without settings. The fix moves the build and the publish into the repository, with settings in GitHub and a guard that fails loudly.

## Constitution check

| Principle | Status |
| --- | --- |
| VII Nothing broken ships | Strengthened: a failed check blocks the release. |
| Security: secrets in the host's variables | Kept, with no secret at all: keyless sign-in, and settings stored as GitHub variables. |
| Security: each live deploy needs Noe's explicit approval | **Amended** (v1.1.0, needs Noe's yes): merging into main is that approval. Manual deploys still need a separate yes. |
| Workflow: Spec Kit, Opus plans, Sonnet builds | Followed. |

## Changes

| Layer | File | Change |
| --- | --- | --- |
| Types | `src/home/sections/tips-footer.mount.ts` | Fix the two existing type errors (`effect` typed as `KeyframeEffect`), so `npm run build` passes. |
| Guard | `scripts/check-build-env.mjs` (new) | Before build, exit 1 naming any missing `VITE_FIREBASE_*`. After build (`--after`), exit 1 if the project id is missing from `dist/assets/*.js` or any route HTML is missing. |
| Workflow | `.github/workflows/deploy.yml` (new) | Detailed below. |
| Config | `.env.example` | Drop `VITE_API_URL` and the unused `VITE_FIREBASE_DATABASE_URL`, and note that CI reads the values from GitHub variables. |
| Docs | `docs/DEPLOY.md` (new) | Short guide: how deploys work, where settings live, how to publish by hand if CI is down, how to roll back (`firebase hosting:rollback` or re-run an older run). |
| Constitution | `.specify/memory/constitution.md` | Amendment v1.1.0. |

**What `deploy.yml` does:**

- **Triggers:** `push` to main, `pull_request` (opened, synchronize, reopened) from this repository only, and `workflow_dispatch`.
- **Build job:** checkout, Node 22 with npm cache, `npm ci`, the settings guard, `npm run build` (tsc then vite, including route-meta), then the post-build guard.
- **Sign-in:** `google-github-actions/auth` with the pool provider and the deploy service account (repository variables), with `create_credentials_file: true`.
- **Main:** `npx firebase-tools@13 deploy --only hosting --project noeosorio-web --non-interactive --message <sha>`, in concurrency group `production` with no cancel.
- **Pull requests:** `hosting:channel:deploy pr-<n> --expires 7d --json`, then one comment on the PR with the URL, edited on each push. Concurrency is per PR, with cancel.
- **Pinning:** actions are pinned by SHA, with minimal permissions.

## Google Cloud and GitHub setup (one time, needs Noe's yes)

Noe runs `gcloud auth login` once, about 1 minute in the browser. Then the agent runs these and prints no values:

1. Create the service account `github-deploy@noeosorio-web.iam.gserviceaccount.com` and grant it `roles/firebasehosting.admin`.
2. Create the workload identity pool `github` with an OIDC provider `noeosorio-landing` (issuer `https://token.actions.githubusercontent.com`), restricted by `attribute.repository == "NoeOsorio/noeosorio-landing"`.
3. Bind `roles/iam.workloadIdentityUser` on the service account to that repository's principal set.
4. Set repository variables:
   - `WIF_PROVIDER` and `DEPLOY_SA`
   - the seven `VITE_FIREBASE_*` values, piped from `firebase apps:sdkconfig` into `gh variable set`
5. Optional, recommended: protect main so it changes only through pull requests and the build check must pass. This is Noe's choice.

## Invariants (must not break)

- The live site never changes on a failed run.
- Production builds come only from main.
- Fork pull requests get no credentials.
- The bundle built in CI matches the one built by hand: same settings, same route HTML, same `firebase.json` headers and clean URLs.
- Manual publishing from main still works as a fallback.

## Verification

1. **Settings match:** build locally with the values from GitHub variables. The Firebase config in the bundle equals today's live bundle (compared by hash, never printed).
2. **Pull request preview:** open a PR (this one). The check turns green, the preview link appears on the PR and opens the site, with the right title on `/kanji`. Push again and the same comment updates.
3. **Missing settings:** a throwaway PR run with one variable blanked through a temporary workflow input fails at the guard and publishes nothing.
4. **Production:** merge the PR. noeosorio.com serves the new commit within 5 minutes, which is checked by the build hash in the served HTML and by the release message on Firebase Hosting matching the merge commit.
5. **Overlap:** two quick merges both deploy, in order, with no overlap.

## Execution

- **Opus:**
  - the one-time Google Cloud and GitHub setup, after Noe's yes and his `gcloud auth login`
  - reviewing every diff
- **One Sonnet agent:**
  - the type fix
  - the guard script
  - the workflow
  - `.env.example`
  - `docs/DEPLOY.md`

  All of these sit in disjoint files, done in one pass.
- **Opus:** the constitution amendment, verification 1 to 5, the Linear update and the memory update.

## Later, separate proposal

Lighthouse on every pull request preview, failing below 90 on mobile for the home (constitution VIII). Not in this change.
