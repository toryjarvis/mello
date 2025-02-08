// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS-zGCUfJYChuxE5BRVW9WtiJiY-BGRuY",
  authDomain: "mello-d269d.firebaseapp.com",
  projectId: "mello-d269d",
  storageBucket: "mello-d269d.firebasestorage.app",
  messagingSenderId: "225881304051",
  appId: "1:225881304051:web:c76ecc39da496454a88086",
  measurementId: "G-3BX943D11R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;