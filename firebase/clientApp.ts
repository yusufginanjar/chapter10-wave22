// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import { getApp as _getApp, getApps, initializeApp } from "firebase/app";
import { getAuth as _getAuth, onAuthStateChanged as _onAuthStateChanged } from "firebase/auth";
import {signInWithEmailAndPassword as _signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase as _getDatabase, ref as _ref, onValue as _onValue, update as _update } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT04MwsliZA6PQgltRPA9v4Hr8T4IucMY",
  authDomain: "game-asik-f1a97.firebaseapp.com",
  databaseURL: "https://game-asik-f1a97-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "game-asik-f1a97",
  storageBucket: "game-asik-f1a97.appspot.com",
  messagingSenderId: "706326430588",
  appId: "1:706326430588:web:14a00623a4ec770f8b9af9",
  measurementId: "G-53F4G4YLMK"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// if (!getApps().length) {
//   initializeApp(firebaseConfig);
// }

const firebaseIsRunning = () => !!(getApps().length);

export function getApp() {
  if (!firebaseIsRunning()) initializeApp(firebaseConfig);

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

export function signInWithEmailAndPassword(auth, email, password) {
  if (!firebaseIsRunning()) getApp();
    return _signInWithEmailAndPassword(auth, email, password);
}

export function getDatabase() {
  if (!firebaseIsRunning()) getApp();
    return _getDatabase();
}

export function ref(db, path) {
  if (!firebaseIsRunning()) getApp();
    return _ref(db, path);
}

export function onValue(ref, callback) {
  if (!firebaseIsRunning()) getApp();
    return _onValue(ref, callback);
}

export function update(ref, value) {
  if (!firebaseIsRunning()) getApp();
    return _update(ref, value);
}