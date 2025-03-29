import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWhN7gTzk8BQInKX2w0YWRGvByQ3Au4Ao",
  authDomain: "newsmonkey-e77e4.firebaseapp.com",
  projectId: "newsmonkey-e77e4",
  storageBucket: "newsmonkey-e77e4.firebasestorage.app",
  messagingSenderId: "596450209584",
  appId: "1:596450209584:web:87a700345872c77d65e2f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export {createUserWithEmailAndPassword,signInWithEmailAndPassword}