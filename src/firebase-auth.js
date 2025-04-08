import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";

//consts for logging in
export const loginEmail = document.getElementById('emailBox')
export const loginpassword = document.getElementById('passwordBox')

//consts for signing up
export const signupEmail = document.getElementById('signupEmailBox')
export const signupUsername = document.getElementById('signupUsernameBox')
export const signupPassword = document.getElementById('signupPasswordBox')

//Buttons for login and signup pages
export const btnLogin = document.getElementById('loginButton')
export const btnSignup = document.getElementById('registerButton')
export const btnLogout = document.getElementById('dropdown-logout')

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
const user = auth.currentUser;
changeUserStatus();

if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault()

        const loginEmail = emailBox.value
        const loginPassword = passwordBox.value

        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then((userCred) => {
                console.log('User logged in:', userCred.user)
                document.getElementById("errorTest").innerText = "Login Successful.";
                changeUserStatus(loginEmail, loginPassword);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("errorTest").innerText = errorMessage;
            });

    });
}

if (btnSignup) {
    btnSignup.addEventListener("click", (e) => {
        e.preventDefault()

        const signupEmail = signupEmailBox.value
        const signupPassword = signupPasswordBox.value
        const signupUsername = signupUsernameBox.value
        console.log("Signing up...")

        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCred) => {
                if (signupUsername != null) {
                    displayName: signupUsername
                }
                console.log('User created')
                document.getElementById("errorTest").innerText = "Check email for email verification.";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("errorTest").innerText = errorMessage;
            });
    });
}

if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
        console.log("LOGOUT")

        signOut(auth).then(() => {
            changeUserStatus();
            document.getElementById("errorTest").innerText = "Logout successful";
        }).catch((error) => {
            // An error happened.
        });
    });
}

//Allows the user to be logged in anywhere on the website
function changeUserStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            if (user.displayName) {
                document.getElementById("userProfileStatus").innerText = user.displayName;
            }
            else {
                document.getElementById("userProfileStatus").innerText = user.email;
            } 
        }
        else {
            document.getElementById("userProfileStatus").innerText = "Not signed in";
        }
    });

    setPersistence(auth, browserLocalPersistence)
        .then((userCred) => {
            return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
