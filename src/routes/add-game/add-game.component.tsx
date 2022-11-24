import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { AddTeam } from '~/components/add-team/add-team.component';
import { Button } from '~/components/button/button.component';
import { FormInput } from '~/components/form-input/form-input.component';
import { Game } from '~/store/game/game.types';

import './add-game.styles.scss';

const defaultGameObject: Game = {
  date: '',
  teams: [],
};

export const AddGame = () => {
  const [gameObject, setGameObject] = useState(defaultGameObject);
  const { teams } = gameObject;
  const [choosenDate, setChoosenDate] = useState('');
  const [teamRows, setTeamRows] = useState(teams);

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setChoosenDate(event.target.value);
    console.log(event.target.value);
    console.log(choosenDate);
  };
  const addRow = () => {
    setTeamRows([...teamRows]);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const gameDate = choosenDate.slice(2).replace(/\D/g, '');
    console.log(gameDate);
    setGameObject({ date: gameDate, teams: [] });
    console.log(gameObject);
  };

  return (
    <div className='add-game'>
      Add a game
      <form onSubmit={handleSubmit}>
        <FormInput
          className='add-game__date'
          required
          label='Date of the game'
          name='date'
          type='date'
          onChange={handleChangeDate}
          value={choosenDate}
        />
        <div className='add-game__teams'>
          <AddTeam />
          <Button type='button' onClick={addRow}>
            +
          </Button>
        </div>
        <Button type='submit'>Add game to DB</Button>
      </form>
      <Link to='/games'>
        <Button type='button'>Return to games</Button>
      </Link>
    </div>
  );
};
