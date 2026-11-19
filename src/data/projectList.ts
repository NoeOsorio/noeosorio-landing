export interface ProjectLink {
  label: string;
  href: string;
  // true: router link to an internal page; false: external URL
  internal?: boolean;
}

export interface ProjectListItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  bullets: string[];
  links: ProjectLink[];
  // Real screenshot path; rows without one render text only.
  image?: string;
}

export const projectList: ProjectListItem[] = [
  {
    id: "maiden-os",
    title: "Maiden OS",
    description: "My personal AI operating system. It works from Telegram, my Mac and my iPhone.",
    tags: ["TypeScript", "Swift", "SwiftUI", "Node.js"],
    bullets: [
      "Permission levels, spending limits and an audit log for every action.",
      "It notices what I missed, tells me plainly and takes care of it.",
    ],
    links: [],
  },
  {
    id: "essay-studio",
    title: "Essay Studio",
    description: "A writing app where AI agents question your essay instead of writing it for you.",
    tags: ["Rust", "Tauri", "Next.js", "TypeScript"],
    bullets: [
      "Four agents with their own voices: evidence, systems, practice and objections.",
      "The score comes from findings you can see, not from asking a model.",
    ],
    links: [
      { label: "See project", href: "/essay", internal: true },
      { label: "Open on GitHub", href: "https://github.com/NoeOsorio/essay-studio" },
    ],
  },
  {
    id: "whiteboard",
    title: "Whiteboard",
    description: "A whiteboard that listens while you talk and draws your notes live.",
    tags: ["Next.js", "React", "TypeScript"],
    bullets: [
      "Short notes, corrections respected, and doodles only for what can be drawn.",
      "Works on a live class or on a voice note you upload.",
    ],
    links: [],
  },
  {
    id: "telar",
    title: "Telar",
    description: "A story engine for educational visual novels, where characters act on their own.",
    tags: ["TypeScript", "React", "Vite", "Ink"],
    bullets: [
      "Every decision is remembered and can come back weeks later.",
      "La beca, the first game, plays a full school year in about 30 minutes.",
    ],
    links: [],
  },
  {
    id: "porter-galaxy",
    title: "Porter Galaxy",
    description:
      "A Kubernetes cluster shown as a living 3D galaxy. A personal project, not a Porter product.",
    tags: ["Go", "Three.js", "Kubernetes", "Helm"],
    bullets: [
      "Two views of the same graph: how traffic reaches your workloads, and where every Pod runs.",
      "Updates live as the cluster changes.",
    ],
    links: [{ label: "Open on GitHub", href: "https://github.com/NoeOsorio/porter-galaxy" }],
  },
  {
    id: "sim-world",
    title: "Sim World",
    description:
      "Life simulations in the browser, from the primordial soup to families with personalities.",
    tags: ["React", "TypeScript", "Vite"],
    bullets: [
      "Four phases, each adding one new pressure: scarce food, interdependence, family.",
      "Save a run as a file, reload it later, or export its event log.",
    ],
    links: [{ label: "Try it live", href: "https://simulations.noeosorio.com" }],
  },
  {
    id: "kanji-study-app",
    title: "Kanji Study App",
    description:
      "Learn Japanese kanji in Spanish with short lessons, stroke practice and quizzes.",
    tags: ["React", "TypeScript", "Vite", "Tailwind"],
    bullets: [
      "Four beginner lessons with 27 kanji, readings and example phrases.",
      "Six quiz modes, built mobile first and running fully in the browser.",
    ],
    links: [{ label: "Open on GitHub", href: "https://github.com/NoeOsorio/kanjy-study-app" }],
  },
  {
    id: "pyventa-web",
    title: "Pyventa Web",
    description:
      "A point of sale for a stationery store, rebuilt for the web. I did the web redesign.",
    tags: ["React", "TypeScript", "Tailwind", "FastAPI"],
    bullets: [
      "Fast sales with a barcode reader, and it keeps working without internet.",
      "Price lookup from a phone, using its camera as the scanner.",
    ],
    links: [],
  },
];
