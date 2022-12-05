import { Game, GAME_ACTION_TYPES, Team } from './game.types';
import { createAction, ActionWithPayload, Action, withMatcher } from '../../utils/reducer.utils';

// Types

export type AddDate = ActionWithPayload<GAME_ACTION_TYPES.ADD_DATE, string>;
// export type AddTeam = ActionWithPayload<GAME_ACTION_TYPES.ADD_TEAM, Team>;
export type UploadGameStart = ActionWithPayload<GAME_ACTION_TYPES.UPLOAD_GAME_START, Game>;
export type UploadGameSuccess = Action<GAME_ACTION_TYPES.UPLOAD_GAME_SUCCESS>;
export type UploadGameFailed = ActionWithPayload<GAME_ACTION_TYPES.UPLOAD_GAME_FAILED, Error>;

// Actions

export const addDate = withMatcher(
  (date: string): AddDate => createAction(GAME_ACTION_TYPES.ADD_DATE, date),
);
// export const addTeam = withMatcher(
//   ({ name, result, position }: Team): AddTeam =>
//     createAction(GAME_ACTION_TYPES.ADD_TEAM, { name, result, position }),
// );
// export const uploadGameStart = withMatcher(
//   ({ date, teams }: Game): UploadGameStart =>
//     createAction(GAME_ACTION_TYPES.UPLOAD_GAME_START, { date, teams }),
// );
export const uploadGameSuccess = withMatcher(
  (): UploadGameSuccess => createAction(GAME_ACTION_TYPES.UPLOAD_GAME_SUCCESS),
);
export const uploadGameFailed = withMatcher(
  (error: Error): UploadGameFailed => createAction(GAME_ACTION_TYPES.UPLOAD_GAME_FAILED, error),
);
