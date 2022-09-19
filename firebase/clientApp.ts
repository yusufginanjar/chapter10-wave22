// Import the functions you need from the SDKs you need
import { getApp as _getApp, getApps, initializeApp } from "firebase/app";
import { getAuth as _getAuth, onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT04MwsliZA6PQgltRPA9v4Hr8T4IucMY",
  authDomain: "game-asik-f1a97.firebaseapp.com",
  projectId: "game-asik-f1a97",
  storageBucket: "game-asik-f1a97.appspot.com",
  messagingSenderId: "706326430588",
  appId: "1:706326430588:web:14a00623a4ec770f8b9af9",
  measurementId: "G-53F4G4YLMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const firebaseIsRunning = () => !!(getApps().length);

export function getApp() {
  if (!firebaseIsRunning()) app;

  return _getApp();
}

export function getAuth() {
  if (!firebaseIsRunning()) getApp();
    return _getAuth();
}


export function onAuthStateChanged(auth, callback) {
  if (!firebaseIsRunning()) getApp();
    return _onAuthStateChanged(auth, callback);
}