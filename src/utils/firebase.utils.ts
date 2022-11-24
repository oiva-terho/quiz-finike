import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot,
  collection,
  writeBatch,
  getDocs,
  query,
} from 'firebase/firestore';

import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { Game, Team } from '~/store/game/game.types';

// Firebase config

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_MSGR_SENDER_ID,
  appId: import.meta.env.VITE_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Firebase authorisation

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  if (callback) onAuthStateChanged(auth, callback);
};

// Firestore authirization

export const db = getFirestore();

export type UserData = {
  createdAt: Date;
  teamName: string;
  email: string;
};

export const createUserDocFromAuth = async (
  userAuth: User,
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) return userSnapshot as QueryDocumentSnapshot<UserData>;

  const { email } = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      email,
      createdAt,
    });
  } catch (error) {
    console.log('error creating the user', error);
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};

export const uploadTeamName = async (userAuth: User, teamName: string) => {
  try {
    const userDocRef = doc(db, 'users', userAuth.uid);
    await setDoc(userDocRef, { teamName }, { merge: true });
  } catch (error) {
    console.log('error adding team name', error);
  }
};

// Firebase games

export const addGameDoc = async <T extends Team>(date: string, teams: T[]) => {
  try {
    const userDocRef = doc(db, 'games', date);
    await setDoc(userDocRef, { teams }, { merge: true });
  } catch (error) {
    console.log('error adding team name', error);
  }
};

export const getGameDoc = async (): Promise<Game[]> => {
  const gameRef = collection(db, 'categories');
  const querySnapshot = await getDocs(query(gameRef));
  const gameMap = querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Game);
  return gameMap;
};

// Firebase storage

const storage = getStorage(firebaseApp);

export const getQuizDates = async () => {
  const storageRef = ref(storage);
  const res = await listAll(storageRef);
  return await Promise.all(res.prefixes.map((ref) => ref.name));
};

export const getPhotoLinks = async (date: string) => {
  const folderRef = ref(storage, date);
  const res = await listAll(folderRef);
  return await Promise.all(
    res.items.map(async (itemRef) => {
      return await getDownloadURL(itemRef);
    }),
  );
};
