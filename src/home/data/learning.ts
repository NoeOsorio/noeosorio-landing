// Every video and word of the "Learning out loud" section (newest first).
// cat must be one of the keys in cats.
export type LearningCat = 'build' | 'life' | 'career' | 'podcast'

export type LearningVideo = { id: string; cat: LearningCat; title: string; date: string; len: number }

export type LearningContent = {
  title: string
  sub: string
  channel: string
  allVideos: string
  latest: string
  all: string
  topics: string
  marquee: string
  spinning: string
  jackpotSign: string
  pull: string
  watch: string
  again: string
  jackpot: string
  cats: Record<LearningCat, string>
  videos: LearningVideo[]
}

export const learning: LearningContent = {
  title: 'Learning out loud',
  sub: "Can't pick a video? Pull the lever.",
  channel: 'https://www.youtube.com/@noeosoriodev/videos',
  allVideos: 'All videos on YouTube',
  latest: 'Latest from the channel',
  all: 'All',
  topics: 'Topics',
  marquee: 'PULL THE LEVER',
  spinning: 'GOOD LUCK',
  jackpotSign: 'JACKPOT!',
  pull: 'PULL',
  watch: 'Watch on YouTube',
  again: 'Not this one? Pull again.',
  jackpot: 'Three tacos. You win nothing.',
  cats: { build: 'Builds', life: 'Life', career: 'Career', podcast: 'Podcast' },
  videos: [
    { id: '-TwcWcwiMes', cat: 'build', title: 'Así reviso mis ensayos con IA', date: '2026-11-18', len: 473 },
    { id: 'pH2wqI1eIhY', cat: 'life', title: 'Lo más nerd que he hecho en Nueva York', date: '2026-11-13', len: 365 },
    { id: 'VXkBNHYGqMo', cat: 'career', title: 'El fracaso más bonito que pudimos haber tenido', date: '2026-11-11', len: 744 },
    { id: 'UCeUrsZbsPc', cat: 'life', title: 'Le tengo miedo a las alturas y salté de un avión en Hawaii', date: '2026-10-28', len: 378 },
    { id: 'rZl0ILxdRR0', cat: 'build', title: '¿Ingeniería pura o puro vibe coding? Lo que nos dejó un año programando con IA', date: '2026-10-21', len: 896 },
    { id: 'yLiI0HW6DRk', cat: 'life', title: 'Me quedé sin batería en San Francisco (y fue lo mejor del viaje)', date: '2026-10-12', len: 966 },
    { id: 'Z02yrw2bbpo', cat: 'podcast', title: 'Mi primera entrevista de trabajo como programador', date: '2024-09-25', len: 1981 },
    { id: 'LPhabDDNskY', cat: 'podcast', title: 'Retos y obstáculos en mi carrera como programador', date: '2024-09-04', len: 1982 },
    { id: 'p0z1naXJlcU', cat: 'build', title: 'Diseñé un CRM a medida para cubrir las necesidades de mi negocio', date: '2024-08-23', len: 1316 },
    { id: 'hTimdvdiORM', cat: 'podcast', title: 'Mis lenguajes de programación', date: '2024-08-21', len: 2189 },
    { id: 'K7oah0eaiOI', cat: 'podcast', title: 'El día que decidí ser programador', date: '2024-08-07', len: 1626 },
  ],
}
