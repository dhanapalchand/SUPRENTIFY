// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV4FckbGFwb38kg0tpFfmTRJM3zFFMPts",
  authDomain: "pipit-design.firebaseapp.com",
  projectId: "pipit-design",
  storageBucket: "pipit-design.appspot.com",
  messagingSenderId: "442546315515",
  appId: "1:442546315515:web:ad91681758c04d2422d05e",
  measurementId: "G-ZMN92TG2PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage=getStorage(app);
export {storage};