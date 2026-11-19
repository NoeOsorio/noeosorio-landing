import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCode, HiPlay } from 'react-icons/hi';
import SocialLinks from '../../components/SocialLinks'
import { siteLinks } from '../../data/siteLinks'

interface HeroSectionProps {
  onGetStartedClick?: () => void;
  onLearnMoreClick?: () => void;
}

export const HeroSection = ({ onGetStartedClick, onLearnMoreClick }: HeroSectionProps) => (
  <section className="pt-32 pb-24 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]" />
    </div>
    
    <div className="container mx-auto px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-8"
        >
          <div className="w-2 h-2 bg-lime-300 rounded-full" />
          <p className="text-lime-300 font-medium">
            Product Engineer at Porter, New York
          </p>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold text-white mb-8"
        >
          I build AI you can trust, and{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
            AI that makes you think
          </span>
          .
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          I'm Noé, a Mexican engineer in New York. I build my own tools with AI,
          study organizational psychology, and share what I learn along the way.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/portfolio"
            onClick={onGetStartedClick}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium transition-all"
          >
            <HiCode className="w-5 h-5" />
            <span>See my projects</span>
            <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={siteLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLearnMoreClick}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-zinc-800/50 hover:bg-zinc-800 text-white rounded-lg font-medium transition-all"
          >
            <HiPlay className="w-5 h-5" />
            <span>Watch my videos</span>
            <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {[
            { value: 'Since 2018', label: 'Shipping software' },
            { value: 'Porter', label: 'Product Engineer in New York' },
            { value: 'UDLAP', label: "Master's in organizational psychology" },
          ].map((fact) => (
            <div key={fact.value} className="group">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300 mb-2">{fact.value}</p>
              <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{fact.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <SocialLinks className="flex gap-6" 
            linkClassName="group p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-lime-300/50 transition-all"
            iconClassName="w-6 h-6 text-zinc-400 group-hover:text-lime-300 transition-colors"
          />
        </motion.div>
      </div>
    </div>

    {/* Scroll Indicator mejorado */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
    >
      <div className="w-6 h-10 border-2 border-lime-300/30 rounded-full flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-lime-300/50 rounded-full animate-scroll" />
      </div>
    </motion.div>
  </section>
);

export default HeroSection; 