export enum GAME_ACTION_TYPES {
  ADD_DATE = 'game/ADD_DATE',
  ADD_TEAM = 'game/ADD_TEAM',
  UPLOAD_GAME_START = 'game/UPLOAD_GAME_START',
  UPLOAD_GAME_SUCCESS = 'game/UPLOAD_GAME_SUCCESS',
  UPLOAD_GAME_FAILED = 'game/UPLOAD_GAME_FAILED',
}

export type Game = {
  date: string;
  teams: Team[];
};
export type Team = {
  name: string;
  result: Array<number>;
  position: number;
};
