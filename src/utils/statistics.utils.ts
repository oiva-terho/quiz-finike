import { GamesData } from '~/store/game/game.types';

export type StatDataType = {
  teamName: string;
  gamesDates: [string, number, number][];
  gamesStreak: {
    currentStreak: number;
    longestStreak: number;
  };
  rating: {
    totalScore: number;
    averageRating: number;
    gamesRatings: [string, number, number][];
  };
  total: number;
  best: string | undefined;
  rivalNames: string[];
  rivalsWhoWon: {
    win: number;
    loose: number;
  }[];
};

type StatDataProps = {
  GamesData: GamesData;
  teamName: string;
};

export const StatData = ({ GamesData, teamName }: StatDataProps) => {
  const gamesDates: [string, number, number][] = Object.entries(GamesData).map(([key, value]) => [
    key,
    value.filter((x) => x.name === teamName).map((y) => y.position)[0],
    value.filter((x) => x.name === teamName).map((y) => y.sum)[0],
  ]);
  // Games streak
  const gamesStreak = (function () {
    const games = gamesDates.map((day) => day[1]);
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
  const datesPlayed: { [index: string]: number } = gamesDates.reduce(
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
  // Rating
  const rating = (function () {
    const totalScore = gamesDates.reduce((acc, curr) => {
      return curr[2] ? acc + curr[2] : acc;
    }, 0);
    const dates = Object.keys(datesPlayed);
    const games = Object.entries(GamesData).filter(([item]) => dates.includes(item));
    const gamesRatings: [string, number, number][] = games.map((game) => {
      const date = game[0];
      const teams = game[1];
      const myTeam = teams.filter((team) => team.name === teamName)[0];
      const range = teams[0].sum - teams[teams.length - 1].sum;
      const result = teams[myTeam.position - 1].sum - teams[teams.length - 1].sum;
      const rating = Math.round((result / range) * 100);
      return [date, myTeam.position, rating];
    });
    const averageRating =
      Math.round(gamesRatings.reduce((acc, curr) => acc + curr[2], 0)) / gamesRatings.length;
    return { totalScore: totalScore, averageRating: averageRating, gamesRatings: gamesRatings };
  })();
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

  const StatData = {
    teamName: teamName,
    gamesDates: gamesDates,
    gamesStreak: gamesStreak,
    rating: rating,
    total: total,
    top3: Object.fromEntries(Object.entries(sortPos).slice(0, 3)),
    best: best,
    rivalNames: rivalNames,
    rivalsWhoWon: rivalsWhoWon,
  };
  return StatData;
};
