import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD5f6NH_g2ha12vO6fAr1mXM3ThnbESLD4",
  authDomain: "petmedicalrecords-b2a57.firebaseapp.com",
  projectId: "petmedicalrecords-b2a57",
  storageBucket: "petmedicalrecords-b2a57.firebasestorage.app",
  messagingSenderId: "942808026458",
  appId: "1:942808026458:web:f7eb94730f5c88095ab763",
  measurementId: "G-LMVP2KYV9B"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)