import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/button/button.component';
import { selectCurrentUser } from '~/store/user/user.selector';
import { signOutStart } from '~/store/user/user.action';
import { Navigate } from 'react-router-dom';
import { selectGamesData } from '~/store/game/game.selector';
import { Spinner } from '~/components/spinner/spinner.component';
import { AddTeamName } from '~/components/add-team-name/add-team-name.component';

import '~/components/date-select/date-select.styles.scss';
import { TeamStatistics } from '~/components/team-statistics/team-statistics.component';

export const Statistics = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const GamesData = useSelector(selectGamesData);
  const signOutUser = () => dispatch(signOutStart());
  const { t } = useTranslation('translation', { keyPrefix: 'navigation' });
  const [edit, setEdit] = useState(false);
  const [teamToCompare, setTeamToCompare] = useState('');

  if (Object.keys(GamesData).length === 0) return <Spinner />;

  // Team list
  // const fullTeamList = Array.from(
  //   new Set(
  //     Object.values(GamesData)
  //       .reduce((acc, teams) => [...acc, ...teams])
  //       .map((obj) => obj.name),
  //   ),
  // );

  const teamList = (function () {
    const allTeams = Object.values(GamesData)
      .reduce((acc, teams) => [...acc, ...teams])
      .map((obj) => obj.name)
      .reduce((acc: { [index: string]: number }, curr: string) => {
        curr in acc ? acc[curr]++ : (acc[curr] = 1);
        return acc;
      }, {});
    return Object.entries(allTeams)
      .sort((a, b) => b[1] - a[1])
      .filter((team) => team[1] > 2);
  })();

  return (
    <div>
      {!user && <Navigate to='/sign-in' />}
      {edit ? <AddTeamName /> : <span>{user?.teamName}</span>}
      <Button onClick={() => setEdit(edit ? false : true)}>{edit ? 'Cancel' : 'Edit'}</Button>
      <Button onClick={signOutUser}>{t('signOut')}</Button>
      {user && <TeamStatistics GamesData={GamesData} teamName={user?.teamName} />}
      <div className='dates-select'>
        <select defaultValue={teamToCompare} onChange={(e) => setTeamToCompare(e.target.value)}>
          <option value=''>-</option>
          {teamList.map((team, i) => (
            <option value={team[0]} key={i}>
              {team[0]}:{team[1]}
            </option>
          ))}
        </select>
      </div>
      {teamToCompare !== '' && <TeamStatistics GamesData={GamesData} teamName={teamToCompare} />}
    </div>
  );
};
