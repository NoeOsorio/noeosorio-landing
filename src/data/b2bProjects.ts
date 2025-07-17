import { Project } from "../types/portfolio";

export const b2bProjects: Project[] = [
    {
      id: 'transcriptor',
      title: "Transcriptor AI",
      description: "Plataforma de transcripción automática potenciada por IA. Convierte audio y video a texto con alta precisión.",
      role: "Full Stack Developer",
      company: "SakuraKode",
      companyLink: "https://sakurakode.com",
      technologies: [
        { name: "React", icon: "FaReact", category: "frontend" },
        { name: "Node.js", icon: "FaNodeJs", category: "backend" },
        { name: "AWS", icon: "FaAws", category: "cloud" }
      ],
      images: ["/projects/transcriptor-dashboard.jpg"],
      backgroundColor: "#0EA5E9",
      keyPoints: [
        {
          title: "Transcripción en Tiempo Real",
          content: "Procesamiento de audio en tiempo real con tecnología de streaming y WebSockets."
        },
        {
          title: "Multi-idioma",
          content: "Soporte para más de 30 idiomas con detección automática del idioma hablado."
        },
        {
          title: "Análisis de Sentimientos",
          content: "Identificación automática de emociones y temas clave en las conversaciones."
        }
      ],
      timeline: [
        {
          title: "Lanzamiento",
          description: "MVP con funcionalidades core",
          date: "2024"
        }
      ],
      category: 'web',
      priority: 1,
      featured: true,
      links: {
        website: 'https://transcriptor.sakurakode.com'
      },
      resources: {
        logo: "/projects/transcriptor-logo.png"
      }
    },
    {
      id: 'proposals',
      title: "Proposals",
      description: "Sistema de generación y gestión de propuestas comerciales con IA. Crea documentos profesionales en minutos.",
      role: "Full Stack Developer",
      company: "SakuraKode",
      companyLink: "https://sakurakode.com",
      technologies: [
        { name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
        { name: "GraphQL", icon: "SiGraphql", category: "backend" },
        { name: "MongoDB", icon: "SiMongodb", category: "database" }
      ],
      images: ["/projects/proposals-dashboard.jpg"],
      backgroundColor: "#8B5CF6",
      keyPoints: [
        {
          title: "Templates Inteligentes",
          content: "Biblioteca de templates personalizables que se adaptan a tu marca y sector."
        },
        {
          title: "Automatización con IA",
          content: "Generación automática de contenido relevante basado en el perfil del cliente."
        },
        {
          title: "Analytics Avanzados",
          content: "Seguimiento de métricas de conversión y engagement de propuestas."
        }
      ],
      timeline: [
        {
          title: "Beta",
          description: "Versión beta con primeros usuarios",
          date: "2024"
        }
      ],
      category: 'web',
      priority: 2,
      featured: true,
      links: {
        website: 'https://proposals.sakurakode.com'
      },
      resources: {
        logo: "/projects/proposals-logo.png"
      }
    }
  ]