import './chat.js';
import './firebase-reviews.js'; 
import '../style.css';


document.addEventListener('DOMContentLoaded', function () {
  // Toggle dropdown menu
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      document.querySelector('.dropdown').classList.toggle('active');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function (event) {
      if (!event.target.matches('.menu-toggle')) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown.classList.contains('active')) {
          dropdown.classList.remove('active');
        }
      }
    });
  }
});

// Logout functionality
      document
        .getElementById("logout-button")
        .addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "login.html";
        });

      document
        .getElementById("dropdown-logout")
        .addEventListener("click", function (e) {
          e.preventDefault();
          window.location.href = "login.html";
        });