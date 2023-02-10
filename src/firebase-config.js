import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJlEE9yExuD5EMbXcocFqcBtHFbtSOIG0",
    authDomain: "testprosjekt-998ef.firebaseapp.com",
    projectId: "testprosjekt-998ef",
    storageBucket: "testprosjekt-998ef.appspot.com",
    messagingSenderId: "487529280599",
    appId: "1:487529280599:web:a927b1463cabfca20e5f12",
    measurementId: "G-SW30MN3VSY"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);