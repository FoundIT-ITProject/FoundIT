// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import * as firebaseAuth from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBi8Ftc65O5jQ5VzzNQzOVO6gwaztegooA",
  authDomain: "founditdb.firebaseapp.com",
  projectId: "founditdb",
  storageBucket: "founditdb.appspot.com",
  messagingSenderId: "65785290312",
  appId: "1:65785290312:web:50876d0dc45733cd74c27d",
  measurementId: "G-0BSLRV7VVV"
};

// Initialize Firebase
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const FIREBASE_APP = initializeApp(firebaseConfig);
const auth = initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export const listFiles = async () => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};

export const uploadToFirebase = async (
  uri: any,
  name: any,
  onProgress: any
) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
