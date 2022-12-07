import { ChangeEvent, useState } from 'react';
import { Team } from '~/store/game/game.types';
import { TableInput } from '../table-input/table-input.component';
import './add-team.styles.scss';

type AddTeamProps = {
  team: Team;
  setTeamData: (team: Team) => void;
  sortTeams: () => void;
};

const errMessage = {
  noTeam: 'Fill team name',
  tooLarge: 'Too large score',
};

export const AddTeam = ({ team, setTeamData, sortTeams }: AddTeamProps) => {
  const [inputError, setInputError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    const { name, value } = event.target;
    if (name === 'result') {
      if (!team.name) return setInputError(errMessage.noTeam);
      if (+value > 20) return setInputError(errMessage.tooLarge);
      const round = event.target.getAttribute('data-round');
      const newResult = [...team.result];
      if (!round) return;
      newResult[parseInt(round)] = parseInt(value);
      team.sum = newResult.reduce((a, b) => a + b);
      setTeamData({ ...team, result: newResult });
      if (round === '5') sortTeams();
      return;
    }
    setTeamData({ ...team, [name]: value });
  };
  return (
    <>
      <div className='add-team'>
        <TableInput
          required
          className='add-team__team-name'
          label='Team name'
          name='name'
          type='text'
          onChange={handleChange}
          value={team.name}
        />

        {team.result.map((score, round) => (
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
        <div className='add-team__sum'>{team.sum}</div>
        <div className='add-team__sum'>{team.position}</div>
      </div>
      {<div>{inputError}</div>}
    </>
  );
};
