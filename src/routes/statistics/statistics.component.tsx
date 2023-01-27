import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLeaderboard } from '~/utils/statistics.utils';

import { Button } from '~/components/button/button.component';
import { selectCurrentUser } from '~/store/user/user.selector';
import { signOutStart } from '~/store/user/user.action';
import { Navigate } from 'react-router-dom';
import { selectGamesData } from '~/store/game/game.selector';
import { Spinner } from '~/components/spinner/spinner.component';
import { AddTeamName } from '~/components/add-team-name/add-team-name.component';
import { TeamStatistics } from '~/components/team-statistics/team-statistics.component';

import { ReactComponent as Edit } from '~/assets/edit.svg';
import { ReactComponent as StopEdit } from '~/assets/stop-edit.svg';
import { ReactComponent as Exit } from '~/assets/exit.svg';

import '~/components/date-select/date-select.styles.scss';
import './statistics.styles.scss';

export const Statistics = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const GamesData = useSelector(selectGamesData);
  const signOutUser = () => dispatch(signOutStart());
  const { t } = useTranslation('translation', { keyPrefix: 'navigation' });
  const [edit, setEdit] = useState(false);
  const [teamToCompare, setTeamToCompare] = useState('');
  const leaderboard = useMemo(() => getLeaderboard(GamesData), [GamesData]);
  if (Object.keys(GamesData).length === 0) return <Spinner />;

  // Fix team name of 'Они заняли ***е место'
  Object.fromEntries(
    Object.entries(GamesData).map((date) => {
      date[1].map((team) => {
        if (team.name.startsWith('Они заняли') && team.name.endsWith('e место')) {
          team.name = 'Они заняли какое-то место';
        }
        return team;
      });
      return date;
    }),
  );

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
    <div className='statistics'>
      <div className='statistics__header'>
        {!user && <Navigate to='/sign-in' />}
        <Button onClick={() => setEdit(edit ? false : true)}>
          {edit ? <StopEdit /> : <Edit />}
        </Button>
        {edit ? <AddTeamName /> : <span className='statistics__name'>{user?.teamName}</span>}
        <Button onClick={signOutUser}>
          <Exit />
        </Button>
      </div>
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

      <div>
        <h6>Leaderboard</h6>
        {leaderboard.map((team, i) => (
          <div key={i}>
            {team.teamName} : {team.totalScore} ({team.averageRating}%)
          </div>
        ))}
      </div>
    </div>
  );
};
