import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import SocialLinks from '../components/SocialLinks'

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-300/20 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-lime-300 font-medium">
              Disponible para proyectos y mentoría
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
            Transformando Ideas en
            <div className="text-lime-300 mt-2">Soluciones Digitales</div>
          </h1>

          {/* Description */}
          <p className="text-xl text-zinc-400 leading-relaxed mb-12 max-w-2xl animate-fade-in-up delay-200">
            Senior Software Engineer especializado en arquitecturas cloud-native 
            y desarrollo full-stack, con un fuerte compromiso en educación tecnológica 
            y mentoría.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-in-up delay-300">
            <Link 
              to="/portfolio" 
              className="group px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium inline-flex items-center gap-2 hover:bg-lime-400 transition-colors"
            >
              Ver Proyectos
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-4 border border-lime-300 text-lime-300 rounded-lg font-medium hover:bg-lime-300/10 transition-colors"
            >
              Contactar
            </Link>
          </div>

          {/* Social Links */}
          <div className="animate-fade-in-up delay-400">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-zinc-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-zinc-500 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection 