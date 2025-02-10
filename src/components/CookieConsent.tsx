import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800"
        >
          <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-zinc-400 text-sm">
              <p>
                Este sitio utiliza cookies para mejorar tu experiencia. Al continuar navegando, 
                aceptas nuestra{' '}
                <a 
                  href="/privacy-policy" 
                  className="text-lime-300 hover:text-lime-400 underline"
                >
                  política de privacidad
                </a>
                {' '}y el uso de cookies.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-lime-300 hover:bg-lime-400 text-zinc-900 rounded-lg font-medium transition-colors"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 