// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArUwh7fRccjd_jpc_CvAvkDkxN1MMW1ZA",
  authDomain: "mysite-c3d17.firebaseapp.com",
  projectId: "mysite-c3d17",
  storageBucket: "mysite-c3d17.firebasestorage.app",
  messagingSenderId: "593948782245",
  appId: "1:593948782245:web:43a5d5918d01549f3ae74c",
  measurementId: "G-EZQNJWW49P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);