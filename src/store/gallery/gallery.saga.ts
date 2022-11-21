import { takeLatest, all, call, put } from 'typed-redux-saga';
import { getQuizDates } from '~/utils/firebase.utils';
import { fetchFoldersSuccess, fetchFoldersFailed } from './gallery.action';
import { GALLERY_ACTION_TYPES } from './gallery.types';

export function* fetchFoldersStartAsync() {
  try {
    const foldersList = yield* call(getQuizDates);
    yield* put(fetchFoldersSuccess(foldersList));
  } catch (error) {
    yield* put(fetchFoldersFailed(error as Error));
  }
}

export function* onFetchFolders() {
  yield* takeLatest(GALLERY_ACTION_TYPES.FETCH_FOLDERS_START, fetchFoldersStartAsync);
}

export function* gallerySagas() {
  yield* all([call(onFetchFolders)]);
}
