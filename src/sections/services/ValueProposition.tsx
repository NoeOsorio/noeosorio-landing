import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface ValueProps {
  title: string;
  description: string;
  icon: IconType;
}

interface ValuePropositionProps {
  values: ValueProps[];
}

export const ValueProposition = ({ values }: ValuePropositionProps) => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Valor Real para tu Negocio
        </h2>
        <p className="text-xl text-zinc-400">
          Transformamos tecnología compleja en resultados tangibles
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-6 p-6 rounded-xl bg-zinc-800/30 border border-zinc-700/50"
          >
            <value.icon className="w-8 h-8 text-lime-300 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-zinc-400">
                {value.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 