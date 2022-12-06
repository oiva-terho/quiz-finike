import { AnyAction } from 'redux';
import { uploadGameSuccess, uploadGameFailed, addDate, setTeams } from './game.action';
import { Game } from './game.types';

const INITIAL_STATE: Game = {
  date: '',
  teams: [],
};

export const gameReducer = (state = INITIAL_STATE, action: AnyAction): Game => {
  if (addDate.match(action)) {
    return { ...state, date: action.payload };
  }
  if (setTeams.match(action) && state.date) {
    console.log(action.payload);
    return { ...state, teams: action.payload };
  }
  if (uploadGameSuccess.match(action)) {
    return { ...state, date: '', teams: [] };
  }
  if (uploadGameFailed.match(action)) {
    return { ...state };
  }
  return state;
};
