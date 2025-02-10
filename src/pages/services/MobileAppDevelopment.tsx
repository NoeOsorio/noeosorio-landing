import { ServicePage } from './ServicePage';
import { mobileAppFeatures } from '../../data/services';

const mobileAppObjectives = [
  {
    id: "user-engagement",
    title: "Aumenta el Engagement",
    description: "Conecta con tus usuarios donde estén, cuando lo necesiten",
    keyPoints: [
      "Experiencia nativa fluida y responsive",
      "Notificaciones push personalizadas",
      "Funcionalidad offline para uso continuo"
    ]
  },
  {
    id: "market-presence",
    title: "Fortalece tu Presencia",
    description: "Destaca en las tiendas de aplicaciones y construye tu marca",
    keyPoints: [
      "Diseño que refleja la identidad de tu marca",
      "Optimización para App Store y Play Store",
      "Análisis de comportamiento de usuarios"
    ]
  }
];

const mobileAppDeliverables = [
  {
    id: "mobile-app",
    type: "code" as const,
    title: "Aplicación Móvil",
    description: "Código fuente completo y optimizado",
    items: [
      "App nativa o híbrida según requerimientos",
      "Backend y APIs necesarias",
      "Configuración de servicios cloud",
      "Tests automatizados"
    ]
  },
  {
    id: "store-assets",
    type: "asset" as const,
    title: "Assets para Tiendas",
    description: "Material necesario para publicación",
    items: [
      "Screenshots optimizados",
      "Videos promocionales",
      "Textos y descripciones SEO",
      "Gráficos de marca"
    ]
  }
];

const mobileAppFAQs = [
  {
    id: "platform-choice",
    question: "¿iOS, Android o ambos?",
    answer: "Evaluamos tu mercado objetivo y presupuesto. Podemos desarrollar para ambas plataformas usando tecnologías híbridas como React Native, o crear apps nativas si tu caso lo requiere."
  },
  {
    id: "timeline",
    question: "¿Cuánto tarda el desarrollo?",
    answer: "Una app MVP típica toma entre 10-14 semanas. El timeline exacto depende de la complejidad y cantidad de features requeridas."
  },
  {
    id: "app-store",
    question: "¿Ayudan con la publicación en las tiendas?",
    answer: "Sí, manejamos todo el proceso de publicación en App Store y Play Store, incluyendo optimización ASO y cumplimiento de guidelines."
  }
];

const MobileAppDevelopment = () => (
  <ServicePage
    title="Mobile App Development"
    description="Apps nativas e híbridas que conectan con tus usuarios. Desde apps de delivery hasta soluciones empresariales móviles."
    features={mobileAppFeatures}
    caseStudies={[]}
    serviceType="mobile-app"
    objectives={mobileAppObjectives}
    deliverables={mobileAppDeliverables}
    faqs={mobileAppFAQs}
  />
);

export default MobileAppDevelopment; 