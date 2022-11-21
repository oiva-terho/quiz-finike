import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { galleryReducer } from './gallery/gallery.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  gallery: galleryReducer,
});
