import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAM0otKpMVpp5hi3k_L_6HIZTQv1RYIHj8",
  authDomain: "canteen-management-1188c.firebaseapp.com",
  databaseURL: "https://canteen-management-1188c-default-rtdb.firebaseio.com",
  projectId: "canteen-management-1188c",
  storageBucket: "canteen-management-1188c.appspot.com",
  messagingSenderId: "1083838316376",
  appId: "1:1083838316376:web:d801eabf5f608a27a06f2d",
  measurementId: "G-LPKVHZLD06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const storage = getStorage(app)
export {createUserWithEmailAndPassword,signInWithEmailAndPassword,storage}