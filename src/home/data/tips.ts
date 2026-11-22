// Every word, price and link of the tip terminal, the robots terminal, Subscribe and the footer.
// Site links point to real routes of this app. The llms.txt text is not here: the terminal fetches /llms.txt.
// The one place the llms.txt location is written: the footer link, the command and the fetch all read it.
const llmsUrl = '/llms.txt'
const llmsName = llmsUrl.slice(1)

export type Tip = { price: string; name: string; line: string; after: string }
type FootLink = [name: string, sub: string, href: string]

export type TipsContent = {
  sectionLabel: string
  slip: string
  jar: string
  youtube: string
  merchant: string
  place: string
  receiptLine: string
  total: string
  ask: string
  askSub: string
  tips: Tip[]
  thanks: string
  openingJar: string
  openJar: string
  noTip: string
  back: string
  judged: string[]
  stamp: string
  subscribeAsk: string
  subscribe: string
  changedMind: string
  robot: { title: string; check: string; failed: string; failedSub: string; passed: string; host: string; cmd: string; fallback: string; terminalLabel: string }
  agentLine: string
  agentButton: string
  llmsUrl: string
  copy: string
  copied: string
  openRaw: string
  year: string
  ships: { title: string; text: string; cover: string; plate: string; button: string; aria: string; after: string }
  foot: {
    line: string
    siteLabel: string
    elsewhereLabel: string
    now: string
    nowHref: string
    site: FootLink[]
    elsewhere: FootLink[]
    top: string
    privacy: [label: string, href: string]
    cookies: string
    domain: string
  }
}

export const tips: TipsContent = {
  sectionLabel: 'Tips',
  slip: 'TIP ............ $0.00',
  jar: 'https://buymeacoffee.com/noeosorio',
  youtube: 'https://www.youtube.com/@noeosoriodev?sub_confirmation=1',
  merchant: 'Noé Osorio',
  place: 'New York',
  receiptLine: 'This page',
  total: '$0.00',
  ask: 'Add a tip?',
  askSub: "Tips don't buy anything. They just say thanks.",
  tips: [
    { price: '$5', name: 'Coffee', line: 'Just thanks.', after: "That one's a coffee. Thank you." },
    { price: '$19', name: 'Your video idea', line: 'Thanks, and you pick my next video.', after: 'Write the video you want in the note.' },
    { price: '$97', name: 'Your project idea', line: 'Thanks, and you pick my next open-source project.', after: 'Write the project you want in the note.' },
  ],
  thanks: 'Thanks for the tip.',
  openingJar: 'Opening the tip jar',
  openJar: 'Open the tip jar',
  noTip: 'No tip',
  back: 'Back',
  judged: ['Okay.', "No, really. It's fine.", "I'll just keep building free stuff.", 'Alone.'],
  stamp: 'NOTED',
  subscribeAsk: 'At least subscribe?',
  subscribe: 'Subscribe on YouTube',
  changedMind: "Fine, I'll tip",
  robot: {
    title: 'Robots only',
    check: "I'm a robot",
    failed: 'Verification failed. You move like a human.',
    failedSub: "Humans get the tip jar. Here's what robots get anyway:",
    passed: 'Verified. Welcome, fellow robot.',
    host: 'agent@noeosorio.com',
    cmd: `curl -s noeosorio.com${llmsUrl}`,
    fallback: `# ${llmsName} could not be loaded. Try ${llmsUrl} directly.`,
    terminalLabel: `Terminal output of ${llmsName}`,
  },
  agentLine: 'AI agent? You can skip the tip.',
  agentButton: `Read ${llmsName}`,
  llmsUrl,
  copy: 'Copy',
  copied: 'Copied',
  openRaw: 'Open raw',
  year: '2026',
  ships: {
    title: "Don't press this.",
    text: 'It subscribes you to my YouTube channel.',
    cover: 'DO NOT PRESS',
    plate: 'YOUTUBE CHANNEL',
    button: 'Subscribe',
    aria: 'Subscribe on YouTube',
    after: 'Too late. Confirm it on YouTube.',
  },
  foot: {
    line: 'Built by hand. The code, the design and the mistakes are all mine.',
    siteLabel: 'site',
    elsewhereLabel: 'elsewhere',
    now: 'Now building Essay Studio',
    nowHref: '/essay',
    site: [
      ['Projects', "Everything I've built", '/portfolio'],
      ['Essay Studio', 'Waitlist open', '/essay'],
      ['About', "Where I've worked", '/about'],
      [llmsName, 'For agents', llmsUrl],
    ],
    elsewhere: [
      ['YouTube', '@noeosoriodev', 'https://www.youtube.com/@noeosoriodev'],
      ['TikTok', '@noeosorio.dev', 'https://www.tiktok.com/@noeosorio.dev'],
      ['Instagram', '@noeosorio.dev', 'https://www.instagram.com/noeosorio.dev'],
      ['GitHub', 'NoeOsorio', 'https://github.com/NoeOsorio'],
      ['LinkedIn', 'noeosorioh', 'https://www.linkedin.com/in/noeosorioh/'],
    ],
    top: 'Back to top',
    privacy: ['Privacy', '/privacy-policy'],
    cookies: 'Cookie settings',
    domain: 'noeosorio.com',
  },
}
