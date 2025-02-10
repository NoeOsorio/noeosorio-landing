import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface UseCaseProps {
  title: string;
  description: string;
}

interface ServiceUseCaseProps {
  title: string;
  icon: IconType;
  color: string;
  useCases: UseCaseProps[];
}

interface UseCasesSectionProps {
  services: ServiceUseCaseProps[];
}

export const UseCasesSection = ({ services }: UseCasesSectionProps) => (
  <section className="py-24 bg-zinc-800/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Cuál es tu Caso?
        </h2>
        <p className="text-xl text-zinc-400">
          Explora escenarios comunes y encuentra la solución perfecta para tu negocio
        </p>
      </div>

      <div className="space-y-24 max-w-6xl mx-auto">
        {services.map((service, serviceIndex) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={serviceIndex}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-12">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {service.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group bg-zinc-800/50 backdrop-blur-xl rounded-xl p-6 border border-zinc-700/50 hover:border-lime-300/50 transition-all duration-300 hover:shadow-lg hover:shadow-lime-300/10"
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "tween", duration: 0.2 }}
                    >
                      <h4 className="text-lg font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-300">
                        {useCase.title}
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {useCase.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
); 