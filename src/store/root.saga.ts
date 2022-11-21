import { all, call } from 'typed-redux-saga';

import { userSagas } from './user/user.saga';
import { gallerySagas } from './gallery/gallery.saga';

export function* rootSaga() {
  yield* all([call(userSagas), call(gallerySagas)]);
}
