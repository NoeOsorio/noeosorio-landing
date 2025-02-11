import { 
  HiCode, 
  HiDeviceMobile, 
  HiLightningBolt,
  HiServer, 
  HiCreditCard, 
  HiChip,
  HiColorSwatch,
  HiCloud,
  HiClock,
  HiChartBar,
  HiSparkles,
  HiTrendingUp,
  HiCog,
  HiShieldCheck,
  HiCalendar
} from 'react-icons/hi';

export const mainServices = [
  {
    id: 'web-app',
    icon: HiCode,
    title: 'Web App Development',
    description: 'Crea una aplicación web poderosa, escalable y optimizada.',
    useCases: [
      {
        title: 'Plataforma de E-learning',
        description: '¿Quieres llevar tu academia online? Crea una plataforma donde tus estudiantes puedan acceder a cursos, realizar pagos y seguir su progreso automáticamente.'
      },
      {
        title: 'Dashboard Empresarial',
        description: '¿Necesitas visualizar todos tus datos en un solo lugar? Centraliza métricas, KPIs y reportes en tiempo real para tomar mejores decisiones.'
      },
      {
        title: 'E-commerce Personalizado',
        description: '¿Shopify no cubre tus necesidades? Desarrollamos tu tienda con características únicas como reservas, inventario especial o integraciones custom.'
      }
    ],
    features: [
      'Frontend moderno y responsive que cautiva a tus usuarios',
      'Backend robusto que garantiza operación 24/7',
      'Base de datos que crece con tu negocio sin problemas',
      'Acceso seguro y sin fricciones para tus usuarios',
      'Integración con las herramientas que ya usas',
      'Posicionamiento optimizado en buscadores',
      'Control total con métricas en tiempo real',
      'Soporte dedicado por 2 meses'
    ],
    price: 'Desde $6,500 USD',
    timeline: '6-10 semanas',
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'mobile-app',
    icon: HiDeviceMobile,
    title: 'Mobile App Development',
    description: 'Aplicaciones móviles nativas o híbridas listas para escalar.',
    useCases: [
      {
        title: 'App de Delivery',
        description: '¿Cansado de las altas comisiones? Crea tu propia app de entregas y mantén el control total de tus pedidos, rutas y comisiones.'
      },
      {
        title: 'App de Fidelización',
        description: '¿Tienes una cafetería o restaurante? Recompensa a tus clientes frecuentes con un sistema de puntos, descuentos y promociones personalizadas.'
      },
      {
        title: 'App de Servicios',
        description: '¿Ofreces servicios a domicilio? Gestiona citas, técnicos y pagos en una app intuitiva que tus clientes amarán usar.'
      }
    ],
    features: [
      'Desarrollo nativo o híbrido según tus necesidades',
      'Backend seguro y escalable incluido',
      'Autenticación social y tradicional',
      'Notificaciones push y funciones interactivas',
      'Monetización integrada (pagos, suscripciones)',
      'Publicación en App/Play Store',
      'Soporte técnico por 2 meses'
    ],
    price: 'Desde $8,500 USD',
    timeline: '8-12 semanas',
    color: 'from-lime-500 to-emerald-500'
  },
  {
    id: 'business-automation',
    icon: HiCog,
    title: 'Business Automation Suite',
    description: 'Optimiza y automatiza tus procesos empresariales sin esfuerzo.',
    useCases: [
      {
        title: 'Automatización de Ventas',
        description: '¿Tu equipo pierde tiempo en tareas repetitivas? Automatiza seguimiento de leads, cotizaciones y recordatorios para vender más.'
      },
      {
        title: 'Integración de Sistemas',
        description: '¿Tus herramientas no se comunican entre sí? Conecta tu CRM, ERP y e-commerce para tener datos sincronizados automáticamente.'
      },
      {
        title: 'Reportes Automatizados',
        description: '¿Generas reportes manualmente? Automatiza la creación y envío de informes personalizados a tus clientes o equipo.'
      }
    ],
    features: [
      'Automatización de procesos clave',
      'Integración con Make y Zapier',
      'Conexión con CRMs populares',
      'Sincronización de datos multiplataforma',
      'Reportes automatizados en tiempo real',
      'Optimización con IA',
      'Soporte técnico por 2 meses'
    ],
    price: 'Desde $7,500 USD',
    timeline: '6-10 semanas',
    color: 'from-blue-500 to-indigo-500'
  },
  // ... otros servicios principales
];

