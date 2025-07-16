import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { projects } from "../../data/projects";
import { technologyColors } from "../../types/portfolio";

const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => a.priority - b.priority)
  .slice(0, 3);

interface FeaturedProjectsProps {
  onProjectClick?: (projectId: string) => void;
}

const FeaturedProjects = ({ onProjectClick }: FeaturedProjectsProps) => {
  return (
    <section className="py-24 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px] animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px] animate-pulse" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full" />
            <p className="text-lime-300 font-medium">Proyectos Destacados</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soluciones que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
              Generan Impacto
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Descubre cómo ayudamos a empresas a alcanzar sus objetivos a través de
            soluciones tecnológicas innovadoras.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-32">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              {/* Project Image */}
              <div className="w-full md:w-3/5 relative">
                <div className="aspect-[4/3] bg-zinc-800/20 backdrop-blur-sm rounded-2xl overflow-hidden relative border border-zinc-700/50 shadow-2xl shadow-lime-900/20">
                  {/* Efecto de brillo superior */}
                  <div className="absolute -inset-[40%] bg-lime-300/10 blur-3xl rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 via-transparent to-zinc-900/40" />
                  {/* Efecto de viñeta */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-zinc-900/40" />
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full md:w-2/5 space-y-6">
                <h3 className="text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-lg text-zinc-400">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 rounded-full text-sm ${technologyColors[tech.category]}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-30 inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
                    >
                      Visitar Sitio
                      <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

                {/* Key Points */}
                <ul className="space-y-3 pt-4">
                  {project.keyPoints.slice(0, 2).map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-zinc-300"
                    >
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium transition-all duration-300"
            onClick={() => onProjectClick && onProjectClick("all")}
          >
            Ver Todos los Proyectos
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
