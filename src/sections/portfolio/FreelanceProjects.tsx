import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineExternalLink, HiOutlineClock, HiOutlineTag } from 'react-icons/hi';
import TechnologyBadge from '../../components/TechnologyBadge';

// Filtrar proyectos B2B/Freelance (necesitaremos añadir esta categoría en projects.ts)
import { projects } from '../../data/projects';
const freelanceProjects = projects.filter(p => !p.company || p.company === 'Freelance' || p.company === 'B2B');

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const FreelanceProjects = () => (
  <section className="py-24 relative">
    {/* Decorative elements */}
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[128px] animate-pulse" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-[128px] animate-pulse" />

    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-300/10 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-purple-300" />
          <span className="text-purple-300 font-medium">Proyectos B2B</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6"
        >
          Soluciones para Empresas
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Proyectos desarrollados como consultor independiente para empresas
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {freelanceProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all group"
          >
            {/* Project Image */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />
              <img
                src={project.images[0]}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Project Type Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-purple-300 text-sm border border-purple-500/20">
                  <HiOutlineTag className="w-4 h-4" />
                  <span>{project.category}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  {project.timeline && project.timeline[0] && (
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <HiOutlineClock className="w-4 h-4" />
                      <span>{project.timeline[0].date}</span>
                    </div>
                  )}
                </div>
                <p className="text-zinc-400">{project.description}</p>
              </div>

              {/* Key Points */}
              <div className="space-y-2">
                {project.keyPoints.slice(0, 2).map((point, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-1">{point.title}</h4>
                    <p className="text-zinc-400 text-sm">{point.content}</p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <TechnologyBadge key={i} tech={tech} />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Link
                  to={`/portfolio/${project.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-300/10 hover:bg-purple-300/20 text-purple-300 rounded-lg transition-colors"
                >
                  Ver Detalles
                  <HiOutlineExternalLink className="w-4 h-4" />
                </Link>
                {project.links?.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-purple-300 transition-colors"
                  >
                    Visitar Sitio
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 