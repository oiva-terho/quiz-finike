import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '~/components/button/button.component';
import { signOutStart } from '~/store/user/user.action';

import { selectCurrentUser } from '../../store/user/user.selector';

import './navigation.styles.scss';

export const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const signOutUser = () => dispatch(signOutStart());
  console.log(currentUser);
  return (
    <>
      <div className='navigation'>
        <Link to='/'>
          <Button>Home</Button>
        </Link>
        <div>
          <Link to='/games'>
            <Button>Games</Button>
          </Link>
          <Link to='/photos'>
            <Button>Photos</Button>
          </Link>
          {currentUser ? (
            <Button onClick={signOutUser}>Sign Out</Button>
          ) : (
            <Link to='/sign-in'>
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
