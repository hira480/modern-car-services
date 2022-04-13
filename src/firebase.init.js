// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUHEAW6xuEmS6rpLrePIeaycee9H_8_Lg",
    authDomain: "modern-car-services.firebaseapp.com",
    projectId: "modern-car-services",
    storageBucket: "modern-car-services.appspot.com",
    messagingSenderId: "321904664480",
    appId: "1:321904664480:web:95fb2a5b39544c6ddfcec5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;