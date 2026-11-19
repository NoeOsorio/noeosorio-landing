import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

interface HomeProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: { label: string; href: string };
  // Real screenshot path; rows without one render text only.
  image?: string;
}

const featuredProjects: HomeProject[] = [
  {
    id: "essay-studio",
    title: "Essay Studio",
    description:
      "A desktop app where four AI agents (evidence, systems, practice, objections) challenge your essay. The score comes from concrete findings, not from asking a model.",
    tags: ["Rust", "Tauri", "Next.js", "TypeScript"],
    link: { label: "Open on GitHub", href: "https://github.com/NoeOsorio/essay-studio" },
  },
  {
    id: "porter-galaxy",
    title: "Porter Galaxy",
    description: "A Kubernetes cluster shown as a living 3D galaxy.",
    tags: ["Go", "Three.js", "Kubernetes", "Helm"],
    link: { label: "Open on GitHub", href: "https://github.com/NoeOsorio/porter-galaxy" },
  },
  {
    id: "sim-world",
    title: "Sim World",
    description:
      "Life simulations in the browser, from the primordial soup to families with personalities.",
    tags: ["TypeScript"],
    link: { label: "Try it live", href: "https://simulations.noeosorio.com" },
  },
];

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
            <p className="text-lime-300 font-medium">Projects</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built to be{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
              used
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Three of my projects, what they do and how they are made.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-32 max-w-6xl mx-auto">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              {/* Project Image: only when a real screenshot exists */}
              {project.image && (
                <div className="w-full md:w-3/5 relative">
                  <div className="aspect-[4/3] bg-zinc-800/20 backdrop-blur-sm rounded-2xl overflow-hidden relative border border-zinc-700/50 shadow-2xl shadow-lime-900/20">
                    <div className="absolute -inset-[40%] bg-lime-300/10 blur-3xl rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 via-transparent to-zinc-900/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-zinc-900/40" />
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className={`w-full space-y-6 ${project.image ? "md:w-2/5" : ""}`}>
                <h3 className="text-3xl font-bold text-white">{project.title}</h3>
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

                <div className="pt-4">
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onProjectClick?.(project.id)}
                    className="group relative z-30 inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
                  >
                    {project.link.label}
                    <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium transition-all duration-300"
            onClick={() => onProjectClick?.("all")}
          >
            See all projects
            <HiArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
