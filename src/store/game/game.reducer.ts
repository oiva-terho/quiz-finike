import { AnyAction } from 'redux';
import {
  fetchGamesListSuccess,
  fetchGamesListFailed,
  uploadGameSuccess,
  uploadGameFailed,
  addDate,
  setTeams,
  clearGame,
  fetchGameFailed,
  fetchGameSuccess,
} from './game.action';
import { Game } from './game.types';

const INITIAL_STATE: Game = {
  date: '',
  teams: [],
  gamesList: [],
};

export const gameReducer = (state = INITIAL_STATE, action: AnyAction): Game => {
  if (addDate.match(action)) {
    return { ...state, date: action.payload };
  }
  if (setTeams.match(action) && state.date) {
    return { ...state, teams: action.payload };
  }
  if (fetchGamesListSuccess.match(action)) {
    return { ...state, gamesList: action.payload };
  }
  if (fetchGameSuccess.match(action)) {
    return { ...state, date: action.payload.date, teams: action.payload.teams };
  }
  if (uploadGameSuccess.match(action) || clearGame.match(action)) {
    return { ...state, date: '', teams: [] };
  }
  if (
    uploadGameFailed.match(action) ||
    fetchGamesListFailed.match(action) ||
    fetchGameFailed.match(action)
  ) {
    return { ...state };
  }
  return state;
};
