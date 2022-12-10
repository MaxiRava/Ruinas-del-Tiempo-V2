// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5N2tpQWGaE-39kBJ2mjoztnDJWyO-Peg",
  authDomain: "ruinas-del-tiempo.firebaseapp.com",
  projectId: "ruinas-del-tiempo",
  storageBucket: "ruinas-del-tiempo.appspot.com",
  messagingSenderId: "190667805552",
  appId: "1:190667805552:web:9cdcdc91c47bbb52dcb5b5",
  measurementId: "G-97XXMMFSHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);