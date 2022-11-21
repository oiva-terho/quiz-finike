import { AnyAction } from 'redux';
import { fetchFoldersSuccess } from './gallery.action';

export type GalleryState = {
  readonly folders: string[];
};

const INITIAL_STATE: GalleryState = {
  folders: [],
};

export const galleryReducer = (state = INITIAL_STATE, action: AnyAction): GalleryState => {
  if (fetchFoldersSuccess.match(action)) {
    return { ...state, folders: action.payload };
  }
  return state;
};
