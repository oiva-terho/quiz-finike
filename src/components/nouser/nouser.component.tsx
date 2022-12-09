import { Link } from 'react-router-dom';
import { Button } from '../button/button.component';
import './nouser.styles.scss';

type NouserProps = {
  location: string;
};
export const Nouser = ({ location }: NouserProps) => (
  <div className='nouser'>
    <h4>Sign in to watch the {location}</h4>
    <Link to='/sign-in'>
      <Button>Sign in</Button>
    </Link>
  </div>
);
