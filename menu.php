<?php
require 'layout.html';
?>
<head>
    <title>Menu - Momo Sushi</title>
    <script src="order.js" async></script>
</head>
<body>
    <div class="menu-header-container">
        <header class="menu-section-header">
            <div class="menu-header-title">Menu</div>
            <div class="cart-icon">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg>
                <span class="cart-icon-span">0</span>
            </div>
        </header>
    </div>

    <section id="menu-section" class="container content-section">
        <script src="bundle.js"></script>
    </section>

    <section class="container content-section">
        <div class="cart-tab">
            <h2 class="section-header">CART</h2>
            <div class="cart-row">
                <span class="cart-item cart-header cart-column">ITEM</span>
                <span class="cart-price cart-header cart-column">PRICE</span>
                <span class="cart-quantity cart-header cart-column">QUANTITY</span>
            </div>
            <div class="cart-items">
                <div class="cart-row">
                   <! Cart Item Elements added by Order.js>
                </div>
            </div>
            <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
                <span class="cart-total-price">$0.00</span>
            </div>
            <button class="btn btn-primary btn-purchase" type="button">Check Out</button>
            <button class="btn btn-primary btn-closeCart" type="button">Close</button>
        </div>
    </section>

</body>
</html>
