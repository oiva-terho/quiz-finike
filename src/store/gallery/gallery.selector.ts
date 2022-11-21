import { createSelector } from 'reselect';
import { RootState } from '../store';
import { GalleryState } from './gallery.reducer';

export const selectGalleryReducer = (state: RootState): GalleryState => state.gallery;

export const selectFolders = createSelector(selectGalleryReducer, (gallery) => gallery.folders);
