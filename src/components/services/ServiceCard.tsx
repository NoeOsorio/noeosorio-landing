import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface ServiceCardProps {
  id: string;
  icon: IconType;
  title: string;
  description: string;
  features: string[];
  price?: string;
  timeline?: string;
  color: string;
  index: number;
}

export const ServiceCard = ({ 
  id,
  icon: Icon,
  title,
  description,
  features,
  price,
  timeline,
  color,
  index 
}: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="h-full flex flex-col bg-zinc-800/30 backdrop-blur-xl rounded-xl border border-zinc-700/50 p-8 hover:border-lime-300/50 transition-colors"
  >
    <div className="mb-8">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>

    <div className="flex-grow">
      <div className="space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <svg 
              className="w-5 h-5 text-lime-300 mt-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span className="text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
    
    {(price && timeline) && (
      <div className="mt-auto">
        <div className="space-y-2 mb-6">
          <p className="text-xl font-bold text-white">{price}</p>
          <p className="text-sm text-zinc-500">Tiempo estimado: {timeline}</p>
        </div>
        
        <Link
          to={`/services/${id}`}
          className="block w-full py-3 px-4 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium text-center transition-colors"
        >
          Ver Detalles y Cotizar
        </Link>
      </div>
    )}
  </motion.div>
); 