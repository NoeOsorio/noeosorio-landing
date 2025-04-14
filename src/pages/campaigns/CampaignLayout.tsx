import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampaignLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default CampaignLayout; 