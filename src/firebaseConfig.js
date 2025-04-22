// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_hzVrSggCOv2wNQc1xZW_qG4vcNqmzQ8",
  authDomain: "erpinteriorcrm.firebaseapp.com",
  projectId: "erpinteriorcrm",
  storageBucket: "erpinteriorcrm.firebasestorage.app",
  messagingSenderId: "673356802746",
  appId: "1:673356802746:web:849d2b1850f9f71350f083",
  measurementId: "G-T3W2P752CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app,'');
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword,setDoc, db, collection, getDocs, addDoc, updateDoc, doc,getDoc  };