// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf8FWFiohRg7hpO5u2GkqmhnAk0qSE4Z8",
  authDomain: "firebsae-next-auth.firebaseapp.com",
  projectId: "firebsae-next-auth",
  storageBucket: "firebsae-next-auth.appspot.com",
  messagingSenderId: "804445792649",
  appId: "1:804445792649:web:288c903ebda73df4059958"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);