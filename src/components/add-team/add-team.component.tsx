import { ChangeEvent, useState } from 'react';
import { Team } from '~/store/game/game.types';
import { TableInput } from '../table-input/table-input.component';
import './add-team.styles.scss';

type AddTeamProps = {
  team: Team;
};
// const defaultTeamObject: Team = {
//   name: '',
//   result: [0, 0, 0, 0, 0, 0],
//   position: 0,
// };
export const AddTeam = ({ team }: AddTeamProps) => {
  const [teamObject, setTeamObject] = useState(team);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'result') {
      const round = event.target.getAttribute('data-round');
      const newResult = [...teamObject.result];
      if (!round) return;
      newResult[parseInt(round)] = parseInt(value);
      setTeamObject({ ...teamObject, result: newResult });
      return;
    }
    setTeamObject({ ...teamObject, [name]: value });
  };
  // const sum = teamObject.result.reduce((a, b) => a + b);
  return (
    <div className='add-team'>
      <TableInput
        required
        className='add-team__team-name'
        label='Team name'
        name='name'
        type='text'
        onChange={handleChange}
        value={teamObject.name}
      />

      {teamObject.result.map((score, round) => (
        <TableInput
          required
          key={round}
          width='30px'
          name='result'
          data-round={round}
          type='number'
          onChange={handleChange}
          value={score}
        />
      ))}
      {/* <div className='add-team__sum'>{sum}</div> */}
      <TableInput
        required
        name='position'
        type='number'
        onChange={handleChange}
        value={teamObject.position}
      />
    </div>
  );
};
