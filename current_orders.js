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

const ordersRef = collection(db, "Orders");

const currentSessionUser = "epriesko@emich.edu";
let isCurrentUserAdmin = false;

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
    let adminFeatures = document.getElementById("admin-orders");
    let adminFeaturesHead = document.getElementById("admin-orders-header");
    if(!isCurrentUserAdmin){
        adminFeatures.style.display="none";
        adminFeaturesHead.style.display="none";
    }
}

async function getUserOrder(){
    const orders = query(ordersRef, where("Email","==",currentSessionUser));
    const ordersSnap = await getDocs(orders);
    const yourOrders = document.getElementById("your-current-order");
    while (yourOrders.hasChildNodes()) {
        yourOrders.removeChild(yourOrders.firstChild)
    }
    ordersSnap.forEach((doc)=>{
        let data = doc.data();
        let html = `<div class="your-orders">
                               <div id="${doc.id}">
                                   <label class="order-label">Email: </label>
								   <label class="order-label-data">${data.Email}</label>
                                   <label class="order-label">Time of order:</label>
                                   <label class="order-label-data"> ${data.Time_of_order}</label>
								   <label class="order-label">Time for Pick-up:</label>
                                   <label class="order-label-data"> ${data.Pick_up_time}</label>
								   <label class="order-label">Total: $</label>
                                   <label class="order-label-data"> ${data.Total_Cash}</label>
								   <button class="remove-order-button">Cancel Order</button>
                               </div>                
                  </div>`;
        yourOrders.insertAdjacentHTML("beforeend", html);
    });
    addButtons();
}

async function getAllOrdersForAdmin(){
    const ordersSnap = await getDocs(ordersRef);
    const allOrders = document.getElementById("admin-orders");
    while (allOrders.hasChildNodes()) {
        allOrders.removeChild(allOrders.firstChild)
    }
    ordersSnap.forEach((doc)=>{
        let data = doc.data();
        let html = `<div class="your-orders">
                               <div id="${doc.id}">
                                   <label class="order-label">Email: </label>
								   <label class="order-label-data">${data.Email}</label>
                                   <label class="order-label">Time of order:</label>
                                   <label class="order-label-data"> ${data.Time_of_order}</label>
								   <label class="order-label">Time for Pick-up:</label>
                                   <label class="order-label-data"> ${data.Pick_up_time}</label>
								   <label class="order-label">Total: $</label>
                                   <label class="order-label-data"> ${data.Total_Cash}</label>
								   <button class="remove-order-button">Order Completed</button>
                                   <label>ID: ${doc.id}</label>
                               </div>                
                  </div>`;
        allOrders.insertAdjacentHTML("beforeend", html);
    });
    addButtons();
}

document.addEventListener("DOMContentLoaded", getUserOrder(), getAllOrdersForAdmin(), setUserAdminStatus());

function addButtons(){
    let removeOrCompleteButtons = document.getElementsByClassName('remove-order-button');
    for (let i = 0; i < removeOrCompleteButtons.length; i++) {
        let button = removeOrCompleteButtons[i];
        button.addEventListener('click', removeOrCompleteOrder);
    }
}

async function removeOrCompleteOrder(event){
    let button = event.target
    let orderDiv = button.parentElement
    let orderID = orderDiv.id;

    let ref = doc(db, "Orders", orderID);
    const docSnap = await getDoc(ref);

    if(!docSnap.exists()){
        alert("Incorrect order ID");
        return;
    }

    await deleteDoc(ref);

    getUserOrder();
    getAllOrdersForAdmin();
}