// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAfnO5kVQtrD-aStBluASDwzJLF4iPIixc",
    authDomain: "w-project-4ccd4.firebaseapp.com",
    databaseURL: "https://w-project-4ccd4-default-rtdb.firebaseio.com/",
    projectId: "w-project-4ccd4",
    storageBucket: "w-project-4ccd4.firebasestorage.app",
    messagingSenderId: "582024070117",
    appId: "1:582024070117:web:0f9496e6115a14a819a50c",
    measurementId: "G-CDSSXTR2Z4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);