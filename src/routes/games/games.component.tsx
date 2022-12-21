import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from '~/components/button/button.component';
import { DateSelect } from '~/components/date-select/date-select.component';
import { GameHeader } from '~/components/game-header/game-header.component';
import { Nouser } from '~/components/nouser/nouser.component';
import { Table } from '~/components/table/table.component';

import { clearGame, fetchGameStart } from '~/store/game/game.action';
import { selectGamesList, selectGameTeams } from '~/store/game/game.selector';
import { selectCurrentUser } from '~/store/user/user.selector';
import { countResColor } from '~/utils/layout.utils';
import './games.styles.scss';

export const Games = () => {
  const dispatch = useDispatch();
  const gamesList = useSelector(selectGamesList);
  const teams = useSelector(selectGameTeams);
  const currentUser = useSelector(selectCurrentUser);

  const openDate = (date: string) => {
    if (!date) return dispatch(clearGame());
    dispatch(fetchGameStart(date));
  };

  if (!currentUser) return <Nouser location='games' />;

  return (
    <div className='games'>
      <h2>Game results</h2>
      <DateSelect dates={gamesList} action={openDate} />
      {currentUser.teamName === 'Admin' ? (
        <Link to='/games/add'>
          <Button>Edit game</Button>
          <Button onClick={() => dispatch(clearGame())}>Add a game</Button>
        </Link>
      ) : null}
      <div className='games__table'>
        <GameHeader passive />
        {teams.map((team) => (
          <Table
            key={team.name}
            team={team}
            resColor={countResColor({
              min: teams[0].sum,
              max: teams[teams.length - 1].sum,
              score: team.sum,
            })}
          />
        ))}
      </div>
    </div>
  );
};
