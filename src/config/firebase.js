// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlLmHlbFeFkxfiMpPz0pFBaJitzu_qbqA",
    authDomain: "cleaners-app.firebaseapp.com",
    databaseURL: "https://cleaners-app-default-rtdb.firebaseio.com",
    projectId: "cleaners-app",
    storageBucket: "cleaners-app.appspot.com",
    messagingSenderId: "1064177635276",
    appId: "1:1064177635276:web:066c4d30aed03d07dd1769",
    measurementId: "G-ZXLY82VPEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;