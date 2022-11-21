import { AnyAction } from 'redux';
import {
  fetchFoldersSuccess,
  fetchPhotoLinksSuccess,
  clearPhotos,
  fetchPhotoLinksStart,
  fetchPhotoLinksFailed,
} from './gallery.action';

export type GalleryState = {
  readonly folders: string[];
  readonly photoLinks: string[];
  readonly isLoading: boolean;
};

const INITIAL_STATE: GalleryState = {
  folders: [],
  photoLinks: [],
  isLoading: false,
};

export const galleryReducer = (state = INITIAL_STATE, action: AnyAction): GalleryState => {
  if (fetchPhotoLinksStart.match(action)) {
    return { ...state, photoLinks: [], isLoading: true };
  }
  if (fetchFoldersSuccess.match(action)) {
    return { ...state, folders: action.payload };
  }
  if (fetchPhotoLinksSuccess.match(action)) {
    return { ...state, photoLinks: action.payload, isLoading: false };
  }
  if (fetchPhotoLinksFailed.match(action)) {
    return { ...state, isLoading: false };
  }
  if (clearPhotos.match(action)) {
    return { ...state, photoLinks: [] };
  }
  return state;
};
