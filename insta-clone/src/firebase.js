import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDskXClD98pBRZlwHvEVJ82fIO9Hu8nvLM",
    authDomain: "insta-clone-react-37942.firebaseapp.com",
    projectId: "insta-clone-react-37942",
    storageBucket: "insta-clone-react-37942.appspot.com",
    messagingSenderId: "56289671644",
    appId: "1:56289671644:web:c3e592b53aab731dd7f719",
    measurementId: "G-SY6FLZJFP7"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };