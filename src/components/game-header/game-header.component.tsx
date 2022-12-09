import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '~/store/game/game.action';
import { selectGameDate } from '~/store/game/game.selector';
import { TableInput } from '../table-input/table-input.component';
import './game-header.styles.scss';

const rounds = new Array(6).fill('').map(([,], i) => (i + 1).toString());
rounds.push('Total', 'Place');

type GameHeaderProps = {
  passive?: boolean;
  clearErr?: (value: React.SetStateAction<string>) => void;
};
export const GameHeader = ({ passive, clearErr }: GameHeaderProps) => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addDate(event.target.value));
    clearErr && clearErr('');
  };
  return (
    <div className='game-header'>
      <span>FinikeQuiz |&nbsp;</span>
      {passive ? (
        <span>{date.split('-').reverse().join('.')}</span>
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
