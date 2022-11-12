import { Link } from 'react-router-dom';
import { Button } from '~/components/button/button.component';

export const SignInForm = () => {
  return (
    <div>
      SignInForm
      <br />
      <Link to='/sign-up'>
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
};
