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

function getGamesDates({ GamesData, teamName }: StatDataProps): [string, number, number][] {
  return Object.entries(GamesData).map(([key, value]) => [
    key,
    value.filter((x) => x.name === teamName).map((y) => y.position)[0],
    value.filter((x) => x.name === teamName).map((y) => y.sum)[0],
  ]);
}
// Games streak
function getGamesStreak(gamesDates: [string, number, number][]) {
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
}
function getDatesPlayed(gamesDates: [string, number, number][]): { [index: string]: number } {
  return gamesDates.reduce((acc, val) => (val[1] ? { ...acc, [val[0]]: val[1] } : { ...acc }), {});
}
// Total games played
function getTotal(datesPlayed: { [index: string]: number }): number {
  return Object.values(datesPlayed).length;
}
// Top 3 best positions
function sortPos(datesPlayed: { [index: string]: number }) {
  return Object.values(datesPlayed).reduce(function (
    acc: { [index: string]: number },
    curr: number,
  ) {
    curr in acc ? acc[curr]++ : (acc[curr] = 1);
    return acc;
  },
  {});
}
// Rating
type getRatingProps = {
  GamesData: GamesData;
  teamName: string;
  gamesDates: [string, number, number][];
  datesPlayed: { [index: string]: number };
};
function getRating({ GamesData, teamName, gamesDates, datesPlayed }: getRatingProps) {
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
  const averageRating = Math.round(
    gamesRatings.reduce((acc, curr) => acc + curr[2], 0) / gamesRatings.length,
  );
  return { totalScore: totalScore, averageRating: averageRating, gamesRatings: gamesRatings };
}
// Best game
type getBestGameProps = {
  GamesData: GamesData;
  sortedPos: { [index: string]: number };
  datesPlayed: { [index: string]: number };
};
function getBestGame({ GamesData, sortedPos, datesPlayed }: getBestGameProps) {
  const topPlace = Object.keys(sortedPos)[0];
  if (sortedPos[topPlace] === 1) {
    const best = Object.entries(datesPlayed).find((item) => item[1] === +topPlace);
    return best && best[0];
  }
  if (sortedPos[topPlace] > 1) {
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
}

// Best rival
function getPairs(GamesData: GamesData, teamName: string): string[][] {
  return Object.values(GamesData)
    .filter((innerArr) => innerArr.find((item) => item.name === teamName))
    .map((game) => {
      const i = game.findIndex((team) => team.name === teamName);
      if (i === 0) return ['', game[i + 1].name];
      if (i === game.length - 1) return [game[i - 1].name, ''];
      return [game[i - 1].name, game[i + 1].name];
    });
}

function getRivalNames(total: number, pairs: string[][]): string[] {
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
}
function getRivalsWhoWon(rivalNames: string[], pairs: string[][]) {
  return rivalNames.map((rivalName) =>
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
}

type StatDataProps = {
  GamesData: GamesData;
  teamName: string;
};
export const statData = ({ GamesData, teamName }: StatDataProps) => {
  const gamesDates = getGamesDates({ GamesData, teamName });
  const gamesStreak = getGamesStreak(gamesDates);
  const datesPlayed = getDatesPlayed(gamesDates);
  const total = getTotal(datesPlayed);
  const sortedPos = sortPos(datesPlayed);
  const rating = getRating({ GamesData, teamName, gamesDates, datesPlayed });
  const best = getBestGame({ GamesData, sortedPos, datesPlayed });
  const pairs = getPairs(GamesData, teamName);
  const rivalNames = getRivalNames(total, pairs);
  const rivalsWhoWon = getRivalsWhoWon(rivalNames, pairs);
  const StatData = {
    teamName: teamName,
    gamesDates: gamesDates,
    gamesStreak: gamesStreak,
    rating: rating,
    total: total,
    top3: Object.fromEntries(Object.entries(sortedPos).slice(0, 3)),
    best: best,
    rivalNames: rivalNames,
    rivalsWhoWon: rivalsWhoWon,
  };
  return StatData;
};
type Leaderboard = {
  teamName: string;
  totalScore: number;
  averageRating: number;
}[];
export const getLeaderboard = (GamesData: GamesData) => {
  if (Object.keys(GamesData).length === 0)
    return [
      {
        teamName: '',
        totalScore: 0,
        averageRating: 0,
      },
    ];
  const fullTeamList = Array.from(
    new Set(
      Object.values(GamesData)
        .reduce((acc, teams) => [...acc, ...teams])
        .map((obj) => obj.name),
    ),
  );
  const leaderboard = fullTeamList.reduce<Leaderboard>((acc, teamName) => {
    const gamesDates = getGamesDates({ GamesData, teamName });
    const datesPlayed = getDatesPlayed(gamesDates);
    const rating = getRating({ GamesData, teamName, gamesDates, datesPlayed });
    acc.push({
      teamName: teamName,
      totalScore: rating.totalScore,
      averageRating: rating.averageRating,
    });
    return acc;
  }, []);
  leaderboard.sort((a, b) => {
    return b.totalScore - a.totalScore;
  });
  return leaderboard;
};
