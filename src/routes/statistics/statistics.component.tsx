import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLeaderboard } from '~/utils/statistics.utils';

import { Button } from '~/components/button/button.component';
import { selectCurrentUser } from '~/store/user/user.selector';
import { signOutStart } from '~/store/user/user.action';
import { selectGamesData } from '~/store/game/game.selector';
import { Spinner } from '~/components/spinner/spinner.component';
import { AddTeamName } from '~/components/add-team-name/add-team-name.component';
import { TeamStatistics } from '~/components/team-statistics/team-statistics.component';

import { ReactComponent as Edit } from '~/assets/edit.svg';
import { ReactComponent as StopEdit } from '~/assets/stop-edit.svg';
import { ReactComponent as Exit } from '~/assets/exit.svg';
import { ReactComponent as Auth } from '~/assets/auth.svg';

import '~/components/date-select/date-select.styles.scss';
import './statistics.styles.scss';
import { Leaderboard } from '~/components/leaderboard/leaderboard.component';
import { useNavigate } from 'react-router-dom';
import { fetchGamesDataStart } from '~/store/game/game.action';

export const Statistics = () => {
  const [edit, setEdit] = useState(false);
  const [teamToCompare, setTeamToCompare] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const goTo = useNavigate();
  const user = useSelector(selectCurrentUser);
  const GamesData = useSelector(selectGamesData);
  const { t } = useTranslation('translation', { keyPrefix: 'statistics' });
  const leaderboard = useMemo(() => getLeaderboard(GamesData), [GamesData]);

  useEffect(() => {
    if (resultsRef.current) {
      document
        .getElementById('statistics')
        ?.style.setProperty('--leaderboard-height', `${resultsRef.current.clientHeight}px`);
      console.log('use effect fired');
    }
  }, [teamToCompare]);

  if (Object.keys(GamesData).length === 0) {
    dispatch(fetchGamesDataStart());
    return <Spinner />;
  }

  const signOutUser = () => dispatch(signOutStart());

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
    <section className='statistics' id='statistics'>
      <div className='statistics__results-container' ref={resultsRef}>
        {user ? (
          <div className='statistics__user'>
            <div className='statistics__header'>
              <Button onClick={() => setEdit(edit ? false : true)}>
                {edit ? <StopEdit /> : <Edit />}
              </Button>
              {edit ? <AddTeamName /> : <span className='statistics__name'>{user?.teamName}</span>}

              <Button onClick={signOutUser}>
                <Exit />
              </Button>
            </div>
            {user && <TeamStatistics GamesData={GamesData} teamName={user?.teamName} />}
          </div>
        ) : (
          <Button className='statistics__sign-in' onClick={() => goTo('/sign-in')}>
            <Auth />
            <div>
              <h4>{t('signIn')}</h4>
              <p>{t('signInReason')}</p>
            </div>
          </Button>
        )}
        <div className='statistics__compare'>
          <select
            className='statistics__select'
            value={teamToCompare}
            onChange={(e) => setTeamToCompare(e.target.value)}
          >
            <option value=''>{t('compare')}</option>
            {teamList.map((team, i) => (
              <option value={team[0]} key={i}>
                {team[0]} -{team[1]}-
              </option>
            ))}
          </select>
          {teamToCompare !== '' && (
            <TeamStatistics GamesData={GamesData} teamName={teamToCompare} />
          )}
        </div>
      </div>
      <Leaderboard
        className='statistics__leaderboard'
        list={leaderboard}
        select={setTeamToCompare}
      />
    </section>
  );
};
