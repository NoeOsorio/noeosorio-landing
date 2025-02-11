import { workProjects, personalProjects } from '../data/projects'
import { Technology, technologyColors, technologyIcons } from '../types/portfolio'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { motion } from 'framer-motion'
import { HiCode, HiCube, HiLightningBolt } from 'react-icons/hi'
import { trackEvent } from '../hooks/useAnalytics'

// Configuraciones de animación
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
}

const cardVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
}

const TechnologyBadge = ({ tech, onClick }: { tech: Technology; onClick?: () => void }) => {
  const Icon = technologyIcons[tech.icon]
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${technologyColors[tech.category]}`}
    >
      <Icon className="w-4 h-4" />
      {tech.name}
    </motion.span>
  )
}

const stats = [
  {
    label: 'Proyectos Completados',
    value: '50+',
    icon: HiCode,
    color: 'from-purple-500 to-blue-500'
  },
  {
    label: 'Tecnologías Dominadas',
    value: '15+',
    icon: HiCube,
    color: 'from-lime-500 to-emerald-500'
  },
  {
    label: 'Años de Experiencia',
    value: '5+',
    icon: HiLightningBolt,
    color: 'from-orange-500 to-red-500'
  }
]

const Portfolio = () => {
  const handleProjectClick = (projectId: string, projectType: string) => {
    trackEvent('project_click', {
      project_id: projectId,
      project_type: projectType,
      source: 'portfolio_page'
    });
  };

  const handleTechnologyFilter = (tech: Technology) => {
    trackEvent('technology_filter', {
      technology: tech.name,
      category: tech.category,
      source: 'portfolio_page'
    });
  };

  const handleCTAClick = () => {
    trackEvent('portfolio_cta_click', {
      source: 'portfolio_page',
      location: 'bottom_section'
    });
  };

  return (
    <>
      <SEO 
        title="Portfolio | Noé Osorio - Proyectos Destacados"
        description="Explora mi portfolio de proyectos en desarrollo web, móvil y automatización. Casos de éxito en healthtech, fintech y más."
        image="https://noeosorio.com/portfolio-og.png"
        url="https://noeosorio.com/portfolio"
        type="website"
        keywords="portfolio, proyectos, desarrollo web, aplicaciones móviles, React, Node.js, AWS"
      />
      
      <div className="relative min-h-screen bg-zinc-900 overflow-hidden">
        {/* Background animado */}

          <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />


        <div className="relative">
          {/* Hero Section */}
          <motion.section 
            {...fadeInUp}
            className="min-h-[60vh] flex items-center"
          >
            <div className="container mx-auto px-4 py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
                  <div className="w-2 h-2 bg-lime-300 rounded-full" />
                  <p className="text-lime-300 font-medium">Portfolio</p>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Transformando Ideas en{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
                    Experiencias Digitales
                  </span>
                </h1>
                
                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                  Una colección de proyectos que demuestran mi pasión por crear soluciones 
                  innovadoras y experiencias de usuario excepcionales.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="relative p-6 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-3xl font-bold text-white mb-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Work Projects */}
          <motion.section 
            {...staggerContainer}
            className="py-24"
          >
            <div className="container mx-auto px-4">
              <motion.h2 
                {...fadeInUp}
                className="text-3xl font-bold text-white mb-16"
              >
                Proyectos Destacados
              </motion.h2>

              <motion.div 
                variants={staggerContainer}
                className="grid gap-12"
              >
                {workProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      {/* Project Image */}
                      <div className="relative aspect-[16/9] max-h-[400px] bg-zinc-900 rounded-xl overflow-hidden">
                        <img 
                          src={project.images[0]} 
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-contain object-center max-w-2xl mx-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent" />
                      </div>

                      {/* Project Info */}
                      <div>
                        <div className="space-y-6">
                          <div>
                            <p className="text-lime-300 mb-2">{project.role}</p>
                            <h3 className="text-3xl font-bold text-white mb-4">
                              {project.title}
                            </h3>
                            <p className="text-zinc-400">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <TechnologyBadge 
                                key={i} 
                                tech={tech} 
                                onClick={() => handleTechnologyFilter(tech)}
                              />
                            ))}
                          </div>

                          <div className="space-y-4">
                            {project.keyPoints.map((point, i) => (
                              <div key={i}>
                                <h4 className="text-white font-medium mb-2">
                                  {point.title}
                                </h4>
                                <p className="text-zinc-400 text-sm">
                                  {point.content}
                                </p>
                              </div>
                            ))}
                          </div>

                          <Link 
                            to={`/portfolio/${project.id}`}
                            onClick={() => handleProjectClick(project.id, 'work')}
                            className="inline-flex items-center text-lime-300 hover:text-lime-400 transition-colors"
                          >
                            Ver Proyecto
                            <svg 
                              className="w-4 h-4 ml-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Personal Projects */}
          <motion.section 
            {...staggerContainer}
            className="py-24"
          >
            <div className="container mx-auto px-4">
              <motion.h2 
                {...fadeInUp}
                className="text-3xl font-bold text-white mb-16"
              >
                Proyectos Personales
              </motion.h2>

              <motion.div 
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {personalProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className="bg-zinc-800/50 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors"
                  >
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-zinc-400">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <TechnologyBadge 
                            key={i} 
                            tech={tech}
                            onClick={() => handleTechnologyFilter(tech)}
                          />
                        ))}
                      </div>
                      <Link 
                        to={`/portfolio/${project.id}`}
                        onClick={() => handleProjectClick(project.id, 'personal')}
                        className="inline-flex items-center text-lime-300 hover:text-lime-400"
                      >
                        Ver Proyecto
                        <svg 
                          className="w-4 h-4 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            {...fadeInUp}
            className="py-24"
          >
            <div className="container mx-auto px-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  ¿Listo para Crear Algo Increíble?
                </h2>
                <p className="text-xl text-zinc-400 mb-8">
                  Conversemos sobre cómo podemos transformar tu idea en el próximo 
                  caso de éxito.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTAClick}
                  className="group px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium relative overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10">Iniciar Proyecto</span>
                  <motion.div 
                    className="absolute inset-0 bg-lime-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

export default Portfolio 