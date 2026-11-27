// After a deploy the old build's files are gone. A tab opened before it still holds the old code, so the next page it opens asks for a
// file that no longer exists. A full load of the same URL picks up the new build. Once per minute at most, so a real outage never loops.
const KEY = 'stale-build-reload'

export const isStaleBuild = (error: unknown) => {
  const msg = String((error as { message?: string })?.message ?? error)
  return /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS|'text\/html' is not a valid JavaScript MIME type/i.test(msg)
}

export function reloadForNewBuild(): boolean {
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0)
    if (Date.now() - last < 60_000) return false
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch { /* storage blocked: reload anyway, the browser stops a tight loop */ }
  window.location.reload()
  return true
}
