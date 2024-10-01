// firebase.js
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC4-lNStY2ewNP6ej41msG34ivFew4v0Zo",
  authDomain: "fir-e23bc.firebaseapp.com",
  projectId: "fir-e23bc",
  storageBucket: "fir-e23bc.appspot.com",
  messagingSenderId: "54776214660",
  appId: "1:54776214660:web:f146e11aa7f2e3c3167ed1",
  measurementId: "G-9FD42R1YDS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
