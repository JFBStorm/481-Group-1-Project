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

let currentSessionUser = "epriesko@emich.edu"
let isCurrentUserAdmin = false;

/* THE FOLLOWING CODE (OR SOMETHING LIKE IT) SHOULD BE USED TO GET THE EMAIL OF THE USER THAT IS CURRENTLY LOGGED
THE EMAIL IS USED TO FIND CURRENT OR SAVED CART IN THE DATABASE
CURRENTLY THE SESSION USER IS HARD-CODDED TO ONE USERS CART

window.sessionStorage.setItem("currentSessionUser", currentSessionUser);
let currentSessionUser = window.sessionStorage.getItem("currentSessionUser");
 */

async function setUserAdminStatus(){
    let userCol = collection(db, "Users");
    let userStatus = query(userCol, where("Email","==",currentSessionUser));
    let userStatusSnap = await getDocs(userStatus);
    userStatusSnap.forEach((doc)=>{
        let data = doc.data();
        if(data.Admin){isCurrentUserAdmin = true;}
    })
    console.log("is user admin? "+isCurrentUserAdmin);
    hideAdminFeatures()
}

function hideAdminFeatures(){
    let adminFeatures = document.getElementById("admin-options");
    if(!isCurrentUserAdmin){
        adminFeatures.style.display="none";
    }
}

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
    })
    updateCartTotal();
}

async function GetMenuItems(q){

    const docSnap = await getDocs(q);
    const disMenu = document.getElementById("menu-section");
    while (disMenu.hasChildNodes()) {
        disMenu.removeChild(disMenu.firstChild)
    }
        docSnap.forEach((doc) => {
            let data = doc.data();
            let html = `<div class="menu-items">
							<div class="menu-item">
								<span class="menu-item-title">${data.Item}</span>
								<div class="menu-item-price">Price: $${data.Price}</div>
								<div class="menu-item-details" data-title="Description"> ${data.Description}
									<div class="show-diet-facts">
										<span class="diet-facts"> Dairy ${data.Dairy}</span>
										<span class="diet-facts"> Gluten ${data.Gluten}</span>
										<span class="diet-facts"> Raw ${data.Raw}</span>
										<span class="diet-facts"> Soy ${data.Soy}</span>
										<span class="diet-facts"> Spicy ${data.Spicy}</span>
										<span class="diet-facts"> Vegan ${data.Vegan}</span>
										<span class="diet-facts"> Vegetarian ${data.Vegetarian}</span> 
									</div>
									<button class="btn btn-primary menu-item-button" type="button">ADD TO CART</button>
								</div>
							</div>
						</div>`;
            disMenu.insertAdjacentHTML("beforeend", html);
        })
    addButtons();
}

const filterButton = document.getElementById("filter-button");
const searchButton = document.getElementById("search-button");
const checkoutButton = document.getElementById("checkout-button");
const saveMealButton = document.getElementById("load-meal-button");
filterButton.addEventListener("click", applyFilters);
searchButton.addEventListener("click", search);
checkoutButton.addEventListener("click", checkout);
saveMealButton.addEventListener("click", loadSavedMeal);
document.addEventListener("DOMContentLoaded", GetMenuItems(q), setUserAdminStatus());


let cartSessionStorageTitles = new Array();
let cartSessionStoragePrice = new Array();
let cartSessionStorageQuantity = new Array();


function setCartSessionStorage(title, price, quantity) {
    cartSessionStorageTitles.push(title);
    cartSessionStoragePrice.push(JSON.stringify(price));
    cartSessionStorageQuantity.push(quantity);
}

function getCartSessionStorage() {
    console.log(cartSessionStorageTitles);
    console.log(cartSessionStoragePrice);
    console.log(cartSessionStorageQuantity);
}



async function applyFilters(){
    let q = collection(db, "Momo Menu");
    if(document.getElementById("Vegetarian-checkbox").checked){console.log("vegetarian-checkbox"); q = query(q, where("Vegetarian","==",1));}
    if(document.getElementById("Vegan-checkbox").checked){console.log("Vegan-checkbox"); q = query(q, where("Vegan","==",1));}
    if(document.getElementById("Raw-checkbox").checked){console.log("Raw-checkbox"); q = query(q, where("Raw","==",1));}
    if(document.getElementById("Spicy-checkbox").checked){console.log("Spicy-checkbox"); q = query(q, where("Spicy","==",1));}
    if(document.getElementById("Dairy-checkbox").checked){console.log("Dairy-checkbox"); q = query(q, where("Dairy","==",0));}
    if(document.getElementById("Gluten-checkbox").checked){console.log("Gluten-checkbox"); q = query(q, where("Gluten","==",0));}
    if(document.getElementById("Soy-checkbox").checked){console.log("Soy-checkbox"); q = query(q, where("Soy","==",0));}

    GetMenuItems(q);
}

async function search(){
    let q = collection(db, "Momo Menu");
    let term = capitalizeFirstLetter(document.getElementById("searchInput").value);
    console.log(term);

    if(term != ""){q = query(q, where("Item",">=",term));}

    GetMenuItems(q);
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
}

