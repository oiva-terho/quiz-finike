import { GamesData } from '~/store/game/game.types';
import { StatData } from '~/utils/statistics.utils';

type TeamStatisticsProps = {
  GamesData: GamesData;
  teamName: string;
};
export const TeamStatistics = ({ GamesData, teamName }: TeamStatisticsProps) => {
  const statData = StatData({ GamesData, teamName });
  return (
    <div>
      {statData.total === 0 ? (
        <span>There is no such team</span>
      ) : (
        <>
          <div>{statData.total && <span>Total games played: {statData.total}</span>}</div>
          <div>Current streak:&nbsp;{statData.gamesStreak.currentStreak}</div>
          <div>Longest streak:&nbsp;{statData.gamesStreak.longestStreak}</div>
          <div>Total score:&nbsp;{statData.rating.totalScore}</div>
          <div>Rating:&nbsp; {statData.rating.averageRating}%</div>
          <div>
            Games played:&nbsp;
            {statData.gamesDates.map((date, i) => (
              <span style={{ color: 'lightgreen' }} key={i}>
                {date[1] ? ': ' : '. '}
              </span>
            ))}
          </div>
          <div>
            {Object.entries(statData.top3).map((key) => (
              <span key={key[0]} style={{ display: 'block' }}>
                {key[0]} place: {key[1]} times
              </span>
            ))}
          </div>
          <div>Best game: {statData.best}</div>
          <div>
            Best rivals:{' '}
            {statData.rivalNames.map((rival, i) => (
              <span key={i}>{rival} </span>
            ))}
          </div>
          {statData.rivalsWhoWon[0].win === 0 && statData.rivalsWhoWon[0].loose === 0
            ? null
            : statData.rivalNames.map((rival, i) => (
                <div key={i}>
                  {statData.teamName} {statData.rivalsWhoWon[i].win} :{' '}
                  {statData.rivalsWhoWon[i].loose} {rival}
                </div>
              ))}
        </>
      )}
    </div>
  );
};
