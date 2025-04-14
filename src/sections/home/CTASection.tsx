import { Link } from 'react-router-dom'
import { HiArrowRight, HiMail, HiCalendar } from 'react-icons/hi'
import { projects } from '../../data/projects'

interface CTASectionProps {
  onCTAClick?: (action: string) => void;
}

const CTASection = ({ onCTAClick }: CTASectionProps) => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              ¿Listo para <span className="text-lime-300">Transformar</span>
              <br />
              tu Próximo Proyecto?
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
              Agenda una consulta gratuita para discutir tus ideas y explorar cómo 
              podemos trabajar juntos para hacerlas realidad.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Card */}
            <div className="group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
              <div className="p-4 bg-lime-300/10 text-lime-300 rounded-xl w-fit mb-6">
                <HiMail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Envíame un Mensaje
              </h3>
              <p className="text-zinc-400 mb-8">
                ¿Tienes preguntas específicas? Escríbeme y te responderé 
                dentro de las próximas 24 horas.
              </p>
              <Link 
                to="/contact"
                onClick={() => onCTAClick?.('contact_message')}
                className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
              >
                Contactar Ahora
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Calendar Card */}
            <div className="group p-8 bg-gradient-to-br from-lime-300/10 to-transparent rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
              <div className="p-4 bg-lime-300/10 text-lime-300 rounded-xl w-fit mb-6">
                <HiCalendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Agenda una Llamada
              </h3>
              <p className="text-zinc-400 mb-8">
                Elige el horario que mejor te funcione para una videollamada 
                de 30 minutos sin compromiso.
              </p>
              <a 
                href="https://calendly.com/noeosorio/tech-business-consultant"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCTAClick?.('schedule_call')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-lime-300 to-emerald-300 
                  text-zinc-900 rounded-lg font-medium relative overflow-hidden
                  hover:from-lime-400 hover:to-emerald-400 
                  transition-all duration-300 shadow-lg hover:shadow-lime-300/20"
              >
                <span className="relative z-10">Agendar Reunión</span>
                <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-400 
                  transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-zinc-400 mb-6">
              Empresas que han confiado en mi trabajo
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {projects
                .filter(p => p.resources.logo && p.company !== 'Personal')
                .slice(0, 4)
                .map((project, i) => (
                  <div 
                    key={i} 
                    className="relative h-8 opacity-80 hover:opacity-100 transition-all duration-300 group"
                  >
                    <img
                      src={project.resources.logo}
                      alt={project.company}
                      className="h-full w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection 