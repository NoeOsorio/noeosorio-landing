import { SEO } from "../components/SEO";
import { ServiceCard } from "../components/services/ServiceCard";
import { FinancingCard } from "../components/services/FinancingCard";
import { ValueProposition } from "../sections/services/ValueProposition";
import { StartupBundle } from "../components/services/StartupBundle";
import { servicesData } from "../data/services";
import { motion } from "framer-motion";
import { AddonCard } from "../components/services/AddonCard";
import { UseCasesSection } from "../sections/services/UseCasesSection";
import { ProcessSection } from "../sections/services/ProcessSection";
import { SakuraKodeSection } from "../sections/services/SakuraKodeSection";
import { trackEvent } from '../hooks/useAnalytics';

// Configuraciones de animación
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const cardVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const BackgroundPattern = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="fixed inset-0"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
    <motion.div
      className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px]"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.2, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

const HeroSection = () => (
  <motion.section {...fadeInUp} className="pt-32 pb-12">
    <div className="container mx-auto px-4">
      <motion.div
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div
          variants={cardVariant}
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6"
        >
          <div className="w-2 h-2 bg-lime-300 rounded-full" />
          <p className="text-lime-300 font-medium">Servicios Premium</p>
        </motion.div>

        <motion.h1
          variants={cardVariant}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Soluciones Tecnológicas{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
            de Alto Impacto
          </span>
        </motion.h1>

        <motion.p
          variants={cardVariant}
          className="text-xl text-zinc-400 mb-12"
        >
          Desarrollamos aplicaciones web y móviles escalables, optimizadas para
          el crecimiento de tu negocio.
        </motion.p>
      </motion.div>
    </div>
  </motion.section>
);

const FinancingSection = ({ children }: { children: React.ReactNode }) => (
  <motion.section {...fadeInUp} className="py-24 bg-zinc-800/30">
    <div className="container mx-auto px-4">
      <motion.div
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <motion.h2
          variants={cardVariant}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Opciones de Financiamiento Flexibles
        </motion.h2>
        <motion.p variants={cardVariant} className="text-xl text-zinc-400">
          Facilitamos tu inversión con planes de pago adaptados a tus
          necesidades
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </div>
  </motion.section>
);

const AddonsSection = () => (
  <motion.section {...fadeInUp} className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        variants={staggerContainer}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <motion.h2
          variants={cardVariant}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Servicios Adicionales
        </motion.h2>
        <motion.p variants={cardVariant} className="text-xl text-zinc-400">
          Personaliza y mejora tu aplicación con funciones avanzadas
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {servicesData.addons.map((addon, index) => (
          <motion.div key={index} variants={cardVariant} whileHover={{ y: -5 }}>
            <AddonCard {...addon} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.section>
);

const CTASection = ({ children }: { children: React.ReactNode }) => (
  <motion.section {...fadeInUp} className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="max-w-4xl mx-auto text-center bg-zinc-800/50 backdrop-blur-xl rounded-2xl p-12 border border-zinc-700/50"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para Transformar tu Negocio?
        </h2>
        <p className="text-xl text-zinc-400 mb-8">
          Agenda una consulta gratuita y diseñemos la mejor estrategia para tu
          aplicación.
        </p>
        {children}
      </motion.div>
    </div>
  </motion.section>
);

const Services = () => {
  const handleServiceClick = (serviceId: string, serviceName: string) => {
    trackEvent('service_details_view', {
      service_id: serviceId,
      service_name: serviceName,
      source: 'services_page'
    });
  };

  const handleStartupBundleClick = () => {
    trackEvent('startup_bundle_click', {
      source: 'services_page'
    });
  };

  const handleFinancingClick = (planName: string) => {
    trackEvent('financing_option_click', {
      plan_name: planName,
      source: 'services_page'
    });
  };

  const handleCTAClick = (location: string) => {
    trackEvent('consultation_request', {
      source: 'services_page',
      cta_location: location
    });
  };

  return (
    <>
      <SEO
        title="Services | Noé Osorio - Premium Development Solutions"
        description="Servicios profesionales de desarrollo web y móvil. Creamos soluciones tecnológicas eficientes y escalables para startups y empresas."
        image="https://noeosorio.com/services-og.png"
        url="https://noeosorio.com/services"
      />

      <div className="relative min-h-screen bg-zinc-900 overflow-hidden">
        <BackgroundPattern />

        <HeroSection />
        <SakuraKodeSection />
        <ValueProposition values={servicesData.businessValue} />

        <motion.section {...staggerContainer} className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {servicesData.mainServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={cardVariant}
                  whileHover={{ y: -5 }}
                >
                  <ServiceCard 
                    {...service} 
                    index={index}
                    onServiceClick={() => handleServiceClick(service.id, service.title)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <StartupBundle 
          data={servicesData.startupBundle}
          onBundleClick={handleStartupBundleClick}
        />
        <ProcessSection />
        <UseCasesSection services={servicesData.allServices} />
        <FinancingSection>
          {servicesData.financingOptions.map((option, index) => (
            <FinancingCard 
              key={index}
              {...option}
              index={index}
              onPlanClick={() => handleFinancingClick(option.title)}
            />
          ))}
        </FinancingSection>
        <AddonsSection />
        <CTASection>
          <motion.button
            onClick={() => handleCTAClick('bottom_cta')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-lime-300 hover:bg-lime-400 
                     text-zinc-900 rounded-lg font-medium transition-colors"
          >
            Agendar Consulta
          </motion.button>
        </CTASection>
      </div>
    </>
  );
};

export default Services;
