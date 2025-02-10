import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

interface Objective {
  title: string;
  description: string;
  keyPoints: string[];
}

interface ServiceObjectivesProps {
  objectives: Objective[];
}

export const ServiceObjectives = ({ objectives }: ServiceObjectivesProps) => (
  <div className="py-16">
    <h2 className="text-2xl font-bold text-white mb-12">¿Qué Lograrás?</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {objectives.map((objective, index) => (
        <motion.div
          key={objective.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-800/50 backdrop-blur-xl rounded-xl p-6 border border-zinc-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-4">{objective.title}</h3>
          <p className="text-zinc-400 mb-6">{objective.description}</p>
          <ul className="space-y-3">
            {objective.keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <HiCheck className="w-5 h-5 text-lime-300 mt-1 flex-shrink-0" />
                <span className="text-zinc-300">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </div>
); 