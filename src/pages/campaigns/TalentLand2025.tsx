import { motion } from 'framer-motion';
import LeadForm from '../../components/LeadForm';

const TalentLand2025 = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,204,22,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05),transparent_50%)]" />
      
      {/* Content */}
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-20 pb-16 px-4"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-6">
            ¡Solo 5 lugares disponibles!
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl mx-auto">
            Revoluciona tu Empresa en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
              Talent Land 2025
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Obtén una consultoría estratégica valorada en <span className="line-through text-zinc-400">$5,000 MXN</span>{' '}
            <span className="text-emerald-400 font-bold">¡GRATIS!</span>
          </p>
        </motion.div>

        <div className="w-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Transforma tu Negocio con Tecnología de Vanguardia
              </h2>
              <p className="text-zinc-300 text-lg">
                No pierdas la oportunidad de obtener una consultoría exclusiva que normalmente 
                está reservada para grandes empresas.
              </p>
            </div>

            <ul className="space-y-6 text-lg">
              <motion.li 
                className="flex items-start gap-4 text-zinc-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl">💰</span>
                <span>Reduce hasta un <span className="text-emerald-400 font-semibold">40%</span> tus costos operativos con automatización inteligente</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-4 text-zinc-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl">🚀</span>
                <span>Multiplica tu productividad <span className="text-emerald-400 font-semibold">x3</span> con soluciones digitales personalizadas</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-4 text-zinc-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl">🎯</span>
                <span>Supera a tu competencia con estrategias tecnológicas <span className="text-emerald-400 font-semibold">comprobadas</span></span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-4 text-zinc-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl">🔒</span>
                <span>Asegura el futuro de tu empresa con tecnologías emergentes de <span className="text-emerald-400 font-semibold">última generación</span></span>
              </motion.li>
            </ul>

            <div className="mt-12 space-y-6 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent rounded-2xl p-8 border border-red-500/10">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">⚡</span> ¡Oferta Especial Talent Land!
              </h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <span className="text-red-400 text-xl">→</span>
                  <span className="text-zinc-300">
                    Valor real: <span className="line-through text-zinc-400">$5,000 MXN</span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">→</span>
                  <span className="text-zinc-300">
                    Tu inversión: <span className="text-emerald-400 font-bold">$0 MXN</span>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-emerald-400 text-xl">→</span>
                  <span className="text-zinc-300">
                    <span className="text-emerald-400 font-bold">60 minutos</span> de consultoría estratégica personalizada
                  </span>
                </li>
                <li className="flex items-center gap-3 text-red-400 font-semibold">
                  <span className="text-xl">🔥</span>
                  <span>¡Solo 5 lugares disponibles!</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-8"
          >
            <div className="bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-transparent p-px rounded-2xl">
              <LeadForm 
                campaignId="talent-land-2025"
                description="¡Aprovecha esta oportunidad única! Agenda tu consultoría estratégica valorada en $5,000 MXN totalmente GRATIS"
                buttonText="¡Quiero mi consultoría GRATIS! 🚀"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 p-4 bg-red-500/10 rounded-lg border border-red-500/20"
            >
              <p className="text-center text-red-400 text-sm font-medium">
                ⚠️ Debido a la alta demanda, solo podemos garantizar 5 lugares. ¡Asegura el tuyo ahora!
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4 pb-20"
        >
          <p className="text-zinc-400 text-lg">
            * Oferta exclusiva para empresas participantes en Talent Land 2025
          </p>
          <p className="text-emerald-400/80 font-medium">
            No dejes pasar esta oportunidad única de transformar tu negocio
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TalentLand2025; 