// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgQNAl3vLg3yAJu7TpdAGzKQSyT5RtADE",
  authDomain: "foundit-56d34.firebaseapp.com",
  databaseURL:
    "https://foundit-56d34-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foundit-56d34",
  storageBucket: "foundit-56d34.appspot.com",
  messagingSenderId: "967774181766",
  appId: "1:967774181766:web:39b7422fb2426c0a867407",
  measurementId: "G-9MBGGWCVBR",
};

// Initialize Firebase
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const FIREBASE_APP = initializeApp(firebaseConfig);
const auth = initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
