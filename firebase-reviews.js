import '../style.css';

console.log("Hi");
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
//import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
const db = getFirestore(app);
const auth = getAuth(app);

// display review form on button click
function toggleForm() {
  const form = document.getElementById("review-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
  const button = document.querySelector("#user-section button"); // the "Leave a Review" button
  
    if (form.style.display === "block") {
      button.textContent = "Discard"; // Change button text
    } else {
      button.textContent = "Leave a Review"; // Change it back
    }
  
}
// export function to window
window.toggleForm = toggleForm;

// expand size of review form as user types
const textarea = document.getElementById("review-content");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto"; // Reset height
  textarea.style.height = textarea.scrollHeight + "px"; // Set new height
});

// get review info from form and add to database
window.postReview = async function () {
  const formTitle = document.getElementById("review-title").value;
  const formContent = document.getElementById("review-content").value;
  //const user = auth.currentUser;
  const userid = "anon";

  //if (!user) return;
  //if (!user) userid = "anon";
  //else userid = user.username;

  //await db.collection("Reviews").add({
  const docRef = await addDoc(collection(db, "Reviews"), {
    date: new Date().toDateString(),
    message: formContent,
    title: formTitle,
    username: userid
  });

  document.getElementById("review-title").value = "";
  document.getElementById("review-content").value = "";
  toggleForm();
  loadReviews();
};
// export function to window
window.postReview = postReview;

// display reviews
async function loadReviews() {
  const container = document.getElementById('reviews-container');
  container.innerHTML = '<p>Loading reviews...</p>';

  try {
    //const querySnapshot = await db.collection("Reviews").orderBy("date", "desc").get();
    const querySnapshot = await getDocs(collection(db, "Reviews")); 
    container.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const review = doc.data();
      console.log('Loaded review:', review);  // Verify the data being fetched

      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review-card';
      reviewDiv.innerHTML = `<hr><div class="review-box">
        <span>${review.date}</span><h3>${review.title || "Anonymous"}</h3>
        <p>${review.message || "No comment provided."}</p>
        <small>Posted by ${review.username}</small></div>
      `;
      container.appendChild(reviewDiv);
    });

    if (querySnapshot.empty) {
      container.innerHTML = '<p>No reviews yet.</p>';
    }

  } catch (error) {
    console.error("Error loading reviews:", error);
    container.innerHTML = '<p>Failed to load reviews.</p>';
  }
}

loadReviews();
