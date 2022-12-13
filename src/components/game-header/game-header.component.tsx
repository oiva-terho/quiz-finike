import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '~/store/game/game.action';
import { selectGameDate, selectGameTeams } from '~/store/game/game.selector';
import { TableInput } from '../table-input/table-input.component';
import './game-header.styles.scss';

type GameHeaderProps = {
  passive?: boolean;
  clearErr?: (value: React.SetStateAction<string>) => void;
};
export const GameHeader = ({ passive, clearErr }: GameHeaderProps) => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const teams = useSelector(selectGameTeams);

  const roundsCheck = () => {
    if (!teams.length) {
      return [];
    } else {
      const res = teams[0].result.map((_n, i) => (i + 1).toString());
      res.push('Total', '');
      return res;
    }
  };
  const rounds = roundsCheck();

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addDate(event.target.value));
    clearErr && clearErr('');
  };
  return (
    <div className='game-header'>
      <span>FinikeQuiz |&nbsp;</span>
      {passive ? (
        <b>{date.split('-').reverse().join('.')}</b>
      ) : (
        <TableInput
          className='add-game__date'
          required
          name='date'
          type='date'
          onChange={handleChangeDate}
          value={date}
        />
      )}
      {rounds.map((n, i) => (
        <span key={i}>{n}</span>
      ))}
    </div>
  );
};
