import { Outlet, Link } from 'react-router-dom';
import { Button } from '~/components/button/button.component';
import './navigation.styles.scss';

export const Navigation = () => {
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
          <Link to='/sign-in'>
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
