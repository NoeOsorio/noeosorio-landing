import { Project } from '../types/portfolio';

export const personalProjects: Project[] = [
  {
    id: 'react-migrations',
    title: 'React Migrations',
    description: 'CLI para automatizar migraciones de React. Actualiza automáticamente componentes y hooks a las últimas versiones.',
    role: "Lead Developer",
    company: "Open Source",
    companyLink: "https://github.com/noeosorio",
    technologies: [
      { name: "TypeScript", icon: "SiTypescript", category: "frontend" },
      { name: "Node.js", icon: "FaNodeJs", category: "backend" }
    ],
    images: ["/projects/react-migrations-banner.jpg"],
    backgroundColor: "#0EA5E9",
    keyPoints: [
      {
        title: "Migración Automática",
        content: "Detecta y actualiza automáticamente código legacy a las últimas versiones de React."
      },
      {
        title: "Análisis Estático",
        content: "Utiliza AST para analizar y transformar el código de forma segura."
      },
      {
        title: "Personalizable",
        content: "Reglas de migración configurables y extensibles mediante plugins."
      }
    ],
    timeline: [
      {
        title: "v1.0.0",
        description: "Lanzamiento inicial con soporte para React 18",
        date: "2024"
      }
    ],
    category: 'cli',
    priority: 1,
    featured: true,
    links: {
      github: 'https://github.com/noeosorio/react-migrations',
      npm: 'https://www.npmjs.com/package/react-migrations'
    },
    resources: {
      logo: "/projects/react-migrations-logo.png"
    },
    stats: {
      stars: '50+',
      downloads: '1k+',
      contributors: '5'
    }
  },
  {
    id: 'python-ai-utils',
    title: 'Python AI Utils',
    description: 'Colección de utilidades para procesamiento de datos y machine learning. Optimiza flujos de trabajo con IA.',
    role: "Core Contributor",
    company: "Open Source",
    companyLink: "https://github.com/noeosorio",
    technologies: [
      { name: "Python", icon: "FaPython", category: "backend" },
      { name: "TensorFlow", icon: "SiTensorflow", category: "backend" }
    ],
    images: ["/projects/python-ai-utils-banner.jpg"],
    backgroundColor: "#16A34A",
    keyPoints: [
      {
        title: "Procesamiento de Datos",
        content: "Funciones optimizadas para limpieza y transformación de datasets."
      },
      {
        title: "Modelos Pre-entrenados",
        content: "Integración con modelos populares de NLP y Computer Vision."
      },
      {
        title: "Pipeline Automation",
        content: "Automatización de flujos de trabajo de ML con mínima configuración."
      }
    ],
    timeline: [
      {
        title: "v2.0.0",
        description: "Soporte para nuevos modelos y optimizaciones",
        date: "2024"
      }
    ],
    category: 'cli',
    priority: 2,
    featured: true,
    links: {
      github: 'https://github.com/noeosorio/python-ai-utils',
      docs: 'https://python-ai-utils.readthedocs.io'
    },
    resources: {
      logo: "/projects/python-ai-utils-logo.png"
    },
    stats: {
      stars: '30+',
      downloads: '500+',
      contributors: '3'
    }
  }
]; 