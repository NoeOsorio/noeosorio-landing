import { useState } from 'react';
import { motion } from 'framer-motion';

interface LeadFormProps {
  campaignId: string;
  onSuccess?: () => void;
  buttonText?: string;
  description?: string;
}

const LeadForm = ({ 
  campaignId, 
  onSuccess, 
  buttonText = "Agendar consultoría",
  description = "Déjanos tus datos y nos pondremos en contacto contigo"
}: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // TODO: Integrar con tu sistema de leads (Firebase, API, etc)
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          campaignId,
          source: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Error al enviar el formulario');
      
      setStatus('success');
      setFormData({ name: '', email: '', company: '', role: '' });
      onSuccess?.();
    } catch {
      setStatus('error');
      setErrorMessage('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto px-8 py-10 bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900
        border border-lime-900/50 shadow-[0_0_45px_-5px_rgba(132,204,22,0.15)] rounded-xl backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold text-white">¡Agenda tu Consultoría!</h3>
          <p className="text-zinc-300 px-4">{description}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-lime-300">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              required
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-lime-300">
              Correo empresarial
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@tuempresa.com"
              required
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium text-lime-300">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              required
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={status === 'loading'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-lime-300">
              Cargo
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Director / Gerente / etc."
              required
              className="w-full px-5 py-3.5 rounded-lg bg-zinc-800/80 text-white placeholder-zinc-500
                border-2 border-zinc-700 focus:outline-none focus:border-lime-500 hover:border-lime-600/50
                transition-all duration-200"
              disabled={status === 'loading'}
            />
          </div>
        </div>

        {status === 'error' && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm bg-red-500/10 p-4 rounded-lg"
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
            <h4 className="text-lime-400 font-semibold mb-3">¡Excelente decisión!</h4>
            <p className="text-lime-300/80">
              Nos pondremos en contacto contigo pronto para agendar tu consultoría estratégica.
            </p>
          </motion.div>
        ) : (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-4 text-white bg-gradient-to-r from-lime-500 to-lime-600
              rounded-lg font-semibold hover:from-lime-400 hover:to-lime-500
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
              transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {status === 'loading' ? 'Enviando...' : buttonText}
          </button>
        )}

        <p className="text-center text-zinc-400 text-sm px-4">
          Tus datos están seguros. Solo los utilizaremos para contactarte sobre la consultoría.
        </p>
      </form>
    </motion.div>
  );
};

export default LeadForm;