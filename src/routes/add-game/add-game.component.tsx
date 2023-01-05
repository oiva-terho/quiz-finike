import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

export const AddGame = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const teams = useSelector(selectGameTeams);
  const currentUser = useSelector(selectCurrentUser);
  const rounds = useSelector(selectGameRounds);
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'addGame' });

  const [expectedRowQuantity, setExpectedRowQuantity] = useState<string | number>('');
  const [inputError, setInputError] = useState('');

  const goTo = (path: string) => navigate(path);

  if (!currentUser || currentUser.teamName !== 'Admin') return <Navigate to='/games' />;

  const setRowsQuantity = (rows: number, ok = false) => {
    if (!date) return setInputError(() => t('noDate'));
    if (!ok && teams.some((team) => team.name)) {
      return setInputError(() => t('dataLoss'));
    }
    dispatch(addTeam(rows, rounds));
    setInputError('');
  };
  const handleRowsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpectedRowQuantity(+event.target.value);
    setRowsQuantity(+event.target.value);
  };
  const setRoundsQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    if (teams.length) return setInputError(() => t('teamsExists'));
    if (!date) return setInputError(() => t('noDate'));
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
    if (!teams.length) return setInputError(() => t('noTeams'));
    dispatch(uploadGameStart(date, teams));
    goTo('/games');
  };
  const handleReturnToGames = () => {
    clearTable();
    goTo('/games');
  };
  return (
    <div className='add-game'>
      <h3>{t('header')}</h3>
      <form onSubmit={handleSubmit}>
        <div className='add-game__controls'>
          <div className='add-game__rounds'>
            <span>{t('rounds')}</span>
            <TableInput
              name='rounds quantity'
              type='number'
              value={rounds}
              onChange={setRoundsQuantity}
            />
          </div>
          <div className='add-game__rows'>
            <span>{t('teams')}</span>
            <TableInput
              name='rows quantity'
              type='number'
              value={teams.length === 0 ? '' : teams.length}
              onChange={handleRowsChange}
            />
          </div>
          <Button type='button' onClick={clearTable}>
            {t('clear')}
          </Button>
          <Button type='submit'>{t('addToDB')}</Button>
          <Button type='button' onClick={handleRemoveGame}>
            {t('remove')}
          </Button>
          <Button type='button' onClick={handleReturnToGames}>
            {t('toGames')}
          </Button>
        </div>
        {inputError ? <span>{inputError}</span> : null}
        {inputError === t('dataLoss') ? (
          <Button type='button' onClick={() => setRowsQuantity(+expectedRowQuantity, true)}>
            {t('ok')}
          </Button>
        ) : null}
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
                />
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
