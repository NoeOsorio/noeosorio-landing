export type PassportShape = 'circle' | 'hex' | 'octa' | 'rect' | 'tri' | 'oval';
export type PassportKind = 'pill' | 'ribbon' | 'square' | 'seal' | 'oct' | 'dash';

export interface PassportMain {
  shape: PassportShape;
  ink: string;
  top?: string;
  bottom?: string;
  lines?: string[];
  icon: string;
  x: number;
  y: number;
  w: number;
  rot: number;
}

export interface PassportSkill {
  kind: PassportKind;
  ink: string;
  icon: string;
  text: string;
}

export interface PassportPage {
  city: string;
  seed: number;
  main: PassportMain;
  skills: PassportSkill[];
}

export interface PassportContent {
  title: string;
  owner: string;
  role: string;
  sub: string;
  coverWord: string;
  visasWord: string;
  pages: PassportPage[];
}

const INK = { green: "#2E6A3C", blue: "#2C4F9E", violet: "#5B3FA6", red: "#B23A2E", teal: "#1F6F78", ochre: "#8A5A12", rust: "#C2412D" };

export const passport: PassportContent = {
  title: "Where I've worked",
  owner: "NOÉ OSORIO", role: "PRODUCT ENGINEER",
  sub: "Each city is a page. Each stamp is something I built or learned there.",
  coverWord: "PASSPORT", visasWord: "VISAS",
  pages: [
    { city: "New York", seed: 3,
      main: { shape: "circle", ink: INK.green, top: "PORTER  PRODUCT ENGINEER", bottom: "2026 TO TODAY", icon: "clouds", x: 22, y: 104, w: 310, rot: -7 },
      skills: [
        { kind: "seal", ink: INK.green, icon: "k8s", text: "KUBERNETES CLUSTERS" },
        { kind: "pill", ink: INK.blue, icon: "agent", text: "AI AGENTS" },
        { kind: "ribbon", ink: INK.red, icon: "rocket", text: "YC STARTUPS" },
        { kind: "square", ink: INK.violet, icon: "system", text: "SYSTEM DESIGN" },
        { kind: "dash", ink: INK.teal, icon: "cursor", text: "PRODUCT DESIGN AND UX" },
        { kind: "oct", ink: INK.green, icon: "shield", text: "CLUSTER SECURITY" },
        { kind: "pill", ink: INK.ochre, icon: "flow", text: "AI WORKFLOWS" },
      ] },
    { city: "Iowa", seed: 7,
      main: { shape: "octa", ink: INK.blue, top: "APEX SYSTEMS", lines: ["SOFTWARE ENGINEER", "JUL 2024 TO NOV 2025"], icon: "server", x: 200, y: 140, w: 290, rot: 5 },
      skills: [
        { kind: "seal", ink: INK.green, icon: "db", text: "MONGODB" },
        { kind: "pill", ink: INK.red, icon: "migrate", text: "DATA MIGRATIONS" },
        { kind: "square", ink: INK.teal, icon: "wall", text: "AWS WAF" },
        { kind: "ribbon", ink: INK.violet, icon: "lambda", text: "LAMBDA AND API GATEWAY" },
        { kind: "dash", ink: INK.ochre, icon: "server", text: "NODE.JS BACKENDS" }
      ] },
    { city: "San Francisco", seed: 11,
      main: { shape: "hex", ink: INK.violet, top: "OSMIND  MENTAL HEALTH", lines: ["SELF-SCHEDULING", "2022 TO 2023"], icon: "calendar", x: 26, y: 100, w: 290, rot: 6 },
      skills: [
        { kind: "square", ink: INK.red, icon: "lock", text: "HIPAA COMPLIANCE" },
        { kind: "pill", ink: INK.teal, icon: "calendar", text: "SCHEDULING REDESIGN" },
        { kind: "seal", ink: INK.blue, icon: "algo", text: "ALGORITHM DESIGN" },
        { kind: "ribbon", ink: INK.violet, icon: "atom", text: "REACT AND REACT NATIVE" },
        { kind: "dash", ink: INK.ochre, icon: "lambda", text: "SERVERLESS ON LAMBDA" },
        { kind: "oct", ink: INK.violet, icon: "brain", text: "PSYCHIATRY" },
        { kind: "pill", ink: INK.green, icon: "receipt", text: "INSURANCE BILLING" },
        { kind: "seal", ink: INK.red, icon: "gauge", text: "SYSTEM OPTIMIZATION" }
      ] },
    { city: "Ciudad de México", seed: 5,
      main: { shape: "rect", ink: INK.rust, lines: ["CLIP", "LOGISTICS TEAM", "2021 TO 2022"], icon: "tap", x: 170, y: 104, w: 330, rot: -5 },
      skills: [
        { kind: "ribbon", ink: INK.ochre, icon: "box", text: "AMAZON SELLER API" },
        { kind: "square", ink: INK.blue, icon: "tiles", text: "MICROFRONTENDS" },
        { kind: "pill", ink: INK.teal, icon: "layers", text: "CLOUDFORMATION" },
        { kind: "seal", ink: INK.green, icon: "pipe", text: "AUTOMATED CI/CD" },
        { kind: "oct", ink: INK.violet, icon: "rings", text: "CLEAN ARCHITECTURE" },
        { kind: "dash", ink: INK.rust, icon: "chat", text: "CROSS-TEAM COMMUNICATION" },
        { kind: "seal", ink: INK.teal, icon: "atom", text: "REACT FRONTENDS" }
      ] },
    { city: "Puebla", seed: 9,
      main: { shape: "tri", ink: INK.blue, lines: ["FINLOOP", "FULL STACK ENGINEER", "2020 TO 2021"], icon: "doc", x: 24, y: 104, w: 300, rot: -6 },
      skills: [
        { kind: "seal", ink: INK.green, icon: "doc", text: "AUTOMATED LOANS" },
        { kind: "pill", ink: INK.violet, icon: "sigma", text: "FINANCIAL MATH" },
        { kind: "square", ink: INK.red, icon: "scale", text: "LEGAL WORKFLOWS" },
        { kind: "ribbon", ink: INK.teal, icon: "db", text: "REACT AND MONGODB" },
        { kind: "dash", ink: INK.blue, icon: "globe", text: "S3 AND CLOUDFRONT" },
        { kind: "oct", ink: INK.ochre, icon: "check", text: "TESTING PIPELINES" },
        { kind: "pill", ink: INK.rust, icon: "sparkle", text: "UI POLISH" }
      ] },
    { city: "", seed: 13,
      main: { shape: "oval", ink: INK.teal, top: "SMARTKODE", bottom: "2018 TO 2020", lines: ["TECH LEAD"], icon: "team", x: 140, y: 64, w: 360, rot: -4 },
      skills: [
        { kind: "pill", ink: INK.blue, icon: "phone", text: "FLUTTER AND FIREBASE" },
        { kind: "seal", ink: INK.violet, icon: "mentor", text: "MENTORING DEVELOPERS" },
        { kind: "ribbon", ink: INK.red, icon: "migrate", text: "IONIC TO FLUTTER" },
        { kind: "square", ink: INK.green, icon: "store", text: "APPS FOR BUSINESSES" },
        { kind: "oct", ink: INK.ochre, icon: "coin", text: "FINTECH APPS" },
        { kind: "dash", ink: INK.teal, icon: "system", text: "PRODUCT ENGINEERING" }
      ] }
  ]
};
