import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookieConsent')) {
        setShowConsent(true);
      }
    } catch {
      setShowConsent(true);
    }
    // The footer's "Cookie settings" reopens the banner.
    const reopen = () => setShowConsent(true);
    window.addEventListener('cookie-settings', reopen);
    return () => window.removeEventListener('cookie-settings', reopen);
  }, []);

  const choose = (value: 'true' | 'false') => {
    try {
      localStorage.setItem('cookieConsent', value);
    } catch {
      // storage unavailable, the banner just hides for this visit
    }
    setShowConsent(false);
  };

  const buttonClass =
    'px-6 py-2 rounded-lg font-medium transition-colors bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700';

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-900 border-t border-zinc-800"
        >
          <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-sm">
              I use analytics to see which pages are useful. Nothing is measured unless you accept.{' '}
              <Link
                to="/privacy-policy"
                className="text-lime-300 hover:text-lime-400 underline"
              >
                Privacy
              </Link>
            </p>
            <div className="flex gap-3 shrink-0">
              <button type="button" onClick={() => choose('true')} className={buttonClass}>
                Accept
              </button>
              <button type="button" onClick={() => choose('false')} className={buttonClass}>
                Reject
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
