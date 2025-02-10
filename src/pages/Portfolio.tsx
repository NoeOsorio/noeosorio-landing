import { workProjects, personalProjects } from '../data/projects'
import { Technology, technologyColors, technologyIcons } from '../types/portfolio'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'

const TechnologyBadge = ({ tech }: { tech: Technology }) => {
  const Icon = technologyIcons[tech.icon]
  return (
    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${technologyColors[tech.category]}`}>
      <Icon className="w-4 h-4" />
      {tech.name}
    </span>
  )
}

const Portfolio = () => {
  return (
    <>
      <SEO 
        title="Portfolio | Noé Osorio"
        description="Explora mis proyectos en cloud computing, desarrollo web y arquitectura de software."
        image="https://noeosorio.com/portfolio-og.png"
        url="https://noeosorio.com/portfolio"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5" />
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-lime-300 rounded-full" />
              <p className="text-lime-300 font-medium">Portfolio</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Proyectos que 
              <span className="text-lime-300"> Transforman Negocios</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              Una colección de soluciones tecnológicas que han generado impacto 
              real en diferentes industrias y mercados.
            </p>
          </div>
        </section>

        {/* Work Projects */}
        <section className="container mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-white mb-16">Experiencia Profesional</h2>
          <div className="space-y-32">
            {workProjects.map((project, index) => (
              <div key={index} className="group">
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
                          <TechnologyBadge key={i} tech={tech} />
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
              </div>
            ))}
          </div>
        </section>

        {/* Personal Projects */}
        <section className="bg-zinc-900/50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-16">Proyectos Personales</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalProjects.map((project, index) => (
                <div key={index} className="bg-zinc-800/50 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors">
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
                        <TechnologyBadge key={i} tech={tech} />
                      ))}
                    </div>
                    <Link 
                      to={`/portfolio/${project.id}`}
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-zinc-900/50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para Crear Algo Increíble?
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Conversemos sobre cómo podemos transformar tu idea en el próximo 
                caso de éxito.
              </p>
              <button className="group px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium relative overflow-hidden transition-all duration-300">
                <span className="relative z-10">Iniciar Proyecto</span>
                <div className="absolute inset-0 bg-lime-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Portfolio 