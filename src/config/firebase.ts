import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const CONSENT_KEY = 'cookieConsent';

/** True only when the visitor pressed Accept on the consent banner. */
export const hasConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'true';
  } catch {
    return false;
  }
};

let analyticsInstance: Promise<Analytics | null> | null = null;

/** Analytics starts only after consent; before that nothing is loaded or measured. */
export const getAnalyticsIfAllowed = (): Promise<Analytics | null> => {
  if (!hasConsent()) return Promise.resolve(null);
  analyticsInstance ??= isSupported().then(yes => (yes ? getAnalytics(app) : null));
  return analyticsInstance;
}; 