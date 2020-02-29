import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const {
  GATSBY_FIREBASE_API_KEY,
  GATSBY_FIREBASE_AUTH_DOMAIN,
  GATSBY_FIREBASE_DATABASE_URL,
  GATSBY_FIREBASE_PROJECT_ID,
  GATSBY_FIREBASE_STORAGE_BUCKET,
  GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  GATSBY_FIREBASE_APP_ID,
} = process.env;

export default new Proxy(
  {
    get database() {
      return firebase.firestore();
    },
    get auth() {
      return firebase.auth();
    },
    providers: {
      get google() {
        return new firebase.auth.GoogleAuthProvider();
      },
    },
  },
  {
    get: function(target, name) {
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: GATSBY_FIREBASE_API_KEY,
          authDomain: GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: GATSBY_FIREBASE_DATABASE_URL,
          projectId: GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: GATSBY_FIREBASE_APP_ID,
        });
      }

      return target[name];
    },
  },
);
