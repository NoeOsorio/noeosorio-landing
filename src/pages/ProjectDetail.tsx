import { useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { Technology, technologyColors, technologyIcons } from '../types/portfolio'
import { HiLockClosed } from 'react-icons/hi'

const TechnologyBadge = ({ tech }: { tech: Technology }) => {
  const Icon = technologyIcons[tech.icon]
  return (
    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${technologyColors[tech.category]}`}>
      <Icon className="w-4 h-4" />
      {tech.name}
    </span>
  )
}

const ProjectDetail = () => {
  const { projectId } = useParams()
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return <div>Proyecto no encontrado</div>
  }

  return (
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
                  <TechnologyBadge key={i} tech={tech} />
                ))}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 p-8">
                <img 
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
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Screenshots Gallery */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white mb-6">Galería</h2>
            {project.confidential ? (
              <div className="bg-zinc-800/50 rounded-xl p-8 text-center">
                <HiLockClosed className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Contenido Confidencial
                </h3>
                <p className="text-zinc-400">
                  Debido a acuerdos de confidencialidad, no podemos mostrar capturas de pantalla de este proyecto.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {project.resources.screenshots?.map((screenshot, i) => (
                  <div className="max-w-xl mx-auto">
                    <img
                      key={i}
                      src={screenshot}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="rounded-lg w-full max-w-xl mx-auto h-[400px] object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
            {project.resources.video && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Demo</h3>
                <video
                  src={project.resources.video}
                  controls
                  className="rounded-lg w-full"
                />
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-12">
            {/* Key Points */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Características Principales</h2>
              <div className="space-y-6">
                {project.keyPoints.map((point, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
                    <p className="text-zinc-400">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Línea de Tiempo</h2>
              <div className="space-y-8">
                {project.timeline.map((item, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-lime-300/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-zinc-900 border-2 border-lime-300 rounded-full" />
                    <div className="text-lime-300 font-mono mb-2">{item.date}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {project.resources.testimonial && (
              <div className="bg-zinc-800/50 p-8 rounded-xl">
                <blockquote className="text-lg text-zinc-300 italic mb-4">
                  "{project.resources.testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-white">{project.resources.testimonial.author}</div>
                  <div className="text-zinc-400">{project.resources.testimonial.role}</div>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {Object.entries(project.links).map(([key, url]) => (
                url && (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                  >
                    {key === 'website' ? 'Visitar Sitio' :
                     key === 'github' ? 'Ver Código' :
                     key === 'playStore' ? 'Google Play' :
                     key === 'appStore' ? 'App Store' :
                     'Ver Demo'}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail 