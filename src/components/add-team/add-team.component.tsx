import { ChangeEvent } from 'react';
import { Team } from '~/store/game/game.types';
import { TableInput } from '../table-input/table-input.component';
import { ErrMessage } from '~/routes/add-game/add-game.component';
import './add-team.styles.scss';

type AddTeamProps = {
  team: Team;
  setTeamData: (team: Team) => void;
  sortTeams: () => void;
  setErr: React.Dispatch<React.SetStateAction<string>>;
  errMessage: ErrMessage;
};

export const AddTeam = ({ team, setTeamData, sortTeams, setErr, errMessage }: AddTeamProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'result') {
      if (!team.name) {
        setTeamData({ ...team, result: new Array(team.result.length).fill('') });
        return setErr(errMessage.noTeam);
      }
      if (+value > 30) return setErr(errMessage.tooLarge);
      const round = event.target.getAttribute('data-round');
      const newResult = [...team.result];
      if (!round) return;
      newResult[parseInt(round)] = isNaN(parseInt(value)) ? '' : parseInt(value);
      team.sum = +newResult.reduce((a, b) => +a + +b);
      setTeamData({ ...team, result: newResult });
      if (+round === team.result.length - 1) sortTeams();
      event.target.focus();
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
            key={`${team.name}${round}`}
            width='30px'
            name='result'
            data-round={round}
            type='number'
            onChange={handleChange}
            value={score}
          />
        ))}
        <div className='add-team__sum'>{team.sum}</div>
        <div className={`add-team__position ${team.position < 4 ? 'add-team__position-top3' : ''}`}>
          {team.position}
        </div>
      </div>
    </>
  );
};
