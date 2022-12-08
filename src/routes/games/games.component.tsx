import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '~/components/button/button.component';
import { clearGame, fetchGameStart } from '~/store/game/game.action';
import { selectGameDate, selectGamesList, selectGameTeams } from '~/store/game/game.selector';
import './games.styles.scss';

export const Games = () => {
  const dispatch = useDispatch();
  const gamesList = useSelector(selectGamesList);
  const teams = useSelector(selectGameTeams);
  const theDate = useSelector(selectGameDate);
  const openGame = (date: string) => {
    dispatch(fetchGameStart(date));
  };
  console.log(theDate);
  const table = teams.map((team) => {
    return <div key={team.name}>{team.name}</div>;
  });

  return (
    <div className='games'>
      <h2>Last games</h2>
      <div className='games__dates'>
        {gamesList?.length
          ? gamesList?.map((date) => (
              <Button key={date} name={date} onClick={() => openGame(date)}>
                {`${date.slice(4, 6)}.${date.slice(2, 4)}.20${date.slice(0, 2)}`}
              </Button>
            ))
          : null}
      </div>
      <div className='games__table'>{<span>{table}</span>}</div>
      <Link to='/games/add'>
        <Button>Edit game</Button>
        <Button onClick={() => dispatch(clearGame())}>Add a game</Button>
      </Link>
    </div>
  );
};
