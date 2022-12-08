import { Team } from '~/store/game/game.types';

import './table.styles.scss';

type TableProps = {
  team: Team;
};

export const Table = ({ team }: TableProps) => {
  return (
    <ul className='table'>
      <li>{team.name}</li>
      {team.result.map((round, n) => (
        <li key={n}>{round}</li>
      ))}
      <li>{team.sum}</li>
      <li>{team.position}</li>
    </ul>
  );
};
