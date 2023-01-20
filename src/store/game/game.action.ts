import { GamesData, GAME_ACTION_TYPES, Team } from './game.types';
import { createAction, ActionWithPayload, Action, withMatcher } from '../../utils/reducer.utils';

const defaultTeamObject: Team = {
  name: '',
  result: [],
  sum: 0,
  position: 0,
};

// Types

export type AddDate = ActionWithPayload<GAME_ACTION_TYPES.ADD_DATE, string>;
export type SetRounds = ActionWithPayload<GAME_ACTION_TYPES.SET_ROUNDS, number>;
export type SetTeams = ActionWithPayload<GAME_ACTION_TYPES.SET_TEAMS, Team[]>;
export type ClearGame = Action<GAME_ACTION_TYPES.CLEAR_GAME>;
export type FetchGamesDataStart = Action<GAME_ACTION_TYPES.FETCH_GAMES_DATA_START>;
export type FetchGamesDataSuccess = ActionWithPayload<
  GAME_ACTION_TYPES.FETCH_GAMES_DATA_SUCCESS,
  GamesData
>;
export type FetchGamesDataFailed = ActionWithPayload<
  GAME_ACTION_TYPES.FETCH_GAMES_DATA_FAILED,
  Error
>;
export type FetchGameStart = ActionWithPayload<
  GAME_ACTION_TYPES.FETCH_GAME_START,
  { date: string }
>;
export type FetchGameSuccess = ActionWithPayload<
  GAME_ACTION_TYPES.FETCH_GAME_SUCCESS,
  { date: string; teams: Team[] }
>;
export type FetchGameFailed = ActionWithPayload<GAME_ACTION_TYPES.FETCH_GAME_FAILED, Error>;
export type UploadGameStart = ActionWithPayload<
  GAME_ACTION_TYPES.UPLOAD_GAME_START,
  { date: string; teams: Team[] }
>;
export type UploadGameSuccess = Action<GAME_ACTION_TYPES.UPLOAD_GAME_SUCCESS>;
export type UploadGameFailed = ActionWithPayload<GAME_ACTION_TYPES.UPLOAD_GAME_FAILED, Error>;

// Actions

export const addDate = withMatcher(
  (date: string): AddDate => createAction(GAME_ACTION_TYPES.ADD_DATE, date),
);
export const addTeam = (rowQuantity: number, rounds: number) => {
  const newRounds = new Array(rounds).fill('');
  const newTeams = new Array(rowQuantity)
    .fill(0)
    .map(() => ({ ...defaultTeamObject, result: newRounds }));
  return setTeams([...newTeams]);
};
export const setRounds = withMatcher(
  (rounds: number): SetRounds => createAction(GAME_ACTION_TYPES.SET_ROUNDS, rounds),
);
export const setTeams = withMatcher(
  (teams: Team[]): SetTeams => createAction(GAME_ACTION_TYPES.SET_TEAMS, teams),
);
export const clearGame = withMatcher(() => createAction(GAME_ACTION_TYPES.CLEAR_GAME));
export const fetchGamesDataStart = withMatcher(
  (): FetchGamesDataStart => createAction(GAME_ACTION_TYPES.FETCH_GAMES_DATA_START),
);
export const fetchGamesDataSuccess = withMatcher(
  (gamesData: GamesData): FetchGamesDataSuccess =>
    createAction(GAME_ACTION_TYPES.FETCH_GAMES_DATA_SUCCESS, gamesData),
);
export const fetchGamesDataFailed = withMatcher(
  (error: Error): FetchGamesDataFailed =>
    createAction(GAME_ACTION_TYPES.FETCH_GAMES_DATA_FAILED, error),
);
export const fetchGameStart = withMatcher(
  (date: string): FetchGameStart => createAction(GAME_ACTION_TYPES.FETCH_GAME_START, { date }),
);
export const fetchGameSuccess = withMatcher(
  (date: string, teams: Team[]): FetchGameSuccess =>
    createAction(GAME_ACTION_TYPES.FETCH_GAME_SUCCESS, { date, teams }),
);
export const fetchGameFailed = withMatcher(
  (error: Error): FetchGameFailed => createAction(GAME_ACTION_TYPES.FETCH_GAME_FAILED, error),
);
export const uploadGameStart = withMatcher(
  (date: string, teams: Team[]): UploadGameStart =>
    createAction(GAME_ACTION_TYPES.UPLOAD_GAME_START, { date, teams }),
);
export const uploadGameSuccess = withMatcher(
  (): UploadGameSuccess => createAction(GAME_ACTION_TYPES.UPLOAD_GAME_SUCCESS),
);
export const uploadGameFailed = withMatcher(
  (error: Error): UploadGameFailed => createAction(GAME_ACTION_TYPES.UPLOAD_GAME_FAILED, error),
);
