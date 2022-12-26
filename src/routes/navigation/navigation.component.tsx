import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { Button } from '~/components/button/button.component';
import { clearGame } from '~/store/game/game.action';
import { signOutStart } from '~/store/user/user.action';

import { ReactComponent as QuizLogo } from '~/assets/finike-quiz.svg';
import { selectCurrentUser } from '~/store/user/user.selector';

import './navigation.styles.scss';
import { clearPhotos } from '~/store/gallery/gallery.action';

export const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const signOutUser = () => dispatch(signOutStart());
  const goTo = (path: string) => {
    dispatch(clearGame());
    dispatch(clearPhotos());
    navigate(path);
  };
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
          <Button onClick={() => goTo('/games')}>Games</Button>
          <Button onClick={() => goTo('/gallery')}>Gallery</Button>
          {currentUser ? (
            <Button onClick={signOutUser}>Sign Out</Button>
          ) : (
            <Button onClick={() => goTo('/sign-in')}>Sign In</Button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
