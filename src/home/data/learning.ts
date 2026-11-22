// Everything the "Learning out loud" section shows: the channel, the videos (newest first) and the joke comments.
// cat must be one of the chips below (after "All"). motif picks the thumbnail scene, word is the big word on it.
export type LearningMotif = 'essay' | 'city' | 'rocket' | 'sky' | 'code' | 'bridge' | 'studio'

export type LearningVideo = {
  id: string
  cat: string
  title: string
  date: string
  len: string
  motif: LearningMotif
  word: string
  fill: string
}

export type LearningComment = { author: string; avatar: 'mom' | 'me19' | 'cat' | 'future' | 'algo' | 'skip'; text: string }

export type LearningContent = {
  title: string
  topics: string
  chips: string[]
  channelName: string
  channelHandle: string
  channelUrl: string
  allVideosUrl: string
  subscribe: string
  allVideos: string
  watch: string
  comments: string
  empty: string
  videos: LearningVideo[]
  commentList: LearningComment[]
}

export const learning: LearningContent = {
  title: 'Learning out loud',
  topics: 'Topics',
  chips: ['All', 'Builds', 'Life', 'Career', 'Podcast'],
  channelName: 'Noé Osorio',
  channelHandle: '@noeosoriodev',
  channelUrl: 'https://www.youtube.com/@noeosoriodev',
  allVideosUrl: 'https://www.youtube.com/@noeosoriodev/videos',
  subscribe: 'Subscribe',
  allVideos: 'All videos on YouTube',
  watch: 'Watch on YouTube',
  comments: 'Comments',
  empty: 'Nothing else here yet.',
  videos: [
    { id: '-TwcWcwiMes', cat: 'Builds', title: 'Así reviso mis ensayos con IA', date: 'Nov 2026', len: '7:53', word: 'ENSAYOS', fill: '#D6F35C', motif: 'essay' },
    { id: 'pH2wqI1eIhY', cat: 'Life', title: 'Lo más nerd que he hecho en Nueva York', date: 'Nov 2026', len: '6:05', word: 'NERD', fill: '#FFE3A8', motif: 'city' },
    { id: 'VXkBNHYGqMo', cat: 'Career', title: 'El fracaso más bonito que pudimos haber tenido', date: 'Nov 2026', len: '12:24', word: 'FRACASO', fill: '#F6C453', motif: 'rocket' },
    { id: 'UCeUrsZbsPc', cat: 'Life', title: 'Le tengo miedo a las alturas y salté de un avión en Hawaii', date: 'Oct 2026', len: '6:18', word: 'SALTO', fill: '#FFE3A8', motif: 'sky' },
    { id: 'rZl0ILxdRR0', cat: 'Builds', title: '¿Ingeniería pura o puro vibe coding? Lo que nos dejó un año programando con IA', date: 'Oct 2026', len: '14:56', word: 'VIBE', fill: '#D6F35C', motif: 'code' },
    { id: 'yLiI0HW6DRk', cat: 'Life', title: 'Me quedé sin batería en San Francisco (y fue lo mejor del viaje)', date: 'Oct 2026', len: '16:06', word: '0%', fill: '#FFE3A8', motif: 'bridge' },
    { id: 'Z02yrw2bbpo', cat: 'Podcast', title: 'Mi primera entrevista de trabajo como programador', date: 'Sep 2024', len: '33:01', word: 'ENTREVISTA', fill: '#F4EEE4', motif: 'studio' },
  ],
  commentList: [
    { author: 'Mom', avatar: 'mom', text: 'Muy bien mijo, ¿ya comiste?' },
    { author: 'Me, in 2019', avatar: 'me19', text: 'Yo todavía no sabía qué era un commit.' },
    { author: 'My cat', avatar: 'cat', text: 'miau (traducción: quita la laptop de mi silla)' },
    { author: 'Future me', avatar: 'future', text: 'Spoiler: sí funcionó.' },
    { author: 'The algorithm', avatar: 'algo', text: 'Te lo recomendé porque sí.' },
    { author: 'Someone who skipped the intro', avatar: 'skip', text: 'Me salté la intro y no me arrepiento.' },
    { author: 'Mom', avatar: 'mom', text: 'Se te ve cansado, ¿dormiste?' },
    { author: 'Me, in 2019', avatar: 'me19', text: 'Yo no me subo ni a un banco.' },
    { author: 'My cat', avatar: 'cat', text: 'Dame de comer y te doy like.' },
    { author: 'Future me', avatar: 'future', text: 'Ya arreglé ese bug, por cierto.' },
    { author: 'The algorithm', avatar: 'algo', text: 'Quédate hasta el final, porfa.' },
    { author: 'Someone who skipped the intro', avatar: 'skip', text: '¿Ya empezó el video?' },
  ],
}
