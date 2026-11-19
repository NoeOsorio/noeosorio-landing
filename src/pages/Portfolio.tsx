import { SEO } from "../components/SEO";
import { ProjectRows } from "../sections/portfolio/ProjectRows";
import { ProjectsCTA } from "../sections/portfolio/ProjectsCTA";

const Portfolio = () => (
  <>
    <SEO
      title="Projects | Noé Osorio"
      description="Tools I made for myself, with AI and real safeguards. Some are public, some are not yet."
      image="https://noeosorio.com/portfolio-og.png"
      url="https://noeosorio.com/portfolio"
      type="website"
    />

    <div className="relative min-h-screen bg-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />

      <div className="relative">
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
                <div className="w-2 h-2 bg-lime-300 rounded-full" />
                <p className="text-lime-300 font-medium">Projects</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Built to be{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
                  used
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Tools I made for myself, with AI and real safeguards. Some are public, some are not yet.
              </p>
            </div>
          </div>
        </section>

        <ProjectRows />
        <ProjectsCTA />
      </div>
    </div>
  </>
);

export default Portfolio;
