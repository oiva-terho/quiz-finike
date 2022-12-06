import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddTeam } from '~/components/add-team/add-team.component';
import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { addDate, addTeam } from '~/store/game/game.action';
import { selectGameDate, selectGameTeams } from '~/store/game/game.selector';

import './add-game.styles.scss';

const errMessage = {
  noDate: 'Choose date first',
};

export const AddGame = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const teams = useSelector(selectGameTeams);
  const [inputError, setInputError] = useState('');

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addDate(event.target.value));
    setInputError('');
  };
  const addRow = () => {
    if (!date) setInputError(errMessage.noDate);
    dispatch(addTeam(teams));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(date, teams);
  };
  const teamsInputs = teams.map((team, id) => <AddTeam key={id} team={team} />);
  return (
    <div className='add-game'>
      Add a game
      <form onSubmit={handleSubmit}>
        <FormInput
          className='add-game__date'
          required
          label='Date of the game'
          name='date'
          type='date'
          onChange={handleChangeDate}
          value={date}
        />
        {inputError ? <span>{inputError}</span> : null}
        <div className='add-game__teams'>
          {teamsInputs}
          <Button type='button' onClick={addRow}>
            +
          </Button>
        </div>
        <Button type='submit'>Add game to DB</Button>
      </form>
      <Link to='/games'>
        <Button type='button'>Return to games</Button>
      </Link>
    </div>
  );
};
