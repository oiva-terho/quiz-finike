import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/button/button.component';
import { selectCurrentUser } from '~/store/user/user.selector';
import { clearGame } from '~/store/game/game.action';
import { clearPhotos } from '~/store/gallery/gallery.action';
import { signOutStart } from '~/store/user/user.action';

import { ReactComponent as QuizLogo } from '~/assets/finike-quiz.svg';
import { ReactComponent as GamesLogo } from '~/assets/results.svg';
import { ReactComponent as GalleryLogo } from '~/assets/gallery.svg';
import { ReactComponent as AuthLogo } from '~/assets/auth.svg';

import './navigation.styles.scss';

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { t } = useTranslation('translation', { keyPrefix: 'navigation' });
  const signOutUser = () => dispatch(signOutStart());
  const windowWidth = document.documentElement.clientWidth;
  const goTo = (path: string) => {
    dispatch(clearGame());
    dispatch(clearPhotos());
    navigate(path);
  };
  return (
    <>
      <div className='navigation'>
        <button title='home' className='navigation__home' onClick={() => goTo('/')}>
          <QuizLogo />
        </button>
        <div className='navigation__links'>
          <Button onClick={() => goTo('/games')}>
            {windowWidth > 767 ? t('games') : <GamesLogo />}
          </Button>
          <Button onClick={() => goTo('/gallery')}>
            {windowWidth > 767 ? t('gallery') : <GalleryLogo />}
          </Button>
          {currentUser && currentUser.email !== 'me@mail.com' ? (
            <Button onClick={signOutUser}>{windowWidth > 767 ? t('signOut') : <AuthLogo />}</Button>
          ) : (
            <Button onClick={() => goTo('/sign-in')}>
              {windowWidth > 767 ? t('signIn') : <AuthLogo />}
            </Button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
