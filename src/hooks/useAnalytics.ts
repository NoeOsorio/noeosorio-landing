import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Analytics only exists after the visitor accepted cookies. The measuring code is a large chunk,
// so it is fetched only then, and never on the first paint of a page.
const hasConsent = () => {
  try {
    return localStorage.getItem('cookieConsent') === 'true';
  } catch {
    return false;
  }
};

const send = async (eventName: string, params?: Record<string, string | number | boolean>) => {
  if (!hasConsent()) return;
  const [{ getAnalyticsIfAllowed }, { logEvent }] = await Promise.all([
    import('../config/firebase'),
    import('firebase/analytics'),
  ]);
  const analyticsInstance = await getAnalyticsIfAllowed();
  if (analyticsInstance) logEvent(analyticsInstance, eventName, params);
};

const whenIdle = (fn: () => void) => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(fn);
  else setTimeout(fn, 2000);
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!hasConsent()) return;
    whenIdle(() => {
      void send('page_view', { page_path: location.pathname, page_title: document.title });
    });
  }, [location]);
};

export const trackEvent = async (eventName: string, params?: Record<string, string | number | boolean>) => {
  await send(eventName, params);
};
