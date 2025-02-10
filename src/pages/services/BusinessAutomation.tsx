import { ServicePage } from '../../components/services/ServicePage';
import { businessAutomationFeatures } from '../../data/services';

const businessObjectives = [
  {
    id: "efficiency",
    title: "Maximiza la Eficiencia",
    description: "Automatiza tareas repetitivas y optimiza procesos clave",
    keyPoints: [
      "Reduce costos operativos hasta en un 70%",
      "Elimina errores en procesos manuales",
      "Libera tiempo de tu equipo para tareas estratégicas"
    ]
  },
  {
    id: "integration",
    title: "Integra tus Sistemas",
    description: "Conecta todas tus herramientas en un flujo seamless",
    keyPoints: [
      "Sincronización en tiempo real entre sistemas",
      "Datos centralizados y accesibles",
      "Reportes automatizados y dashboards"
    ]
  }
];

const businessDeliverables = [
  {
    id: "automation-flows",
    type: "code" as const,
    title: "Flujos Automatizados",
    description: "Sistema completo de automatización",
    items: [
      "Workflows personalizados",
      "Integraciones con APIs existentes",
      "Scripts de automatización",
      "Panel de control centralizado"
    ]
  },
  {
    id: "process-docs",
    type: "document" as const,
    title: "Documentación de Procesos",
    description: "Guías detalladas de operación",
    items: [
      "Mapeo de procesos optimizados",
      "Manuales de usuario",
      "Documentación técnica",
      "Plan de contingencia"
    ]
  }
];

const businessFAQs = [
  {
    id: "roi-time",
    question: "¿Cuánto tiempo para ver ROI?",
    answer: "La mayoría de nuestros clientes ven retorno de inversión en 3-6 meses. Automatizar procesos manuales genera ahorros inmediatos en tiempo y recursos."
  },
  {
    id: "existing-tools",
    question: "¿Puedo mantener mis herramientas actuales?",
    answer: "Sí, nos integramos con tus sistemas existentes. Trabajamos con APIs estándar y podemos desarrollar conectores personalizados según necesites."
  },
  {
    id: "maintenance",
    question: "¿Qué pasa si necesito modificar los procesos?",
    answer: "Desarrollamos sistemas flexibles que puedes ajustar fácilmente. Además, ofrecemos soporte continuo y capacitación para tu equipo."
  }
];

const BusinessAutomation = () => (
  <ServicePage
    title="Business Automation"
    description="Reduce costos y elimina tareas manuales. Integra tus sistemas y automatiza procesos para multiplicar la eficiencia de tu equipo."
    features={businessAutomationFeatures}
    caseStudies={[]}
    serviceType="business-automation"
    objectives={businessObjectives}
    deliverables={businessDeliverables}
    faqs={businessFAQs}
  />
);

export default BusinessAutomation; 