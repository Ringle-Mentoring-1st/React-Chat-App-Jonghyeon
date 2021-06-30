import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  appId: process.env.REACT_APP_appId,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  measurementId: process.env.REACT_APP_measurementId,
});

const db = app.firestore();

const nowSecond = firebase.firestore.Timestamp.now().seconds;

export { db, app, firebase, nowSecond };
