import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineExternalLink, HiOutlineClock } from 'react-icons/hi';
import { technologyColors } from '../../types/portfolio';

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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium">
            Freelance Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6"
        >
          Proyectos Freelance
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Soluciones personalizadas para clientes independientes
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
            className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>

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
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-sm ${technologyColors[tech.category]}`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Link
                  to={`/portfolio/${project.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-300/10 hover:bg-purple-300/20 text-purple-300 rounded-lg transition-colors"
                >
                  <span>Ver Detalles</span>
                  <HiOutlineExternalLink className="w-4 h-4" />
                </Link>
                {project.links.website && (
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

            {/* Decorative corner gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 