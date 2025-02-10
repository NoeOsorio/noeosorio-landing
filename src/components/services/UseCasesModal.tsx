import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { HiX } from 'react-icons/hi';

interface UseCaseProps {
  title: string;
  description: string;
}

interface UseCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    icon: IconType;
    color: string;
    useCases: UseCaseProps[];
  };
}

export const UseCasesModal = ({ isOpen, onClose, service }: UseCasesModalProps) => {
  const Icon = service.icon;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl p-6 z-50"
          >
            <div className="relative bg-zinc-900 rounded-2xl border border-zinc-700/50 overflow-hidden">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-br ${service.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 text-white" />
                    <h3 className="text-2xl font-bold text-white">
                      Casos de Uso: {service.title}
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-black/20 rounded-lg transition-colors"
                  >
                    <HiX className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="grid gap-6">
                  {service.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50"
                    >
                      <h4 className="text-xl font-bold text-white mb-2">
                        {useCase.title}
                      </h4>
                      <p className="text-zinc-400">
                        {useCase.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 