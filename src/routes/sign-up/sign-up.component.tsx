import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { signUpStart } from '~/store/user/user.action';
import { selectCurrentUser } from '~/store/user/user.selector';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [regError, setRegError] = useState('');
  const errMessage = {
    short: 'Password should be 6 characters or longer',
    noMatch: 'Passwords do not match',
    exist: 'Cannot create user. Email already in use',
    else: 'Something went wrong. Try again later.',
  };

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 6) {
      setRegError(errMessage.short);
      return;
    } else if (password !== confirmPassword) {
      setRegError(errMessage.noMatch);
      return;
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      setRegError(
        (error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS
          ? errMessage.exist
          : errMessage.else,
      );
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    setRegError('');
  };

  return (
    <div>
      <h2>Do not have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Team Name'
          required
          name='displayName'
          type='text'
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label='Email'
          required
          name='email'
          type='email'
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label='Password'
          required
          name='password'
          type='password'
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label='Confirm password'
          required
          name='confirmPassword'
          type='password'
          onChange={handleChange}
          value={confirmPassword}
        />
        {regError !== null && <span>{regError}</span>}
        <Button type='submit'>Sign Up</Button>
      </form>
      {currentUser ? <Navigate to='/' /> : null}
    </div>
  );
};
