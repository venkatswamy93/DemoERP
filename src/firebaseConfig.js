// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFlYRDKVh8BBhCx2J64x8Hb4qRAyW2UD0",
  authDomain: "interiordesignerp-30c7e.firebaseapp.com",
  projectId: "interiordesignerp-30c7e",
  storageBucket: "interiordesignerp-30c7e.firebasestorage.app",
  messagingSenderId: "596250714879",
  appId: "1:596250714879:web:c3052dd26fb94a68c8a2ca",
  measurementId: "G-34CBFYN0DW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,setDoc, db, collection, getDocs, addDoc, updateDoc, doc };