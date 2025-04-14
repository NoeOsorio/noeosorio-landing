import { useState } from 'react';
import { HiCode, HiAcademicCap, HiLightningBolt, HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO'
import { trackEvent } from '../hooks/useAnalytics';
import { submitContactForm } from '../services/api';

const contactOptions = [
  {
    id: 'project',
    title: 'Proyecto',
    description: 'Tienes un proyecto en mente y quieres cotizarlo',
    icon: HiCode,
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'mentoring',
    title: 'Mentoría',
    description: 'Buscas guía personalizada para tu desarrollo',
    icon: HiAcademicCap,
    color: 'from-lime-500 to-emerald-500'
  },
  {
    id: 'work',
    title: 'Trabajo',
    description: 'Oportunidad laboral o colaboración',
    icon: HiLightningBolt,
    color: 'from-orange-500 to-red-500'
  }
];

interface FormFields {
  name: string;
  email: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
  experience?: string;
  mentorshipType?: string;
  availability?: string;
  position?: string;
  linkedin?: string;
}

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    message: '',
    company: '',
    budget: '',
    timeline: '',
    projectType: '',
    experience: '',
    mentorshipType: '',
    availability: '',
    position: '',
    linkedin: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getPlaceholderByType = () => {
    switch(selectedOption) {
      case 'project':
        return "Describe tu proyecto, objetivos principales, funcionalidades clave y cualquier otra información relevante...";
      case 'mentoring':
        return "Cuéntame sobre tu experiencia actual, tus objetivos de aprendizaje y en qué áreas específicas necesitas ayuda...";
      case 'work':
        return "Describe la oportunidad laboral, el rol, la empresa y cualquier detalle relevante sobre la posición...";
      default:
        return "Escribe tu mensaje aquí...";
    }
  };

  const handleOptionSelect = (optionId: string) => {
    trackEvent('contact_option_select', {
      option_type: optionId,
      source: 'contact_page'
    });
    setSelectedOption(optionId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (value && ['email', 'projectType', 'budget', 'timeline'].includes(id)) {
      trackEvent('form_field_complete', {
        field_name: id,
        contact_type: selectedOption
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        company: formData.company,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        experience: formData.experience,
        mentorshipType: formData.mentorshipType,
        availability: formData.availability,
        position: formData.position,
        linkedin: formData.linkedin,
      });

      await trackEvent('form_submit', {
        form_name: 'contact',
        contact_type: selectedOption,
        has_company: Boolean(formData.company),
        has_budget: Boolean(formData.budget),
        has_timeline: Boolean(formData.timeline),
        form_completion: calculateFormCompletion(),
        source: location.pathname
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
        budget: '',
        timeline: '',
        projectType: '',
        experience: '',
        mentorshipType: '',
        availability: '',
        position: '',
        linkedin: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el formulario');
    }
  };

  const handleSocialClick = (platform: string) => {
    trackEvent('social_click', {
      platform,
      source: 'contact_page'
    });
  };

  const handleScheduleClick = () => {
    trackEvent('schedule_meeting_click', {
      contact_type: selectedOption,
      source: 'contact_page'
    });
  };

  const calculateFormCompletion = (): number => {
    const requiredFields = ['name', 'email', 'message'];
    const optionalFields = {
      project: ['company', 'budget', 'timeline', 'projectType'],
      mentoring: ['experience', 'mentorshipType', 'availability'],
      work: ['position', 'company', 'linkedin']
    }[selectedOption] || [];

    const allFields = [...requiredFields, ...optionalFields];
    const completedFields = allFields.filter(field => Boolean(formData[field as keyof FormFields]));

    return Math.round((completedFields.length / allFields.length) * 100);
  };

  return (
    <>
      <SEO 
        title="Contacto | Noé Osorio"
        description="¿Listo para empezar tu proyecto? Contáctame para discutir cómo puedo ayudarte."
        image="https://noeosorio.com/contact-og.png"
        url="https://noeosorio.com/contact"
      />
      <div className="min-h-screen bg-zinc-900 py-24">
        <motion.div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-lime-300 rounded-full" />
              <p className="text-lime-300 font-medium">Contacto</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trabajemos Juntos
            </h1>
            <p className="text-xl text-zinc-400">
              Selecciona el motivo de contacto y cuéntame más sobre tu proyecto
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {contactOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(option.id)}
                className={`relative p-6 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 ${
                  selectedOption === option.id
                    ? 'bg-zinc-800/80 border-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.2)]'
                    : 'bg-zinc-800/50 border-transparent hover:border-zinc-700 hover:bg-zinc-800/80 hover:shadow-xl'
                }`}
              >
                <div 
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${option.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 transition-colors">
                  {option.title}
                </h3>
                <p className="text-zinc-400 text-sm transition-colors">
                  {option.description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-zinc-800/50 backdrop-blur-xl p-8 rounded-2xl"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                  focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                  hover:border-zinc-600 transition-all duration-300 text-white"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                  focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                  hover:border-zinc-600 transition-all duration-300 text-white"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {selectedOption === 'project' && (
                <>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-400 mb-2">
                      Empresa/Organización
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-zinc-400 mb-2">
                      Tipo de Proyecto
                    </label>
                    <select 
                      id="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                    >
                      <option value="">Selecciona el tipo</option>
                      <option value="web">Desarrollo Web</option>
                      <option value="mobile">App Móvil</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-zinc-400 mb-2">
                      Presupuesto Estimado
                    </label>
                    <select 
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="small">$1,000 - $5,000</option>
                      <option value="medium">$5,000 - $10,000</option>
                      <option value="large">$10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-zinc-400 mb-2">
                      Tiempo Estimado
                    </label>
                    <select 
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                    >
                      <option value="">Selecciona un plazo</option>
                      <option value="urgent">Menos de 1 mes</option>
                      <option value="normal">1-3 meses</option>
                      <option value="relaxed">3+ meses</option>
                    </select>
                  </div>
                </>
              )}

              {selectedOption === 'mentoring' && (
                <>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-zinc-400 mb-2">
                      Nivel de Experiencia
                    </label>
                    <select 
                      id="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                    >
                      <option value="">Selecciona tu nivel</option>
                      <option value="beginner">Principiante</option>
                      <option value="intermediate">Intermedio</option>
                      <option value="advanced">Avanzado</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mentorshipType" className="block text-sm font-medium text-zinc-400 mb-2">
                      Tipo de Mentoría
                    </label>
                    <select 
                      id="mentorshipType"
                      value={formData.mentorshipType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                    >
                      <option value="">Selecciona el tipo</option>
                      <option value="oneTime">Sesión Única</option>
                      <option value="monthly">Mentoría Mensual</option>
                      <option value="projectBased">Basada en Proyecto</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-zinc-400 mb-2">
                      Disponibilidad
                    </label>
                    <select 
                      id="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                    >
                      <option value="">Selecciona horario preferido</option>
                      <option value="morning">Mañanas</option>
                      <option value="afternoon">Tardes</option>
                      <option value="evening">Noches</option>
                      <option value="weekend">Fines de semana</option>
                    </select>
                  </div>
                </>
              )}

              {selectedOption === 'work' && (
                <>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-400 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-zinc-400 mb-2">
                      Posición
                    </label>
                    <input
                      type="text"
                      id="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                      placeholder="Título del puesto"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-zinc-400 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                      focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                      hover:border-zinc-600 transition-all duration-300 text-white"
                      placeholder="URL de LinkedIn"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                {selectedOption === 'project' ? 'Detalles del Proyecto' :
                 selectedOption === 'mentoring' ? 'Objetivos de Aprendizaje' :
                 selectedOption === 'work' ? 'Detalles de la Oportunidad' : 'Mensaje'}
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg 
                focus:outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 
                hover:border-zinc-600 transition-all duration-300 text-white resize-none"
                placeholder={getPlaceholderByType()}
                required
              />
            </div>

            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-500/10 p-4 rounded-lg mb-6"
              >
                {errorMessage}
              </motion.p>
            )}

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-lime-500/10 rounded-lg border-2 border-lime-500/20"
              >
                <div className="text-lime-400 text-4xl mb-4">🎯</div>
                <h4 className="text-lime-400 font-semibold mb-3">¡Mensaje enviado!</h4>
                <p className="text-lime-300/80">
                  Me pondré en contacto contigo pronto para discutir los detalles.
                </p>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(163,230,53,0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-lime-300 to-emerald-300 
                text-zinc-900 rounded-lg font-medium 
                hover:from-lime-400 hover:to-emerald-400 
                transition-all duration-300 shadow-lg 
                hover:shadow-lime-300/20
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </motion.button>
            )}
          </motion.form>

          {/* Additional Contact Info */}
          <div className="mt-16 text-center">
            <p className="text-zinc-400 mb-4">
              También puedes contactarme directamente en:
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:business@noeosorio.com"
              className="inline-block text-lime-300 hover:text-lime-400 
              transition-all duration-300 font-medium 
              hover:shadow-lg hover:shadow-lime-300/20"
            >
              business@noeosorio.com
            </motion.a>
          </div>

          {/* Información adicional personalizada */}
          <div className="mt-8 text-center">
            {selectedOption === 'project' && (
              <p className="text-zinc-400 text-sm mb-4">
                ¿Prefieres discutir los detalles en una llamada? Agenda una reunión inicial gratuita de 30 minutos.
              </p>
            )}
            {selectedOption === 'mentoring' && (
              <p className="text-zinc-400 text-sm mb-4">
                Las mentorías incluyen acceso a recursos exclusivos y seguimiento personalizado.
              </p>
            )}
            {selectedOption === 'work' && (
              <p className="text-zinc-400 text-sm mb-4">
                También puedes encontrar más información sobre mi experiencia en mi{' '}
                <a 
                  href="https://linkedin.com/in/noeosorioh" 
                  target="_blank"
                  onClick={() => handleSocialClick('linkedin')}
                  className="text-lime-300 hover:text-lime-400"
                >
                  perfil de LinkedIn
                </a>.
              </p>
            )}
          </div>

          {/* Calendario */}
          <div className="mt-16 text-center">
            <a
              href="https://calendly.com/noeosorio/tech-business-consultant"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleScheduleClick}
              className="group inline-flex items-center justify-center gap-3 w-auto px-8 py-3.5
                bg-gradient-to-r from-lime-300 to-emerald-300 
                text-zinc-900 rounded-lg font-medium relative overflow-hidden
                hover:from-lime-400 hover:to-emerald-400 
                transition-all duration-300 shadow-lg hover:shadow-lime-300/20"
            >
              <span className="relative z-10">Agendar Reunión</span>
              <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-400 
                transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact; 