// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ_ZPi6BMEQrKClaN4xKoHJg0GIde4r7k",
  authDomain: "pxii-ab8bb.firebaseapp.com",
  projectId: "pxii-ab8bb",
  storageBucket: "pxii-ab8bb.firebasestorage.app",
  messagingSenderId: "868815058815",
  appId: "1:868815058815:web:ec7a2b401aa4a6ea218c4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
