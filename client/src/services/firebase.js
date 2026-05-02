// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRAoEYCWPPFtvstnu2fha2W4rdbbSs4jg",
  authDomain: "financetracker-63abc.firebaseapp.com",
  projectId: "financetracker-63abc",
  storageBucket: "financetracker-63abc.firebasestorage.app",
  messagingSenderId: "751266714762",
  appId: "1:751266714762:web:d6f37923a81d64847e4973",
  measurementId: "G-ET2VNDV2H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);