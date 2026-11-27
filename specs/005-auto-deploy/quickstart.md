# Quickstart: Automatic deploys

- **Preview:** open a pull request against main and wait for the «Deploy» check. The comment on the PR has the preview link.
- **Publish:** merge into main. The «Deploy» run on the merge commit publishes noeosorio.com.
- **When it fails:** the run's red step names what failed (settings, types, build, publish), and the live site is unchanged.
- **Manual fallback:** build from main with the settings, then `npx firebase-tools@13 deploy --only hosting --project noeosorio-web`. This needs Noe's yes.
- **Roll back:** in the Firebase console, open Hosting and roll back to the previous release, or re-run the workflow on an older commit of main.
