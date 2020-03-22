import firebase from 'gatsby-plugin-firebase';

import { getFirebaseCredentials } from './credentials';

const credentials = getFirebaseCredentials();

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
    get: (target, name) => {
      if (!firebase.apps.length) firebase.initializeApp(credentials);
      return target[name];
    },
  },
);
