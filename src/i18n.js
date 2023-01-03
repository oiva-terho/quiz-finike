import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLang: 'en',
    resources: {
      en: {
        translation: {
          games: 'Games',
          gallery: 'Gallery',
          signOut: 'Sign Out',
          signIn: 'Sign In',
        },
      },
      ru: {
        translation: {
          games: 'Игры',
          gallery: 'Галерея',
          signOut: 'Выйти',
          signIn: 'Войти',
        },
      },
    },
  });
