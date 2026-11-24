import type { Mount } from '../home/useMount'

export type Lang = 'es' | 'en'

// What the shell hands a page's mount. `first` is true only for the first mount of a visit;
// a language switch mounts again with `first: false`, so the entrance never replays.
export interface ProjectData {
  lang: Lang
  first: boolean
}

// The contract every project page follows: src/projects/<id>/index.ts default-exports one of these.
export interface ProjectPage {
  // The wallet id of the project (src/home/data/wallet.ts). Also the CSS scope: the shell gives the page root the class `pg-<id>`.
  id: string
  // Colour of the header while the page's own surface is under it. Over the footer the header always slides away.
  tone: 'paper' | 'dark'
  // Absolute path of the social image under public/, 1200 x 630.
  ogImage: string
  meta: Record<Lang, { title: string; description: string }>
  // Builds the page into `root` and returns its cleanup. Everything it starts (listeners, rAF, observers) is undone there.
  mount: Mount<ProjectData>
}
