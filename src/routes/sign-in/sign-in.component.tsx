import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { selectCurrentUser, selectUserError } from '~/store/user/user.selector';
import { clearError, emailSignInStart, googleSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
  password: '',
};

enum errMessage {
  email = 'Firebase: Error (auth/user-not-found).',
  pass = 'Firebase: Error (auth/wrong-password).',
}

export const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const currentUser = useSelector(selectCurrentUser);
  const logError = useSelector(selectUserError);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(emailSignInStart(email, password));
    resetFormFields();
    setTimeout(() => dispatch(clearError()), 6000);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label='Email'
          name='email'
          type='email'
          onChange={handleChange}
          value={email}
        />
        {logError?.message === errMessage.email && <span>No user associated with this email</span>}
        <FormInput
          required
          label='Password'
          name='password'
          type='password'
          onChange={handleChange}
          value={password}
        />
        {logError?.message === errMessage.pass && <span>Incorrect password</span>}
        <div>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
      <h2>Do not have an account?</h2>
      <Link to='/sign-up'>
        <Button>Sign Up</Button>
      </Link>
      {currentUser ? <Navigate to='/' /> : null}
    </div>
  );
};
