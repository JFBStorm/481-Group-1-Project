<?php
session_start();
require 'layout.html';
?>
<head><title>Reviews - Momo Sushi</title></head>
<body>
<?php
// Add new review to database
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['username'])) {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $username = $_SESSION['username'];

    //TO-DO: connect to database
    
    
}
?>

<main class="page-content-container">
<h1>All Reviews</h1>

<!-- If user is logged in, let them write a review -->
<?php if (isset($_SESSION['username'])): ?>
    <p><?php echo 'Welcome, ' . htmlspecialchars($_SESSION['username']) . '!'; ?>
        <button onclick="toggleFormVisibility()">Leave a Review</button>
    </p>

    <!-- Box to write review in appears when above button is clicked -->
    <div id="reviewForm">
        <form method="POST">
            <input type="text" name="title" placeholder="Review Title" required><br><br>
            <textarea id="reviewContent" name="content" placeholder="Your review..." required></textarea>
            <button type="submit">Post</button>
        </form>
    </div>
	
	<script>
        function toggleFormVisibility() {
            const form = document.getElementById('reviewForm');
            form.style.display = (form.style.display === 'none') ? 'block' : 'none';
        }
    </script>

<!-- If user is not logged in, give them the option to log in-->
<?php else: ?>
    <p>Care to leave a review? <a href="login.php">Log in</a> or <a href="signup.php">sign up</a>.</p>
<?php endif; ?>

<!-- Display reviews regardless of login status -->
<?php

//TO-DO: Fetch and display reviews

echo '</main></body></html>';
?>
