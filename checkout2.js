// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

import {
    getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, limit, orderBy, query, where
}
    from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const menuRef = collection(db, "Momo Menu");
const q = await query(menuRef, orderBy("Item", "asc"));
const cartRef = collection(db, "User Cart");

const currentSessionUser = "epriesko@emich.edu"

async function getUserCart(){
    const cart = query(cartRef, where("Email","==",currentSessionUser));
    const cartSnap = await getDocs(cart);
    cartSnap.forEach((doc)=>{
        let data = doc.data();
        let titlesArray = data.Titles;
        let pricesArray = data.Prices;
        let quantitiesArray = data.Quantities;
        console.log(titlesArray);
        console.log(pricesArray);
        console.log(quantitiesArray);
        for(let i = 0; i < titlesArray.length; i++){
            addItemToCart(titlesArray[i], "Price: $"+pricesArray[i], parseInt(quantitiesArray[i]));
        }
    });
    updateCartTotal();
}

function addItemToCart(title, price, quantity){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
            <div class="cart-item cart-column">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="${quantity}">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Price: $', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    calcTax();
    calcGrandTotal();
}

const tipButton10 = document.getElementById("10perTip");
const tipButton15 = document.getElementById("15perTip");
const tipButton20 = document.getElementById("20perTip");
const tipButtonCustom = document.getElementById("customTip");
tipButton10.addEventListener("click", (e) => {
    let tipElement = document.getElementById('cart-tip');
    let totalText = document.getElementById('cart-total-price').innerText;
    let total = parseFloat(totalText.replace('$', ''));
    let tip = (total * 0.1);
    tip = Math.round(tip * 100) / 100;
    tipElement.innerText = "Tip: $"+tip;
    updateCartTotal()
});
tipButton15.addEventListener("click", (e) => {
    let tipElement = document.getElementById('cart-tip');
    let total = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('$', ''));
    let tip = (total * 0.15);
    tip = Math.round(tip * 100) / 100;
    tipElement.innerText = "Tip: $"+tip;
    updateCartTotal()
});
tipButton20.addEventListener("click", (e) => {
    let tipElement = document.getElementById('cart-tip');
    let total = parseFloat(document.getElementsByClassName('cart-total-price')[0].innerText.replace('$', ''));
    let tip = (total * 0.2);
    tip = Math.round(tip * 100) / 100;
    tipElement.innerText = "Tip: $"+tip;
    updateCartTotal()
});
tipButtonCustom.addEventListener("click", (e) => {
    let tipElement = document.getElementById('cart-tip');
    let tip = parseFloat(document.getElementById('custom-tip-textbox').value);
    console.log(tip);
    if(isNaN(tip) || tip <= 0) {tip = 0;}
    tip = Math.round(tip * 100) / 100;
    tipElement.innerText = "Tip: $"+tip;
    updateCartTotal()
});

function calcTax(){
    let total = parseFloat(document.getElementById('cart-total-price').innerText.replace('$', ''));
    let tax = total * .06;
    tax = Math.round(tax * 100) / 100;
    document.getElementById('cart-tax').innerText = "Tax: $"+tax;
}


function calcGrandTotal(){
    let total = parseFloat(document.getElementById('cart-total-price').innerText.replace('$', ''));
    let tax = parseFloat(document.getElementById('cart-tax').innerText.replace('Tax: $', ''));
    let tip = parseFloat(document.getElementById('cart-tip').innerText.replace('Tip: $', ''));

    let grandTotal = total + tax +tip;
    grandTotal = Math.round(grandTotal * 100) / 100;
    document.getElementById('grand-total').innerText = "Grand Total: $"+grandTotal;
}

document.addEventListener("DOMContentLoaded", getUserCart());

const placeOrderButton = document.getElementById("place-order");
placeOrderButton.addEventListener("click", placeOrder);

async function placeOrder(){
    let d = new Date();
    let timerOfOrder = d.getHours() + ":" + d.getMinutes();
    let pickUpTime = timerOfOrder;
    if(d.getMinutes() >= 40){pickUpTime = (d.getHours()+1) + ":" + (d.getMinutes()-40);}
    else{pickUpTime = d.getHours() + ":" + (d.getMinutes()+20);}
    let total = parseFloat(document.getElementById('grand-total').innerText.replace('Grand Total: $', ''));

    let ref = collection(db,"Orders");
    const docRef = await addDoc(
        ref, {
            Email: currentSessionUser,
            Pick_up_time: pickUpTime,
            Time_of_order: timerOfOrder,
            Total_Cash: total
        }
    );
    saveOrDeleteMeal();
    window.location.href = "Placed_Orders.html"
}

async function saveOrDeleteMeal() {
    let prompt = confirm("Do you want to save this meal for future orders?");
    if(!prompt){
        //set User Cart arrays to empty
        let ref = doc(db, "User Cart", currentSessionUser);
        const docSnap = await getDoc(ref);

        await updateDoc(
            ref, {
                Titles: [],
                Prices: [],
                Quantities: []
            }
        );
    }
}
