import { motion } from 'framer-motion';
import { HiLightBulb, HiTemplate, HiCode, HiSparkles } from 'react-icons/hi';

const steps = [
  {
    icon: HiLightBulb,
    title: "Descubrimiento",
    description: "Entendemos tu visión, objetivos y requerimientos específicos para diseñar la solución perfecta."
  },
  {
    icon: HiTemplate,
    title: "Planificación",
    description: "Definimos arquitectura, tecnologías y timeline. Recibes un roadmap claro de todo el proyecto."
  },
  {
    icon: HiCode,
    title: "Desarrollo",
    description: "Construimos tu solución con sprints semanales y feedback constante para mantener todo alineado."
  },
  {
    icon: HiSparkles,
    title: "Lanzamiento",
    description: "Desplegamos tu aplicación y te acompañamos en las primeras semanas para garantizar el éxito."
  }
];

export const ProcessSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Desarrollo Transparente y Eficiente
        </h2>
        <p className="text-xl text-zinc-400">
          Un proceso probado que garantiza resultados excepcionales
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Línea conectora */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-lime-300/50 to-transparent" />
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-lime-300/10 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-lime-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
); 