// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpVZS1J5tjzwCVvWQEAqes0E0-kKi-U44",
  authDomain: "xpedition-16e93.firebaseapp.com",
  projectId: "xpedition-16e93",
  storageBucket: "xpedition-16e93.appspot.com",
  messagingSenderId: "314054370438",
  appId: "1:314054370438:web:635e8eff40fc2c710c5d07",
  measurementId: "G-CFHCGNERY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();