import { Link, useNavigate } from 'react-router-dom'
import { HiArrowRight, HiAcademicCap, HiLightningBolt, HiUsers } from 'react-icons/hi'
import { scrollToElement } from '../../utils/scroll'

interface EducationPreviewProps {
  onCourseClick?: (courseId: string) => void;
}

const EducationPreview = ({ onCourseClick }: EducationPreviewProps) => {
  const navigate = useNavigate()

  const handleEducationClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/about')
    setTimeout(() => scrollToElement('education'), 100)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full">
              <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
              <p className="text-lime-300 font-medium">Education & Innovation</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Impulsando el <span className="text-lime-300">Futuro</span> del Desarrollo
            </h2>
            
            <p className="text-xl text-zinc-400 leading-relaxed">
              Transformando equipos y desarrolladores a través de mentoría personalizada, 
              workshops prácticos y contenido educativo de alto impacto.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/about#education"
                onClick={(e) => {
                  handleEducationClick(e);
                  onCourseClick?.('education_preview');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime-300 text-zinc-900 rounded-lg font-medium hover:bg-lime-400 transition-colors"
              >
                Explorar Programas
                <HiArrowRight className="w-5 h-5" />
              </Link>
              <a 
                target="_blank"
                rel="noopener noreferrer"
                href="https://calendly.com/noeosorio/tech-business-consultant"
                onClick={() => onCourseClick?.('schedule_consultation')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-lime-300 text-lime-300 rounded-lg font-medium hover:bg-lime-300/10 transition-colors"
              >
                Agendar Consulta
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-lime-300/20 to-cyan-300/20 rounded-2xl opacity-20 blur-xl" />
            <div className="relative grid gap-8">
              {[
                {
                  icon: HiAcademicCap,
                  title: "Workshops Especializados",
                  description: "React, Cloud Architecture, AI Integration y más",
                  stat: "10+"
                },
                {
                  icon: HiUsers,
                  title: "Desarrolladores Mentoreados",
                  description: "Impactando carreras en empresas tech líderes",
                  stat: "200+"
                },
                {
                  icon: HiLightningBolt,
                  title: "Incremento en Productividad",
                  description: "Mejora promedio en equipos capacitados",
                  stat: "400%"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group p-8 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all hover:bg-zinc-800/70"
                >
                  <div className="flex gap-8">
                    <div className="p-4 bg-lime-300/10 rounded-lg h-fit group-hover:bg-lime-300/20 transition-colors">
                      <item.icon className="w-7 h-7 text-lime-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-lime-300 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-2xl font-bold text-lime-300 ml-4">
                          {item.stat}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationPreview 