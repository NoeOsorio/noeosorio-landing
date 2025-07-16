import { motion } from 'framer-motion';
import { workProjects } from '../../data/projects';
import { HiOutlineBriefcase, HiOutlineCalendar } from 'react-icons/hi';
import TechnologyBadge from '../../components/TechnologyBadge';

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-300/10 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-blue-300" />
            <span className="text-blue-300 font-medium">Experiencia Profesional</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 mb-6"
          >
            Trayectoria Empresarial
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            Mi experiencia trabajando con empresas líderes en tecnología
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={timelineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {sortedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariant}
              className="relative pl-8 pb-16 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-indigo-500/50" />
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-blue-500 -translate-x-1/2" />

              {/* Content */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 hover:border-white/20 transition-all">
                {/* Company and Date */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-white">{project.company}</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-300/10 text-blue-300 text-sm">
                    <HiOutlineBriefcase className="w-4 h-4" />
                    <span>{project.role}</span>
                  </div>
                  {project.timeline && project.timeline[0] && (
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <HiOutlineCalendar className="w-4 h-4" />
                      <span>{project.timeline[0].date}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-zinc-400 mb-6">
                  {project.description}
                </p>

                {/* Key Achievements */}
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
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
                </div>

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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 