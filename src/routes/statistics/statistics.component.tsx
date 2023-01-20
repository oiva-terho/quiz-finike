import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/button/button.component';
import { selectCurrentUser } from '~/store/user/user.selector';
import { signOutStart } from '~/store/user/user.action';
import { Navigate } from 'react-router-dom';
import { selectGamesData } from '~/store/game/game.selector';
import { Spinner } from '~/components/spinner/spinner.component';
import { FormInput } from '~/components/form-input/form-input.component';

export const Statistics = () => {
  const dispatch = useDispatch();
  const userTeam = useSelector(selectCurrentUser)?.teamName;
  const GamesData = useSelector(selectGamesData);
  const signOutUser = () => dispatch(signOutStart());
  const { t } = useTranslation('translation', { keyPrefix: 'navigation' });
  const [team, setTeam] = useState('');
  const [StatData, setStatData] = useState<StatDataType>();
  type StatDataType = {
    teamName: string;
    pos: number[];
    total: number;
    top3: { [k: string]: number };
    best: string | undefined;
    rivalNames: string[];
    rivalsWhoWon: { win: number; loose: number }[];
  };

  if (Object.keys(GamesData).length === 0) return <Spinner />;

  // Team list
  const teamList = Array.from(
    new Set(
      Object.values(GamesData)
        .reduce((acc, teams) => [...acc, ...teams])
        .map((obj) => obj.name),
    ),
  ).sort();

  const countStatData = function (teamName: string) {
    const posDates = Object.entries(GamesData)
      .map(([key, value]) => {
        return {
          [key]: value.filter((x) => x.name === teamName).map((y) => y.position)[0],
        };
      })
      .reduce((acc, val) => (Object.values(val)[0] ? { ...acc, ...val } : { ...acc }), {});
    const pos = Object.values(posDates);
    // Total games played
    const total = pos.length;
    // Top 3 best positions
    const sortPos = pos.reduce(function (acc: { [index: string]: number }, curr: number) {
      curr in acc ? acc[curr]++ : (acc[curr] = 1);
      return acc;
    }, {});
    // Best game
    const best = (function () {
      const topPlace = Object.keys(sortPos)[0];
      if (sortPos[topPlace] === 1) {
        const best = Object.entries(posDates).find((item) => item[1] === +topPlace);
        return best && best[0];
      }
      if (sortPos[topPlace] > 1) {
        const dates = Object.keys(
          Object.fromEntries(Object.entries(posDates).filter((item) => item[1] === +topPlace)),
        );
        const games = Object.entries(GamesData).filter(([item]) => dates.includes(item));
        const results = games.map((game) => {
          const date = game[0];
          const arr = game[1];
          const range = arr[0].sum - arr[arr.length - 1].sum;
          const result = (arr[0].sum - arr[topPlace === '1' ? 1 : +topPlace - 1].sum) / range;
          return { [date]: result };
        });
        const best = Object.keys(
          results.reduce((a, b) => {
            if (topPlace === '1') {
              return Object.entries(a)[0][1] > Object.entries(b)[0][1] ? a : b;
            }
            return Object.entries(a)[0][1] > Object.entries(b)[0][1] ? b : a;
          }),
        )[0];

        return best;
      }
      return '';
    })();

    // Best rival
    const pairs = Object.values(GamesData)
      .filter((innerArr) => innerArr.find((item) => item.name === teamName))
      .map((game) => {
        const i = game.findIndex((team) => team.name === teamName);
        if (i === 0) return ['', game[i + 1].name];
        if (i === game.length - 1) return [game[i - 1].name, ''];
        return [game[i - 1].name, game[i + 1].name];
      });

    const rivalNames = (function () {
      if (total < 3) return ['Need to play at least 3 games'];

      const closestTeams = pairs
        .reduce((acc, pairs) => [...acc, ...pairs])
        .reduce(function (acc: { [index: string]: number }, curr: string) {
          curr in acc ? acc[curr]++ : (acc[curr] = 1);
          return acc;
        }, {});
      delete closestTeams[''];
      const rivals = Object.entries(closestTeams).sort((a, b) => b[1] - a[1]);
      if (rivals[0][1] === 1) return ['no rivals found'];
      const rivalNamesArray = rivals.reduce((acc: string[], rival) => {
        if (rival[1] !== rivals[0][1]) return [...acc];
        return [...acc, rival[0]];
      }, []);
      return rivalNamesArray;
    })();
    const rivalsWhoWon = rivalNames.map((rivalName) =>
      pairs
        .map((pair) => {
          if (pair[0] === rivalName) return 'loose';
          if (pair[1] === rivalName) return 'win';
          return undefined;
        })
        .reduce(
          (acc, curr) => {
            if (curr === 'win') {
              acc.win++;
            } else if (curr === 'loose') {
              acc.loose++;
            }
            return acc;
          },
          { win: 0, loose: 0 },
        ),
    );

    // Average score
    // Compare all results with another team
    // Favourite round
    return setStatData({
      teamName: teamName,
      pos: pos,
      total: total,
      top3: Object.fromEntries(Object.entries(sortPos).slice(0, 3)),
      best: best,
      rivalNames: rivalNames,
      rivalsWhoWon: rivalsWhoWon,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    countStatData(team);
  };
  return (
    <div>
      <Button onClick={signOutUser}>{t('signOut')}</Button>
      <h3>{userTeam} results</h3>
      <form onSubmit={handleSubmit}>
        <FormInput label='team' value={team} onChange={(e) => setTeam(e.target.value)} />
      </form>
      {StatData?.teamName ? (
        <>
          <div style={{ marginBottom: '1em' }}>
            {StatData.total && <span>Total games played: {StatData.total}</span>}
          </div>
          <div>
            {Object.entries(StatData.top3).map((key) => (
              <span key={key[0]} style={{ display: 'block' }}>
                {key[0]} place: {key[1]} times
              </span>
            ))}
          </div>
          <div>Best game: {StatData.best}</div>
          <div>
            Best rivals:{' '}
            {StatData.rivalNames.map((rival, i) => (
              <span key={i}>{rival} </span>
            ))}
          </div>
          {StatData.rivalsWhoWon[0].win === 0 && StatData.rivalsWhoWon[0].loose === 0
            ? null
            : StatData.rivalNames.map((rival, i) => (
                <div key={i}>
                  {StatData.teamName} {StatData.rivalsWhoWon[i].win} :{' '}
                  {StatData.rivalsWhoWon[i].loose} {rival}
                </div>
              ))}
        </>
      ) : null}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridGap: '3px',
          fontSize: '0.5em',
        }}
      >
        {teamList.map((name, i) => (
          <button key={i} onClick={() => countStatData(name)}>
            {name}
          </button>
        ))}
      </div>
      {!userTeam && <Navigate to='/' />}
    </div>
  );
};
