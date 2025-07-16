import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { trackEvent } from '../hooks/useAnalytics';
import { HiArrowRight, HiCalendar, HiMail } from 'react-icons/hi';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const contactChannels = [
  {
    id: 'calendly',
    title: 'Agendar Videollamada',
    subtitle: 'Sesión Estratégica',
    description: 'Agenda una llamada de 30 minutos para discutir tu proyecto o mentoría',
    icon: HiCalendar,
    color: 'from-purple-500 to-blue-500',
    bgAccent: 'bg-blue-500/5',
    action: "https://calendly.com/noeosorio/tech-business-consultant",
    primary: true
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Perfil Profesional',
    description: 'Conéctate para oportunidades laborales y networking profesional',
    icon: FaLinkedin,
    color: 'from-lime-500 to-emerald-500',
    bgAccent: 'bg-emerald-500/5',
    action: 'https://linkedin.com/in/noeosorioh',
    primary: true
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Contenido & Updates',
    description: 'Sígueme para contenido sobre desarrollo, tech tips y actualizaciones',
    icon: FaInstagram,
    color: 'from-pink-500 to-rose-500',
    bgAccent: 'bg-rose-500/5',
    action: 'https://instagram.com/noeosorio.dev',
    primary: false
  },
  {
    id: 'email-business',
    title: 'Email Corporativo',
    subtitle: 'Proyectos & Negocios',
    description: 'Contáctame para propuestas de proyectos y colaboraciones empresariales',
    icon: HiMail,
    color: 'from-orange-500 to-red-500',
    bgAccent: 'bg-red-500/5',
    action: 'mailto:business@noeosorio.com',
    primary: false
  }
];

const Contact = () => {
  const [isHovering, setIsHovering] = useState('');

  const handleChannelClick = (channelId: string) => {
    trackEvent('contact_channel_click', {
      channel: channelId,
      source: 'contact_page'
    });
  };

  return (
    <>
      <SEO 
        title="Contacto | Noé Osorio"
        description="¿Listo para empezar? Elige el canal que mejor se adapte a tus necesidades."
        image="https://noeosorio.com/contact-og.png"
        url="https://noeosorio.com/contact"
      />
      <div className="min-h-screen bg-zinc-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-lime-500/10 via-zinc-900 to-zinc-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-zinc-900 to-zinc-900" />
          <div 
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(148 163 184 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(148 163 184 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '4rem 4rem'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative min-h-screen flex flex-col justify-center py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-300/10 to-emerald-300/10 backdrop-blur-sm rounded-full mb-8 border border-lime-300/20"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-lime-300 to-emerald-300 rounded-full" />
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300 font-medium">
                Elige tu Canal Preferido
              </p>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-8"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-400">
                Conectemos
              </span>
            </motion.h1>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
            {contactChannels.map((channel, index) => (
              <motion.a
                key={channel.id}
                href={channel.action}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleChannelClick(channel.id)}
                onMouseEnter={() => setIsHovering(channel.id)}
                onMouseLeave={() => setIsHovering('')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-1 rounded-3xl transition-all duration-500 ${channel.bgAccent}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 bg-zinc-900/90 rounded-[22px] backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${channel.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <channel.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-zinc-400 mb-1">
                            {channel.subtitle}
                          </p>
                          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-500">
                            {channel.title}
                          </h3>
                        </div>
                        <HiArrowRight className={`w-6 h-6 transform transition-transform duration-500 ${
                          isHovering === channel.id ? 'translate-x-1' : ''
                        } text-white group-hover:text-lime-300`} />
                      </div>
                      <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-500">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-zinc-400">
              Horario de respuesta: Lunes a Viernes, 9:00 AM - 6:00 PM (GMT-6)
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact; 