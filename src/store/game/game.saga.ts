import { takeLatest, all, call, put } from 'typed-redux-saga';
import { addGameDoc, getCurrentUser, getGameDoc, getGamesList } from '~/utils/firebase.utils';
import {
  uploadGameSuccess,
  uploadGameFailed,
  UploadGameStart,
  fetchGamesListSuccess,
  fetchGamesListFailed,
  FetchGameStart,
  fetchGameSuccess,
  fetchGameFailed,
} from './game.action';
import { GAME_ACTION_TYPES } from './game.types';

export function* fetchGamesListStartAsync() {
  try {
    const gamesList = yield* call(getGamesList);
    yield* put(fetchGamesListSuccess(gamesList));
  } catch (error) {
    yield* put(fetchGamesListFailed(error as Error));
  }
}

export function* fetchGameStartAsync({ payload: { date } }: FetchGameStart) {
  try {
    const teams = yield* call(() => getGameDoc(date));
    const newDate = `20${date.slice(0, 2)}-${date.slice(2, 4)}-${date.slice(4, 6)}`;
    yield* put(fetchGameSuccess(newDate, teams));
  } catch (error) {
    yield* put(fetchGameFailed(error as Error));
  }
}

export function* uploadGame({ payload: { date, teams } }: UploadGameStart) {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    const gameDate = date.slice(2).replace(/\D/g, '');
    yield* call(addGameDoc, gameDate, teams);
    yield* put(uploadGameSuccess());
  } catch (error) {
    yield* put(uploadGameFailed(error as Error));
  }
}

export function* onFetchGame() {
  yield* takeLatest(GAME_ACTION_TYPES.FETCH_GAME_START, fetchGameStartAsync);
}
export function* onUploadGameStart() {
  yield* takeLatest(GAME_ACTION_TYPES.UPLOAD_GAME_START, uploadGame);
}

export function* gameSagas() {
  yield* all([call(onFetchGame), call(onUploadGameStart)]);
}
