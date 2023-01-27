import { GamesData } from '~/store/game/game.types';
import { statData } from '~/utils/statistics.utils';

import { ReactComponent as First } from '~/assets/1st.svg';
import { ReactComponent as Second } from '~/assets/2nd.svg';
import { ReactComponent as Third } from '~/assets/3rd.svg';
import { ReactComponent as Nth } from '~/assets/4th.svg';
import { ReactComponent as Laurel } from '~/assets/laurel.svg';
import { ReactComponent as FireCurrent } from '~/assets/fire-current.svg';
import { ReactComponent as FireLongest } from '~/assets/fire-longest.svg';
import './team-statistics.styles.scss';
import { BestRival } from '../best-rival/best-rival.component';

type TeamStatisticsProps = {
  GamesData: GamesData;
  teamName: string;
};
export const TeamStatistics = ({ GamesData, teamName }: TeamStatisticsProps) => {
  const SD = statData({ GamesData, teamName });

  const place = (place: number) => {
    if (place === 1) {
      return <First />;
    }
    if (place === 2) {
      return <Second />;
    }
    if (place === 3) {
      return <Third />;
    }
    return (
      <div className='team-statistics__nth'>
        <Nth />
        <span>{place}</span>
      </div>
    );
  };
  return (
    <div className='team-statistics'>
      {SD.total === 0 ? (
        <span>There is no such team</span>
      ) : (
        <>
          <div className='team-statistics__general'>
            <div className='team-statistics__general_bubble'>
              <span>{SD.total}</span>
              <div className='team-statistics__general_bubble-title'>
                Games
                <button>
                  <span>Total number of played games</span>
                </button>
              </div>
            </div>
            <div className='team-statistics__general_bubble team-statistics__general_bubble-big'>
              <span>{SD.rating.totalScore}</span>
              <div className='team-statistics__general_bubble-title'>
                Score
                <button>
                  <span>Sum of scores of all games</span>
                </button>
              </div>
            </div>
            <div className='team-statistics__general_bubble'>
              <span>
                {SD.rating.averageRating}
                <span>%</span>
              </span>
              <div className='team-statistics__general_bubble-title'>
                Rating
                <button>
                  <span>
                    Average position in game results if 1st place&apos;s is 100% and last
                    place&apos;s score is 0%
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className='team-statistics__tops'>
            <div className='team-statistics__top3'>
              <h4>Top 3 places</h4>
              <div className='team-statistics__top3-container'>
                {Object.entries(SD.top3).map((key) => (
                  <div className='team-statistics__top3-position' key={key[0]}>
                    {place(+key[0])} <span>x {key[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='team-statistics__best'>
              <h4>Best game</h4>
              <button>
                <Laurel />
                <span>
                  {SD.best &&
                    `${SD.best.slice(4, 6)}.${SD.best.slice(2, 4)}.20${SD.best.slice(0, 2)}`}
                </span>
              </button>
            </div>
          </div>
          <div className='team-statistics__rivals'>
            <h4>Best rival{SD.rivalNames.length > 1 ? 's' : null}</h4>
            {SD.rivalsWhoWon[0].win === 0 && SD.rivalsWhoWon[0].loose === 0
              ? null
              : SD.rivalNames.map((rival, i) => (
                  <div key={i}>
                    <BestRival
                      teamName={SD.teamName}
                      win={SD.rivalsWhoWon[i].win}
                      loose={SD.rivalsWhoWon[i].loose}
                      rival={rival}
                    />
                  </div>
                ))}
          </div>
          <div className='team-statistics__streak'>
            <h4>Streak</h4>
            <div className='team-statistics__streak_wrapper'>
              <div className='team-statistics__streak_absolute'>
                <div>
                  <span>Current</span>
                  <div>
                    <FireCurrent />
                    <span>{SD.gamesStreak.currentStreak}</span>
                  </div>
                </div>
                <div className='team-statistics__streak_longest'>
                  <span>Longest</span>
                  <div>
                    <FireLongest />
                    <span>{SD.gamesStreak.longestStreak}</span>
                  </div>
                </div>
              </div>
              <div className='team-statistics__streak_dates'>
                Games played:&nbsp;
                {SD.gamesDates.map((date, i) => (
                  <span style={{ color: 'lightgreen' }} key={i}>
                    {date[1] ? ': ' : '. '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
