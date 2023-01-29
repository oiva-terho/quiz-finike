import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { addTeamName } from '~/store/user/user.action';
import { selectCurrentUser } from '~/store/user/user.selector';

export const AddTeamName = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [teamName, setTeamName] = useState(currentUser?.teamName);
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  if (!currentUser) return <Navigate to='/' />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (teamName) dispatch(addTeamName(teamName));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamName(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        required
        label={t('teamName')}
        name='team-name'
        type='text'
        onChange={handleChange}
        value={teamName}
      />
      {teamName && teamName.toLocaleLowerCase() === 'admin' ? (
        <span>{t('wrongTeam')}</span>
      ) : (
        <Button type='submit' buttonType={BUTTON_CLASSES.apply}>
          {t('add')}
        </Button>
      )}
    </form>
  );
};
