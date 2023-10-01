import { GALLERY_ACTION_TYPES } from './gallery.types';
import { createAction, ActionWithPayload, Action, withMatcher } from '../../utils/reducer.utils';

// Types
export type FetchFoldersStart = Action<GALLERY_ACTION_TYPES.FETCH_FOLDERS_START>;
export type FetchFoldersSuccess = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_FOLDERS_SUCCESS,
  string[]
>;
export type FetchFolders = ActionWithPayload<GALLERY_ACTION_TYPES.FETCH_FOLDERS_FAILED, Error>;
export type SetPhotoDate = ActionWithPayload<GALLERY_ACTION_TYPES.SET_PHOTO_DATE, string>;
export type FetchPhotoLinksStart = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_START,
  { date: string; bonus?: boolean }
>;
export type FetchPhotoLinksSuccess = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_SUCCESS,
  string[]
>;
export type FetchPhotoLinksFailed = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_FAILED,
  Error
>;
export type AddBonus = ActionWithPayload<GALLERY_ACTION_TYPES.ADD_BONUS, string[]>;
export type CleanPhotos = Action<GALLERY_ACTION_TYPES.CLEAR_PHOTO_LINKS>;

// Actions

export const fetchFoldersStart = withMatcher(
  (): FetchFoldersStart => createAction(GALLERY_ACTION_TYPES.FETCH_FOLDERS_START),
);
export const fetchFoldersSuccess = withMatcher(
  (foldersList: string[]): FetchFoldersSuccess =>
    createAction(GALLERY_ACTION_TYPES.FETCH_FOLDERS_SUCCESS, foldersList),
);
export const fetchFoldersFailed = withMatcher(
  (error: Error): FetchFolders => createAction(GALLERY_ACTION_TYPES.FETCH_FOLDERS_FAILED, error),
);
export const setPhotoDate = withMatcher(
  (date: string): SetPhotoDate => createAction(GALLERY_ACTION_TYPES.SET_PHOTO_DATE, date),
);
export const fetchPhotoLinksStart = withMatcher(
  (date: string, bonus?: boolean): FetchPhotoLinksStart =>
    createAction(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_START, { date, bonus }),
);
export const fetchPhotoLinksSuccess = withMatcher(
  (photoLinks: string[]): FetchPhotoLinksSuccess =>
    createAction(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_SUCCESS, photoLinks),
);
export const fetchPhotoLinksFailed = withMatcher(
  (error: Error): FetchPhotoLinksFailed =>
    createAction(GALLERY_ACTION_TYPES.FETCH_PHOTO_LINKS_FAILED, error),
);
export const addBonus = withMatcher(
  (photoLinks: string[]): AddBonus => createAction(GALLERY_ACTION_TYPES.ADD_BONUS, photoLinks),
);
export const clearPhotos = withMatcher(
  (): CleanPhotos => createAction(GALLERY_ACTION_TYPES.CLEAR_PHOTO_LINKS),
);
