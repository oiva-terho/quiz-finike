import { useState } from 'react';
import './leaderboard.styles.scss';

type TeamScore = {
  teamName: string;
  totalScore: number;
  averageRating: number;
}[];

export const Leaderboard = ({ list }: { list: TeamScore }) => {
  const [teamsList, setTeamsList] = useState(list);
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
    <div className='leaderboard'>
      <h4>Leaderboard</h4>
      <div className='leaderboard__table'>
        <div>
          <button onClick={() => sortBy('name')}>Team</button>
          <button onClick={() => sortBy('score')}>Score</button>
          <button onClick={() => sortBy('rating')}>Rating</button>
        </div>
        {teamsList.map((team, i) => (
          <div key={i}>
            <span>{team.teamName}</span>
            <span>{team.totalScore}</span>
            <span>
              {team.averageRating}
              <b>%</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
