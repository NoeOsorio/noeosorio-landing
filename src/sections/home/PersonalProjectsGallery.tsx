import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { personalProjects } from '../../data/projects';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { VscGithubAlt } from 'react-icons/vsc';
import TechnologyBadge from '../../components/TechnologyBadge';

// Animation variants
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const titleVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

// Placeholders in case a project lacks images
const placeholders = [
  '/images/proyecto1.png',
  '/images/proyecto2.png',
  '/images/proyecto3.png',
  '/images/proyecto4.png'
];

export const PersonalProjectsGallery = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px] animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px] animate-pulse" />

    <div className="container mx-auto px-4 relative">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-300/10 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-lime-300" />
          <span className="text-lime-300 font-medium">Portfolio</span>
        </motion.div>

        <motion.h2
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300 mb-6"
        >
          Proyectos Personales
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Una colección de proyectos que demuestran mi pasión por crear experiencias digitales innovadoras
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalProjects.map((project, index) => {
          const imageSrc = project.images?.[0] ?? placeholders[index % placeholders.length];
          return (
            <motion.div
              key={project.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-lime-500/10"
            >
              {/* Project Type Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-md text-lime-300 border border-lime-500/20">
                  {project.category}
                </span>
              </div>

              {/* Screenshot with Overlay */}
              <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />
                <img
                  src={imageSrc}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Links Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]">
                  {project.links?.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      <HiOutlineExternalLink className="w-6 h-6 text-white" />
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                      <VscGithubAlt className="w-6 h-6 text-white" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Link
                  to={`/portfolio/${project.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 hover:bg-lime-300/20 text-lime-300 rounded-lg transition-colors group/link"
                >
                  <span>Ver Detalles</span>
                  <HiOutlineExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>

              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-lime-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
); 