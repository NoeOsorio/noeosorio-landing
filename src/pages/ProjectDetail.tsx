import { useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { HiLockClosed } from 'react-icons/hi'
import { SEO } from '../components/SEO'
import LazyImage from '../components/LazyImage'
import { technologyColors } from '../types/portfolio'

const ProjectDetail = () => {
  const { projectId } = useParams()
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return <div>Proyecto no encontrado</div>
  }

  return (
    <>
      <SEO 
        title={`${project.title} | Portfolio - Noé Osorio`}
        description={project.description}
        image={project.images[0]}
        url={`https://noeosorio.com/portfolio/${project.id}`}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] bg-zinc-900 overflow-hidden">
          {/* Background Layers */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ backgroundColor: project.backgroundColor }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5" />
          
          {/* Glow Effect */}
          <div 
            className="absolute -top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-20 transform -translate-x-1/2"
            style={{ backgroundColor: project.backgroundColor }}
          />

          {/* Content */}
          <div className="container mx-auto px-4 py-32 relative">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Project Info */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full">
                  <p className="text-lime-300 font-medium">{project.category}</p>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-zinc-800 rounded-xl">
                    <img 
                      src={project.resources.logo} 
                      alt={`${project.company} logo`}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{project.company}</p>
                    <p className="text-zinc-400">{project.role}</p>
                  </div>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 rounded-full text-sm ${technologyColors[tech.category]}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 p-8">
                  <LazyImage 
                    src={project.images[0]} 
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Resources */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Links & Resources */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white">
                  Enlaces & Recursos
                </h2>
                <div className="grid gap-4">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors group"
                    >
                      <div>
                        <p className="text-white font-medium mb-1">Sitio Web</p>
                        <p className="text-sm text-zinc-400">{project.links.website}</p>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center bg-lime-300/10 text-lime-300 rounded-lg group-hover:bg-lime-300/20">
                        <HiLockClosed className="w-5 h-5" />
                      </div>
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors group"
                    >
                      <div>
                        <p className="text-white font-medium mb-1">Repositorio</p>
                        <p className="text-sm text-zinc-400">{project.links.github}</p>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center bg-lime-300/10 text-lime-300 rounded-lg group-hover:bg-lime-300/20">
                        <HiLockClosed className="w-5 h-5" />
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Key Points */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white">
                  Puntos Clave
                </h2>
                <div className="grid gap-4">
                  {project.keyPoints.map((point, i) => (
                    <div 
                      key={i}
                      className="p-4 bg-zinc-800/50 rounded-xl"
                    >
                      <h3 className="text-lg font-medium text-white mb-2">
                        {point.title}
                      </h3>
                      <p className="text-zinc-400">
                        {point.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProjectDetail 