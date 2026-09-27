import { Project } from '../types/portfolio';

export const landingPages: Project[] = [
  {
    id: 'landing-1',
    title: "Clínica Dental Moderna",
    description: "Landing page para clínica dental con diseño moderno y enfoque en la experiencia del paciente. Incluye sistema de citas en línea y testimonios.",
    role: "Frontend Developer",
    company: "B2B",
    companyLink: "https://noeosorio.com",
    technologies: [
      { name: "React", icon: "FaReact", category: "frontend" },
      { name: "Tailwind", icon: "SiTailwindcss", category: "frontend" },
      { name: "Framer Motion", icon: "SiFramer", category: "frontend" }
    ],
    images: ["/images/proyecto1.png"],
    backgroundColor: "#4F46E5",
    keyPoints: [
      {
        title: "Diseño Centrado en el Usuario",
        content: "Interfaz intuitiva que prioriza la facilidad de navegación y la información clave para los pacientes."
      },
      {
        title: "Optimización SEO",
        content: "Implementación de mejores prácticas SEO para aumentar la visibilidad en búsquedas locales."
      }
    ],
    timeline: [
      {
        title: "Lanzamiento",
        description: "Sitio web lanzado y optimizado para búsquedas locales",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 1,
    featured: false,
    links: {
      website: 'https://ejemplo-dental.com'
    },
    resources: {
      logo: "/images/proyecto1.png"
    }
  },
  {
    id: 'landing-2',
    title: "Restaurante Gourmet",
    description: "Página web para restaurante de alta cocina con galería de platillos, menú interactivo y sistema de reservaciones.",
    role: "Frontend Developer",
    company: "B2B",
    companyLink: "https://noeosorio.com",
    technologies: [
      { name: "Next.js", icon: "SiVercel", category: "frontend" },
      { name: "GSAP", icon: "SiFramer", category: "frontend" },
      { name: "Styled Components", icon: "SiTailwindcss", category: "frontend" }
    ],
    images: ["/images/proyecto2.png"],
    backgroundColor: "#CA8A04",
    keyPoints: [
      {
        title: "Experiencia Visual",
        content: "Animaciones suaves y transiciones elegantes que realzan la presentación de los platillos."
      },
      {
        title: "Integración de Reservas",
        content: "Sistema de reservaciones en tiempo real integrado con el calendario del restaurante."
      }
    ],
    timeline: [
      {
        title: "Lanzamiento",
        description: "Implementación del sistema de reservas y menú interactivo",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 2,
    featured: false,
    links: {
      website: 'https://ejemplo-restaurante.com'
    },
    resources: {
      logo: "/images/proyecto2.png"
    }
  },
  {
    id: 'landing-3',
    title: "Academia de Fitness",
    description: "Landing page para gimnasio y academia de fitness con programas personalizados y seguimiento de progreso.",
    role: "Frontend Developer",
    company: "B2B",
    companyLink: "https://noeosorio.com",
    technologies: [
      { name: "Vue.js", icon: "FaReact", category: "frontend" },
      { name: "Firebase", icon: "SiFirebase", category: "cloud" },
      { name: "Sass", icon: "SiTailwindcss", category: "frontend" }
    ],
    images: ["/images/proyecto3.png"],
    backgroundColor: "#16A34A",
    keyPoints: [
      {
        title: "Calculadora de IMC",
        content: "Herramienta interactiva para calcular el índice de masa corporal y recibir recomendaciones."
      },
      {
        title: "Planes Personalizados",
        content: "Sistema de suscripción con diferentes niveles de membresía y beneficios."
      }
    ],
    timeline: [
      {
        title: "Lanzamiento",
        description: "Implementación de calculadora IMC y sistema de suscripciones",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 3,
    featured: false,
    links: {
      website: 'https://ejemplo-fitness.com'
    },
    resources: {
      logo: "/images/proyecto3.png"
    }
  },
  {
    id: 'landing-4',
    title: "Agencia de Viajes",
    description: "Sitio web para agencia de viajes especializada en experiencias únicas y paquetes personalizados.",
    role: "Frontend Developer",
    company: "B2B",
    companyLink: "https://noeosorio.com",
    technologies: [
      { name: "React", icon: "FaReact", category: "frontend" },
      { name: "Three.js", icon: "SiFramer", category: "frontend" },
      { name: "Node.js", icon: "FaNodeJs", category: "backend" }
    ],
    images: ["/images/proyecto4.png"],
    backgroundColor: "#0EA5E9",
    keyPoints: [
      {
        title: "Visualización 3D",
        content: "Experiencia inmersiva con visualización 3D de destinos turísticos."
      },
      {
        title: "Búsqueda Inteligente",
        content: "Sistema de filtrado avanzado para encontrar el viaje perfecto según preferencias y presupuesto."
      }
    ],
    timeline: [
      {
        title: "Lanzamiento",
        description: "Implementación de visualización 3D y sistema de búsqueda",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 4,
    featured: false,
    links: {
      website: 'https://ejemplo-viajes.com'
    },
    resources: {
      logo: "/images/proyecto4.png"
    }
  }
]; 