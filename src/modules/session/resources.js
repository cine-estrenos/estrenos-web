import firebase from 'utils/firebase/client';

export default {
  signOut: () => firebase.auth.signOut(),
  signIn: () => firebase.auth.signInWithPopup(firebase.providers.google),
  onChange: (callback) => firebase.auth.onAuthStateChanged(callback),
};
