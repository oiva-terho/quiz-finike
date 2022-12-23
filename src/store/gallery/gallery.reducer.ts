import { AnyAction } from 'redux';
import {
  fetchFoldersSuccess,
  fetchPhotoLinksSuccess,
  clearPhotos,
  fetchPhotoLinksStart,
  fetchPhotoLinksFailed,
  setPhotoDate,
  addBonus,
} from './gallery.action';

export type GalleryState = {
  readonly folders: string[];
  readonly photoLinks: string[];
  readonly photoDate: string;
  readonly isLoading: boolean;
};

const INITIAL_STATE: GalleryState = {
  folders: [],
  photoLinks: [],
  photoDate: '',
  isLoading: false,
};

export const galleryReducer = (state = INITIAL_STATE, action: AnyAction): GalleryState => {
  if (fetchPhotoLinksStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchFoldersSuccess.match(action)) {
    return { ...state, folders: action.payload };
  }
  if (fetchPhotoLinksSuccess.match(action)) {
    return { ...state, photoLinks: action.payload, isLoading: false };
  }
  if (addBonus.match(action)) {
    return { ...state, photoLinks: [...state.photoLinks, ...action.payload] };
  }
  if (fetchPhotoLinksFailed.match(action)) {
    return { ...state, isLoading: false };
  }
  if (clearPhotos.match(action)) {
    return { ...state, photoLinks: [], photoDate: '' };
  }
  if (setPhotoDate.match(action)) {
    return { ...state, photoDate: action.payload };
  }
  return state;
};
