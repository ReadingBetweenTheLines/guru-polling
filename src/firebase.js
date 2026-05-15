// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfkMvEGNgaBa-ypoI4cbWYBzB8w7dVPR8",
  authDomain: "teacher-poll.firebaseapp.com",
  projectId: "teacher-poll",
  storageBucket: "teacher-poll.firebasestorage.app",
  messagingSenderId: "686173492519",
  appId: "1:686173492519:web:58e556fa22cbbfbe638502",
  measurementId: "G-EZNHB2RXPX"
};

// 1. Initialize the core Firebase App
const app = initializeApp(firebaseConfig);

// 2. Export the Auth tool (for Google Login)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 3. Export the Firestore tool (for saving the votes)
export const db = getFirestore(app);

