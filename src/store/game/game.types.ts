export enum GAME_ACTION_TYPES {
  ADD_DATE = 'game/ADD_DATE',
  SET_TEAMS = 'game/SET_TEAMS',
  CLEAR_GAME = 'game/CLEAR_GAME',
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
  sum: number;
  position: number;
};
