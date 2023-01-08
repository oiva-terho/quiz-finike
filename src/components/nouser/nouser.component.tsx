import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, BUTTON_CLASSES } from '../button/button.component';
import './nouser.styles.scss';
import { useDispatch } from 'react-redux';
import { emailSignInStart } from '~/store/user/user.action';

type NouserProps = {
  location: string;
};
export const Nouser = ({ location }: NouserProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div className='nouser'>
      <h4>
        {t('nouser')}&nbsp;
        {location}
      </h4>
      <Link to='/sign-in'>
        <Button buttonType={BUTTON_CLASSES.apply}>{t('auth.signIn')}</Button>
      </Link>
      <span>{t('auth.or')}</span>
      <Button
        buttonType={BUTTON_CLASSES.watch}
        onClick={() => dispatch(emailSignInStart('me@mail.com', '123123'))}
      >
        {t('auth.justWatch')}
      </Button>
    </div>
  );
};
