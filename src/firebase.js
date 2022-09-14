// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

// Initialize Firebase in your app
const firebaseConfig = {
    apiKey: "AIzaSyBVUHCLFpmMtUwcSJBGvX2y7yvA7UsZxVg",
    authDomain: "goodfoodfipu.firebaseapp.com",
    projectId: "goodfoodfipu",
    storageBucket: "goodfoodfipu.appspot.com",
    messagingSenderId: "435221032406",
    appId: "1:435221032406:web:43828e873131b588f60877"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

export { firebase, db, storage };