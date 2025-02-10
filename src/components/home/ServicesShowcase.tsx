import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCode, HiDeviceMobile, HiCog, HiLightningBolt, HiArrowRight } from 'react-icons/hi';

const services = [
  {
    id: 'web-app',
    icon: HiCode,
    title: "Web App Development",
    description: "Aplicaciones web robustas que transforman tu visión en una solución escalable. Perfectas para digitalizar procesos y potenciar tu crecimiento.",
    color: "from-purple-500 to-blue-500",
    delay: 0.1
  },
  {
    id: 'mobile-app',
    icon: HiDeviceMobile,
    title: "Mobile App Development",
    description: "Apps nativas e híbridas que conectan con tus usuarios. Desde apps de delivery hasta soluciones empresariales móviles.",
    color: "from-lime-500 to-emerald-500",
    delay: 0.2
  },
  {
    id: 'business-automation',
    icon: HiCog,
    title: "Business Automation",
    description: "Reduce costos y elimina tareas manuales. Integra tus sistemas y automatiza procesos para multiplicar la eficiencia de tu equipo.",
    color: "from-blue-500 to-indigo-500",
    delay: 0.3
  },
  {
    id: 'startup-acceleration',
    icon: HiLightningBolt,
    title: "Startup Acceleration",
    description: "De idea a MVP en tiempo récord. Validación rápida con usuarios reales y arquitectura lista para escalar cuando el mercado responda.",
    color: "from-orange-500 to-red-500",
    delay: 0.4
  }
];

export const ServicesShowcase = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Soluciones{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
            que Generan Resultados
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-400"
        >
          Desarrollo premium enfocado en ROI, escalabilidad y experiencia de usuario
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              to={`/services/${service.id}`}
              key={service.id}
              className="group relative p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 hover:border-lime-300/50 transition-all overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-6`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-zinc-400 mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center gap-2 text-lime-300 font-medium group-hover:gap-4 transition-all">
                <span>Ver detalles</span>
                <HiArrowRight className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 font-medium transition-colors"
        >
          <span>Explorar todos nuestros servicios y soluciones</span>
          <HiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </section>
); 