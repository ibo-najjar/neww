import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBNIuG6cm8kN9eGIseyWSWqa-DT6a5euvg",
  authDomain: "crud-img-8b247.firebaseapp.com",
  projectId: "crud-img-8b247",
  storageBucket: "crud-img-8b247.appspot.com",
  messagingSenderId: "989542654251",
  appId: "1:989542654251:web:e89197692ce3d09a5d656e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(app);

export const storage = getStorage(app);

