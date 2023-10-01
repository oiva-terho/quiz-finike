import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/button/button.component';

import { ReactComponent as QuizLogo } from '~/assets/finike-quiz.svg';
import { ReactComponent as MyResultsLogo } from '~/assets/my-results.svg';
import { ReactComponent as GamesLogo } from '~/assets/games.svg';
import { ReactComponent as GalleryLogo } from '~/assets/gallery.svg';

import './navigation.styles.scss';

export const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'navigation' });
  const windowWidth = document.documentElement.clientWidth;
  const goTo = (path: string) => {
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
          <Button onClick={() => goTo('/statistics')}>
            {windowWidth > 767 ? t('stat') : <MyResultsLogo />}
          </Button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
