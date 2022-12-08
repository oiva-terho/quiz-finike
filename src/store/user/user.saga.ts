import { User } from 'firebase/auth';
import { takeLatest, all, call, put } from 'typed-redux-saga';

import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  SignUpStart,
  signUpSuccess,
  signUpFailed,
  SignUpSuccess,
  EmailSignInStart,
  AddTeamName,
} from './user.action';
import {
  getCurrentUser,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signOutUser,
  createAuthUserWithEmailAndPassword,
  signInUserWithEmailAndPassword,
  uploadTeamName,
} from '../../utils/firebase.utils';
import { fetchFoldersStartAsync } from '../gallery/gallery.saga';
import { clearPhotos } from '../gallery/gallery.action';
import { fetchGamesListStartAsync } from '../game/game.saga';

export function* getSnapshotFromUserAuth(userAuth: User) {
  try {
    const userSnapshot = yield* call(createUserDocFromAuth, userAuth);
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
      yield* call(fetchGamesListStartAsync);
      yield* call(fetchFoldersStartAsync);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(signInUserWithEmailAndPassword, email, password);
    if (userCredential) {
      yield* call(getSnapshotFromUserAuth, userCredential.user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(clearPhotos());
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password } }: SignUpStart) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      yield* put(signUpSuccess(userCredential.user));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user } }: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user);
}

export function* addTeamName({ payload: teamName }: AddTeamName) {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(uploadTeamName, userAuth, teamName);
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

// Listeners

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onAddTeamName() {
  yield* takeLatest(USER_ACTION_TYPES.ADD_TEAM_NAME_START, addTeamName);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onAddTeamName),
  ]);
}
