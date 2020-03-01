import firebase from '../utils/firebase/client';

export default {
  signIn: () => firebase.auth.signInWithPopup(firebase.providers.google),
  signOut: () => firebase.auth.signOut(),
  onChange: (callback) => firebase.auth.onAuthStateChanged(callback),
};
