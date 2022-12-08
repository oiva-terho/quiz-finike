export enum GAME_ACTION_TYPES {
  ADD_DATE = 'game/ADD_DATE',
  SET_TEAMS = 'game/SET_TEAMS',
  CLEAR_GAME = 'game/CLEAR_GAME',
  FETCH_GAMES_LIST_START = 'game/FETCH_GAMES_LIST_START',
  FETCH_GAMES_LIST_SUCCESS = 'game/FETCH_GAMES_LIST_SUCCESS',
  FETCH_GAMES_LIST_FAILED = 'game/FETCH_GAMES_LIST_FAILED',
  FETCH_GAME_START = 'game/FETCH_GAME_START',
  FETCH_GAME_SUCCESS = 'game/FETCH_GAME_SUCCESS',
  FETCH_GAME_FAILED = 'game/FETCH_GAME_FAILED',
  UPLOAD_GAME_START = 'game/UPLOAD_GAME_START',
  UPLOAD_GAME_SUCCESS = 'game/UPLOAD_GAME_SUCCESS',
  UPLOAD_GAME_FAILED = 'game/UPLOAD_GAME_FAILED',
}

export type Game = {
  date: string;
  teams: Team[];
  gamesList?: string[];
};
export type Team = {
  name: string;
  result: Array<number>;
  sum: number;
  position: number;
};
