import { motion } from 'framer-motion';
import { HiOutlineExternalLink, HiCode, HiTemplate, HiSparkles } from 'react-icons/hi';

const features = [
  {
    icon: HiTemplate,
    title: "Landing Pages",
    description: "Páginas web atractivas y optimizadas para convertir"
  },
  {
    icon: HiCode,
    title: "Sitios Corporativos",
    description: "Presencia profesional para tu empresa"
  },
  {
    icon: HiSparkles,
    title: "Diseño Personalizado",
    description: "Diseños únicos que reflejan tu marca"
  }
];

export const SakuraKodeSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-12 border border-pink-500/20 hover:border-pink-500/30 transition-all relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-6 mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
                  <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-medium">
                    Powered by
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src="/sakurakode-logo.png" 
                    alt="SakuraKode" 
                    className="w-12 h-12"
                  />
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    SakuraKode
                  </h3>
                </div>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Necesitas una{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Landing Page?
                </span>
              </h2>
              
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Si buscas una página web profesional y atractiva para tu negocio, 
                visita SakuraKode. Especializados en landing pages y sitios web 
                que convierten visitantes en clientes.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                >
                  <feature.icon className="w-8 h-8 text-pink-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.a
                href="https://sakurakode.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all"
              >
                Visitar SakuraKode
                <HiOutlineExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
); 