// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbyHjlECMMGqJSmL4G6UUbfJq9wo1hdSM",
  authDomain: "meuprojeto-58403.firebaseapp.com",
  projectId: "meuprojeto-58403",
  storageBucket: "meuprojeto-58403.appspot.com",
  messagingSenderId: "854182329569",
  appId: "1:854182329569:web:968ecc00321dd699c9cba0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bancoExterno=getFirestore(app);
export {bancoExterno};