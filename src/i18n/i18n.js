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

// Check localStorage for preferred language, fallback to 'he'
const savedLanguage = localStorage.getItem('i18nextLng') || 'he';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'he',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

// Apply initial document direction and lang attribute
const applyLanguageDirection = (lng) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  localStorage.setItem('i18nextLng', lng);
};

// Apply on startup
applyLanguageDirection(i18n.language);

// Update document properties when language changes
i18n.on('languageChanged', (lng) => {
  applyLanguageDirection(lng);
});

export default i18n;
