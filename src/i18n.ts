import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    resources: {
      en: {
        translation: {
          navigation: {
            games: 'Games',
            gallery: 'Gallery',
            signOut: 'Sign Out',
            signIn: 'Sign In',
            stat: 'My results',
          },
          hero: {
            1: 'Mind game for everyone',
            2: 'Warm-up for brain: 60 - 80 questions about everything',
            3: 'Reason to get together: more opinions - higher chances',
            4: 'Atmosphere of fun and friendly competition',
            finike: 'Finike',
            chat: 'Our chat',
          },
          announcement: {
            nextGame: 'Next game:',
            nogame: 'Sorry...<br>no game planned',
            cost: 'Cost of participation',
            play: 'I want to play!',
            weekdays: {
              0: 'Sunday',
              1: 'Monday',
              2: 'Tuesday',
              3: 'Wednesday',
              4: 'Thursday',
              5: 'Friday',
              6: 'Saturday',
            },
            months: {
              0: 'January',
              1: 'February',
              2: 'March',
              3: 'April',
              4: 'May',
              5: 'June',
              6: 'July',
              7: 'August',
              8: 'September',
              9: 'October',
              10: 'November',
              11: 'December',
            },
          },
          games: {
            games: 'games',
            header: 'Game results',
            edit: 'Edit game',
            add: 'Add a game',
            watch: 'Watch photos',
            total: 'Total',
            select: 'Select date',
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
            tooMuchTeams: 'Too much teams',
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
            justWatch: 'I just want to watch',
            or: 'or',
          },
          statistics: {
            months: {
              '01': 'Jan',
              '02': 'Feb',
              '03': 'Mar',
              '04': 'Apr',
              '05': 'May',
              '06': 'Jun',
              '07': 'Jul',
              '08': 'Aug',
              '09': 'Sep',
              '10': 'Oct',
              '11': 'Nov',
              '12': 'Dec',
            },
            signIn: 'Sign-in',
            signInReason: "to see your teams' statistic first",
            compare: 'Select a team',
            noTeam: 'There is no such team',
            justWatch: 'Introductory viewing',
            team: 'Team',
            games: 'Games',
            gamesDescr: 'Total number of played games',
            score: 'Score',
            scoreDescr: 'Sum of scores of all games',
            rating: 'Rating',
            ratingDescr:
              "Average position in game results if 1st place's is 100% and last place's score is 0%",
            top3: 'Top 3 places',
            best: 'Best game',
            rival: 'Best rival',
            rivals: 'Best rivals',
            streak: 'Streak',
            current: 'Current',
            longest: 'Longest',
            leaderboard: 'Leaderboard',
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
            stat: 'Мои результаты',
          },
          hero: {
            1: 'Интеллектуальная игра для каждого',
            2: 'Разминка для мозга: 60 - 80 вопросов обо всём',
            3: 'Повод собраться: больше мнений - выше шансы',
            4: 'Атмосфера веселья и дружеского соперничества',
            finike: 'Финике',
            chat: 'Наш чат',
          },
          announcement: {
            nextGame: 'Следующая игра:',
            nogame: 'Простите...<br>игр больше не планируется',
            cost: 'Стоимость участия',
            play: 'Запишите меня!',
            weekdays: {
              0: 'Воскресенье',
              1: 'Понедельник',
              2: 'Вторник',
              3: 'Среда',
              4: 'Четверг',
              5: 'Пятница',
              6: 'Суббота',
            },
            months: {
              0: 'Января',
              1: 'Февраля',
              2: 'Марта',
              3: 'Апреля',
              4: 'Мая',
              5: 'Июня',
              6: 'Июля',
              7: 'Августа',
              8: 'Сентября',
              9: 'Октября',
              10: 'Ноября',
              11: 'Декабря',
            },
          },
          games: {
            games: 'игр',
            header: 'Результаты игр',
            edit: 'Изменить игру',
            add: 'Добавить игру',
            watch: 'Смотреть фото',
            total: 'Всего',
            select: 'Выберите дату',
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
            tooMuchTeams: ' Слишком много команд',
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
            justWatch: 'Я только посмотреть',
            or: 'либо',
          },
          statistics: {
            months: {
              '01': 'Янв',
              '02': 'Фев',
              '03': 'Мар',
              '04': 'Апр',
              '05': 'Май',
              '06': 'Июн',
              '07': 'Июл',
              '08': 'Авг',
              '09': 'Сен',
              '10': 'Окт',
              '11': 'Ноя',
              '12': 'Дек',
            },
            signIn: 'Войти',
            signInReason: 'чтобы видеть статистику своей команды первой',
            compare: 'Выберите команду',
            noTeam: 'Такой команды нет',
            justWatch: 'Ознакомительный просмотр',
            team: 'Команда',
            games: 'Игры',
            gamesDescr: 'Общее количество сыгранных квизов',
            score: 'Счет',
            scoreDescr: 'Сумма результатов за все игры',
            rating: 'Рейтинг',
            ratingDescr:
              'Средняя позиция результата команды в итогах, где 1е место - 100%, последнее место 0%',
            top3: 'Топ 3 места',
            best: 'Лучшая игра',
            rival: 'Лучший соперник',
            rivals: 'Лучшие соперники',
            streak: 'Серия игр',
            current: 'Текущая',
            longest: 'Рекорд',
            leaderboard: 'Доска почета',
          },
        },
      },
    },
  });
