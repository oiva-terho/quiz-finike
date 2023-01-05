import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from '../button/button.component';
import './nouser.styles.scss';

type NouserProps = {
  location: string;
};
export const Nouser = ({ location }: NouserProps) => {
  const { t } = useTranslation();
  return (
    <div className='nouser'>
      <h4>
        {t('nouser')}&nbsp;
        {location}
      </h4>
      <Link to='/sign-in'>
        <Button>{t('auth.signIn')}</Button>
      </Link>
    </div>
  );
};
