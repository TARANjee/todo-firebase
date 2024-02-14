import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJEcHn9FhPemHcwFoiDPzqB-Kc4ooI9e4",
    authDomain: "todo-app-19ad0.firebaseapp.com",
    projectId: "todo-app-19ad0",
    storageBucket: "todo-app-19ad0.appspot.com",
    messagingSenderId: "1028204547838",
    appId: "1:1028204547838:web:c80c5c15b44937e6a75faf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)