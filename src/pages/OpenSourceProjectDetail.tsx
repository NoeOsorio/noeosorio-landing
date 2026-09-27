import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineGlobeAlt, HiOutlineCode, HiOutlineStar, HiOutlineUsers, HiOutlineDownload } from 'react-icons/hi';
import { personalProjects } from '../data/personalProjects';
import { SEO } from '../components/SEO';
import { Project, KeyPoint, Timeline, Technology } from '../types/portfolio';

const OpenSourceProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = personalProjects.find((p: Project) => p.id === id);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <>
      <SEO 
        title={`${project.title} | Open Source - Noé Osorio`}
        description={project.description}
        image={project.images[0]}
        url={`https://noeosorio.com/portfolio/${project.id}`}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24">
          {/* Decorative elements */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px] animate-pulse" />

          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Project Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-medium">
                  Open Source Project
                </span>
              </motion.div>

              {/* Project Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                {project.title}
              </motion.h1>

              {/* Project Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-zinc-300 mb-12"
              >
                {project.description}
              </motion.p>

              {/* Project Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-3 gap-8 mb-12"
              >
                <div className="bg-zinc-800/50 rounded-xl p-6 text-center">
                  <HiOutlineStar className="w-8 h-8 text-lime-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">{project.stats?.stars}</p>
                  <p className="text-zinc-400">GitHub Stars</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-6 text-center">
                  <HiOutlineDownload className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">{project.stats?.downloads}</p>
                  <p className="text-zinc-400">Total Downloads</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-6 text-center">
                  <HiOutlineUsers className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">{project.stats?.contributors}</p>
                  <p className="text-zinc-400">Contributors</p>
                </div>
              </motion.div>

              {/* Action Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-16"
              >
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 hover:bg-lime-600 text-zinc-900 rounded-lg transition-colors font-medium"
                  >
                    <HiOutlineCode className="w-5 h-5" />
                    <span>Ver en GitHub</span>
                  </a>
                )}
                {project.links.npm && (
                  <a
                    href={project.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 rounded-lg transition-colors font-medium"
                  >
                    <HiOutlineGlobeAlt className="w-5 h-5" />
                    <span>Ver en NPM</span>
                  </a>
                )}
                {project.links.docs && (
                  <a
                    href={project.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-zinc-900 rounded-lg transition-colors font-medium"
                  >
                    <HiOutlineGlobeAlt className="w-5 h-5" />
                    <span>Documentación</span>
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-12"
              >
                Características Principales
              </motion.h2>

              <div className="grid gap-8">
                {project.keyPoints.map((point: KeyPoint, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-800/30 rounded-xl p-8 border border-lime-500/10"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {point.title}
                    </h3>
                    <p className="text-zinc-300">
                      {point.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-12"
              >
                Tecnologías Utilizadas
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {project.technologies.map((tech: Technology, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${
                      tech.category === 'frontend' ? 'bg-lime-400/10 border-lime-400/20' :
                      tech.category === 'backend' ? 'bg-emerald-400/10 border-emerald-400/20' :
                      'bg-sky-400/10 border-sky-400/20'
                    } border`}
                  >
                    <h3 className={`text-lg font-semibold mb-2 ${
                      tech.category === 'frontend' ? 'text-lime-400' :
                      tech.category === 'backend' ? 'text-emerald-400' :
                      'text-sky-400'
                    }`}>
                      {tech.name}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {tech.category === 'frontend' ? 'Frontend Development' :
                       tech.category === 'backend' ? 'Backend Development' :
                       'Cloud & Infrastructure'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-12"
              >
                Timeline del Proyecto
              </motion.h2>

              <div className="space-y-12">
                {project.timeline.map((item: Timeline, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-lime-500/20"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-lime-500" />
                    <p className="text-lime-400 font-mono mb-2">{item.date}</p>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OpenSourceProjectDetail; 