import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface FinancingCardProps {
  title: string;
  description: string;
  features: string[];
  icon: IconType;
  highlight?: boolean;
  index: number;
  onPlanClick?: () => void;
}

export const FinancingCard = ({
  title,
  description,
  features,
  icon: Icon,
  highlight,
  index,
  onPlanClick
}: FinancingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`p-8 rounded-2xl backdrop-blur-xl border transition-all ${
      highlight 
        ? 'bg-lime-300/10 border-lime-300/50 hover:border-lime-300'
        : 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
    }`}
    onClick={onPlanClick}
  >
    <div className={`inline-flex p-3 rounded-xl ${
      highlight ? 'bg-lime-300/20' : 'bg-zinc-700/50'
    } mb-6`}>
      <Icon className={`w-6 h-6 ${
        highlight ? 'text-lime-300' : 'text-white'
      }`} />
    </div>

    <h3 className="text-xl font-bold text-white mb-2">
      {title}
    </h3>

    <p className="text-zinc-400 mb-6">
      {description}
    </p>

    <div className="space-y-3">
      {features.map((feature, i) => (
        <div key={i} className="flex items-center gap-2">
          <svg 
            className={`w-5 h-5 ${
              highlight ? 'text-lime-300' : 'text-zinc-500'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <span className="text-sm text-zinc-400">
            {feature}
          </span>
        </div>
      ))}
    </div>

    <Link
      to="/contact"
      className={`mt-8 inline-flex items-center text-sm font-medium ${
        highlight ? 'text-lime-300' : 'text-zinc-400'
      } hover:text-lime-400 transition-colors`}
    >
      Conocer más
      <svg 
        className="w-4 h-4 ml-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </Link>
  </motion.div>
); 