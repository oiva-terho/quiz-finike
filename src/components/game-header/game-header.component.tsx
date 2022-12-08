import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDate } from '~/store/game/game.action';
import { selectGameDate } from '~/store/game/game.selector';
import { TableInput } from '../table-input/table-input.component';
import './game-header.styles.scss';

const rounds = new Array(6).fill('').map(([,], i) => (i + 1).toString());
rounds.push('Total', 'Place');

export const GameHeader = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectGameDate);
  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addDate(event.target.value));
    // setInputError('');
  };
  return (
    <div className='game-header'>
      <span>FinikeQuiz | </span>
      <TableInput
        className='add-game__date'
        required
        name='date'
        type='date'
        onChange={handleChangeDate}
        value={date}
      />
      {rounds.map((n, i) => (
        <span key={i}>{n}</span>
      ))}
    </div>
  );
};
