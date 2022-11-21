import { GALLERY_ACTION_TYPES } from './gallery.types';
import { createAction, ActionWithPayload, Action, withMatcher } from '../../utils/reducer.utils';

// Types

export type FetchFoldersSuccess = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_FOLDERS_SUCCESS,
  string[]
>;
export type FetchFolders = ActionWithPayload<GALLERY_ACTION_TYPES.FETCH_FOLDERS_FAILED, Error>;

export type FetchPhotoLinksStart = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_START,
  { date: string; quantity: number }
>;
export type FetchPhotoLinksSuccess = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_SUCCESS,
  string[]
>;
export type FetchPhotoLinksFailed = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_FAILED,
  Error
>;
export type CleanPhotos = Action<GALLERY_ACTION_TYPES.CLEAR_PHOTO_LINKS>;

// Actions

export const fetchFoldersSuccess = withMatcher(
  (foldersList: string[]): FetchFoldersSuccess =>
    createAction(GALLERY_ACTION_TYPES.FETCH_FOLDERS_SUCCESS, foldersList),
);
export const fetchFoldersFailed = withMatcher(
  (error: Error): FetchFolders => createAction(GALLERY_ACTION_TYPES.FETCH_FOLDERS_FAILED, error),
);
export const fetchPhotoLinksStart = withMatcher(
  (date: string, quantity: number): FetchPhotoLinksStart =>
    createAction(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_START, { date, quantity }),
);
export const fetchPhotoLinksSuccess = withMatcher(
  (photoLinks: string[]): FetchPhotoLinksSuccess =>
    createAction(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_SUCCESS, photoLinks),
);
export const fetchPhotoLinksFailed = withMatcher(
  (error: Error): FetchPhotoLinksFailed =>
    createAction(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_FAILED, error),
);
export const clearPhotos = withMatcher(
  (): CleanPhotos => createAction(GALLERY_ACTION_TYPES.CLEAR_PHOTO_LINKS),
);
