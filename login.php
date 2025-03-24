<?php
require 'layout.html';
?>
<head>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login - Momo Sushi</title>

    <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
	  <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="login-container">
      <h2>Login</h2>
      <form id="login-form">
        <input type="text" name="username-box" id="username-box" placeholder="Username" required>
        <input type="password" name="password-box" id="password-box" placeholder="Password" required>


        <button type="button" id="reset-account">Forgot Password</button>
        <button type="button" id="login-button">Login</button>
        <button type="button" id="signup-alt">Sign Up</button>
      </form>

      <p id="error-message" style="color:red; display: none;"></p>
    </div>
        <script src="index.js"></script>
        <script src="mongodb.js"></script>
  </body>
</html>
