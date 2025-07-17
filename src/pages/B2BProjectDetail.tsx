import { useParams } from 'react-router-dom'
import { Project } from '../types/portfolio'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { SEO } from '../components/SEO'
import LazyImage from '../components/LazyImage'
import { b2bProjects } from '../data/b2bProjects'

// Importar los proyectos B2B


const B2BProjectDetail = () => {
  const { projectId } = useParams()
  const project = b2bProjects.find((p: Project) => p.id === projectId)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <>
      <SEO
        title={`${project.title} - Noé Osorio`}
        description={project.description}
        url={`/b2b/${project.id}`}
        image={project.images[0]}
      />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-xl text-zinc-400 mb-8">{project.description}</p>

          {/* Project Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Rol</h3>
              <p className="text-white">{project.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Empresa</h3>
              <a 
                href={project.companyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                {project.company}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Categoría</h3>
              <p className="text-white capitalize">{project.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Enlaces</h3>
              <div className="flex gap-4">
                {project.links?.website && (
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                  >
                    <HiOutlineExternalLink className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project Image */}
          {project.images?.[0] && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <LazyImage
                src={project.images[0]}
                alt={project.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Key Points */}
          {project.keyPoints && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Puntos Clave</h2>
              <div className="grid gap-6">
                {project.keyPoints.map((point, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-white mb-2">{point.title}</h3>
                    <p className="text-zinc-400">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {project.timeline && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Línea de Tiempo</h2>
              <div className="grid gap-6">
                {project.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-zinc-400">{event.date}</div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">{event.title}</h3>
                      <p className="text-zinc-400">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Tecnologías</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    tech.category === 'frontend' ? 'text-blue-400 bg-blue-400/10' :
                    tech.category === 'backend' ? 'text-indigo-400 bg-indigo-400/10' :
                    tech.category === 'database' ? 'text-purple-400 bg-purple-400/10' :
                    'text-sky-400 bg-sky-400/10'
                  }`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default B2BProjectDetail 