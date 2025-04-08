import { auth } from './FirebaseConfig.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (!user) {
    // Not logged in, redirect to login
    window.location.href = "login.html";
  } else {

    window.location.href = "account.html";
  }
});