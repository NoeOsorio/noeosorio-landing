import type { Mount } from '../useMount'
import type { LearningContent, LearningVideo } from '../data/learning'
import { esc } from '../dom'
import { logoPaths } from '../brand'
import { AVATARS, LEARNING_DEFS, thumbSvg } from './learning-thumbs'

const ytUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`
const SHOWN = 4 // comments kept in the DOM
const OPACITY = [0, 0.62, 0.86, 1] // by slot: leaving, older, old, newest

export const mountLearning: Mount<LearningContent> = (root, C, env) => {
  const reduce = env.reduce
  const ac = new AbortController()
  const { signal } = ac
  const timers = new Set<ReturnType<typeof setTimeout>>()
  const later = (ms: number, fn: () => void) => {
    const id = setTimeout(() => { timers.delete(id); fn() }, ms)
    timers.add(id)
    return id
  }
  const clearLater = (id: ReturnType<typeof setTimeout> | undefined) => { if (id !== undefined) { clearTimeout(id); timers.delete(id) } }
  const byId = (id: string) => C.videos.find((v) => v.id === id) as LearningVideo
  const ALL = C.chips[0]
  const thumb = (v: LearningVideo) => thumbSvg({ m: v.motif, title: v.title, word: v.word, fill: v.fill })

  root.innerHTML = `${LEARNING_DEFS}
  <div class="learn">
    <h2>${esc(C.title)}</h2>
    <div class="win">
      <div class="main">
        <a class="player" data-r="player" target="_blank" rel="noopener" aria-label="${esc(C.watch)}">
          <div class="thumb fadable" data-r="thumb"></div>
          <span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 3.6v16.8c0 .8.9 1.3 1.6.9l14-8.4c.7-.4.7-1.4 0-1.8l-14-8.4C5.9 2.3 5 2.8 5 3.6z" fill="#1A1712"/></svg></span>
          <span class="dur" data-r="dur"></span>
        </a>
        <div class="meta fadable" data-r="meta">
          <h3 data-r="title"></h3>
          <p class="sub" data-r="sub"></p>
          <div class="chan">
            <span class="logo" aria-hidden="true"><svg viewBox="20 20 360 360" width="40" height="40">${logoPaths()}</svg></span>
            <div><b>${esc(C.channelName)}</b><small>${esc(C.channelHandle)}</small></div>
            <span class="sp"></span>
            <a class="sub-btn" href="${esc(C.channelUrl)}" target="_blank" rel="noopener">${esc(C.subscribe)}</a>
          </div>
        </div>
        <div class="cwrap">
          <p class="clabel">${esc(C.comments)}</p>
          <div class="cmts" data-r="cmts" aria-hidden="true"></div>
        </div>
      </div>
      <aside class="side">
        <div class="sidein">
          <div class="chips" data-r="chips" role="group" aria-label="${esc(C.topics)}">${C.chips.map((c) => `<button type="button" class="chip" aria-pressed="${c === ALL}" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>
          <div class="list" data-r="list"></div>
          <a class="all" href="${esc(C.allVideosUrl)}" target="_blank" rel="noopener">${esc(C.allVideos)} <i><svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l6-6M4 3h5v5"/></svg></i></a>
        </div>
      </aside>
    </div>
  </div>`

  const q = <T extends HTMLElement>(k: string) => root.querySelector(`[data-r="${k}"]`) as T
  const learn = root.querySelector('.learn') as HTMLElement
  const player = q<HTMLAnchorElement>('player'), mainThumb = q('thumb'), meta = q('meta'), list = q('list'), chips = q('chips'), box = q('cmts')
  const st = { main: C.videos[0].id, filter: ALL }

  const paintMain = (v: LearningVideo) => {
    mainThumb.innerHTML = thumb(v)
    q('dur').textContent = v.len
    q('title').textContent = v.title
    q('sub').textContent = `${v.cat}, ${v.date}`
    player.href = ytUrl(v.id)
  }
  const paintList = (anim: boolean) => {
    const arr = C.videos.filter((v) => v.id !== st.main && (st.filter === ALL || v.cat === st.filter))
    list.innerHTML = arr.length
      ? arr.map((v, i) => `<button type="button" class="rec${anim && !reduce ? ' in' : ''}" style="--i:${i}" data-id="${v.id}"><span class="rt">${thumb(v)}<span class="d">${esc(v.len)}</span></span><span><h4>${esc(v.title)}</h4><p>${esc(v.cat)}, ${esc(v.date)}</p></span></button>`).join('')
      : `<p class="empty">${esc(C.empty)}</p>`
  }

  let swapT: ReturnType<typeof setTimeout> | undefined
  const swap = (id: string, byKeyboard: boolean) => {
    if (id === st.main) return
    const fade = [mainThumb, meta]
    fade.forEach((e) => e.classList.add('swapout'))
    clearLater(swapT)
    swapT = later(reduce ? 0 : 170, () => {
      st.main = id
      paintMain(byId(id))
      paintList(true)
      requestAnimationFrame(() => { if (!signal.aborted) fade.forEach((e) => e.classList.remove('swapout')) })
      if (byKeyboard) player.focus({ preventScroll: true })
    })
  }
  list.addEventListener('click', (e) => {
    const b = (e.target as Element).closest('.rec') as HTMLElement | null
    if (b) swap(b.dataset.id as string, (e as MouseEvent).detail === 0)
  }, { signal })
  chips.addEventListener('click', (e) => {
    const b = (e.target as Element).closest('.chip') as HTMLElement | null
    if (!b) return
    st.filter = b.dataset.c as string
    chips.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)))
    paintList(true)
  }, { signal })

  paintMain(byId(st.main))
  paintList(false)

  // Live comments: the newest slides in at the bottom, older ones fade upward.
  const slot = () => parseFloat(getComputedStyle(box).getPropertyValue('--slot')) || 56
  let items: HTMLElement[] = []
  let nextC = 0
  const mk = (i: number) => {
    const c = C.commentList[i % C.commentList.length]
    const d = document.createElement('div')
    d.className = 'cm'
    d.innerHTML = `<span class="av">${AVATARS[c.avatar]}</span><p><b>${esc(c.author)}</b>${esc(c.text)}</p>`
    return d
  }
  const layout = () => {
    const h = slot(), n = items.length
    items.forEach((el, i) => {
      const s = 2 - (n - 1 - i)
      el.style.transform = `translateY(${s * h}px)`
      el.style.opacity = String(OPACITY[s + 1] ?? 0)
    })
  }
  const pushC = (first: boolean) => {
    const el = mk(nextC++)
    box.appendChild(el)
    if (!first) {
      el.style.transition = 'none'
      el.style.transform = `translateY(${3 * slot() + 14}px)`
      el.style.opacity = '0'
      el.getBoundingClientRect()
      el.style.transition = ''
    }
    items.push(el)
    layout()
    while (items.length > SHOWN) {
      const old = items.shift() as HTMLElement
      later(700, () => old.remove())
    }
  }
  if (reduce) {
    box.classList.add('static')
    for (let i = 0; i < SHOWN; i++) box.appendChild(mk(i))
  } else {
    for (let i = 0; i < 3; i++) pushC(true)
  }

  let timer: ReturnType<typeof setInterval> | undefined
  let onScreen = false
  const start = () => { if (!reduce && timer === undefined) timer = setInterval(() => pushC(false), 2500) }
  const stop = () => { if (timer !== undefined) { clearInterval(timer); timer = undefined } }
  const sync = () => {
    const live = onScreen && !document.hidden
    learn.toggleAttribute('data-live', live)
    if (live) start(); else stop()
  }
  const io = new IntersectionObserver((es) => { onScreen = es[es.length - 1].isIntersecting; sync() }, { threshold: 0.15 })
  io.observe(root)
  document.addEventListener('visibilitychange', sync, { signal })
  window.addEventListener('resize', layout, { signal })

  return () => {
    ac.abort()
    io.disconnect()
    stop()
    timers.forEach((t) => clearTimeout(t))
    timers.clear()
    items = []
    root.replaceChildren()
  }
}
