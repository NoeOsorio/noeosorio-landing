import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="p-8 bg-zinc-800/30 rounded-xl border border-zinc-700/50">
    <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
    <div className="text-lg leading-relaxed text-zinc-300 space-y-4">
      {children}
    </div>
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 ml-6">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2.5 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Política de Privacidad | Noé Osorio"
        description="Política de privacidad y uso de cookies. Conoce cómo protegemos y utilizamos tu información."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com/privacy-policy"
        type="website"
      />

      <div className="relative min-h-screen bg-zinc-900">
        <motion.div 
          {...fadeInUp}
          className="container mx-auto px-4 py-24"
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
                <div className="w-2 h-2 bg-lime-300 rounded-full" />
                <p className="text-lime-300 font-medium">Privacidad</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Política de Privacidad
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, 
                usamos y protegemos tu información.
              </p>
            </div>

            {/* Contenido */}
            <div className="space-y-8">
              <Section title="Información que Recopilamos">
                <p>Recopilamos la siguiente información:</p>
                <List items={[
                  'Información de contacto (nombre, email) cuando nos contactas',
                  'Datos de uso del sitio a través de cookies y analytics',
                  'Información técnica como tu dirección IP y tipo de navegador'
                ]} />
              </Section>

              <Section title="Uso de Cookies">
                <p>Utilizamos cookies para:</p>
                <List items={[
                  'Analizar el tráfico del sitio y su uso (Google Analytics)',
                  'Recordar tus preferencias y mejorar tu experiencia',
                  'Mantener la seguridad y el rendimiento del sitio'
                ]} />
              </Section>

              <Section title="Uso de la Información">
                <p>Utilizamos tu información para:</p>
                <List items={[
                  'Responder a tus consultas y solicitudes de manera eficiente',
                  'Mejorar continuamente nuestros servicios y experiencia de usuario',
                  'Enviar información relevante sobre nuestros servicios (con tu consentimiento)',
                  'Cumplir con nuestras obligaciones legales y proteger tus derechos'
                ]} />
              </Section>

              <Section title="Tus Derechos">
                <p>Como usuario, tienes derecho a:</p>
                <List items={[
                  'Acceder a tu información personal y conocer cómo la utilizamos',
                  'Solicitar la rectificación de datos incorrectos o desactualizados',
                  'Solicitar la eliminación de tus datos cuando ya no sean necesarios',
                  'Oponerte al procesamiento de tus datos para fines específicos',
                  'Retirar tu consentimiento en cualquier momento'
                ]} />
              </Section>

              <Section title="Contacto">
                <p className="mb-4">
                  Para cualquier consulta sobre esta política o el tratamiento de tus datos, 
                  puedes contactarme en:{' '}
                  <a 
                    href="mailto:business@noeosorio.com"
                    className="text-lime-300 hover:text-lime-400 underline"
                  >
                    business@noeosorio.com
                  </a>
                </p>
                <p>
                  Me comprometo a responder a tus solicitudes en un plazo máximo de 72 horas hábiles.
                </p>
              </Section>

              <Section title="Actualizaciones">
                <p>
                  Esta política puede ser actualizada ocasionalmente para reflejar cambios en nuestras 
                  prácticas o requisitos legales. La última actualización fue realizada el 14 de marzo de 2024.
                </p>
              </Section>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 