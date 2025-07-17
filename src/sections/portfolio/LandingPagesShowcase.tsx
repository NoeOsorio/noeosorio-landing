import { motion } from 'framer-motion';
import { landingPages } from '../../data/landingPages';
import { HiOutlineExternalLink, HiOutlineCode } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// import TechnologyBadge from '../../components/TechnologyBadge';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const LandingPagesShowcase = () => (
  <section className="py-24 relative">
    {/* Decorative elements */}
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[128px] animate-pulse" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px] animate-pulse" />

    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-medium">
            SakuraKode Landings
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6"
        >
          Diseños que Convierten
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Landing pages modernas y efectivas para diferentes industrias
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {landingPages.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-pink-500/20 hover:border-pink-500/30 transition-all duration-300"
          >
            {/* Preview Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title and Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 uppercase tracking-wider">
                  Características Principales
                </h4>
                <div className="grid gap-3">
                  {project.keyPoints.map((point, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-2 shrink-0" />
                      <div>
                        <h5 className="text-sm font-medium text-white mb-1">
                          {point.title}
                        </h5>
                        <p className="text-sm text-zinc-400">
                          {point.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4">
                  <motion.a
                    href={project.links?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 transition-colors inline-flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Demo</span>
                    <HiOutlineExternalLink className="w-4 h-4" />
                  </motion.a>
                  <Link
                    to={`/landing/${project.id}`}
                    className="text-zinc-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 transition-colors inline-flex items-center gap-1"
                  >
                    <HiOutlineCode className="w-4 h-4" />
                    <span>Detalles</span>
                  </Link>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 