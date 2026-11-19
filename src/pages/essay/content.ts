// Every word of the /essay page, in Spanish and English.
// Edit here; the page and the 3D model rebuild from this file.
// The app shown in the model is in Spanish in both languages, because the app itself is in Spanish.

export type Lang = "es" | "en";

export type EssayCopy = {
  langName: string;
  seoTitle: string;
  seoDescription: string;
  /** Captions beside the 3D model, in scroll order. */
  captions: { title: string; text: string }[];
  detailsTitle: string;
  details: { title: string; text: string }[];
  waitlist: {
    title: string;
    text: string;
    placeholder: string;
    emailLabel: string;
    button: string;
    sending: string;
    done: string;
    invalid: string;
    failed: string;
  };
  github: string;
  stack: string;
  footer: string;
  backToSite: string;
};

export const GITHUB_URL = "https://github.com/NoeOsorio/essay-studio";

export const COPY: Record<Lang, EssayCopy> = {
  es: {
    langName: "Español",
    seoTitle: "Essay Studio, de Noé Osorio",
    seoDescription:
      "Una app de escritorio para escribir donde cuatro agentes de IA cuestionan tu ensayo en vez de escribirlo por ti.",
    captions: [
      {
        title: "Essay Studio",
        text: "Una app de escritorio para escribir donde cuatro agentes de IA cuestionan tu ensayo en vez de escribirlo por ti.",
      },
      { title: "Tú escribes.", text: "El ensayo sigue siendo tuyo. Nadie lo escribe por ti." },
      {
        title: "Los agentes preguntan.",
        text: "Evidencia, Sistemas y Objeciones dejan sus preguntas en el tablero.",
      },
      {
        title: "Luego revisan.",
        text: "Cada afirmación por revisar queda subrayada con el color de su agente, con una calificación.",
      },
    ],
    detailsTitle: "Te hace pensar, no escribe por ti.",
    details: [
      {
        title: "Cuatro agentes",
        text: "Evidencia, sistemas, práctica y objeciones tienen cada uno su voz y su color. Hacen preguntas y marcan tu texto.",
      },
      {
        title: "Una calificación que puedes revisar",
        text: "Empieza en 10 y baja con cada hallazgo abierto. Puedes aplicar un hallazgo o descartarlo.",
      },
      {
        title: "Rúbrica y fuentes",
        text: "Suelta la consigna y aparecen sus criterios con su peso. Suelta un PDF y se llenan el título, los autores y la cita.",
      },
      {
        title: "Tuyo, en tu computadora",
        text: "Los ensayos se guardan como archivos en tu máquina, con versiones automáticas y un respaldo antes de cada restauración. También puedes crear tus propios agentes.",
      },
    ],
    waitlist: {
      title: "Avísame cuando esté lista",
      text: "Deja tu correo y te escribo cuando puedas descargarla. Solo para eso.",
      placeholder: "tu@correo.com",
      emailLabel: "Tu correo",
      button: "Avísame",
      sending: "Guardando…",
      done: "Listo. Te escribo cuando esté lista.",
      invalid: "Escribe un correo válido.",
      failed: "No se pudo guardar tu correo. Inténtalo de nuevo.",
    },
    github: "Ver el código en GitHub",
    stack: "Código abierto, hecho con Rust, Tauri, Next.js y TypeScript",
    footer: "Un proyecto personal de Noé Osorio",
    backToSite: "Ir a noeosorio.com",
  },
  en: {
    langName: "English",
    seoTitle: "Essay Studio, by Noé Osorio",
    seoDescription:
      "A desktop writing app where four AI agents question your essay instead of writing it for you.",
    captions: [
      {
        title: "Essay Studio",
        text: "A desktop writing app where four AI agents question your essay instead of writing it for you.",
      },
      { title: "You write.", text: "The essay stays yours. Nothing is written for you." },
      {
        title: "Agents ask.",
        text: "Evidence, Systems and Objections each leave their questions on the board.",
      },
      {
        title: "Then they review.",
        text: "Every claim to check is underlined in its agent's color, with a score.",
      },
    ],
    detailsTitle: "It makes you think. It doesn't write for you.",
    details: [
      {
        title: "Four agents",
        text: "Evidence, systems, practice and objections each have their own voice and color. They ask questions and mark your text.",
      },
      {
        title: "A score you can check",
        text: "It starts at 10 and drops with each open finding. You can apply a finding or dismiss it.",
      },
      {
        title: "Rubric and sources",
        text: "Drop an assignment and its criteria appear with their weight. Drop a PDF and the title, authors and citation fill in.",
      },
      {
        title: "Yours, on your computer",
        text: "Essays are saved as files on your machine, with automatic versions and a backup before every restore. You can also create your own agents.",
      },
    ],
    waitlist: {
      title: "Tell me when it's ready",
      text: "Leave your email and I'll write when you can download it. Nothing else.",
      placeholder: "you@email.com",
      emailLabel: "Your email",
      button: "Notify me",
      sending: "Saving…",
      done: "Done. I'll write when it's ready.",
      invalid: "Enter a valid email.",
      failed: "Your email couldn't be saved. Try again.",
    },
    github: "See the code on GitHub",
    stack: "Open source, built with Rust, Tauri, Next.js and TypeScript",
    footer: "A personal project by Noé Osorio",
    backToSite: "Go to noeosorio.com",
  },
};

/** The example essay shown inside the 3D model. {em:…} {sis:…} {cri:…} mark what each agent underlines. */
export const APP = {
  back: "Ensayos",
  ask: "Hazme preguntas",
  review: "Revisar ensayo",
  score: "4.0",
  title: "La paradoja de la seguridad psicológica en equipos remotos",
  body: "{sis:Edmondson definió la seguridad} psicológica como {sis:la creencia compartida de} que el {sis:equipo es seguro para} tomar riesgos interpersonales. {em:En equipos remotos esa} creencia se {em:sostiene con rituales pequeños:} el café, la {em:mirada, el silencio cómodo} después de {cri:una pregunta. Sin} ellos, todos {cri:asumen que preguntar} es {cri:arriesgado y el} {em:equipo deja de aprender.}",
  agents: {
    em: { name: "Evidencia" },
    sis: { name: "Sistemas" },
    cri: { name: "Objeciones" },
  } as Record<string, { name: string }>,
  notes: [
    { agent: "em", text: "¿En qué muestra se midió ese efecto y con qué N?" },
    { agent: "em", text: "¿La cita de Edmondson es del estudio original o de una review?" },
    { agent: "em", text: "¿Qué instrumento medible reemplazaría la frase «rituales sostienen seguridad»?" },
    { agent: "sis", text: "¿Qué loop de retroalimentación sostiene este comportamiento?" },
    { agent: "sis", text: "¿Estás explicando una dinámica estructural con causas individuales?" },
    { agent: "sis", text: "¿Dónde está el punto de apalancamiento implícito?" },
    { agent: "cri", text: "¿Cuál sería el steelman del lado opuesto?" },
    { agent: "cri", text: "¿Quién no aparece en esta historia?" },
    { agent: "cri", text: "¿Qué supuestos ideológicos asume el autor sin examinar?" },
  ],
};
