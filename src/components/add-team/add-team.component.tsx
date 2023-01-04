import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Team } from '~/store/game/game.types';
import { TableInput } from '../table-input/table-input.component';

import './add-team.styles.scss';

type AddTeamProps = {
  team: Team;
  resColor: string;
  setTeamData: (team: Team) => void;
  sortTeams: () => void;
  setErr: React.Dispatch<React.SetStateAction<string>>;
};

export const AddTeam = ({ team, resColor, setTeamData, sortTeams, setErr }: AddTeamProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'addGame' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErr('');
    if (name === 'result') {
      if (!team.name) {
        setTeamData({ ...team, result: new Array(team.result.length).fill('') });
        return setErr(() => t('noTeam'));
      }
      if (+value > 30) return setErr(() => t('tooLarge'));
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
    <div className='add-team'>
      <TableInput
        required
        className='add-team__team-name'
        label={t('team')}
        name='name'
        type='text'
        onChange={handleChange}
        value={team.name}
      />
      <div className='add-team__rounds'>
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
        <div className='add-team__sum' style={{ backgroundColor: resColor }}>
          {team.sum}
        </div>
        <div className={`add-team__position ${team.position < 4 ? 'add-team__position-top3' : ''}`}>
          {team.position}
        </div>
      </div>
    </div>
  );
};
