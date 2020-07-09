import firebase from 'firebase'

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBCGUH7lP_dbFBT99EnqsLGGBFWn5PIhSk",
    authDomain: "testcesimeteo.firebaseapp.com",
    databaseURL: "https://testcesimeteo.firebaseio.com",
    projectId: "testcesimeteo",
    storageBucket: "testcesimeteo.appspot.com",
    messagingSenderId: "79665149858",
    appId: "1:79665149858:web:ee16bd194edbd21bcc64fb",
  };

firebase.initializeApp(FIREBASE_CONFIG);

export const DB = firebase.firestore();