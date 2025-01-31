import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDo0Df6FtantRpotcWAcPv-Pm190mr6mn8",
  authDomain: "movie-library-login.firebaseapp.com",
  projectId: "movie-library-login",
  storageBucket: "movie-library-login.appspot.com",  // Fix incorrect domain
  messagingSenderId: "357515471381",
  appId: "1:357515471381:web:ba18e8adcad24d75de7c1c",
  measurementId: "G-EZSPT7T0X2",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);