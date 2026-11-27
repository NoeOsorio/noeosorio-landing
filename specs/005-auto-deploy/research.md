# Research: Automatic deploys

## R1. Sign-in from GitHub to Firebase Hosting without a stored key

- **Decision:** Workload Identity Federation. GitHub's per-run identity token is exchanged for short-lived Google credentials that impersonate one deploy service account. The `google-github-actions/auth` action writes an external-account credentials file (`create_credentials_file: true`), and firebase-tools reads it as Application Default Credentials.
- **Rationale:** nothing long-lived exists to leak or rotate, which is Noe's key rule. The pool's provider only accepts tokens from the repository `NoeOsorio/noeosorio-landing`.
- **Alternatives:**
  - `firebase init hosting:github` creates a service account JSON key stored as a GitHub secret. That key would need monthly rotation and is a long-lived credential. Rejected.
  - A CI token from `firebase login:ci` is deprecated and tied to Noe's personal account. Rejected.
- **Known issue:** some firebase-tools 15.x and Node 24 combinations failed to pick up ADC. Pin firebase-tools 13 on Node 22, which this project already deploys with.

## R2. Permissions of the deploy service account

- **Decision:** `roles/firebasehosting.admin` on project `noeosorio-web`, and nothing else. GitHub's identity gets `roles/iam.workloadIdentityUser` on that one service account, limited by `attribute.repository == "NoeOsorio/noeosorio-landing"`.
- **Rationale:** hosting releases and preview channels both live under Hosting. The site uses no Auth, so authorized-domain edits are not needed.

## R3. Site settings in the build

- **Decision:** the seven `VITE_FIREBASE_*` values become GitHub repository variables. `VITE_API_URL` is unused (`src/services/api.ts` is imported nowhere) and is dropped.
- They are copied from the Firebase project's web app config, piped straight into `gh variable set` and never printed.
- They are checked by building with them and comparing the result with today's production bundle, which must match.
- **Guard:** a script fails the build if any of the seven is empty, and fails after the build if the project id is not in the bundle or any route HTML file is missing.

## R4. Safety of a failed deploy

- **Decision:** rely on Hosting's atomic release. Files upload first and the release is created only at the end, so a failure leaves the live version untouched.
- Production runs share one concurrency group with `cancel-in-progress: false`, so they queue and never overlap.
- Pull request runs cancel their own older runs.

## R5. Supply chain

- **Decision:** every third-party action is pinned to a full commit SHA, and the workflow gets the least permissions it needs: `contents: read`, `id-token: write`, and `pull-requests: write` only on the preview job.
- Pull requests from forks are skipped, so they never get credentials.
