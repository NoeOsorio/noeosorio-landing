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
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 group hover:border-lime-300/50 transition-all h-full flex flex-col"
  >
    <div>
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-zinc-400 mb-6">
        {description}
      </p>
      
      <div className="space-y-4 mb-6">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-lime-300">✓</span>
            <span className="text-sm text-zinc-400">{feature}</span>
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
          to="/contact"
          className="block w-full py-3 px-4 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium text-center transition-colors"
        >
          Cotizar Proyecto
        </Link>
      </div>
    )}
  </motion.div>
); 