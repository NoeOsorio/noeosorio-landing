import { motion } from 'framer-motion';
import { workProjects } from '../../data/projects';
import { HiOutlineBriefcase, HiOutlineCalendar } from 'react-icons/hi';
import { technologyColors } from '../../types/portfolio';

const timelineVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export const ExperienceTimeline = () => {
  // Ordenar proyectos por prioridad (asumiendo que la prioridad refleja el orden cronológico)
  const sortedProjects = [...workProjects].sort((a, b) => a.priority - b.priority);

  return (
    <section className="py-24 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[128px] animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[128px] animate-pulse" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-medium">
              Experiencia Profesional
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6"
          >
            Trayectoria Profesional
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Experiencia en empresas líderes desarrollando soluciones innovadoras
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={timelineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariant}
              className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.role}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-blue-400">{project.company}</span>
                      <span>•</span>
                      {/* <span>{project.location}</span> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <HiOutlineCalendar className="w-5 h-5" />
                    <span>{project.timeline[0].date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 mb-8">
                  {project.description}
                </p>

                {/* Key Points */}
                <div className="space-y-4 mb-6">
                  {project.keyPoints.map((point, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">{point.title}</h4>
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
                <div className="flex flex-row gap-2 justify-between">
             

                {/* Company Link */}
                {project.companyLink && (
                  <a
                    href={project.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-blue-300 hover:text-blue-400 transition-colors"
                  >
                    Visitar Empresa
                    <HiOutlineBriefcase className="w-4 h-4" />
                  </a>
                )}

                {/* Link To Project */}
                <a
                  href={`/portfolio/${project.id}`}
                  className="inline-flex items-center gap-2 mt-6 text-blue-300 hover:text-blue-400 transition-colors"
                >
                  Ver Proyecto
                </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 