import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { selectCurrentUser } from '~/store/user/user.selector';
import { googleSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const currentUser = useSelector(selectCurrentUser);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit', email, password);
    resetFormFields();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label='Email'
          name='email'
          type='email'
          onChange={handleChange}
          value={email}
        />
        <FormInput
          required
          label='Password'
          name='password'
          type='password'
          onChange={handleChange}
          value={password}
        />
        <div>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
      <Link to='/sign-up'>
        <Button>Sign Up</Button>
      </Link>
      {currentUser ? <Navigate to='/' /> : null}
    </div>
  );
};
