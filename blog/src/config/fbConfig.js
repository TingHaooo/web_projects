import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDQ59z2xSLiG3bD6biDfKMVnFBi1JPMxyQ",
  authDomain: "bolg-9f83c.firebaseapp.com",
  databaseURL: "https://bolg-9f83c.firebaseio.com",
  projectId: "bolg-9f83c",
  storageBucket: "bolg-9f83c.appspot.com",
  messagingSenderId: "95542097958"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true});

export default firebase
