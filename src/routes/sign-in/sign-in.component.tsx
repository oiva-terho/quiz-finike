import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { selectCurrentUser, selectUserError, selectUserLoading } from '~/store/user/user.selector';
import { clearError, emailSignInStart, googleSignInStart } from '../../store/user/user.action';
import { Spinner } from '~/components/spinner/spinner.component';

import { ReactComponent as GLogo } from '~/assets/google.svg';
import './sign-in.styles.scss';

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
  const navigate = useNavigate();
  const onLoading = useSelector(selectUserLoading);
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const goTo = (path: string) => navigate(path);

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

  const checkUser = (function () {
    if (currentUser?.teamName) {
      return 'has team';
    } else if (currentUser) {
      return 'no team';
    } else return 'no user';
  })();

  return (
    <div className='sign-in'>
      {onLoading ? (
        <Spinner />
      ) : (
        <div className='sign-in__wrapper'>
          <h3>{t('header')}</h3>
          <form onSubmit={handleSubmit}>
            <FormInput
              required
              label='Email'
              name='email'
              type='email'
              onChange={handleChange}
              value={email}
            />
            {logError?.message === errMessage.email && <span>{t('nouser')}</span>}
            <FormInput
              required
              label={t('pass')}
              name='password'
              type='password'
              onChange={handleChange}
              value={password}
            />
            {logError?.message === errMessage.pass && <span>{t('wrongPass')}</span>}
            <div className='sign-in__buttons'>
              <Button
                type='button'
                buttonType={BUTTON_CLASSES.auth}
                onClick={() => goTo('/sign-up')}
              >
                {t('create')}
              </Button>
              <Button type='submit' buttonType={BUTTON_CLASSES.apply}>
                {t('signIn')}
              </Button>
            </div>
          </form>
          <div className='sign-in__google'>
            <Button type='button' buttonType={BUTTON_CLASSES.auth} onClick={signInWithGoogle}>
              <span>{t('google')}&nbsp;</span>
              <GLogo />
            </Button>
          </div>
          {checkUser === 'has team' && <Navigate to='/' />}
          {checkUser === 'no team' && <Navigate to='/add-team' />}
        </div>
      )}
    </div>
  );
};