async function addButtons() {
    let addToCartButtons = document.getElementsByClassName('btn btn-primary menu-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function addToCartClicked(event){
    var button = event.target
    var menuItem = button.parentElement.parentElement
    var title = menuItem.getElementsByClassName('menu-item-title')[0].innerText
    var price = menuItem.getElementsByClassName('menu-item-price')[0].innerText
    addItemToCart(title, price, 1)
    updateCartTotal()
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
}

function checkout(event){
    cartSessionStorageTitles.length = 0;
    cartSessionStoragePrice.length = 0;
    cartSessionStorageQuantity.length = 0;
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var titleElement = cartRow.getElementsByClassName('cart-item-title')[0]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var title = titleElement.innerText
        var price = parseFloat(priceElement.innerText.replace('Price: $', ''))
        var quantity = quantityElement.value
        setCartSessionStorage(title, price, quantity)
    }
    getCartSessionStorage();
    setUserCartMeal();
    window.location.href = "checkout2.html";
}

async function setUserCartMeal(){
    let ref = doc(db, "User Cart", currentSessionUser);
    const docRef = await setDoc(
        ref, {
            Email: currentSessionUser,
            Titles: cartSessionStorageTitles,
            Prices: cartSessionStoragePrice,
            Quantities: cartSessionStorageQuantity
        }
    );

}

async function loadSavedMeal(){
    const disMenu = document.getElementById("cart-items");
    while (disMenu.hasChildNodes()) {
        disMenu.removeChild(disMenu.firstChild)
    }
    getCartSessionStorage();
    getUserCart();
}

const addEditButton = document.getElementById("add-menu-button");
const adminDeleteButton = document.getElementById("delete-menu-button");
addEditButton.addEventListener("click", addMenu)
adminDeleteButton.addEventListener("click", deleteMenu)

async function addMenu(){
    let inputSection = document.getElementById("admin-input-section");
    while (inputSection.hasChildNodes()) {
        inputSection.removeChild(inputSection.firstChild)
    }
    let html = "<label for='itemToSet'>Item</label><input id='itemToSet' type='text'>" +
        "<label for='Description'>Description</label><input id='Description' type='text'>" +
        "<label for='Price'>Price</label><input id='Price' type='number'>" +
        "<label for='Dairy'>Dairy</label><input id='Dairy' type='checkbox'>" +
        "<label for='Gluten'>Gluten</label><input id='Gluten' type='checkbox'>" +
        "<label for='Raw'>Raw</label><input id='Raw' type='checkbox'>" +
        "<label for='Soy'>Soy</label><input id='Soy' type='checkbox'>" +
        "<label for='Spicy'>Spicy</label><input id='Spicy' type='checkbox'>" +
        "<label for='Vegan'>Vegan</label><input id='Vegan' type='checkbox'>" +
        "<label for='Vegetarian'>Vegetarian</label><input id='Vegetarian' type='checkbox'>" +
        "<div><button id='admin-confirm-button'>Confirm</button></div>"
    inputSection.innerHTML = html;
    let confirmButton = document.getElementById("admin-confirm-button");
    confirmButton.addEventListener("click", addMenuItemInDoc);
}

async function deleteMenu(){
    let inputSection = document.getElementById("admin-input-section");
    while (inputSection.hasChildNodes()) {
        inputSection.removeChild(inputSection.firstChild)
    }
    let html = "<label for='itemToSet'>Item</label><input id='itemToSet' type='text'><div><button id='admin-confirm-button'>Confirm</button></div>"
    inputSection.innerHTML = html;
    let confirmButton = document.getElementById("admin-confirm-button");
    confirmButton.addEventListener("click", deleteMenuItemFromDoc);
}

async function addMenuItemInDoc(){
    console.log("add item");
    let menuItemName = document.getElementById("itemToSet").value;
    let menuItemDesc = document.getElementById("Description").value;
    let Price =  document.getElementById("Price").value;
    let Dairy = 0;
    if(document.getElementById("Dairy").checked){Dairy = 1;}
    let Gluten= 0;
    if(document.getElementById("Gluten").checked){Gluten = 1;}
    let Raw= 0;
    if(document.getElementById("Raw").checked){Raw = 1;}
    let Soy= 0;
    if(document.getElementById("Soy").checked){Soy = 1;}
    let Spicy= 0;
    if(document.getElementById("Spicy").checked){Spicy = 1;}
    let Vegan= 0;
    if(document.getElementById("Vegan").checked){Vegan = 1;}
    let Vegetarian= 0;
    if(document.getElementById("Vegetarian").checked){Vegetarian = 1;}

    let ref = doc(db, "Momo Menu", menuItemName );
    const docSnap = await getDoc(ref);

    const docRef = await setDoc(
        ref, {
            Item: menuItemName,
            Description: menuItemDesc,
            Price: Price,
            Dairy: Dairy,
            Gluten: Gluten,
            Raw: Raw,
            Soy: Soy,
            Spicy: Spicy,
            Vegan: Vegan,
            Vegetarian: Vegetarian
        }
    );
}

async function deleteMenuItemFromDoc(){
    console.log("delete item");
    let menuItemName = document.getElementById("itemToSet").value;

    let ref = doc(db, "Momo Menu", menuItemName );
    const docSnap = await getDoc(ref);

    if(!docSnap.exists()){
        alert("Invalid Menu Item Name");
        return;
    }
    await deleteDoc(ref);
}


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

