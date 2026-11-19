import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { projectList } from "../../data/projectList";
import { trackEvent } from "../../hooks/useAnalytics";

const linkClass =
  "group relative z-30 inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors";

export const ProjectRows = () => (
  <section className="pb-24 relative">
    <div className="container mx-auto px-4">
      <div className="space-y-32 max-w-6xl mx-auto">
        {projectList.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col items-center gap-16 ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {project.image && (
              <div className="w-full md:w-3/5 relative">
                <div className="aspect-[4/3] bg-zinc-800/20 rounded-2xl overflow-hidden relative border border-zinc-700/50 shadow-2xl shadow-lime-900/20">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            )}

            <div className={`w-full space-y-6 ${project.image ? "md:w-2/5" : "max-w-3xl"}`}>
              <h2 className="text-3xl font-bold text-white">{project.title}</h2>
              <p className="text-lg text-zinc-400">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-zinc-800 text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 text-zinc-300 list-disc pl-5 marker:text-lime-300">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {project.links.length > 0 && (
                <div className="pt-4 flex flex-wrap gap-x-8 gap-y-3">
                  {project.links.map((link) =>
                    link.internal ? (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => trackEvent("project_click", { project: project.id })}
                        className={linkClass}
                      >
                        {link.label}
                        <HiArrowRight
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("project_click", { project: project.id })}
                        className={linkClass}
                      >
                        {link.label}
                        <HiArrowRight
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
