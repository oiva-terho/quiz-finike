import { ChangeEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { addDate } from '~/store/game/game.action';
import {
  selectGameDate,
  selectGameRounds,
  selectGamesList,
  selectGameTeams,
} from '~/store/game/game.selector';
import { TableInput } from '../table-input/table-input.component';
import './game-header.styles.scss';

type GameHeaderProps = {
  passive?: boolean;
  clearErr?: (value: React.SetStateAction<string>) => void;
};
export const GameHeader = ({ passive, clearErr }: GameHeaderProps) => {
  const dispatch = useDispatch();
  const rawDate = useSelector(selectGameDate);
  const date = `20${rawDate.slice(0, 2)}-${rawDate.slice(2, 4)}-${rawDate.slice(4, 6)}`;
  const teams = useSelector(selectGameTeams);
  const gameList = useSelector(selectGamesList);
  const rounds = useSelector(selectGameRounds);
  const { t } = useTranslation('translation', { keyPrefix: 'games' });

  const gameNumber = gameList
    ? gameList?.findIndex((game) => game === date.slice(2).replace(/\D/g, '')) + 1
    : 0;

  const headerRounds = useMemo(() => {
    const res = Array.from({ length: rounds }, (_, i) => (i + 1).toString());
    res.push(t('total'), '');
    return res;
  }, [t, rounds]);

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
      {teams.length !== 0 && (
        <div className='game-header__rounds'>
          {headerRounds.map((n, i) => (
            <span key={i}>{n}</span>
          ))}
        </div>
      )}
    </div>
  );
};