export const financingOptions = [
  {
    title: "Pago Mensual",
    description: "Divide el costo total en pagos mensuales manejables",
    features: [
      "Sin intereses en pagos a 3 meses",
      "Aprobación instantánea",
      "Sin penalización por pago anticipado"
    ],
    icon: HiCalendar,
    highlight: false
  },
  {
    title: "Plan Flexible",
    description: "Paga por etapas según el avance del proyecto",
    features: [
      "50% para iniciar el proyecto",
      "25% al entregar el primer MVP",
      "25% al finalizar el proyecto"
    ],
    icon: HiCreditCard,
    highlight: true
  },
  {
    title: "Pago Seguro",
    description: "Múltiples opciones de pago seguras",
    features: [
      "Tarjetas de crédito/débito",
      "Transferencia bancaria",
      "PayPal para mayor protección"
    ],
    icon: HiShieldCheck,
    highlight: false
  }
];

export const businessValue = [
  {
    title: "Ahorro de Tiempo y Costos",
    description: "Reduce hasta 40% en costos operativos y automatiza procesos que antes tomaban horas.",
    icon: HiClock
  },
  {
    title: "Escalabilidad Garantizada",
    description: "Tu aplicación crece con tu negocio, soportando desde 100 hasta 100,000+ usuarios sin problemas.",
    icon: HiChartBar
  },
  {
    title: "Ventaja Competitiva",
    description: "Destácate con tecnología de punta y experiencias de usuario superiores a la competencia.",
    icon: HiSparkles
  },
  {
    title: "ROI Medible",
    description: "Dashboards en tiempo real para medir el retorno de inversión y tomar decisiones informadas.",
    icon: HiTrendingUp
  }
];

export const startupBundle = {
  id: 'startup-acceleration',
  icon: HiLightningBolt,
  title: 'Startup Acceleration Bundle',
  description: 'Tu MVP listo para lanzar en tiempo récord.',
  useCases: [
    {
      title: 'Marketplace Innovador',
      description: '¿Tienes una idea para conectar compradores y vendedores? Lanza tu MVP con las funciones esenciales y valida tu modelo de negocio rápidamente.'
    },
    {
      title: 'SaaS B2B',
      description: '¿Quieres resolver un problema empresarial? Desarrolla una solución SaaS con suscripciones, onboarding y analytics incluidos.'
    },
    {
      title: 'App Social/Comunidad',
      description: '¿Buscas crear la próxima red social vertical? Construye una comunidad con perfiles, interacciones y contenido personalizado.'
    }
  ],
  features: [
    'Aplicación web + aplicación móvil híbrida',
    'Integración con Stripe, PayPal o pasarelas de pago',
    'Automatización con Zapier/Make para optimizar flujos',
    'Dashboard con métricas clave y analytics',
    'Soporte técnico por 2 meses'
  ],
  color: 'from-orange-500 to-red-500'
};

export const addons = [
  {
    title: "Creación de microservicios o backend",
    price: "Desde $3,500 USD",
    icon: HiServer
  },
  {
    title: "Integración de API de pagos",
    price: "Desde $2,000 USD",
    icon: HiCreditCard
  },
  {
    title: "Integración de LLM (Modelos de IA)",
    price: "Desde $3,500 USD",
    icon: HiChip
  },
  {
    title: "Rediseño UI/UX para tu app web",
    price: "Desde $2,500 USD",
    icon: HiColorSwatch
  },
  {
    title: "Rediseño de app mobile",
    price: "Desde $3,000 USD",
    icon: HiDeviceMobile
  },
  {
    title: "Publicación y optimización en tiendas",
    price: "Desde $1,500 USD",
    icon: HiCloud
  }
];

export const servicesData = {
  mainServices,
  financingOptions,
  businessValue,
  startupBundle,
  addons,
  allServices: [
    ...mainServices,
    {
      title: startupBundle.title,
      icon: startupBundle.icon,
      color: startupBundle.color,
      useCases: startupBundle.useCases,
    }
  ]
};

