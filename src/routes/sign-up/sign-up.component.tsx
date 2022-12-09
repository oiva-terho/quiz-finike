import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { clearError, signUpStart } from '~/store/user/user.action';
import { selectCurrentUser, selectUserError } from '~/store/user/user.selector';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const SignUpForm = () => {
  const [regError, setRegError] = useState('');
  enum errMessage {
    short = 'Password should be 6 characters or longer',
    noMatch = 'Passwords do not match',
    exist = 'Cannot create user. Email already in use',
    else = 'Something went wrong. Try again later.',
  }

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const logError = useSelector(selectUserError);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

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

    dispatch(signUpStart(email, password));
    resetFormFields();
  };

  useEffect(() => {
    if (logError?.message === 'Firebase: Error (auth/email-already-in-use).') {
      setRegError(errMessage.exist);
      setTimeout(() => {
        dispatch(clearError());
        setRegError('');
      }, 6000);
    }
  }, [logError, errMessage, dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    setRegError('');
  };

  let checkUser = 'no user';
  if (currentUser?.teamName) {
    checkUser = 'has team';
  } else if (currentUser) {
    checkUser = 'no team';
  } else checkUser = 'no user';

  return (
    <div className='sign-in'>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={handleSubmit}>
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
      {checkUser === 'has team' && <Navigate to='/' />}
      {checkUser === 'no team' && <Navigate to='/add-team' />}
    </div>
  );
};
