import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyANnkepje0fpWihSPMo9_SzFsVzptOrqCw",
    authDomain: "dev-lu.firebaseapp.com",
    projectId: "dev-lu",
    storageBucket: "dev-lu.appspot.com",
    messagingSenderId: "375571697980",
    appId: "1:375571697980:web:97f2e691990e33dac50e39"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);