// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDLYe72BP3fCQme92AJ_EXhyWoDP-B5HNw",

  authDomain: "Zed-files.firebaseapp.com",

  projectId: "Zed-files",

  storageBucket: "Zed-files.appspot.com",

  messagingSenderId: "139787627141",

  appId: "1:139787627141:web:07f3fb4c8a1b49c2b3d7ec",

  measurementId: "G-Z098B4VGYC",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const storage = getStorage(app);
