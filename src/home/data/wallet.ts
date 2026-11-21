export type WalletPlatform = 'mac' | 'iphone' | 'phone' | 'web' | 'telegram' | 'kubernetes';
export type WalletArt = 'obsidian' | 'paper' | 'enamel' | 'weave' | 'space' | 'life' | 'washi' | 'receipt';

export interface WalletPitch {
  head: string;
  problem: string;
  how: string;
  edge: string;
  price: string;
  note: string;
  cta: [string, string] | null;
  platforms: WalletPlatform[];
}

export interface WalletProject {
  id: string;
  pitch: WalletPitch;
  activity: [string, number, number, number][];
  price: string;
  source: string;
  page: string;
  feats: string[];
  first: string;
  name: string;
  topic: string;
  icon: string;
  art: WalletArt;
  c: string;
  fg: string;
  created: string;
  commits: number;
  runs: string;
  text: string;
  tags: string[];
  bullets: string[];
  links: { label: string; href: string }[];
}

export interface WalletContent {
  title: string;
  sub: string;
  opening: string;
  builtWith: string; runsOn: string; firstCommit: string; commitsWord: string; pricing: string; seeProject: string; listTitle: string;
  problemLabel: string; howLabel: string; edgeLabel: string; platformsLabel: string; stackLabel: string; detailsTitle: string;
  weekOf: string; linesWord: string; sourceHint: string; createdLabel: string; holder: string;
  close: string;
  projects: WalletProject[];
}

