// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVn-e3QSGZ7JCtBQTgPw-dx5PTpcXWEdc",
  authDomain: "skillmart-f6641.firebaseapp.com",
  projectId: "skillmart-f6641",
  storageBucket: "skillmart-f6641.firebasestorage.app",
  messagingSenderId: "468286240638",
  appId: "1:468286240638:web:c46d015ab8e6ba6e50a52f",
  measurementId: "G-SPERTWEFP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();