import { AnyAction } from 'redux';
import { fetchFoldersSuccess, fetchPhotoLinksSuccess } from './gallery.action';

export type GalleryState = {
  readonly folders: string[];
  readonly photoLinks: string[];
};

const INITIAL_STATE: GalleryState = {
  folders: [],
  photoLinks: [],
};

export const galleryReducer = (state = INITIAL_STATE, action: AnyAction): GalleryState => {
  if (fetchFoldersSuccess.match(action)) {
    return { ...state, folders: action.payload };
  }
  if (fetchPhotoLinksSuccess.match(action)) {
    return { ...state, photoLinks: action.payload };
  }
  return state;
};
