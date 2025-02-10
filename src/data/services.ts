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
    id: 'web',
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
    id: 'mobile',
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
    id: 'automation',
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
  id: 'startup',
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
  addons
}; 