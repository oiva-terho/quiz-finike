import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase.utils';
import {
  signInSuccess,
  signOutSuccess,
  signOutFailed,
  signInFailed,
  signUpFailed,
  clearError,
} from './user.action';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly noTeamName: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  noTeamName: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
    return { ...state, error: action.payload };
  }
  if (clearError.match(action)) {
    return { ...state, error: null };
  }
  return state;
};
