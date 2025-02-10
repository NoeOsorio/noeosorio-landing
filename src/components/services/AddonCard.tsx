import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface AddonCardProps {
  title: string;
  price: string;
  icon: IconType;
  index: number;
}

export const AddonCard = ({ title, price, icon: Icon, index }: AddonCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="p-6 rounded-xl bg-zinc-800/30 border border-zinc-700/50 hover:border-lime-300/50 transition-all group"
  >
    <div className="p-3 rounded-xl bg-lime-300/10 text-lime-300 w-fit mb-4 group-hover:bg-lime-300/20 transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-medium text-white mb-2">
      {title}
    </h3>
    <p className="text-lime-300 font-medium">
      {price}
    </p>
  </motion.div>
); 