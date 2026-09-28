import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../../../../public/locales/en/translation.json';
import enMain from '../../../../public/locales/en/main.json';
import enPlaces from '../../../../public/locales/en/places.json';
import ruTranslation from '../../../../public/locales/ru/translation.json';
import ruMain from '../../../../public/locales/ru/main.json';
import ruPlaces from '../../../../public/locales/ru/places.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: enTranslation, main: enMain, places: enPlaces },
      ru: { translation: ruTranslation, main: ruMain, places: ruPlaces }
    },
    debug: __IS_DEV__,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    }
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
