import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../config/firebase';
import { logEvent } from 'firebase/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      const analyticsInstance = await analytics;
      if (analyticsInstance) {
        logEvent(analyticsInstance, 'page_view', {
          page_path: location.pathname,
          page_title: document.title
        });
      }
    };

    trackPageView();
  }, [location]);
};

export const trackEvent = async (
  eventName: string, 
  params?: Record<string, string | number | boolean>
) => {
  const analyticsInstance = await analytics;
  if (analyticsInstance) {
    logEvent(analyticsInstance, eventName, params);
  }
}; 