import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDn5ziS_8xS_wUBP-Y4ssKZzwKnGnU9eok",
    authDomain: "dev-lulu.firebaseapp.com",
    projectId: "dev-lulu",
    storageBucket: "dev-lulu.appspot.com",
    messagingSenderId: "388890148024",
    appId: "1:388890148024:web:d0153bc2bb9c70672b484d"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);