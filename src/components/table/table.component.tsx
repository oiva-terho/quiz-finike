import { Team } from '~/store/game/game.types';

import './table.styles.scss';

type TableProps = {
  team: Team;
  resColor: string;
};

export const Table = ({ team, resColor }: TableProps) => {
  return (
    <div className='table'>
      <span>{team.name}</span>
      <ul>
        {team.result.map((round, n) => (
          <li key={n}>{round}</li>
        ))}
        <li className='table__sum' style={{ backgroundColor: resColor }}>
          {team.sum}
        </li>
        <li className={`table__position ${team.position < 4 ? 'table__position-top3' : ''}`}>
          {team.position}
        </li>
      </ul>
    </div>
  );
};
