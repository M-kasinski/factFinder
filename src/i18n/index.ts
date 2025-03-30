import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Don't initialize on server-side
const isServer = typeof window === 'undefined';

if (!isServer && !i18n.isInitialized) {
  i18n
    // Chargement des traductions via HTTP
    // Voir /public/locales
    .use(Backend)
    // Détection de la langue utilisateur
    .use(LanguageDetector)
    // Passer l'instance i18n à react-i18next
    .use(initReactI18next)
    // Initialisation de i18next
    .init({
      fallbackLng: ['fr'],
      supportedLngs: ['fr', 'en', 'cimode'],
      debug: process.env.NODE_ENV === 'development',
      
      interpolation: {
        escapeValue: false, // Pas nécessaire pour React (React l'échappe par défaut)
      },
      
      // Options pour le chargement des ressources
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      
      // Namespaces par défaut
      defaultNS: 'common',
      ns: ['common', 'home'],
    });
}

export default i18n;
