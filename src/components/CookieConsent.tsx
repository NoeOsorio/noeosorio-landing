import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GRID = 9;
const CELL = 30 / GRID;
const DOT = 2.6;
const CHIPS = new Set(['3,3', '5,4', '3,6']);

// 9x9 LED dots: a lit circle with a bite out of the top-right and three dark chips.
const cookieDots = Array.from({ length: GRID * GRID }, (_, i) => {
  const x = i % GRID;
  const y = Math.floor(i / GRID);
  const inCircle = Math.hypot(x - 4, y - 4) <= 4.3;
  const inBite = Math.hypot(x - 7.5, y - 0.5) <= 2.2;
  let fill = 'rgba(214,243,92,.08)';
  if (inCircle && !inBite) fill = CHIPS.has(`${x},${y}`) ? '#171714' : '#D6F35C';
  return { x, y, fill };
});

const CookieIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" className="shrink-0">
    {cookieDots.map((d) => (
      <rect
        key={`${d.x},${d.y}`}
        x={d.x * CELL + (CELL - DOT) / 2}
        y={d.y * CELL + (CELL - DOT) / 2}
        width={DOT}
        height={DOT}
        rx={0.7}
        fill={d.fill}
      />
    ))}
  </svg>
);

const EASE = [0.23, 1, 0.32, 1] as const;

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const reduceMotion = useReducedMotion();

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
    'h-[38px] flex-1 rounded-full border-0 bg-[rgba(244,238,228,.07)] text-[#F4EEE4] text-[14px] font-semibold ' +
    'transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] ' +
    'hover:bg-[rgba(214,243,92,.16)] active:scale-[.97] ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6F35C]';

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={reduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0.18, ease: EASE } }
              : { y: 8, opacity: 0, transition: { duration: 0.18, ease: EASE } }
          }
          transition={{ duration: 0.32, ease: EASE }}
          className="fixed z-50 bottom-[calc(12px+env(safe-area-inset-bottom))] left-3 right-3 sm:right-auto sm:left-5 sm:bottom-5 sm:w-[380px] rounded-[18px] bg-[#171714] px-4 pt-4 pb-[14px] font-['Geist',sans-serif]"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(214,243,92,.28), 0 24px 48px rgba(0,0,0,.5)',
          }}
        >
          <div className="flex items-center gap-3">
            <CookieIcon />
            <p className="m-0 text-[14.5px] font-medium leading-snug text-[#F4EEE4]">
              Analytics only if you say yes.{' '}
              <Link
                to="/privacy-policy"
                className="text-[rgba(244,238,228,.7)] underline underline-offset-[3px] hover:text-[#F4EEE4]"
              >
                Privacy
              </Link>
            </p>
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => choose('true')} className={buttonClass}>
              Accept
            </button>
            <button type="button" onClick={() => choose('false')} className={buttonClass}>
              Reject
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
