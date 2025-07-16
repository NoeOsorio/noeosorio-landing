import { motion } from 'framer-motion';
import { HiOutlineGlobeAlt, HiOutlineCode, HiOutlineStar, HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { personalProjects } from '../../data/personalProjects';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const PersonalProjects = () => (
  <section className="py-24 relative">
    {/* Decorative elements */}
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px] animate-pulse" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px] animate-pulse" />

    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-medium">
            Open Source
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 mb-6"
        >
          Proyectos Personales
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Contribuciones open source y herramientas de desarrollo
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {personalProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-lime-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-lime-500/20 hover:border-lime-500/30 transition-all duration-300"
          >
            {/* Header with Stats */}
            <div className="relative p-8 pb-0">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-lime-400 group-hover:to-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {project.role} @ {project.company}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <HiOutlineStar className="w-5 h-5 text-lime-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{project.stats?.stars}</p>
                  </div>
                  <div className="text-center">
                    <HiOutlineGlobeAlt className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{project.stats?.downloads}</p>
                  </div>
                </div>
              </div>

              <p className="text-zinc-300 mb-8">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="px-8">
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      tech.category === 'frontend' ? 'text-lime-400 bg-lime-400/10' :
                      tech.category === 'backend' ? 'text-emerald-400 bg-emerald-400/10' :
                      'text-sky-400 bg-sky-400/10'
                    }`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="px-8 mb-8">
              <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 uppercase tracking-wider mb-4">
                Características Principales
              </h4>
              <div className="grid gap-3">
                {project.keyPoints.map((point, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full mt-2 shrink-0" />
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
            <div className="px-8 pb-8">
              <div className="flex items-center justify-between pt-4 border-t border-lime-500/20">
                <div className="flex items-center gap-4">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-lime-400 transition-colors inline-flex items-center gap-1"
                    >
                      <HiOutlineCode className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.links.npm && (
                    <a
                      href={project.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                    >
                      <HiOutlineGlobeAlt className="w-4 h-4" />
                      <span>NPM</span>
                    </a>
                  )}
                  {project.links.docs && (
                    <a
                      href={project.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                    >
                      <HiOutlineGlobeAlt className="w-4 h-4" />
                      <span>Docs</span>
                    </a>
                  )}
                </div>
                <Link
                  to={`/open-source/${project.id}`}
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors"
                >
                  <span>Ver Detalles</span>
                  <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 