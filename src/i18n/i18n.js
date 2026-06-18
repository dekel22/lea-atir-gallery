import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationHE from './locales/he.json';
import translationEN from './locales/en.json';

const resources = {
  he: {
    translation: translationHE
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he', // Always default to Hebrew on page load
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// Apply initial document direction and lang attribute
const applyLanguageDirection = (lng) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
};

// Apply on startup
applyLanguageDirection(i18n.language);

// Update document properties when language changes
i18n.on('languageChanged', (lng) => {
  applyLanguageDirection(lng);
});

export default i18n;
