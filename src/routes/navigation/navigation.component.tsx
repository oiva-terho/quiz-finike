import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/button/button.component';
import { clearGame } from '~/store/game/game.action';
import { signOutStart } from '~/store/user/user.action';

import { ReactComponent as QuizLogo } from '/public/finike-quiz.svg';
import { selectCurrentUser } from '~/store/user/user.selector';

import './navigation.styles.scss';

const langs = ['en', 'ru'];

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { t, i18n } = useTranslation();
  const signOutUser = () => dispatch(signOutStart());
  const goTo = (path: string) => navigate(path);

  return (
    <>
      <div className='navigation'>
        <Button title='home' className='navigation__home' onClick={() => goTo('/')}>
          <QuizLogo />
        </Button>
        <div className='navigation__team'>
          {currentUser ? <span>{currentUser.teamName}</span> : null}
        </div>
        <div className='navigation__links'>
          <Button
            onClick={() => {
              dispatch(clearGame());
              goTo('/games');
            }}
          >
            {t('games')}
          </Button>
          <Button onClick={() => goTo('/gallery')}>{t('gallery')}</Button>
          {currentUser ? (
            <Button onClick={signOutUser}>{t('signOut')}</Button>
          ) : (
            <Button onClick={() => goTo('/sign-in')}>{t('signIn')}</Button>
          )}
          {langs.map((lang) => (
            <button
              type='submit'
              key={lang}
              onClick={() => {
                i18n.changeLanguage(lang);
              }}
              disabled={i18n.resolvedLanguage === lang}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};
