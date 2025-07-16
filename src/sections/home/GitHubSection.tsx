import { motion } from 'framer-motion';
import { HiOutlineExternalLink, HiStar, HiCode } from 'react-icons/hi';
import { VscGitPullRequest, VscRepo, VscGithubAction } from 'react-icons/vsc';

const features = [
  {
    icon: VscRepo,
    title: "Repositorios Públicos",
    description: "Código abierto y proyectos compartidos con la comunidad"
  },
  {
    icon: VscGitPullRequest,
    title: "Contribuciones",
    description: "Colaboraciones activas en proyectos open source"
  },
  {
    icon: VscGithubAction,
    title: "GitHub Actions",
    description: "Automatización y CI/CD en proyectos"
  }
];

export const GitHubSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#2b3137]/10 to-[#24292e]/10 backdrop-blur-xl rounded-2xl p-12 border border-[#30363d] hover:border-[#484f58] transition-all relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#238636]/20 to-[#2ea043]/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#1f6feb]/20 to-[#238636]/20 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-6 mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#238636]" />
                  <span className="text-sm text-[#7ee787] font-medium">
                    Open Source
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <svg height="48" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="48" data-view-component="true" className="text-white">
                    <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                  </svg>
                  <h3 className="text-2xl font-bold text-white">
                    GitHub
                  </h3>
                </div>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Contribuyendo al{' '}
                <span className="text-[#7ee787]">
                  Código Abierto
                </span>
              </h2>
              
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Explora mis contribuciones a la comunidad de código abierto, proyectos personales
                y colaboraciones. Más de 5 años compartiendo código y aprendiendo de otros desarrolladores.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#2b3137]/30 backdrop-blur-xl rounded-xl p-6 border border-[#30363d]"
                >
                  <feature.icon className="w-8 h-8 text-[#7ee787] mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-[#2b3137]/30 backdrop-blur-xl rounded-xl p-4 border border-[#30363d] text-center">
                <HiCode className="w-6 h-6 text-[#7ee787] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">1.2k+</div>
                <div className="text-sm text-zinc-400">Commits</div>
              </div>
              <div className="bg-[#2b3137]/30 backdrop-blur-xl rounded-xl p-4 border border-[#30363d] text-center">
                <VscRepo className="w-6 h-6 text-[#7ee787] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">30+</div>
                <div className="text-sm text-zinc-400">Repositorios</div>
              </div>
              <div className="bg-[#2b3137]/30 backdrop-blur-xl rounded-xl p-4 border border-[#30363d] text-center">
                <HiStar className="w-6 h-6 text-[#7ee787] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-zinc-400">Estrellas</div>
              </div>
              <div className="bg-[#2b3137]/30 backdrop-blur-xl rounded-xl p-4 border border-[#30363d] text-center">
                <VscGitPullRequest className="w-6 h-6 text-[#7ee787] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm text-zinc-400">Pull Requests</div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <motion.a
                href="https://github.com/noeosorio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg font-medium transition-all"
              >
                Ver Perfil de GitHub
                <HiOutlineExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
); 