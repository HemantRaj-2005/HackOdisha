// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "iic-task-auth.firebaseapp.com",
  projectId: "iic-task-auth",
  storageBucket: "iic-task-auth.appspot.com",
  messagingSenderId: "150492589922",
  appId: "1:150492589922:web:50b887b1f77da034d0c63b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);