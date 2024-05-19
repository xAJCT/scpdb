// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDU8Uayep49pHW81YTOdha9ZS-fi9pZNqU",
    authDomain: "scp-db-10c71.firebaseapp.com",
    projectId: "scp-db-10c71",
    storageBucket: "scp-db-10c71.appspot.com",
    messagingSenderId: "651252094657",
    appId: "1:651252094657:web:ea6b1d01ac4d9052a26640"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

export { db, storage };