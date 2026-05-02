import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRAoEYCWPPFtvstnu2fha2W4rdbbSs4jg",
  authDomain: "financetracker-63abc.firebaseapp.com",
  projectId: "financetracker-63abc",
  storageBucket: "financetracker-63abc.firebasestorage.app",
  messagingSenderId: "751266714762",
  appId: "1:751266714762:web:d6f37923a81d64847e4973",
  measurementId: "G-ET2VNDV2H7"
};

// Inisialisasi Firebase (Cukup sekali saja)
const app = initializeApp(firebaseConfig);

// Export agar bisa dipakai di Login.jsx dan Dashboard.jsx
export const auth = getAuth(app);
export const db = getFirestore(app);