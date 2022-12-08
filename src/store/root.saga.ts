import { all, call } from 'typed-redux-saga';

import { userSagas } from './user/user.saga';
import { gallerySagas } from './gallery/gallery.saga';
import { gameSagas } from './game/game.saga';

export function* rootSaga() {
  yield* all([call(userSagas), call(gallerySagas), call(gameSagas)]);
}
