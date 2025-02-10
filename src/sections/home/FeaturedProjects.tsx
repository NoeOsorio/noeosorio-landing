import { Link } from 'react-router-dom'
import { HiArrowRight, HiExternalLink } from 'react-icons/hi'
import { projects } from '../../data/projects'
import TechnologyBadge from '../../components/TechnologyBadge'

const featuredProjects = projects
  .filter(project => project.featured)
  .sort((a, b) => a.priority - b.priority)
  .slice(0, 3)

const FeaturedProjects = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-zinc-900/50 to-zinc-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
            <p className="text-lime-300 font-medium">Proyectos Destacados</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Soluciones que <span className="text-lime-300">Transforman</span> Industrias
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Desarrollando aplicaciones innovadoras que impulsan el crecimiento y la eficiencia operativa.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-32 max-w-6xl mx-auto">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col md:flex-row gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Project Image */}
              <div className="w-full md:w-3/5">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-lime-300 to-cyan-300 rounded-xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 p-8 bg-zinc-900">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Link 
                          to={`/portfolio/${project.id}`}
                          className="inline-flex items-center gap-2 text-lime-300 font-medium"
                        >
                          Ver Caso de Estudio
                          <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full md:w-2/5 space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-lg text-zinc-400">
                  {project.description}
                </p>

                {/* Technologies con TechnologyBadge */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
                    >
                      Visitar Sitio
                      <HiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Key Points */}
                <ul className="space-y-3 pt-4">
                  {project.keyPoints.slice(0, 2).map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2 shrink-0" />
                      <span>{point.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium hover:bg-lime-400 transition-colors"
          >
            Explorar Más Proyectos
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects 