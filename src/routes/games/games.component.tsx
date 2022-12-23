import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { DateSelect } from '~/components/date-select/date-select.component';
import { GameHeader } from '~/components/game-header/game-header.component';
import { Nouser } from '~/components/nouser/nouser.component';
import { Table } from '~/components/table/table.component';

import { fetchPhotoLinksStart } from '~/store/gallery/gallery.action';
import { selectFolders } from '~/store/gallery/gallery.selector';
import { clearGame, fetchGameStart } from '~/store/game/game.action';
import { selectGameDate, selectGamesList, selectGameTeams } from '~/store/game/game.selector';
import { selectCurrentUser } from '~/store/user/user.selector';
import { countResColor } from '~/utils/layout.utils';
import './games.styles.scss';

export const Games = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gamesList = useSelector(selectGamesList);
  const teams = useSelector(selectGameTeams);
  const currentUser = useSelector(selectCurrentUser);
  const fotoFoldersList = useSelector(selectFolders);
  const gameDate = useSelector(selectGameDate);

  const openDate = (date: string) => {
    if (!date) return dispatch(clearGame());
    dispatch(fetchGameStart(date));
  };
  const photosFolder = fotoFoldersList.find((folder) => {
    const selectedDate = gameDate.replace(/\D/g, '').slice(2, 8);
    return folder === selectedDate;
  });
  const goTo = (path: string) => navigate(path);

  if (!currentUser) return <Nouser location='games' />;

  return (
    <div className='games'>
      <h2>Game results</h2>
      <DateSelect dates={gamesList} action={openDate} />
      {currentUser.teamName === 'Admin' ? (
        <Link to='/games/add'>
          <Button buttonType={BUTTON_CLASSES.auth}>Edit game</Button>
          <Button buttonType={BUTTON_CLASSES.auth} onClick={() => dispatch(clearGame())}>
            Add a game
          </Button>
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
      {photosFolder ? (
        <Button
          buttonType={BUTTON_CLASSES.watch}
          onClick={() => {
            dispatch(fetchPhotoLinksStart(photosFolder));
            goTo('/gallery');
          }}
        >
          Watch photos
        </Button>
      ) : null}
    </div>
  );
};