export const wallet: WalletContent = {
  title: "Everything I've built",
  sub: "Every project is a pass in my wallet. Pick one to open it.",
  opening: "Opening",
  builtWith: "Built with", runsOn: "Runs on", firstCommit: "First commit", commitsWord: "commits", pricing: "Pricing", seeProject: "See project", listTitle: "Latest activity", problemLabel: "The problem", howLabel: "How it works", edgeLabel: "Only here", platformsLabel: "Platforms", stackLabel: "Built with", detailsTitle: "Card details", weekOf: "Week of", linesWord: "lines", sourceHint: "See the source", createdLabel: "CREATED", holder: "NOÉ OSORIO",
  close: "Close",
  projects: [
    { id: "maiden-os", pitch: {"head": "An assistant that does the work, within limits you set.", "problem": "AI assistants either do nothing useful or act with no limits.", "how": "Ask from Telegram, your Mac or your iPhone, and get the work done: a table, a study guide, an audio.", "edge": "Permission levels, spending limits and an audit log for every action.", "price": "Personal", "note": "Not available yet", "cta": null, "platforms": ["telegram", "mac", "iphone"]}, activity: [["2026-11-02", 60, 15336, 4821], ["2026-10-26", 146, 33338, 6722], ["2026-10-19", 37, 6117, 896], ["2026-10-12", 175, 29630, 3818], ["2026-10-05", 101, 23821, 1862]], price: "Personal project", source: "", page: "https://noeosorio.com/maiden-os", feats: ["Guardrails", "Notices for me"], first: "Sep 29, 2026", name: "Maiden OS", topic: "AI agents", icon: "spark", art: "obsidian", c: "#17161D", fg: "#E9E7F2", created: "09/26", commits: 632, runs: "Telegram, Mac and iPhone",
      text: "My personal AI operating system. It works from Telegram, my Mac and my iPhone.",
      tags: ["TypeScript", "Swift", "SwiftUI", "Node.js"],
      bullets: ["Permission levels, spending limits and an audit log for every action.", "It notices what I missed, tells me plainly and takes care of it."], links: [] },
    { id: "essay-studio", pitch: {"head": "An essay coach that won't write your essay for you.", "problem": "AI writes the essay, and you learn nothing from it.", "how": "Four agents question your draft: evidence, systems, practice and objections.", "edge": "The score comes from findings you can see, and your essays stay on your computer.", "price": "Open source", "note": "Download coming soon", "cta": ["Join waitlist", "https://noeosorio.com/essay"], "platforms": ["mac"]}, activity: [["2026-11-16", 2, 41, 13], ["2026-11-09", 9, 27021, 7064], ["2026-11-02", 5, 13627, 1254], ["2026-09-21", 3, 222, 175], ["2026-08-03", 2, 352, 4]], price: "Open source", source: "https://github.com/NoeOsorio/essay-studio", page: "https://noeosorio.com/essay", feats: ["Four agents", "A score you can check"], first: "May 9, 2026", name: "Essay Studio", topic: "Learning", icon: "doc", art: "paper", c: "#EEE5D1", fg: "#25201A", created: "05/26", commits: 92, runs: "Mac, as a desktop app",
      text: "A writing app where AI agents question your essay instead of writing it for you.",
      tags: ["Rust", "Tauri", "Next.js", "TypeScript"],
      bullets: ["Four agents with their own voices: evidence, systems, practice and objections.", "The score comes from findings you can see, not from asking a model."],
      links: [{ label: "See project", href: "https://noeosorio.com/essay" }, { label: "Open on GitHub", href: "https://github.com/NoeOsorio/essay-studio" }] },
    { id: "whiteboard", pitch: {"head": "Notes that draw themselves while you teach.", "problem": "Writing on the board means turning your back on the class.", "how": "It listens while you talk and draws short notes live.", "edge": "Your corrections are respected, and it only doodles what can be drawn. Live or from a voice note.", "price": "In development", "note": "", "cta": null, "platforms": ["web"]}, activity: [["2026-11-09", 14, 3938, 368], ["2026-11-02", 31, 16653, 2162], ["2026-10-26", 27, 8676, 676]], price: "In development", source: "", page: "https://noeosorio.com/whiteboard", feats: ["Notes as you talk", "Live or recorded"], first: "Nov 1, 2026", name: "Whiteboard", topic: "Learning", icon: "board", art: "enamel", c: "#F3F4F0", fg: "#1C2A2E", created: "11/26", commits: 72, runs: "Web, during a live class",
      text: "A whiteboard that listens while you talk and draws your notes live.",
      tags: ["Next.js", "React", "TypeScript"],
      bullets: ["Short notes, corrections respected, and doodles only for what can be drawn.", "Works on a live class or on a voice note you upload."], links: [] },
    { id: "telar", pitch: {"head": "A school year you play in 30 minutes.", "problem": "Educational games forget your choices the moment you make them.", "how": "A story engine where characters act on their own.", "edge": "Every decision is remembered and can come back weeks later.", "price": "In development", "note": "", "cta": null, "platforms": ["web"]}, activity: [["2026-09-21", 57, 22231, 3877]], price: "In development", source: "", page: "https://noeosorio.com/telar", feats: ["Choices that last", "La beca"], first: "Sep 23, 2026", name: "Telar", topic: "Games", icon: "book", art: "weave", c: "#6A2924", fg: "#FBE6E1", created: "09/26", commits: 57, runs: "Web browser",
      text: "A story engine for educational visual novels, where characters act on their own.",
      tags: ["TypeScript", "React", "Vite", "Ink"],
      bullets: ["Every decision is remembered and can come back weeks later.", "La beca, the first game, plays a full school year in about 30 minutes."], links: [] },
    { id: "porter-galaxy", pitch: {"head": "See your Kubernetes cluster as a living galaxy.", "problem": "A cluster is hard to picture from a list of Pods.", "how": "It draws the whole cluster in 3D and updates live as it changes.", "edge": "Two views of one graph: how traffic reaches your workloads, and where every Pod runs.", "price": "Open source", "note": "Free", "cta": ["View code", "https://github.com/NoeOsorio/porter-galaxy"], "platforms": ["kubernetes", "web"]}, activity: [["2026-09-28", 56, 8216, 2811], ["2026-09-21", 14, 7612, 5372], ["2026-05-04", 3, 1283, 167], ["2026-03-02", 29, 10196, 1401]], price: "Open source", source: "https://github.com/NoeOsorio/porter-galaxy", page: "https://noeosorio.com/porter-galaxy", feats: ["Two views", "Live updates"], first: "Mar 2, 2026", name: "Porter Galaxy", topic: "Infrastructure", icon: "galaxy", art: "space", c: "#0E1836", fg: "#E3EAFF", created: "03/26", commits: 102, runs: "Any Kubernetes cluster",
      text: "A Kubernetes cluster shown as a living 3D galaxy. A personal project, not a Porter product.",
      tags: ["Go", "Three.js", "Kubernetes", "Helm"],
      bullets: ["Two views of the same graph: how traffic reaches your workloads, and where every Pod runs.", "Updates live as the cluster changes."],
      links: [{ label: "Open on GitHub", href: "https://github.com/NoeOsorio/porter-galaxy" }] },
    { id: "sim-world", pitch: {"head": "Watch life evolve in your browser.", "problem": "It's hard to see how simple rules turn into complex behavior.", "how": "Simulations go from the primordial soup to families with personalities.", "edge": "Four phases, each with one new pressure. Save a run and replay it later.", "price": "Free", "note": "Open source", "cta": ["Play now", "https://simulations.noeosorio.com"], "platforms": ["web"]}, activity: [["2026-09-21", 1, 140, 145], ["2026-04-20", 15, 14021, 1479]], price: "Open source", source: "https://github.com/NoeOsorio/simulations", page: "https://noeosorio.com/sim-world", feats: ["Four phases", "Save and replay"], first: "Apr 23, 2026", name: "Sim World", topic: "Games", icon: "cells", art: "life", c: "#1C311E", fg: "#E5F2DE", created: "04/26", commits: 23, runs: "Web browser",
      text: "Life simulations in the browser, from the primordial soup to families with personalities.",
      tags: ["React", "TypeScript", "Vite"],
      bullets: ["Four phases, each adding one new pressure: scarce food, interdependence, family.", "Save a run as a file, reload it later, or export its event log."],
      links: [{ label: "Try it live", href: "https://simulations.noeosorio.com" }] },
    { id: "kanji", pitch: {"head": "Learn kanji in Spanish, one stroke at a time.", "problem": "Most kanji apps teach in English and never make you write.", "how": "Short lessons with readings, example phrases and stroke practice.", "edge": "Six quiz modes, made for your phone and running fully in the browser.", "price": "Open source", "note": "Free", "cta": ["View code", "https://github.com/NoeOsorio/kanjy-study-app"], "platforms": ["web", "phone"]}, activity: [["2026-09-21", 2, 357, 88], ["2025-11-10", 5, 1039, 101], ["2025-10-06", 3, 188, 354], ["2025-09-29", 1, 476, 31], ["2025-08-25", 1, 179, 0]], price: "Open source", source: "https://github.com/NoeOsorio/kanjy-study-app", page: "https://noeosorio.com/kanji", feats: ["27 kanji to start", "Six quiz modes"], first: "Aug 14, 2025", name: "Kanji Study App", topic: "Learning", icon: "kanji", art: "washi", c: "#F1EBDF", fg: "#1C1A17", created: "08/25", commits: 41, runs: "Phone and web",
      text: "Learn Japanese kanji in Spanish with short lessons, stroke practice and quizzes.",
      tags: ["React", "TypeScript", "Vite", "Tailwind"],
      bullets: ["Four beginner lessons with 27 kanji, readings and example phrases.", "Six quiz modes, built mobile first and running fully in the browser."],
      links: [{ label: "Open on GitHub", href: "https://github.com/NoeOsorio/kanjy-study-app" }] },
    { id: "pyventa", pitch: {"head": "A point of sale that keeps selling when the internet doesn't.", "problem": "A shop stops selling when the connection or the register goes down.", "how": "Fast checkout on the web with a barcode reader, and it keeps working offline.", "edge": "Any phone becomes a price scanner with its camera.", "price": "On demand", "note": "For shops", "cta": ["Request it", "https://noeosorio.com/contact"], "platforms": ["web", "phone"]}, activity: [["2026-10-05", 1, 4, 0], ["2026-09-28", 47, 12758, 2855], ["2026-09-21", 23, 4059, 212], ["2026-09-14", 9, 3423, 121], ["2026-09-07", 8, 1144, 140]], price: "Client project", source: "", page: "https://noeosorio.com/pyventa", feats: ["Fast checkout", "Phone as scanner"], first: "Sep 5, 2026", name: "Pyventa Web", topic: "Tools", icon: "scan", art: "receipt", c: "#F4F1E9", fg: "#1E1B16", created: "09/26", commits: 154, runs: "Store counter and phones",
      text: "A point of sale for a stationery store, rebuilt for the web. I did the web redesign.",
      tags: ["React", "TypeScript", "Tailwind", "FastAPI"],
      bullets: ["Fast sales with a barcode reader, and it keeps working without internet.", "Price lookup from a phone, using its camera as the scanner."], links: [] }
  ]
};
