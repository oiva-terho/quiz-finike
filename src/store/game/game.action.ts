import { Game, GAME_ACTION_TYPES, Team } from './game.types';
import { createAction, ActionWithPayload, Action, withMatcher } from '../../utils/reducer.utils';

const defaultTeamObject: Team = {
  name: '',
  result: [0, 0, 0, 0, 0, 0],
  sum: 0,
  position: 0,
};

// Types

export type AddDate = ActionWithPayload<GAME_ACTION_TYPES.ADD_DATE, string>;
export type SetTeams = ActionWithPayload<GAME_ACTION_TYPES.SET_TEAMS, Team[]>;
export type ClearGame = Action<GAME_ACTION_TYPES.CLEAR_GAME>;
export type UploadGameStart = ActionWithPayload<GAME_ACTION_TYPES.UPLOAD_GAME_START, Game>;
export type UploadGameSuccess = Action<GAME_ACTION_TYPES.UPLOAD_GAME_SUCCESS>;
export type UploadGameFailed = ActionWithPayload<GAME_ACTION_TYPES.UPLOAD_GAME_FAILED, Error>;

// Actions

export const addDate = withMatcher(
  (date: string): AddDate => createAction(GAME_ACTION_TYPES.ADD_DATE, date),
);
export const addTeam = (teams: Team[], rowQuantity: number) => {
  const newTeams = new Array(rowQuantity).fill(0).map(() => ({ ...defaultTeamObject }));
  return setTeams([...teams, ...newTeams]);
};
export const setTeams = withMatcher(
  (teams: Team[]): SetTeams => createAction(GAME_ACTION_TYPES.SET_TEAMS, teams),
);
export const clearGame = withMatcher(() => createAction(GAME_ACTION_TYPES.CLEAR_GAME));
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
