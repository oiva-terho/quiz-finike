import { takeLatest, all, call, put } from 'typed-redux-saga';
import { addGameDoc, getCurrentUser } from '~/utils/firebase.utils';
import { uploadGameSuccess, uploadGameFailed, UploadGameStart } from './game.action';
import { GAME_ACTION_TYPES } from './game.types';

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

export function* onUploadGameStart() {
  yield* takeLatest(GAME_ACTION_TYPES.UPLOAD_GAME_START, uploadGame);
}

export function* gameSagas() {
  yield* all([call(onUploadGameStart)]);
}