export const webAppFeatures = [
  {
    title: "Frontend Development",
    multiSelect: false,
    options: [
      { 
        id: "basic-ui", 
        label: "UI Básica", 
        description: "Diseño responsive, componentes esenciales, y optimización básica.",
        price: 2000,
        time: 4
      },
      { 
        id: "advanced-ui", 
        label: "UI Avanzada + Animaciones", 
        description: "Micro-interacciones, animaciones fluidas, y experiencia de usuario mejorada.",
        price: 3500,
        time: 6
      },
      { 
        id: "premium-ui", 
        label: "UI Premium + Interactividad", 
        description: "Diseño único, animaciones complejas, y experiencia de usuario excepcional.",
        price: 5000,
        time: 8
      }
    ]
  },
  {
    title: "Backend Development",
    multiSelect: false,
    options: [
      { 
        id: "basic-api", 
        label: "API REST Básica", 
        description: "CRUD operations, autenticación simple, y base de datos relacional.",
        price: 2500,
        time: 4
      },
      { 
        id: "advanced-api", 
        label: "API REST + Auth Avanzada", 
        description: "OAuth, roles, permisos, y cache para mejor rendimiento.",
        price: 4000,
        time: 6
      },
      { 
        id: "premium-api", 
        label: "API GraphQL + Microservicios", 
        description: "Arquitectura escalable, real-time, y optimización avanzada.",
        price: 6000,
        time: 8
      }
    ]
  },
  {
    title: "Database & Infrastructure",
    multiSelect: false,
    options: [
      { 
        id: "basic-db", 
        label: "Base de Datos Standard", 
        description: "PostgreSQL/MySQL, backups automáticos, y monitoreo básico.",
        price: 1500,
        time: 2
      },
      { 
        id: "advanced-db", 
        label: "DB + Cache + Search", 
        description: "Redis cache, Elasticsearch, y optimización de queries.",
        price: 3000,
        time: 3
      },
      { 
        id: "premium-db", 
        label: "Infraestructura Enterprise", 
        description: "Alta disponibilidad, sharding, y escalado automático.",
        price: 4500,
        time: 4
      }
    ]
  },
  {
    title: "Features Adicionales",
    multiSelect: true,
    options: [
      { 
        id: "analytics", 
        label: "Analytics & Reporting", 
        description: "Dashboard personalizado, métricas en tiempo real, y exportación de datos.",
        price: 2000,
        time: 2
      },
      { 
        id: "payments", 
        label: "Procesamiento de Pagos", 
        description: "Integración con Stripe/PayPal, suscripciones, y facturación.",
        price: 2500,
        time: 2
      },
      { 
        id: "ai-features", 
        label: "Características con IA", 
        description: "Integración con LLMs, procesamiento de lenguaje natural, y automatización.",
        price: 3500,
        time: 3
      }
    ]
  }
];

export const mobileAppFeatures = [
  {
    title: "Desarrollo Nativo/Híbrido",
    multiSelect: false,
    options: [
      { 
        id: "basic-mobile", 
        label: "App Híbrida Básica", 
        description: "React Native/Flutter, UI responsive, y funcionalidades esenciales.",
        price: 3000,
        time: 6
      },
      { 
        id: "advanced-mobile", 
        label: "App Híbrida Avanzada", 
        description: "Animaciones fluidas, offline mode, y optimización de rendimiento.",
        price: 5000,
        time: 8
      },
      { 
        id: "native-mobile", 
        label: "App Nativa Premium", 
        description: "Desarrollo nativo iOS/Android, máximo rendimiento y UX nativa.",
        price: 8000,
        time: 12
      }
    ]
  },
  {
    title: "Funcionalidades Core",
    multiSelect: false,
    options: [
      { 
        id: "basic-auth", 
        label: "Autenticación Básica", 
        description: "Login social, registro, y gestión de perfil básico.",
        price: 2000,
        time: 3
      },
      { 
        id: "advanced-auth", 
        label: "Auth + Permisos", 
        description: "Roles personalizados, verificación 2FA, y recuperación segura.",
        price: 3500,
        time: 4
      },
      { 
        id: "premium-auth", 
        label: "Sistema Completo", 
        description: "SSO, biometría, y gestión avanzada de sesiones.",
        price: 5000,
        time: 6
      }
    ]
  },
  {
    title: "Características Móviles",
    multiSelect: true,
    options: [
      { 
        id: "basic-features", 
        label: "Features Esenciales", 
        description: "Push notifications, geolocalización, y cámara básica.",
        price: 2500,
        time: 2
      },
      { 
        id: "advanced-features", 
        label: "Features Avanzadas", 
        description: "Mapas interactivos, AR básico, y sincronización offline.",
        price: 4000,
        time: 3
      },
      { 
        id: "premium-features", 
        label: "Features Premium", 
        description: "AR avanzado, ML en dispositivo, y features personalizadas.",
        price: 6000,
        time: 4
      }
    ]
  },
  {
    title: "Publicación y Analytics",
    multiSelect: false,
    options: [
      { 
        id: "basic-store", 
        label: "Publicación Básica", 
        description: "Publicación en App/Play Store y analytics básico.",
        price: 1500,
        time: 1
      },
      { 
        id: "advanced-store", 
        label: "Publicación + Marketing", 
        description: "ASO, analytics avanzado, y A/B testing.",
        price: 3000,
        time: 2
      },
      { 
        id: "premium-store", 
        label: "Growth Package", 
        description: "Marketing completo, engagement tools, y optimización continua.",
        price: 4500,
        time: 3
      }
    ]
  }
];

