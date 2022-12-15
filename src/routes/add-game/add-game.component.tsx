import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { AddTeam } from '~/components/add-team/add-team.component';
import { Button } from '~/components/button/button.component';
import { GameHeader } from '~/components/game-header/game-header.component';
import { TableInput } from '~/components/table-input/table-input.component';
import { addTeam, setTeams, setRounds, clearGame, uploadGameStart } from '~/store/game/game.action';
import { selectGameDate, selectGameRounds, selectGameTeams } from '~/store/game/game.selector';
import { Team } from '~/store/game/game.types';
import { selectCurrentUser } from '~/store/user/user.selector';
import { removeGame } from '~/utils/firebase.utils';
import { countResColor } from '~/utils/layout.utils';

import './add-game.styles.scss';
export type ErrMessage = {
  readonly [index: string]: string;
};
const errMessage: ErrMessage = {
  noDate: 'Choose date first',
  noTeams: 'Fill in teams results',
  noTeam: 'Fill team name',
  tooLarge: 'Too large score',
  teamsExists: 'Cannot change rounds quantity for existing game. Clear the table first',
  dataLoss: 'You will loose all filled data. Would you like to continue?',
};

export const AddGame = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const teams = useSelector(selectGameTeams);
  const currentUser = useSelector(selectCurrentUser);
  const rounds = useSelector(selectGameRounds);
  const navigate = useNavigate();

  const [expectedRowQuantity, setExpectedRowQuantity] = useState(0);
  const [inputError, setInputError] = useState('');

  const goTo = (path: string) => navigate(path);

  if (!currentUser || currentUser.teamName !== 'Admin') return <Navigate to='/games' />;

  const setRowsQuantity = (rows: number, ok = false) => {
    if (!date) return setInputError(errMessage.noDate);
    if (!ok) {
      if (teams.some((team) => team.name)) {
        return setInputError(errMessage.dataLoss);
      }
    }
    dispatch(addTeam(rows, rounds));
    setInputError('');
  };
  const handleRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpectedRowQuantity(+event.target.value);
    setRowsQuantity(expectedRowQuantity);
  };
  const setRoundsQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    if (teams.length) return setInputError(errMessage.teamsExists);
    if (!date) return setInputError(errMessage.noDate);
    const newRounds = +event.target.value;
    dispatch(setRounds(newRounds));
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
    goTo('/games');
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!teams.length) return setInputError(errMessage.noTeams);
    dispatch(uploadGameStart(date, teams));
    goTo('/games');
  };
  return (
    <div className='add-game'>
      <h2>Add a game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className='add-game__controls'>
            <span>Rounds</span>
            <TableInput
              name='rounds quantity'
              type='number'
              value={rounds}
              onChange={setRoundsQuantity}
            />
            <span>Teams</span>
            <TableInput
              name='rows quantity'
              type='number'
              value={teams.length}
              onChange={handleRowsChange}
            />
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
          <GameHeader clearErr={setInputError} />
          <div className='add-game__teams'>
            {teams.map((team, id) => {
              team.position = id + 1;
              return (
                <AddTeam
                  key={id}
                  team={team}
                  resColor={countResColor({
                    min: teams[0].sum,
                    max: teams[teams.length - 1].sum,
                    score: team.sum,
                  })}
                  setTeamData={setTeamData}
                  sortTeams={sortTeams}
                  setErr={setInputError}
                  errMessage={errMessage}
                />
              );
            })}
          </div>
          {inputError ? <span>{inputError}</span> : null}
          {inputError === errMessage.dataLoss ? (
            <Button type='button' onClick={() => setRowsQuantity(expectedRowQuantity, true)}>
              Ok
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
};
