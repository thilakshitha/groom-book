
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsYabdPRZzTviXlK32EtbM0w5BMJ8Rg1M",
  authDomain: "groom-d153b.firebaseapp.com",
  projectId: "groom-d153b",
  storageBucket: "groom-d153b.firebasestorage.app",
  messagingSenderId: "888430269526",
  appId: "1:888430269526:web:2af670f0b0177cccb797f7",
  measurementId: "G-FFQMBDE9FC"
};

// IMPORTANT: Replace the above configuration with your Firebase project configuration
// You can find this in your Firebase project settings

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
