import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiChevronDown, HiQuestionMarkCircle, HiMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQ[];
}

export const ServiceFAQ = ({ faqs }: ServiceFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const needsExtraCard = faqs.length % 2 !== 0;

  return (
    <div className="py-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-white mb-4"
      >
        Preguntas Frecuentes
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-zinc-400 mb-12"
      >
        Resolvemos tus dudas para que puedas tomar la mejor decisión
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 group-hover:border-lime-300/50 transition-colors overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-lime-300/10 mt-1">
                    <HiQuestionMarkCircle className="w-5 h-5 text-lime-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-medium text-white group-hover:text-lime-300 transition-colors pr-8">
                        {faq.question}
                      </h3>
                      <HiChevronDown 
                        className={`w-5 h-5 text-zinc-400 transition-transform flex-shrink-0 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                    {openIndex === index && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-zinc-400 mt-4"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        ))}

        {needsExtraCard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: faqs.length * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <Link
              to="/contact"
              className="relative block bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 group-hover:border-lime-300/50 transition-colors overflow-hidden p-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-lime-300/10 mt-1">
                  <HiMail className="w-5 h-5 text-lime-300" />
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-lime-300 transition-colors mb-2">
                    ¿Tienes más preguntas?
                  </h3>
                  <p className="text-zinc-400">
                    Contáctanos y te responderemos todas tus dudas para ayudarte a tomar la mejor decisión.
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 