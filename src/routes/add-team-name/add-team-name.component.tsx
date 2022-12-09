import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { addTeamName } from '~/store/user/user.action';
import { selectCurrentUser } from '~/store/user/user.selector';

export const AddTeamName = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [teamName, setTeamName] = useState('');

  if (!currentUser) return <Navigate to='/' />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTeamName(teamName));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamName(value);
  };

  return (
    <div className='sign-in'>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label='Team name'
          name='teamName'
          type='teamName'
          onChange={handleChange}
          value={teamName}
        />
        {teamName.toLocaleLowerCase() === 'admin' ? (
          <h2>Unacceptable team name</h2>
        ) : (
          <Button type='submit' buttonType={BUTTON_CLASSES.apply}>
            Enter
          </Button>
        )}
      </form>
      {currentUser?.teamName && <Navigate to='/' />}
    </div>
  );
};
