import { ServicePage } from '../../components/services/ServicePage';
import { webAppFeatures } from '../../data/services';

const webAppObjectives = [
  {
    id: "process-optimization",
    title: "Optimiza tus Procesos",
    description: "Automatiza y mejora la eficiencia de tu operación",
    keyPoints: [
      "Reduce tiempos de operación hasta en un 60%",
      "Elimina errores humanos en procesos críticos",
      "Centraliza la información en un solo lugar"
    ]
  },
  {
    id: "user-experience",
    title: "Mejora la Experiencia de Usuario",
    description: "Interfaces intuitivas que tus usuarios amarán usar",
    keyPoints: [
      "Diseño responsive que funciona en todos los dispositivos",
      "Tiempos de carga optimizados para mejor retención",
      "Flujos de usuario simplificados que aumentan conversión"
    ]
  }
];

const webAppDeliverables = [
  {
    id: "source-code",
    type: "code" as const,
    title: "Código Fuente",
    description: "Repositorio completo con documentación",
    items: [
      "Frontend en React/Next.js",
      "API REST/GraphQL",
      "Scripts de migración de base de datos",
      "Tests automatizados"
    ]
  },
  {
    id: "technical-docs",
    type: "document" as const,
    title: "Documentación Técnica",
    description: "Guías detalladas para desarrollo y mantenimiento",
    items: [
      "Arquitectura del sistema",
      "Manual de despliegue",
      "Guía de contribución",
      "Documentación de API"
    ]
  }
];

const webAppFAQs = [
  {
    id: "development-time",
    question: "¿Cuánto tiempo toma desarrollar mi aplicación web?",
    answer: "El tiempo varía según la complejidad. Un MVP típico toma 8-12 semanas. Priorizamos las funcionalidades más importantes para que puedas lanzar rápido y seguir iterando."
  },
  {
    id: "change-management",
    question: "¿Qué pasa si necesito cambios durante el desarrollo?",
    answer: "Nuestro proceso ágil está diseñado para adaptarse. Trabajamos en sprints semanales y puedes ajustar prioridades. Los cambios pequeños están incluidos, para cambios grandes ajustamos el timeline."
  },
  {
    id: "code-quality",
    question: "¿Cómo aseguran la calidad del código?",
    answer: "Implementamos CI/CD, code reviews, tests automatizados y seguimos mejores prácticas de la industria. Además, hacemos QA manual antes de cada release."
  }
];

const WebAppDevelopment = () => (
  <ServicePage
    title="Web App Development"
    description="Aplicaciones web robustas y escalables que transforman tu visión en una solución digital que impulsa el crecimiento de tu negocio."
    features={webAppFeatures}
    caseStudies={[]}
    serviceType="web-app"
    objectives={webAppObjectives}
    deliverables={webAppDeliverables}
    faqs={webAppFAQs}
  />
);

export default WebAppDevelopment; 