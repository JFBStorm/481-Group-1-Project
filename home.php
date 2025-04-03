<!DOCTYPE html>
<?php
session_start();
require 'layout.html';
?>
<head>
    <title>Momo Sushi</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        /* Navigation Styles */
        .top-nav {
            background-color: #f4f4f4;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

        }

        .nav-links {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: #333;
        }

        /* Section 1: Main Order Area */
        .section-1 {
            background-color: #8B2323;
            padding: 20px;
            min-height: 400px;
            position: relative;
        }

        .crab-logo {
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 8px;
            position: absolute;
            left: 20px;
            top: 20px;
        }

        .menu-display {
            width: 60%;
            height: 200px;
            background: white;
            margin: 20px auto;
            position: relative;
        }

        .order-button-container {
            text-align: center;
            margin-top: 10px;
        }

        .order-button {
            background: #f4e4bc;
            color: #333;
            border: none;
            padding: 10px 40px;
            cursor: pointer;
            font-size: 16px;
        }

        /* Section 2: Menu Categories */
        .section-2 {
            background-color: #f4e4bc;
            padding: 40px 20px;
        }

        .section-title {
            margin-bottom: 30px;
            text-align: left;
            padding-left: 40px;
        }

        .diamond-grid {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 40px;
            margin: 30px 0;
        }

        .diamond {
            width: 120px;
            height: 120px;
            background: #003366;
            transform: rotate(45deg);
            position: relative;
            margin: 30px;
        }

        .diamond span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            color: white;
            width: 100%;
            text-align: center;
            font-size: 14px;
            padding: 0 5px;
            white-space: pre-wrap;
        }

        .see-full-menu {
            background: white;
            border: none;
            padding: 10px 30px;
            cursor: pointer;
            margin-top: 20px;
            display: block;
            margin: 20px auto;
            color: black;
        }

        /* Action Buttons */
        .action-buttons {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 10px;
        }

        .action-button {
            background: #333;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
        }

        /* Dropdown Menu */
        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: #f9f9f9;
            min-width: 200px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            z-index: 1;
        }

        .dropdown-content a {
            padding: 12px 16px;
            display: block;
            text-align: left;
        }

        .dropdown.active .dropdown-content {
            display: block;
        }

        .menu-toggle {
            cursor: pointer;
            font-size: 24px;
        }
    </style>
</head>
<body>

    <!-- Section 1: Main Order Area -->
    <section class="section-1">
        <div class="crab-logo">
            <img src="images/crab-logo.png" alt="Crab Logo" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div class="menu-display">
            <!-- This area will be for menu pictures -->
        </div>
        <div class="order-button-container">
            <button class="order-button">Order</button>
        </div>
    </section>

    <!-- Section 2: Menu Categories -->
    <section class="section-2">
        <h3 class="section-title">Menu Categories</h3>
        <div class="diamond-grid">
            <div class="diamond"><span>Sushi/Sashimi</span></div>
            <div class="diamond"><span>Sushi Burritos</span></div>
            <div class="diamond"><span>Rolls</span></div>
            <div class="diamond"><span>Poke Bowls</span></div>
            <div class="diamond"><span>Kitchen</span></div>
        </div>
        <button class="see-full-menu">See Full Menu</button>
    </section>

    <!-- Chat and Cart Buttons -->
    <div class="action-buttons">
        <button class="action-button">Chat</button>
        <button class="action-button">Cart</button>
    </div>

    <script>
        // Toggle dropdown menu
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.dropdown').classList.toggle('active');
        });

        // Close dropdown when clicking outside
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.menu-toggle')) {
                const dropdown = document.querySelector('.dropdown');
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                }
            }
        });

        // Logout functionality
        document.getElementById('logout-button').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });

        document.getElementById('dropdown-logout').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    </script>
</body>
</html>
