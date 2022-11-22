import { takeLatest, all, call, put } from 'typed-redux-saga';
import { getPhotoLinks, getQuizDates } from '~/utils/firebase.utils';
import {
  fetchFoldersSuccess,
  fetchFoldersFailed,
  fetchPhotoLinksSuccess,
  fetchPhotoLinksFailed,
  FetchPhotoLinksStart,
} from './gallery.action';
import { GALLERY_ACTION_TYPES } from './gallery.types';

export function* fetchFoldersStartAsync() {
  try {
    const foldersList = yield* call(getQuizDates);
    yield* put(fetchFoldersSuccess(foldersList));
  } catch (error) {
    yield* put(fetchFoldersFailed(error as Error));
  }
}

export function* fetchPhotoLinksStartAsync({ payload: { date } }: FetchPhotoLinksStart) {
  try {
    const photoLinks = yield* call(() => getPhotoLinks(date));
    yield* put(fetchPhotoLinksSuccess(photoLinks));
  } catch (error) {
    yield* put(fetchPhotoLinksFailed(error as Error));
  }
}

export function* onFetchPhotoLinks() {
  yield* takeLatest(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_START, fetchPhotoLinksStartAsync);
}

export function* gallerySagas() {
  yield* all([call(onFetchPhotoLinks)]);
}
