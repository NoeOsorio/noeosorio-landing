export interface GalaxyContent {
  title: string
  catchphrase: string
  sub: string
  srSummary: string
  heavy: string[]
  ideas: string[]
  eggs: string[]
}

export const galaxy: GalaxyContent = {
  title: "Hi, I'm Noé.",
  catchphrase: 'I was told to put something impressive here.',
  sub: 'Product engineer at Porter in New York. Psychology master's in progress.',
  srSummary: 'Animation of my logo built from stars.',
  heavy: ['Software engineer', 'AI engineer', 'Infrastructure', 'Product engineer', 'Psychology', 'Organizational psychology'],
  ideas: [
    'Essay Studio', 'AI that questions your essay', 'Four agents that disagree', 'Maiden OS', 'An AI assistant on Telegram', 'Permission levels for AI',
    'Spending limits for agents', 'An audit log for every agent', 'Whiteboard', 'Notes that draw themselves', 'Telar', 'A story engine for visual novels',
    'Porter Galaxy', 'A Kubernetes cluster as a galaxy', 'Sim World', 'Life from primordial soup', 'Families with personalities', 'Kanji Study App',
    'Kanji in Spanish', 'Pyventa', 'A point of sale that works offline', 'Sakura Kode Academy', 'Vida de un programador', 'A podcast about dev life',
    'Porter', 'Apps for YC startups', 'Apex Systems', 'Data migrations', 'Firewall rules', 'Osmind', 'HIPAA', 'Clip', 'Payments in Mexico',
    'Finloop', 'Loans that approve themselves', 'Smartkode', 'Tech lead', 'Mentoring juniors', 'Kubernetes', 'Flutter', 'Firebase',
    'Rust', 'Tauri', 'Next.js', 'TypeScript', 'MongoDB', 'System design', 'Product design', 'UX', 'AI agents', 'AI workflows', 'llms.txt',
    'A reverse captcha', 'A passport for my career', 'A wallet for my projects', 'A tip jar that judges you', 'A slot machine for videos',
    'LED dot matrices', 'Pixel art', 'Philosophy', 'Business theories', 'Pokémon', 'Japanese', 'Ikigai', 'Teaching', 'Explaining things on camera',
    'Talking a lot', 'Listening to people', 'New York', 'San Francisco', 'Mexico City', 'Puebla', 'Iowa', 'Skydiving in Hawaii',
    'Being scared of heights', 'A dead phone in San Francisco', 'The most beautiful failure', 'Pure engineering or vibe coding?',
    'My first job interview', 'A CRM for my business', 'Why I became a programmer', 'YouTube in Spanish', 'Short videos', 'Open source',
    'A personal CFO app', 'Ikigai workshops', 'A design system', 'Learning out loud',
  ],
  eggs: [
    'Rewrite it in Rust', 'One more side project', 'Sleep (deprecated)', 'A fourth redesign of the point of sale', 'Name variables properly',
    'A startup idea at 3 a.m.', 'Explain it again, slower', 'Read the docs, someday', 'Inbox zero', 'Finish the side project',
    'Touch grass', 'Ship it on Friday', 'A todo app (never)', 'More coffee',
  ],
}
