import { AnyAction } from 'redux';
import {
  addGame,
  // addTeam,
  uploadGameSuccess,
  uploadGameFailed,
} from './game.action';

export type GameState = {
  readonly currentGame: {};
};

const INITIAL_STATE: GameState = {
  currentGame: {},
};

export const gameReducer = (state = INITIAL_STATE, action: AnyAction): GameState => {
  if (addGame.match(action)) {
    return { ...state, currentGame: action.payload };
  }
  // if (addTeam.match(action) && state.currentGame.date) {
  //   return {...state, currentGame.teams: [action.payload]};
  // }
  if (uploadGameSuccess.match(action)) {
    return { ...state, currentGame: {} };
  }
  if (uploadGameFailed.match(action)) {
    return { ...state };
  }
  return state;
};
