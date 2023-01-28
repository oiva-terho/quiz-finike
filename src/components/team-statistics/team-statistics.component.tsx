import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { GamesData } from '~/store/game/game.types';
import { statData } from '~/utils/statistics.utils';
import { BestRival } from '../best-rival/best-rival.component';

import { fetchGameStart } from '~/store/game/game.action';

import { ReactComponent as First } from '~/assets/1st.svg';
import { ReactComponent as Second } from '~/assets/2nd.svg';
import { ReactComponent as Third } from '~/assets/3rd.svg';
import { ReactComponent as Nth } from '~/assets/4th.svg';
import { ReactComponent as Laurel } from '~/assets/laurel.svg';
import { ReactComponent as FireCurrent } from '~/assets/fire-current.svg';
import { ReactComponent as FireLongest } from '~/assets/fire-longest.svg';
import './team-statistics.styles.scss';

type TeamStatisticsProps = {
  GamesData: GamesData;
  teamName: string;
};
export const TeamStatistics = ({ GamesData, teamName }: TeamStatisticsProps) => {
  const SD = statData({ GamesData, teamName });
  const { t } = useTranslation('translation', { keyPrefix: 'statistics' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  type StreakDates = { [index: string]: [number, number | undefined][] };
  const streakDates: StreakDates = SD.gamesDates.reduce<StreakDates>((acc, curr) => {
    const month = t(`months.${curr[0].slice(2, 4)}`);
    const monthYear = month + ' ' + '20' + curr[0].slice(0, 2);
    const date = +curr[0].slice(4, 6);
    !acc[monthYear] ? (acc[monthYear] = [[date, curr[1]]]) : acc[monthYear].push([date, curr[1]]);
    return acc;
  }, {});
  const streakDatesArray = Object.entries(streakDates);
  const streakCalendar = streakDatesArray.map((month, i) => (
    <div className='team-statistics__streak_month' data-month={i + 1} key={i}>
      <span>{month[0]}</span>
      <div className='team-statistics__streak_month-dates'>
        {month[1].map((date, i) => (
          <span className={date[1] ? 'mark' : ''} key={i}>
            {date[0]}
          </span>
        ))}
      </div>
    </div>
  ));

  return (
    <div className='team-statistics'>
      {SD.total === 0 ? (
        <span>{t('noTeam')}</span>
      ) : (
        <>
          <div className='team-statistics__general'>
            <div className='team-statistics__general_bubble'>
              <span>{SD.total}</span>
              <div className='team-statistics__general_bubble-title'>
                {t('games')}
                <button>
                  <span>{t('gamesDescr')}</span>
                </button>
              </div>
            </div>
            <div className='team-statistics__general_bubble team-statistics__general_bubble-big'>
              <span>{SD.rating.totalScore}</span>
              <div className='team-statistics__general_bubble-title'>
                {t('score')}
                <button>
                  <span>{t('scoreDescr')}</span>
                </button>
              </div>
            </div>
            <div className='team-statistics__general_bubble'>
              <span>
                {SD.rating.averageRating}
                <span>%</span>
              </span>
              <div className='team-statistics__general_bubble-title'>
                {t('rating')}
                <button>
                  <span>{t('ratingDescr')}</span>
                </button>
              </div>
            </div>
          </div>
          <div className='team-statistics__tops'>
            <div className='team-statistics__top3'>
              <h4>{t('top3')}</h4>
              <div className='team-statistics__top3-container'>
                {Object.entries(SD.top3).map((key) => (
                  <div className='team-statistics__top3-position' key={key[0]}>
                    {place(+key[0])} <span>x {key[1]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='team-statistics__best'>
              <h4>{t('best')}</h4>
              <button
                onClick={() => {
                  if (!SD.best) return;
                  navigate('/games');
                  dispatch(fetchGameStart(SD.best));
                }}
              >
                <Laurel />
                <span>
                  {SD.best &&
                    `${SD.best.slice(4, 6)}.${SD.best.slice(2, 4)}.20${SD.best.slice(0, 2)}`}
                </span>
              </button>
            </div>
          </div>
          <div className='team-statistics__rivals'>
            <h4>{t(SD.rivalNames.length > 1 ? 'rivals' : 'rival')}</h4>
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
            <h4>{t('streak')}</h4>
            <div className='team-statistics__streak_wrapper'>
              <div className='team-statistics__streak_absolute'>
                <div>
                  <span>{t('current')}</span>
                  <div>
                    <FireCurrent />
                    <span>{SD.gamesStreak.currentStreak}</span>
                  </div>
                </div>
                <div className='team-statistics__streak_longest'>
                  <span>{t('longest')}</span>
                  <div>
                    <FireLongest />
                    <span>{SD.gamesStreak.longestStreak}</span>
                  </div>
                </div>
              </div>
              <div className='team-statistics__streak_dates'>{streakCalendar}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
