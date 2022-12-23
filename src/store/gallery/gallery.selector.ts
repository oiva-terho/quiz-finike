import { createSelector } from 'reselect';
import { RootState } from '../store';
import { GalleryState } from './gallery.reducer';

export const selectGalleryReducer = (state: RootState): GalleryState => state.gallery;

export const selectFolders = createSelector([selectGalleryReducer], (gallery) => gallery.folders);
export const selectPhotoDate = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.photoDate,
);
export const selectPhotoLinks = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.photoLinks,
);
export const selectPhotosLoading = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.isLoading,
);
