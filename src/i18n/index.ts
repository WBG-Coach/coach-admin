import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './langs/en';
import kriTranslation from './langs/kri';
import npTranslation from './langs/np';

export const resources: {
  [lang: string]: { translation: any; label: string };
} = {
  en: { translation: enTranslation, label: 'English' },
  np: { translation: npTranslation, label: 'Nepali' },
  kri: { translation: kriTranslation, label: 'Krio' },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: import.meta.env.VITE_COUNTRY === 'np' ? 'np' : 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
