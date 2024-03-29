import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { Spinner } from '~/components/spinner/spinner.component';
import { clearError, signOutStart, signUpStart } from '~/store/user/user.action';
import { selectCurrentUser, selectUserError, selectUserLoading } from '~/store/user/user.selector';
import { AddTeamName } from '~/components/add-team-name/add-team-name.component';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [regError, setRegError] = useState('');

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const logError = useSelector(selectUserError);
  const onLoading = useSelector(selectUserLoading);
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  if (currentUser?.email === 'me@mail.com') dispatch(signOutStart());

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 6) {
      setRegError(() => t('short'));
      return;
    } else if (password !== confirmPassword) {
      setRegError(() => t('noMatch'));
      return;
    }

    dispatch(signUpStart(email, password));
    resetFormFields();
  };

  useEffect(() => {
    if (logError?.message === 'Firebase: Error (auth/email-already-in-use).') {
      setRegError(() => t('exist'));
      setTimeout(() => {
        dispatch(clearError());
        setRegError('');
      }, 6000);
    }
  }, [logError, t, dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    setRegError('');
  };

  const checkUser = (function () {
    if (currentUser?.teamName) return 'has team';
    if (currentUser) return 'no team';
    return;
  })();

  return (
    <div className='sign-in'>
      {onLoading ? (
        <Spinner />
      ) : (
        <div className='sign-in__wrapper'>
          {checkUser === 'has team' && <Navigate to='/' />}

          {checkUser === 'no team' ? (
            <>
              <h2>{t('add-team')}</h2>
              <AddTeamName />
            </>
          ) : (
            <>
              <h2>{t('create')}</h2>
              <form onSubmit={handleSubmit}>
                <FormInput
                  label='Email'
                  required
                  name='email'
                  type='email'
                  autoCapitalize='off'
                  onChange={handleChange}
                  value={email}
                />
                <FormInput
                  label={t('pass')}
                  required
                  name='password'
                  type='password'
                  onChange={handleChange}
                  value={password}
                />
                <FormInput
                  label={t('pass2')}
                  required
                  name='confirmPassword'
                  type='password'
                  onChange={handleChange}
                  value={confirmPassword}
                />
                {regError !== null && <span>{regError}</span>}
                <Button type='submit'>{t('signUp')}</Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
