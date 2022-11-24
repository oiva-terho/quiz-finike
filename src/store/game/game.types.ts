export enum GAME_ACTION_TYPES {
  ADD_GAME = 'game/ADD_GAME',
  ADD_TEAM = 'game/ADD_TEAM',
  UPLOAD_GAME_START = 'game/UPLOAD_GAME_START',
  UPLOAD_GAME_SUCCESS = 'game/UPLOAD_GAME_SUCCESS',
  UPLOAD_GAME_FAILED = 'game/UPLOAD_GAME_FAILED',
}

export type Game = {
  date: string;
  teams: Array<Team>;
};
export type Team = {
  name: string;
  result: Array<number>;
  position: number;
};
