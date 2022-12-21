import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase.utils';
import {
  signInSuccess,
  signOutSuccess,
  signOutFailed,
  signInFailed,
  signUpFailed,
  clearError,
  emailSignInStart,
  googleSignInStart,
  signUpStart,
} from './user.action';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (
    emailSignInStart.match(action) ||
    googleSignInStart.match(action) ||
    signUpStart.match(action)
  ) {
    return { ...state, isLoading: true };
  }
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, isLoading: false };
  }
  if (signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  if (clearError.match(action)) {
    return { ...state, error: null };
  }
  return state;
};
