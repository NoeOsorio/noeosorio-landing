import { useParams } from 'react-router-dom'
import { Project } from '../types/portfolio'
import { HiOutlineExternalLink, HiOutlineBriefcase, HiOutlineTag } from 'react-icons/hi'
import { SEO } from '../components/SEO'
import LazyImage from '../components/LazyImage'
import { landingPages } from '../data/landingPages'

const LandingProjectDetail = () => {
  const { projectId } = useParams()
  const project = landingPages.find((p: Project) => p.id === projectId)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <>
      <SEO
        title={`${project.title} - Noé Osorio`}
        description={project.description}
        url={`/landing/${project.id}`}
        image={project.images[0]}
      />
      
      {/* Hero Section with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-900/20 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Project Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineBriefcase className="w-5 h-5 text-pink-400" />
                  <h3 className="text-sm font-medium text-zinc-400">Rol</h3>
                </div>
                <p className="text-white">{project.role}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineBriefcase className="w-5 h-5 text-pink-400" />
                  <h3 className="text-sm font-medium text-zinc-400">Empresa</h3>
                </div>
                <a 
                  href={project.companyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  {project.company}
                </a>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineTag className="w-5 h-5 text-pink-400" />
                  <h3 className="text-sm font-medium text-zinc-400">Categoría</h3>
                </div>
                <p className="text-white capitalize">{project.category}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineExternalLink className="w-5 h-5 text-pink-400" />
                  <h3 className="text-sm font-medium text-zinc-400">Enlaces</h3>
                </div>
                <div className="flex gap-4">
                  {project.links?.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-pink-400 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Website</span>
                      <HiOutlineExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Project Image */}
          {project.images?.[0] && (
            <div className="mb-16">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
                <LazyImage
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Key Points with Modern Cards */}
          {project.keyPoints && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Puntos Clave</h2>
              <div className="grid gap-6">
                {project.keyPoints.map((point, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-br from-pink-600/10 to-purple-900/10 border border-white/10"
                  >
                    <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline with Modern Design */}
          {project.timeline && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Línea de Tiempo</h2>
              <div className="relative border-l border-pink-500/20 ml-3">
                {project.timeline.map((event, index) => (
                  <div key={index} className="mb-8 ml-6">
                    <div className="flex absolute -left-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
                    </div>
                    <div className="text-sm text-pink-400 mb-2">{event.date}</div>
                    <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies with Modern Pills */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Tecnologías</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-pink-600/10 to-purple-900/10 border border-white/10 text-pink-400"
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

export default LandingProjectDetail 