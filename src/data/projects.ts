import { Project } from '../types/portfolio'

export const projects: Project[] = [
  {
    id: 'osmind',
    title: "Osmind EHR",
    description: "Mejoramos la gestión de datos de salud mental y la experiencia de usuario en la app de telemedicina usando React y Node.js.",
    role: "Software Engineer",
    company: "Osmind",
    companyLink: "https://www.osmind.org/",
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Postgres", 
        icon: "FaDatabase",
        category: "database"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://assets-global.website-files.com/624378a4ca64f003be92dd58/6259f0cf05b044f05181fcbb_Logo.svg"
    ],
    backgroundColor: "#F5F5F5",
    keyPoints: [
      {
        title: "Desarrollo de Aplicación Web",
        content: "Lideré el desarrollo de una aplicación web centrada en proveedores usando React y TypeScript. Utilicé APIs serverless de AWS para ofrecer una solución escalable, segura y eficiente para profesionales de la salud mental."
      },
      {
        title: "Liderazgo en Funcionalidades Móviles",
        content: "Encabecé el diseño y lanzamiento de una innovadora función de auto-programación usando React Native, permitiendo a los usuarios gestionar sus citas desde sus dispositivos móviles."
      },
      {
        title: "Cumplimiento Regulatorio",
        content: "Aseguré el cumplimiento estricto de HIPAA en todos los aspectos del desarrollo, protegiendo los datos de los pacientes y manteniendo los estándares legales."
      },
      {
        title: "Optimización de Procesos Financieros",
        content: "Automatizamos la generación de facturas y superbills, agilizando los reclamos de seguros para los proveedores."
      }
    ],
    timeline: [
      {
        title: "Inicio del Proyecto",
        description: "Comenzamos el desarrollo del backend usando Node.js y AWS, con un enfoque en escalabilidad y seguridad.",
        date: "Julio 2022"
      },
      {
        title: "Funcionalidad de Auto-programación Móvil",
        description: "Lideré el lanzamiento de la función de auto-programación en la app móvil, permitiendo a los usuarios agendar citas fácilmente.",
        date: "Diciembre 2022"
      }
    ],
    category: 'web',
    priority: 1,
    featured: true,
    links: {
      website: 'https://www.osmind.org'
    },
    confidential: true,
    resources: {
      logo: "https://assets-global.website-files.com/624378a4ca64f003be92dd58/6259f0cf05b044f05181fcbb_Logo.svg"
    }
  },
  {
    id: 'clip',
    title: "Equipo de Logística",
    description: "Integración de la API de Amazon Seller mediante microservicios, enfocándonos en construcciones automatizadas y CI para escalabilidad.",
    role: "Software Engineer",
    company: "Clip",
    companyLink: "https://www.clip.mx/",
    confidential: true,
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Postgres", 
        icon: "FaDatabase",
        category: "database"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://firebasestorage.googleapis.com/v0/b/noeosorio-web.appspot.com/o/images%2Fclip.png?alt=media&token=52fdeb88-61d3-438c-8d42-f3df055632a0"
    ],
    backgroundColor: "#fc4c01",
    keyPoints: [
      {
        title: "Integración de Microservicios",
        content: "Desarrollé y desplegué microservicios integrando la API de Amazon Seller, permitiendo un proceso logístico más escalable y eficiente."
      },
      {
        title: "Pipelines de Construcción Automatizados",
        content: "Establecí pipelines de integración continua (CI) y entrega continua (CD) usando servicios de AWS y Jenkins."
      },
      {
        title: "Gestión de Infraestructura en la Nube",
        content: "Utilicé AWS CloudFormation para gestionar toda la infraestructura, asegurando una escalabilidad fluida."
      },
      {
        title: "TypeScript y Arquitectura Limpia",
        content: "Implementé principios de Arquitectura Limpia usando TypeScript, asegurando mantenibilidad y modularidad."
      }
    ],
    timeline: [
      {
        title: "Integración de Microservicios",
        description: "Completé la integración de la API de Amazon Seller en las operaciones logísticas de Clip.",
        date: "Enero 2022"
      },
      {
        title: "Pipeline de Despliegue Automatizado",
        description: "Lancé el pipeline automatizado de construcción y despliegue.",
        date: "Abril 2022"
      }
    ],
    category: 'web',
    priority: 2,
    featured: true,
    links: {
      website: 'https://www.clip.mx'
    },
    resources: {
      logo: "https://firebasestorage.googleapis.com/v0/b/noeosorio-web.appspot.com/o/images%2Fclip.png?alt=media&token=52fdeb88-61d3-438c-8d42-f3df055632a0"
    }
  },
  {
    id: 'fstack',
    title: "Departamento Frontend",
    description: "Lideré el desarrollo frontend y la mentoría en Fstack, optimizando resultados del equipo y proyectos a través de Agile y React.js.",
    role: "Software Engineer",
    company: "Full/Stack",
    companyLink: "https://fstack.tech/index",
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Flutter", 
        icon: "SiFlutter",
        category: "mobile"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: ["https://fstack.tech/_astro/logo_blanco.DxPX-sKd_Z2drN1k.svg"],
    backgroundColor: "#9E9E9E",
    keyPoints: [
      {
        title: "Soluciones Web y Móviles Optimizadas",
        content: "Lideré el desarrollo de múltiples aplicaciones web y móviles usando React.js, Flutter y Redux, mejorando significativamente el rendimiento y la escalabilidad."
      },
      {
        title: "Mentoría y Capacitación en la Nube",
        content: "Mentoré y capacité a practicantes en tecnologías cloud, diseño de sistemas y arquitectura limpia, aumentando la productividad del equipo y habilidades técnicas."
      },
      {
        title: "Optimización de Rendimiento Ágil",
        content: "Utilicé metodologías Agile y KPIs para medir y optimizar el rendimiento del equipo, mejorando la gestión de recursos y velocidad de entrega de proyectos."
      },
      {
        title: "Colaboración Multifuncional",
        content: "Trabajé estrechamente con desarrolladores backend y diseñadores para asegurar la alineación entre requisitos de negocio e implementación frontend, fomentando un ambiente productivo y transparente."
      }
    ],
    timeline: [
      {
        title: "Ingreso a Fstack como Desarrollador Líder",
        description: "Comencé a liderar el equipo frontend, enfocándome en optimización y soluciones escalables.",
        date: "Agosto 2021"
      },
      {
        title: "Desarrollo de App de Cuidado de Adultos Mayores",
        description: "Lideré el desarrollo de una aplicación de cuidado de adultos mayores usando Flutter, enfocándome en optimización móvil.",
        date: "Marzo 2022"
      }
    ],
    category: 'web',
    priority: 3,
    featured: true,
    links: {
      website: 'https://fstack.tech'
    },
    confidential: true,
    resources: {
      logo: "https://fstack.tech/_astro/logo_blanco.DxPX-sKd_Z2drN1k.svg"
    }
  },
  {
    id: 'finloop',
    title: "Administrador Web",
    description: "Desarrollé el frontend para Finloop, enfocándome en UI/UX para una plataforma de préstamos.",
    role: "Frontend Developer",
    company: "Finloop",
    companyLink: "https://finloop.com.mx",
    technologies: [
      { 
        name: "React", 
        icon: "FaReact",
        category: "frontend"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "MongoDB", 
        icon: "FaDatabase",
        category: "database"
      },
      { 
        name: "AWS", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://finloop.com.mx/_next/static/media/finloop.5623e2d2.svg"
    ],
    backgroundColor: "#492eb0",
    keyPoints: [
      {
        title: "Optimización Frontend",
        content: "Lideré el diseño y desarrollo de la interfaz de usuario, mejorando la interacción y navegación a través de la plataforma. Empleé mejores prácticas en React para asegurar que la aplicación sea responsiva y accesible."
      },
      {
        title: "Integración de API REST",
        content: "Trabajé estrechamente con ingenieros backend para integrar APIs RESTful que conectaron usuarios con datos en tiempo real. Esto mejoró la capacidad de la plataforma para transacciones financieras sin problemas."
      },
      {
        title: "Modernización de Código Base",
        content: "Refactoricé código obsoleto, actualizándolo a estándares modernos con principios de arquitectura limpia. Esto aumentó el rendimiento e hizo el desarrollo futuro más eficiente."
      },
      {
        title: "Desarrollo Ágil",
        content: "Colaboré en un entorno Agile para entregar rápidamente actualizaciones de alta calidad, incluyendo nuevas características y optimizaciones de rendimiento, reduciendo el tiempo general de desarrollo."
      }
    ],
    timeline: [
      {
        title: "Rediseño Frontend",
        description: "Inicié un rediseño completo de la UI para mejorar la experiencia de usuario y aumentar el compromiso en la plataforma.",
        date: "Octubre 2020"
      },
      {
        title: "Integración de API Backend",
        description: "Integré exitosamente múltiples APIs para sincronización de datos financieros en tiempo real, mejorando la confiabilidad de la plataforma.",
        date: "Enero 2021"
      }
    ],
    category: 'web',
    priority: 4,
    featured: false,
    links: {
      website: 'https://finloop.com.mx'
    },
    confidential: true,
    resources: {
      logo: "https://finloop.com.mx/_next/static/media/finloop.5623e2d2.svg"
    }
  },
  {
    id: 'voztour',
    title: "VozTour",
    description: "Desarrollé una app de guía turística interactiva usando Flutter y Firebase, mejorando el rendimiento y la experiencia de usuario.",
    role: "Project Leader",
    company: "SmartKode",
    companyLink: "https://www.smartkode.mx/",
    technologies: [
      { 
        name: "Flutter", 
        icon: "SiFlutter",
        category: "mobile"
      },
      { 
        name: "Firebase", 
        icon: "SiFirebase",
        category: "cloud"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Google Cloud", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: [
      "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/b2/89/9e/b2899e01-ca5c-3ac7-5152-faad7fe1eda9/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/230x0w.webp"
    ],
    backgroundColor: "#c850ad",
    keyPoints: [
      {
        title: "UX Interactiva",
        content: "Lideré el diseño y desarrollo de las características interactivas de la app. Mejoré la experiencia de usuario haciendo que los datos en tiempo real sobre cada destino turístico sean accesibles con un toque."
      },
      {
        title: "Gestión Eficiente de Datos",
        content: "Integré Firebase para manejar la gestión de datos en tiempo real, asegurando que los usuarios recibieran información actualizada sobre tours y destinos. Esto mejoró la capacidad de respuesta general de la app."
      },
      {
        title: "Soporte Multiplataforma",
        content: "Aseguré un rendimiento fluido en plataformas iOS y Android, ofreciendo una experiencia consistente para todos los usuarios. Optimicé la app para entornos de bajo ancho de banda, haciéndola confiable incluso en áreas remotas."
      },
      {
        title: "Soluciones Backend Escalables",
        content: "Aproveché Google Cloud para procesos backend escalables, permitiendo que la app maneje un número creciente de usuarios sin comprometer el rendimiento."
      }
    ],
    timeline: [
      {
        title: "Inicio del Desarrollo",
        description: "Comencé el desarrollo en VozTour con enfoque en características interactivas y actualizaciones de datos en tiempo real.",
        date: "Octubre 2019"
      },
      {
        title: "Lanzamiento de la App",
        description: "Lancé la app VozTour, proporcionando a los usuarios una experiencia de guía turística atractiva e informativa.",
        date: "Febrero 2020"
      }
    ],
    category: 'mobile',
    priority: 5,
    featured: false,
    links: {
      website: 'https://www.smartkode.mx',
      appStore: 'https://apps.apple.com/voztour',
      playStore: 'https://play.google.com/store/voztour'
    },
    confidential: true,
    resources: {
      logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/b2/89/9e/b2899e01-ca5c-3ac7-5152-faad7fe1eda9/AppIcon-1x_U007emarketing-0-7-0-0-85-220.png/230x0w.webp"
    }
  },
  {
    id: 'appgua',
    title: "Appgua",
    description: "Lideré la transición de Ionic a Flutter para Appgua, mejorando la arquitectura para un sistema de gestión de agua.",
    role: "Project Leader",
    company: "SmartKode",
    companyLink: "https://www.smartkode.mx/",
    technologies: [
      { 
        name: "Flutter", 
        icon: "SiFlutter",
        category: "mobile"
      },
      { 
        name: "Firebase", 
        icon: "SiFirebase",
        category: "cloud"
      },
      { 
        name: "Node.js", 
        icon: "FaNodeJs",
        category: "backend"
      },
      { 
        name: "Google Cloud", 
        icon: "FaAws",
        category: "cloud"
      }
    ],
    images: ["https://appgua.com.mx/logos/logo.webp"],
    backgroundColor: "#13AAE0",
    keyPoints: [
      {
        title: "Transición a Flutter para Velocidad y Eficiencia",
        content: "Migré la app de Ionic a Flutter, mejorando significativamente la velocidad de desarrollo y el rendimiento de la UI."
      },
      {
        title: "Éxito en App de Entrega de Agua",
        content: "Desarrollé una app fácil de usar que simplificó el proceso de compra de garrafones de agua, resultando en un aumento en ventas y compromiso del cliente."
      },
      {
        title: "Gestión de Estado con Arquitectura BLoC",
        content: "Implementé la arquitectura BLoC para una gestión fluida del estado, asegurando que la app funcionara eficientemente incluso con animaciones complejas."
      },
      {
        title: "Integración en la Nube para Datos en Tiempo Real",
        content: "Utilicé servicios de Google Cloud para sincronización de datos en tiempo real, integrando el backend con habilidades de Alexa para mejorar la experiencia del usuario."
      }
    ],
    timeline: [
      {
        title: "Migración de Ionic a Flutter",
        description: "Transicioné exitosamente la app a Flutter, mejorando UI/UX y reduciendo el tiempo de desarrollo.",
        date: "Febrero 2020"
      },
      {
        title: "Integración con Habilidades de Alexa",
        description: "Permití a los usuarios ordenar agua a través de habilidades de Alexa integrando Google Cloud Functions.",
        date: "Junio 2020"
      }
    ],
    category: 'mobile',
    priority: 6,
    featured: false,
    links: {
      website: 'https://appgua.com.mx',
      appStore: 'https://apps.apple.com/appgua',
      playStore: 'https://play.google.com/store/appgua'
    },
    confidential: true,
    resources: {
      logo: "https://appgua.com.mx/logos/logo.webp"
    }
  },
  {
    id: 'nihongoFlip',
    title: "Aplicación para Aprender Japonés",
    description: "Una app en React Native para aprender idiomas usando tarjetas de memoria estilo Anki, ofreciendo una experiencia de aprendizaje interactiva.",
    role: "Mobile Developer",
    company: "Personal",
    companyLink: "https://github.com/NoeOsorio/NihongoFlip",
    technologies: [
      { name: "React Native", icon: "FaReact", category: "mobile" },
      { name: "Firebase", icon: "SiFirebase", category: "cloud" },
      { name: "Expo", icon: "SiExpo", category: "mobile" }
    ],
    images: [
      "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss1.png",
      "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss3.png"
    ],
    backgroundColor: "#185463",
    keyPoints: [
      {
        title: "Sistema de Tarjetas Optimizado",
        content: "Desarrollé un sistema de aprendizaje interactivo basado en tarjetas utilizando repetición espaciada estilo Anki, mejorando la retención y comprensión del vocabulario japonés. Esta solución innovadora permite a los usuarios seguir su progreso a través de diferentes niveles de dificultad, mejorando la experiencia de aprendizaje."
      },
      {
        title: "Integración con Firebase",
        content: "Integré Firebase Firestore para gestionar y sincronizar datos de usuario, ofreciendo una solución backend confiable y escalable. Esto asegura actualizaciones en tiempo real entre dispositivos, mejorando el compromiso del usuario y la seguridad de datos mientras mantiene baja latencia para una experiencia fluida."
      },
      {
        title: "Compatibilidad Multiplataforma",
        content: "Aproveché Expo para desplegar la app tanto en iOS como en Android, asegurando un rendimiento y experiencia de usuario consistentes. Esta funcionalidad multiplataforma expandió el alcance de la app, proporcionando actualizaciones sin problemas y experiencias uniformes en diferentes dispositivos sin comprometer el rendimiento."
      },
      {
        title: "Implementación de Retroalimentación de Usuario",
        content: "Implementé ciclos de retroalimentación directa con usuarios, iterando rápidamente para mejorar la experiencia de usuario. Mejoré la navegación, capacidad de respuesta y estabilidad de la app abordando puntos problemáticos comunes identificados a través de la retroalimentación, resultando en una mayor tasa de satisfacción del usuario y mejores reseñas de la app."
      }
    ],
    timeline: [
      {
        title: "Inicio del Proyecto",
        description: "Comencé el proyecto estableciendo la base con React Native, Firebase y Expo para asegurar escalabilidad y rendimiento fluido.",
        date: "Enero 2021"
      },
      {
        title: "Lanzamiento Beta",
        description: "Lancé la versión beta con características principales de aprendizaje, enfocándome en entregar tarjetas interactivas y seguimiento del progreso del usuario.",
        date: "Abril 2021"
      }
    ],
    category: 'mobile',
    priority: 7,
    featured: false,
    links: {
      github: 'https://github.com/NoeOsorio/NihongoFlip'
    },
    resources: {
      logo: "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/icon.png",
      screenshots: [
        "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss1.png",
        "https://github.com/NoeOsorio/NihongoFlip/raw/main/assets/ss3.png"
      ]
    }
  },
  {
    id: 'drgravili',
    title: "Gestor de Citas Médicas",
    description: "Una app de gestión de citas médicas basada en Flutter, enfocada en mejorar la confiabilidad a través de la arquitectura BLoC.",
    role: "Mobile Developer",
    company: "Personal",
    companyLink: "https://noeosorio.com/",
    technologies: [
      { name: "Flutter", icon: "SiFlutter", category: "mobile" },
      { name: "Firebase", icon: "SiFirebase", category: "cloud" },
      { name: "Node.js", icon: "FaNodeJs", category: "backend" },
      { name: "Google Cloud", icon: "FaAws", category: "cloud" }
    ],
    images: [
      "https://play-lh.googleusercontent.com/0eQVNR5fnbzfrXhcmb3mXQgwUj5TmLOXfbbJ8bygoM4mWp8fJp4_rRdDNqlEPwSsIw=s360-rw"
    ],
    backgroundColor: "#185463",
    keyPoints: [
      {
        title: "Implementación de Arquitectura BLoC",
        content: "Apliqué la arquitectura BLoC (Business Logic Component) para gestionar eficazmente el estado de la app, asegurando una escalabilidad fluida y alto rendimiento. Esta estructura fue crucial para mejorar la estabilidad de los sistemas de programación de citas mientras reducía la complejidad general del código y mejoraba la mantenibilidad."
      },
      {
        title: "Integración de Firebase para Datos en Tiempo Real",
        content: "Utilicé Firebase Firestore para proporcionar sincronización en tiempo real para citas, permitiendo tanto a pacientes como médicos interactuar con datos en vivo. Este sistema en tiempo real aumentó el compromiso del usuario y agilizó el proceso de programación, haciendo la gestión de citas más eficiente."
      },
      {
        title: "Experiencia de Usuario Mejorada",
        content: "Me enfoqué en desarrollar una interfaz de usuario intuitiva con navegación fácil, asegurando que pacientes y personal médico puedan gestionar citas con facilidad. La integración de características amigables para el usuario como recordatorios de citas a través de notificaciones push mejoró significativamente la satisfacción del paciente."
      },
      {
        title: "Soporte Multiplataforma",
        content: "Construí la app para soportar tanto plataformas iOS como Android sin problemas, aprovechando las capacidades multiplataforma de Flutter. Esto permitió un desarrollo rentable mientras se mantenía un rendimiento similar al nativo en todos los dispositivos, asegurando una experiencia de usuario fluida y consistente."
      }
    ],
    timeline: [
      {
        title: "Desarrollo Inicial",
        description: "Diseñé las características principales para la app usando Flutter y Firebase para gestión de datos en tiempo real.",
        date: "Mayo 2020"
      },
      {
        title: "Lanzamiento de la App",
        description: "Lancé la primera versión de la app, permitiendo a los pacientes reservar, reprogramar y gestionar citas médicas con facilidad.",
        date: "Septiembre 2020"
      }
    ],
    category: 'mobile',
    priority: 8,
    featured: false,
    links: {
      website: 'https://noeosorio.com',
      playStore: 'https://play.google.com/store/apps/details?id=com.drgravili'
    },
    confidential: true,
    resources: {
      logo: "https://play-lh.googleusercontent.com/0eQVNR5fnbzfrXhcmb3mXQgwUj5TmLOXfbbJ8bygoM4mWp8fJp4_rRdDNqlEPwSsIw=s360-rw"
    }
  }
]

export const featuredProjects = projects.filter(p => p.featured).sort((a, b) => b.priority - a.priority)
export const workProjects = projects.filter(p => p.company !== 'Personal')
export const personalProjects = projects.filter(p => p.company === 'Personal')

export default projects 