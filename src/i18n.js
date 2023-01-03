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
          navigation: {
            games: 'Games',
            gallery: 'Gallery',
            signOut: 'Sign Out',
            signIn: 'Sign In',
          },
          heroText: {
            1: 'Mind game for everyone',
            2: 'Warm-up for brain: 60 - 80 questions about everything',
            3: 'Reason to get together: more opinions - higher chances',
            4: 'Atmosphere of fun and friendly competition',
            finike: 'Finike',
            chat: 'Our chat',
          },
        },
      },
      ru: {
        translation: {
          navigation: {
            games: 'Игры',
            gallery: 'Галерея',
            signOut: 'Выйти',
            signIn: 'Войти',
          },
          heroText: {
            1: 'Интеллектуальная игра для каждого',
            2: 'Разминка для мозга: 60 - 80 вопросов обо всём',
            3: 'Повод собраться: больше мнений - выше шансы',
            4: 'Атмосфера веселья и дружеского соперничества',
            finike: 'Финике',
            chat: 'Наш чат',
          },
        },
      },
    },
  });
