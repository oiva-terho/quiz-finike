import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AddTeam } from '~/components/add-team/add-team.component';
import { Button } from '~/components/button/button.component';
import { GameHeader } from '~/components/game-header/game-header.component';
import { TableInput } from '~/components/table-input/table-input.component';
import {
  addTeam,
  setTeams,
  clearGame,
  uploadGameStart,
  fetchGamesListStart,
} from '~/store/game/game.action';
import { selectGameDate, selectGameTeams } from '~/store/game/game.selector';
import { Team } from '~/store/game/game.types';
import { removeGame } from '~/utils/firebase.utils';

import './add-game.styles.scss';

const errMessage = {
  noDate: 'Choose date first',
  noTeams: 'Fill in teams results',
};

export const AddGame = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const teams = useSelector(selectGameTeams);
  const [inputError, setInputError] = useState('');
  const [rowQuantity, setRowQuantity] = useState(1);

  const rowQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRowQuantity(+event.target.value);
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
    setInputError('');
  };
  const handleRemoveGame = () => {
    removeGame(date.slice(2).replace(/\D/g, ''));
    clearTable();
    dispatch(fetchGamesListStart());
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teams.length) return setInputError(errMessage.noTeams);
    dispatch(uploadGameStart(date, teams));
  };
  return (
    <div className='add-game'>
      <h2>Add a game</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
          <Button type='submit'>Add game to DB</Button>
          <Button type='button' onClick={handleRemoveGame}>
            Remove from DB
          </Button>
          <Link to='/games'>
            <Button type='button' onClick={clearTable}>
              Return to games
            </Button>
          </Link>
        </div>
        <div className='add-game__table'>
          <GameHeader />
          {inputError ? <span>{inputError}</span> : null}
          <div className='add-game__teams'>
            {teams.map((team, id) => {
              team.position = id + 1;
              return (
                <AddTeam key={id} team={team} setTeamData={setTeamData} sortTeams={sortTeams} />
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
