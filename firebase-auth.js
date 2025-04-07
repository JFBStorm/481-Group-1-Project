import '../style.css';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";

export const loginEmail = document.getElementById('emailBox')
export const loginpassword = document.getElementById('passwordBox')

export const btnLogin = document.getElementById('loginButton')
export const btnSignup = document.getElementById('signupAlt')
export const btnLogout = document.getElementById('logoutButton')

const firebaseConfig = {
	apiKey: "AIzaSyAfnO5kVQtrD-aStBluASDwzJLF4iPIixc",
	authDomain: "w-project-4ccd4.firebaseapp.com",
	databaseURL: "https://w-project-4ccd4-default-rtdb.firebaseio.com",
	projectId: "w-project-4ccd4",
	storageBucket: "w-project-4ccd4.firebasestorage.app",
	messagingSenderId: "582024070117",
	appId: "1:582024070117:web:0f9496e6115a14a819a50c",
	measurementId: "G-CDSSXTR2Z4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

setPersistence(auth, browserSessionPersistence)
    .then((userCred) => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        console.log(userCred.user)
        return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });

if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault()

        const loginEmail = emailBox.value
        const loginPassword = passwordBox.value
        console.log("Logging in...")

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCred) => {
                console.log('User logged in:', userCred.user)
                document.getElementById("errorTest").innerText = "Login Successful.";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("errorTest").innerText = "Login failed. Invalid email.";
            });

    });
}

if (btnSignup) {
    btnSignup.addEventListener("click", (e) => {
        e.preventDefault()

        const loginEmail = emailBox.value
        const loginPassword = passwordBox.value
        console.log("Signing up...")

        createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCred) => {
                console.log('User created:', userCred.user)
                document.getElementById("errorTest").innerText = "Check email for email verification.";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("errorTest").innerText = "Invalid email format.";
            });

    });
}

if (btnLogout) {
    //btnLogout.addEventListener("click", (e)
}