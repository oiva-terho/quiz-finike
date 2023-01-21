import { GamesData } from '~/store/game/game.types';

type StatDataProps = {
  GamesData: GamesData;
  teamName: string;
};
export const StatData = ({ GamesData, teamName }: StatDataProps) => {
  const gamesStreakDates: [string, number][] = Object.entries(GamesData).map(([key, value]) => [
    key,
    value.filter((x) => x.name === teamName).map((y) => y.position)[0],
  ]);

  const gamesStreak = (function () {
    const games = gamesStreakDates.map((day) => day[1]);
    let currentStreak = 0;
    let longestStreak = 0;
    for (let i = 0; i < games.length; i++) {
      if (games[i] !== undefined) {
        currentStreak++;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    }
    return { currentStreak: currentStreak, longestStreak: longestStreak };
  })();
  const datesPlayed: { [index: string]: number } = gamesStreakDates.reduce(
    (acc, val) => (val[1] ? { ...acc, [val[0]]: val[1] } : { ...acc }),
    {},
  );
  // Total games played
  const total = Object.values(datesPlayed).length;
  // Top 3 best positions
  const sortPos = Object.values(datesPlayed).reduce(function (
    acc: { [index: string]: number },
    curr: number,
  ) {
    curr in acc ? acc[curr]++ : (acc[curr] = 1);
    return acc;
  },
  {});
  // Best game
  const best = (function () {
    const topPlace = Object.keys(sortPos)[0];
    if (sortPos[topPlace] === 1) {
      const best = Object.entries(datesPlayed).find((item) => item[1] === +topPlace);
      return best && best[0];
    }
    if (sortPos[topPlace] > 1) {
      const dates = Object.keys(
        Object.fromEntries(Object.entries(datesPlayed).filter((item) => item[1] === +topPlace)),
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
  // Favourite round

  const StatData = {
    teamName: teamName,
    gamesStreakDates: gamesStreakDates,
    gamesStreak: gamesStreak,
    total: total,
    top3: Object.fromEntries(Object.entries(sortPos).slice(0, 3)),
    best: best,
    rivalNames: rivalNames,
    rivalsWhoWon: rivalsWhoWon,
  };
  return (
    <div>
      {Object.keys(datesPlayed).length === 0 ? (
        <span>There is no such team</span>
      ) : (
        <>
          <div>{StatData.total && <span>Total games played: {StatData.total}</span>}</div>
          <div>Current streak:&nbsp;{StatData.gamesStreak.currentStreak}</div>
          <div>Longest streak:&nbsp;{StatData.gamesStreak.longestStreak}</div>
          <div>
            Games played:&nbsp;
            {gamesStreakDates.map((date, i) => (
              <span style={{ color: 'lightgreen' }} key={i}>
                {date[1] ? ': ' : '. '}
              </span>
            ))}
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
      )}
    </div>
  );
};
