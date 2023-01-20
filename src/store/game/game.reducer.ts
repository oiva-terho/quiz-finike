import { AnyAction } from 'redux';
import {
  fetchGamesDataSuccess,
  fetchGamesDataFailed,
  uploadGameStart,
  uploadGameSuccess,
  uploadGameFailed,
  addDate,
  setTeams,
  clearGame,
  fetchGameFailed,
  fetchGameSuccess,
  setRounds,
} from './game.action';
import { GamesData, Team } from './game.types';

export type GameState = {
  date: string;
  teams: Team[];
  gamesData: GamesData;
  gamesList: string[];
  rounds: number;
  isLoading: boolean;
};

const INITIAL_STATE: GameState = {
  date: '',
  teams: [],
  gamesData: {},
  gamesList: [],
  rounds: 6,
  isLoading: false,
};

export const gameReducer = (state = INITIAL_STATE, action: AnyAction): GameState => {
  if (addDate.match(action)) {
    return { ...state, date: action.payload };
  }
  if (setRounds.match(action) && state.date) {
    return { ...state, rounds: action.payload };
  }
  if (setTeams.match(action) && state.date) {
    return { ...state, teams: action.payload };
  }
  if (fetchGamesDataSuccess.match(action)) {
    return { ...state, gamesData: action.payload, gamesList: Object.keys(action.payload) };
  }
  if (fetchGameSuccess.match(action)) {
    return {
      ...state,
      date: action.payload.date,
      teams: action.payload.teams,
      rounds: action.payload.teams[0].result.length,
    };
  }
  if (uploadGameStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (uploadGameSuccess.match(action) || clearGame.match(action)) {
    return { ...state, date: '', teams: [], rounds: 6, isLoading: false };
  }
  if (
    uploadGameFailed.match(action) ||
    fetchGamesDataFailed.match(action) ||
    fetchGameFailed.match(action)
  ) {
    return { ...state };
  }
  return state;
};
