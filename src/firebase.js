import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyAof0XZ6-pC5zs5iSpssnw0jb3tCqdF4sk",
    authDomain: "fb-crud-96f40.firebaseapp.com",
    databaseURL: "https://fb-crud-96f40.firebaseio.com",
    projectId: "fb-crud-96f40",
    storageBucket: "fb-crud-96f40.appspot.com",
    messagingSenderId: "810576662908",
    appId: "1:810576662908:web:b95682b2be53685af9d4f9"
  };
  // Initialize Firebase
  
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();