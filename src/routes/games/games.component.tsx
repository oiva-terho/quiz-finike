import { Link } from 'react-router-dom';
import { Button } from '~/components/button/button.component';
import './games.styles.scss';

export const Games = () => {
  return (
    <div className='games'>
      <h2>Last game</h2>
      <Link to='/games/add'>
        <Button>Add a game</Button>
      </Link>
    </div>
  );
};
