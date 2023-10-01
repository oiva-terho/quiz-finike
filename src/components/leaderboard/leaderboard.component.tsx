import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './leaderboard.styles.scss';

type TeamScore = {
  teamName: string;
  totalScore: number;
  averageRating: number;
}[];

type LeaderboardProps = {
  className?: string;
  list: TeamScore;
  select: (arg: string) => void;
};
export const Leaderboard = ({ className = '', list, select }: LeaderboardProps) => {
  const [teamsList, setTeamsList] = useState(list);
  const { t } = useTranslation('translation', { keyPrefix: 'statistics' });
  const sortBy = (option: string) => {
    const sortedList = Array.from(
      list.sort((a, b) => {
        if (option === 'score') return b.totalScore - a.totalScore;
        if (option === 'rating') return b.averageRating - a.averageRating;
        return a.teamName.localeCompare(b.teamName);
      }),
    );
    return setTeamsList(sortedList);
  };
  return (
    <div className={`leaderboard ${className}`}>
      <h4>{t('leaderboard')}</h4>
      <div className='leaderboard__table'>
        <div>
          <button onClick={() => sortBy('name')}>{t('team')}</button>
          <button onClick={() => sortBy('score')}>{t('score')}</button>
          <button onClick={() => sortBy('rating')}>{t('rating')}</button>
        </div>
        {teamsList.map((team, i) => (
          <button onClick={() => select(team.teamName)} key={i}>
            <span>{team.teamName}</span>
            <span>{team.totalScore}</span>
            <span>
              {team.averageRating}
              <b>%</b>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
