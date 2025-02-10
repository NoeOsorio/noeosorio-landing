import { SEO } from '../components/SEO';
import { ServiceCard } from '../components/services/ServiceCard';
import { FinancingCard } from '../components/services/FinancingCard';
import { ValueProposition } from '../sections/services/ValueProposition';
import { StartupBundle } from '../components/services/StartupBundle';
import { servicesData } from '../data/services';
import { motion } from 'framer-motion';
import { AddonCard } from '../components/services/AddonCard';
import { UseCasesSection } from '../sections/services/UseCasesSection';
import { ProcessSection } from '../sections/services/ProcessSection';
import { SakuraKodeSection } from '../sections/services/SakuraKodeSection';

const BackgroundPattern = () => (
  <div className="fixed inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
    <div 
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem'
      }}
    />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px]" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]" />
  </div>
);

const HeroSection = () => (
  <section className="pt-32 pb-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
          <div className="w-2 h-2 bg-lime-300 rounded-full" />
          <p className="text-lime-300 font-medium">Servicios Premium</p>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Soluciones Tecnológicas{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
            de Alto Impacto
          </span>
        </h1>
        
        <p className="text-xl text-zinc-400 mb-12">
          Desarrollamos aplicaciones web y móviles escalables, 
          optimizadas para el crecimiento de tu negocio.
        </p>
      </motion.div>
    </div>
  </section>
);

const FinancingSection = () => (
  <section className="py-24 bg-zinc-800/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Opciones de Financiamiento Flexibles
        </h2>
        <p className="text-xl text-zinc-400">
          Facilitamos tu inversión con planes de pago adaptados a tus necesidades
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {servicesData.financingOptions.map((option, index) => (
          <FinancingCard key={index} {...option} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const AddonsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Servicios Adicionales
        </h2>
        <p className="text-xl text-zinc-400">
          Personaliza y mejora tu aplicación con funciones avanzadas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {servicesData.addons.map((addon, index) => (
          <AddonCard key={index} {...addon} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center bg-zinc-800/50 backdrop-blur-xl rounded-2xl p-12 border border-zinc-700/50">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para Transformar tu Negocio?
        </h2>
        <p className="text-xl text-zinc-400 mb-8">
          Agenda una consulta gratuita y diseñemos la mejor estrategia para tu aplicación.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block px-8 py-4 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium transition-colors"
        >
          Agendar Consulta
        </motion.a>
      </div>
    </div>
  </section>
);

const Services = () => {
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

        <div className="relative">
          <HeroSection />
          <ValueProposition values={servicesData.businessValue} />
          
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {servicesData.mainServices.map((service, index) => (
                  <ServiceCard key={service.id} {...service} index={index} />
                ))}
              </div>
            </div>
          </section>

          <StartupBundle data={servicesData.startupBundle} />
          <ProcessSection />
          <UseCasesSection 
            services={[
              ...servicesData.mainServices.map(service => ({
                title: service.title,
                icon: service.icon,
                color: service.color,
                useCases: service.useCases
              })),
              {
                title: servicesData.startupBundle.title,
                icon: servicesData.startupBundle.icon,
                color: servicesData.startupBundle.color,
                useCases: servicesData.startupBundle.useCases
              }
            ]}
          />
          <FinancingSection />
          <AddonsSection />
          <SakuraKodeSection />
          <CTASection />
        </div>
      </div>
    </>
  );
};

export default Services; 