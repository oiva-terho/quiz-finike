import { GALLERY_ACTION_TYPES } from './gallery.types';
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer.utils';

export type FetchFoldersStart = Action<GALLERY_ACTION_TYPES.FETCH_FOLDERS_START>;
export type FetchFoldersSuccess = ActionWithPayload<
  GALLERY_ACTION_TYPES.FETCH_FOLDERS_SUCCESS,
  string[]
>;
export type FetchFolders = ActionWithPayload<GALLERY_ACTION_TYPES.FETCH_FOLDERS_FAILED, Error>;

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
