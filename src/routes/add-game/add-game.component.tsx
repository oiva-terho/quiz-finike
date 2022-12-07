import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddTeam } from '~/components/add-team/add-team.component';
import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { addDate, addTeam, setTeams, uploadGameStart } from '~/store/game/game.action';
import { selectGameDate, selectGameTeams } from '~/store/game/game.selector';
import { Team } from '~/store/game/game.types';

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
  const setTeamData = (team: Team) => {
    teams[team.position - 1] = team;
    dispatch(setTeams([...teams]));
  };
  const sortTeams = () => {
    teams
      .sort(function (a, b) {
        return a.sum - b.sum;
      })
      .reverse();
    dispatch(setTeams([...teams]));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(uploadGameStart(date, teams));
  };
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
          {teams.map((team, id) => {
            team.position = id + 1;
            return <AddTeam key={id} team={team} setTeamData={setTeamData} sortTeams={sortTeams} />;
          })}
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
