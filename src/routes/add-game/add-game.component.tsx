import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddTeam } from '~/components/add-team/add-team.component';
import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { TableInput } from '~/components/table-input/table-input.component';
import { addDate, addTeam, setTeams, clearGame, uploadGameStart } from '~/store/game/game.action';
import { selectGameDate, selectGameTeams } from '~/store/game/game.selector';
import { Team } from '~/store/game/game.types';

import './add-game.styles.scss';

const errMessage = {
  noDate: 'Choose date first',
};
const rounds = new Array(6).fill('').map(([,], i) => (i + 1).toString());
rounds.push('Total', 'Place');

export const AddGame = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const teams = useSelector(selectGameTeams);
  const [inputError, setInputError] = useState('');
  const [rowQuantity, setRowQuantity] = useState(1);
  const rowQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowQuantity(+event.target.value);
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addDate(event.target.value));
    setInputError('');
  };
  const addRow = () => {
    if (!date) setInputError(errMessage.noDate);
    dispatch(addTeam(teams, rowQuantity));
    setRowQuantity(1);
  };
  const setTeamData = (team: Team) => {
    teams[team.position - 1] = team;
    dispatch(setTeams([...teams]));
  };
  const sortTeams = () => {
    teams
      .sort((a, b) => {
        return a.sum - b.sum || b.position - a.position;
      })
      .reverse();
    dispatch(setTeams([...teams]));
  };
  const clearTable = () => {
    dispatch(clearGame());
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(uploadGameStart(date, teams));
  };
  return (
    <div className='add-game'>
      Add a game
      <form onSubmit={handleSubmit}>
        <div className='add-game__header'>
          <span>FinikeQuiz | </span>
          <TableInput
            className='add-game__date'
            required
            name='date'
            type='date'
            onChange={handleChangeDate}
            value={date}
          />
          {rounds.map((n, i) => (
            <span key={i}>{n}</span>
          ))}
        </div>
        {inputError ? <span>{inputError}</span> : null}
        <div className='add-game__teams'>
          {teams.map((team, id) => {
            team.position = id + 1;
            return <AddTeam key={id} team={team} setTeamData={setTeamData} sortTeams={sortTeams} />;
          })}
          <div className='add-game__controls'>
            <TableInput
              name='row quantity'
              type='number'
              value={rowQuantity}
              onChange={rowQuantityChange}
            />
            <Button type='button' onClick={addRow}>
              Add rows
            </Button>
            <Button type='button' onClick={clearTable}>
              Clear table
            </Button>
          </div>
        </div>
        <Button type='submit'>Add game to DB</Button>
        <Link to='/games'>
          <Button type='button'>Return to games</Button>
        </Link>
      </form>
    </div>
  );
};
