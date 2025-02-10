import { motion } from 'framer-motion';
import { HiArchive, HiCode, HiDocument, HiCheck } from 'react-icons/hi';

interface Deliverable {
  id: string;
  type: 'code' | 'document' | 'asset';
  title: string;
  description: string;
  items: string[];
}

interface ServiceDeliverablesProps {
  deliverables: Deliverable[];
}

export const ServiceDeliverables = ({ deliverables }: ServiceDeliverablesProps) => (
  <div className="py-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl font-bold text-white mb-4"
    >
      Entregables Específicos
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-xl text-zinc-400 mb-12"
    >
      Todo lo que necesitas para lanzar y escalar tu proyecto
    </motion.p>

    <div className="grid md:grid-cols-2 gap-8">
      {deliverables.map((deliverable, index) => (
        <motion.div
          key={deliverable.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 group-hover:border-lime-300/50 transition-colors overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-lime-300/10">
                  {deliverable.type === 'code' && <HiCode className="w-6 h-6 text-lime-300" />}
                  {deliverable.type === 'document' && <HiDocument className="w-6 h-6 text-lime-300" />}
                  {deliverable.type === 'asset' && <HiArchive className="w-6 h-6 text-lime-300" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{deliverable.title}</h3>
                  <p className="text-zinc-400">{deliverable.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {deliverable.items.map((item) => (
                  <div 
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 group-hover:bg-lime-300/5 transition-colors"
                  >
                    <div className="p-1 rounded-full bg-lime-300/10 mt-0.5">
                      <HiCheck className="w-3 h-3 text-lime-300" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
); 