// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsvRg6qV88kU7ifgnYCp2qNCfSfbSjDls",
    authDomain: "scpdb1.firebaseapp.com",
    projectId: "scpdb1",
    storageBucket: "scpdb1.appspot.com",
    messagingSenderId: "869072237921",
    appId: "1:869072237921:web:70bea451e29b11411a8120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

export { db, storage };