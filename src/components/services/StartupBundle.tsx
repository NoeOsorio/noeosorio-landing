import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import { HiLightningBolt, HiChartBar, HiCreditCard } from 'react-icons/hi';

interface StartupBundleProps {
  data: {
    id: string;
    icon: IconType;
    title: string;
    description: string;
    features: string[];
    color: string;
  };
}

export const StartupBundle = ({ data }: StartupBundleProps) => {
  const Icon = data.icon;
  
  return (
    <section className="py-24 bg-zinc-800/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 group hover:border-lime-300/50 transition-all"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${data.color} mb-6`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              {data.title}
            </h3>
            
            <p className="text-zinc-400 mb-6">
              {data.description}
            </p>
            
            <div className="space-y-4 mb-6">
              {data.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-lime-300">✓</span>
                  <span className="text-sm text-zinc-400">{feature}</span>
                </div>
              ))}
            </div>
            
            <Link
              to="/contact"
              className="inline-flex items-center text-lime-300 hover:text-lime-400 transition-colors group"
            >
              <span>Solicitar Cotización Personalizada</span>
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white">
              Solución Personalizada para Startups
            </h3>
            <p className="text-lg text-zinc-400">
              Cada startup es única, y entendemos que tus necesidades específicas requieren una solución a medida. Nuestro bundle de aceleración se adapta a tu visión, mercado y objetivos de crecimiento.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-lime-300/10">
                  <HiLightningBolt className="w-6 h-6 text-lime-300" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Lanzamiento Rápido</h4>
                  <p className="text-zinc-400">MVP completo en semanas, no meses</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-lime-300/10">
                  <HiChartBar className="w-6 h-6 text-lime-300" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Escalabilidad desde el Día 1</h4>
                  <p className="text-zinc-400">Arquitectura preparada para el crecimiento</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-lime-300/10">
                  <HiCreditCard className="w-6 h-6 text-lime-300" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Presupuesto Flexible</h4>
                  <p className="text-zinc-400">Planes adaptados a tu etapa de desarrollo</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 