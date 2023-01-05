import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { addDate } from '~/store/game/game.action';
import { selectGameDate, selectGamesList, selectGameTeams } from '~/store/game/game.selector';
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
  const gameList = useSelector(selectGamesList);
  const { t } = useTranslation('translation', { keyPrefix: 'games' });

  const gameNumber = gameList
    ? gameList?.findIndex((game) => game === date.slice(2).replace(/\D/g, '')) + 1
    : 0;
  const roundsCheck = () => {
    if (!teams.length) return [];
    const res = teams[0].result.map((_n, i) => (i + 1).toString());
    res.push(t('total'), '');
    return res;
  };
  const rounds = roundsCheck();

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(addDate(event.target.value));
    clearErr && clearErr('');
  };
  return (
    <div className='game-header'>
      <div className='game-header__date'>
        <span>FinikeQuiz #{gameNumber} |&nbsp;</span>
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
      </div>
      <div className='game-header__rounds'>
        {rounds.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </div>
    </div>
  );
};
