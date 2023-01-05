import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          navigation: {
            games: 'Games',
            gallery: 'Gallery',
            signOut: 'Sign Out',
            signIn: 'Sign In',
          },
          hero: {
            1: 'Mind game for everyone',
            2: 'Warm-up for brain: 60 - 80 questions about everything',
            3: 'Reason to get together: more opinions - higher chances',
            4: 'Atmosphere of fun and friendly competition',
            finike: 'Finike',
            chat: 'Our chat',
          },
          games: {
            games: 'games',
            header: 'Game results',
            edit: 'Edit game',
            add: 'Add a game',
            watch: 'Watch photos',
            total: 'Total',
          },
          addGame: {
            header: 'Add a game',
            rounds: 'Rounds:',
            teams: 'Teams:',
            clear: 'Clear table',
            addToDB: 'Add game to DB',
            remove: 'Remove from DB',
            toGames: 'Return to games',
            ok: 'Ok',
            team: 'Team name',
            noDate: 'Choose date first',
            noTeams: 'Fill in teams results',
            noTeam: 'Fill team name',
            tooLarge: 'Too large score',
            teamsExists: 'Cannot change rounds quantity for existing game. Clear the table first',
            dataLoss: 'You will loose all filled data. Would you like to continue?',
          },
          gallery: {
            gallery: 'gallery',
            bonus: 'Bonus',
            noDate: 'Choose the date',
          },
          date: 'Date:',
          nouser: 'Sign in to watch the',
          auth: {
            header: 'Sign in',
            signIn: 'Sign in',
            signUp: 'Sign Up',
            create: 'Create account',
            google: 'Continue with',
            pass: 'Password',
            pass2: 'Confirm password',
            nouser: 'No user associated with this email',
            wrongPass: 'Incorrect password',
            short: 'Password should be 6 characters or longer',
            noMatch: 'Passwords do not match',
            exist: 'Cannot create user. Email already in use',
            else: 'Something went wrong. Try again later.',
            addTeam: 'Add your team name',
            teamName: 'Team name',
            wrongTeam: 'Unacceptable team name',
            add: 'Add',
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
          hero: {
            1: 'Интеллектуальная игра для каждого',
            2: 'Разминка для мозга: 60 - 80 вопросов обо всём',
            3: 'Повод собраться: больше мнений - выше шансы',
            4: 'Атмосфера веселья и дружеского соперничества',
            finike: 'Финике',
            chat: 'Наш чат',
          },
          games: {
            games: 'игр',
            header: 'Результаты игр',
            edit: 'Изменить игру',
            add: 'Добавить игру',
            watch: 'Смотреть фото',
            total: 'Всего',
          },
          addGame: {
            header: 'Добавить игру',
            rounds: 'Раунды:',
            teams: 'Команды:',
            clear: 'Очистить таблицу',
            addToDB: 'Сохранить',
            remove: 'Удалить',
            toGames: 'Вернуться к играм',
            ok: 'Да',
            team: 'Имя команды',
            noDate: 'Сначала выберите дату',
            noTeams: 'Добавьте команды и их результаты',
            noTeam: 'Заполните имя команды',
            tooLarge: 'Слишком большой результат',
            teamsExists:
              'Нельзя менять количество раундов у существующей игры. Сначала очиститие таблицу',
            dataLoss: 'Вы потеряете все заполненные данные. Готовы продолжить?',
          },
          gallery: {
            gallery: 'галереи',
            bonus: 'Бонус',
            noDate: 'Выберите дату',
          },
          date: 'Дата:',
          nouser: 'Войдите для просмотра',
          auth: {
            header: 'Вход',
            signIn: 'Войти',
            signUp: 'Зарегистрироваться',
            create: 'Создать аккаунт',
            google: 'Продолжить с',
            pass: 'Пароль',
            pass2: 'Подтвердите пароль',
            nouser: 'Не существует пользователя с таким email',
            wrongPass: 'Неправильный пароль',
            short: 'Пароль должен быть не короче 6 символов',
            noMatch: 'Пароли не совпадают',
            exist: 'Невможно создать пользователя. Email уже используется',
            else: 'Что-то пошло не так. Попробуйте позже.',
            addTeam: 'Введите имя вашей команды',
            teamName: 'Имя команды',
            wrongTeam: 'Недопустимое имя команды',
            add: 'Добавить',
          },
        },
      },
    },
  });
