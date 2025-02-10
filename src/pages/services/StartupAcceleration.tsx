import { ServicePage } from './ServicePage';
import { startupAccelerationFeatures } from '../../data/services';

const startupObjectives = [
  {
    id: "rapid-mvp",
    title: "MVP en Tiempo Récord",
    description: "De idea a producto funcional en semanas, no meses",
    keyPoints: [
      "Validación rápida con usuarios reales",
      "Arquitectura lista para escalar",
      "Métricas clave desde el día uno"
    ]
  },
  {
    id: "growth-ready",
    title: "Preparado para Crecer",
    description: "Infraestructura que crece con tu startup",
    keyPoints: [
      "Stack tecnológico moderno y probado",
      "Optimización continua basada en datos",
      "Costos operativos controlados"
    ]
  }
];

const startupDeliverables = [
  {
    id: "mvp-code",
    type: "code" as const,
    title: "MVP Completo",
    description: "Producto funcional listo para el mercado",
    items: [
      "Frontend web y/o móvil",
      "Backend escalable",
      "Panel de administración",
      "Analytics integrado"
    ]
  },
  {
    id: "growth-toolkit",
    type: "asset" as const,
    title: "Growth Toolkit",
    description: "Herramientas para impulsar el crecimiento",
    items: [
      "Dashboard de métricas clave",
      "Funnel de adquisición configurado",
      "Sistema de feedback de usuarios",
      "Plan de escalamiento técnico"
    ]
  }
];

const startupFAQs = [
  {
    id: "mvp-timeline",
    question: "¿Cuánto tiempo toma lanzar el MVP?",
    answer: "Típicamente 6-8 semanas para la primera versión funcional. Priorizamos las features más importantes para validar tu idea rápidamente."
  },
  {
    id: "investment-ready",
    question: "¿Cómo me preparan para levantar inversión?",
    answer: "Construimos tu producto con métricas y analytics que los inversores quieren ver. Además, la arquitectura está diseñada para demostrar potencial de escalabilidad."
  },
  {
    id: "pivot-support",
    question: "¿Qué pasa si necesito pivotar?",
    answer: "Nuestra metodología ágil permite ajustar el rumbo rápidamente. Hacemos sprints cortos y validamos constantemente para minimizar el riesgo de construir algo que el mercado no quiere."
  }
];

const StartupAcceleration = () => (
  <ServicePage
    title="Startup Acceleration"
    description="De idea a MVP en tiempo récord. Validación rápida con usuarios reales y arquitectura lista para escalar cuando el mercado responda."
    features={startupAccelerationFeatures}
    caseStudies={[]}
    serviceType="startup-acceleration"
    objectives={startupObjectives}
    deliverables={startupDeliverables}
    faqs={startupFAQs}
  />
);

export default StartupAcceleration; 