export const businessAutomationFeatures = [
  {
    title: "Automatización de Procesos",
    multiSelect: false,
    options: [
      {
        id: "basic-automation",
        label: "Automatización Básica",
        description: "Flujos de trabajo simples, integraciones básicas con APIs existentes.",
        price: 3000,
        time: 4
      },
      {
        id: "advanced-automation",
        label: "Automatización Avanzada",
        description: "Flujos complejos, reglas de negocio personalizadas, webhooks.",
        price: 5000,
        time: 6
      },
      {
        id: "premium-automation",
        label: "Automatización Enterprise",
        description: "Orquestación de microservicios, procesamiento en tiempo real.",
        price: 8000,
        time: 8
      }
    ]
  },
  {
    title: "Integraciones",
    multiSelect: false,
    options: [
      {
        id: "basic-integration",
        label: "Integraciones Básicas",
        description: "Conexión con hasta 3 servicios externos vía API REST.",
        price: 2500,
        time: 3
      },
      {
        id: "advanced-integration",
        label: "Integraciones Avanzadas",
        description: "Hasta 10 servicios, sincronización bidireccional.",
        price: 4000,
        time: 5
      },
      {
        id: "premium-integration",
        label: "Integraciones Enterprise",
        description: "Integraciones ilimitadas, ETL personalizado, data warehouse.",
        price: 6000,
        time: 7
      }
    ]
  },
  {
    title: "Features Adicionales",
    multiSelect: true,
    options: [
      {
        id: "reporting",
        label: "Reportes y Analytics",
        description: "Dashboards personalizados, exportación de datos, alertas.",
        price: 2000,
        time: 2
      },
      {
        id: "ai-automation",
        label: "Automatización con IA",
        description: "Procesamiento de documentos, clasificación automática, predicciones.",
        price: 3500,
        time: 3
      },
      {
        id: "workflow-designer",
        label: "Diseñador de Flujos",
        description: "Interfaz visual para crear y modificar automatizaciones.",
        price: 4000,
        time: 4
      }
    ]
  }
];

export const startupAccelerationFeatures = [
  {
    title: "MVP Core",
    multiSelect: false,
    options: [
      {
        id: "basic-mvp",
        label: "MVP Básico",
        description: "Landing page + funcionalidades core para validar tu idea.",
        price: 5000,
        time: 6
      },
      {
        id: "advanced-mvp",
        label: "MVP Avanzado",
        description: "App web completa + app móvil básica + analytics.",
        price: 8000,
        time: 8
      },
      {
        id: "premium-mvp",
        label: "MVP Premium",
        description: "Solución full-stack con todas las integraciones necesarias.",
        price: 12000,
        time: 12
      }
    ]
  },
  {
    title: "Growth Features",
    multiSelect: true,
    options: [
      {
        id: "analytics-suite",
        label: "Suite de Analytics",
        description: "Métricas de crecimiento, embudos, y comportamiento de usuarios.",
        price: 2000,
        time: 2
      },
      {
        id: "marketing-tools",
        label: "Herramientas de Marketing",
        description: "Email marketing, notificaciones push, A/B testing.",
        price: 3000,
        time: 3
      },
      {
        id: "viral-features",
        label: "Features Virales",
        description: "Referrals, gamificación, contenido compartible.",
        price: 4000,
        time: 4
      }
    ]
  },
  {
    title: "Escalabilidad",
    multiSelect: false,
    options: [
      {
        id: "basic-scale",
        label: "Escalabilidad Básica",
        description: "Arquitectura cloud-native básica, monitoreo esencial.",
        price: 3000,
        time: 3
      },
      {
        id: "advanced-scale",
        label: "Escalabilidad Avanzada",
        description: "Microservicios, caching distribuido, CI/CD.",
        price: 5000,
        time: 5
      },
      {
        id: "premium-scale",
        label: "Escalabilidad Enterprise",
        description: "Multi-región, alta disponibilidad, disaster recovery.",
        price: 7000,
        time: 7
      }
    ]
  }
]; 