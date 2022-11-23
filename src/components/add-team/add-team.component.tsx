import { ChangeEvent, useState } from 'react';
import { Team } from '~/utils/firebase.utils';
import { TableInput } from '../table-input/table-input.component';
import './add-team.styles.scss';

const defaultTeamObject: Team = {
  name: '',
  result: ['', '', '', '', '', '', ''],
  position: 0,
};
export const AddTeam = () => {
  const [teamObject, setTeamObject] = useState(defaultTeamObject);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.replace(/\d/g, '') === 'result') {
      const newResult = teamObject.result.slice(0, 7);
      newResult[parseInt(name.replace(/\D/g, ''))] = parseInt(value);
      setTeamObject({ ...teamObject, result: newResult });
    } else {
      setTeamObject({ ...teamObject, [name]: value });
    }
    console.log(teamObject);
  };

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
          name={`result${round}`}
          type='number'
          onChange={handleChange}
          value={score}
        />
      ))}
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
