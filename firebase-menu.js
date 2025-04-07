import '../style.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, getDoc, query, where} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig)

//Menu Database
const db = getFirestore(app);
const dbMenu = collection(db, 'Momo Menu')
displayMenu();

function displayMenu() {
	getDocs(dbMenu).then((snapshot) => {
		let Menu = []
		snapshot.docs.forEach((doc) => {
			Menu.push({ ...doc.data() })
		})
		Menu.forEach(entry => {
			const disMenu = document.getElementById("menu-section");
			let html = `<div class="menu-items">
							<div class="menu-item">
								<span class="menu-item-title">${entry.Item}</span>
								<div class="menu-item-details" data-title="Description"> ${entry.Description}
									<div class="menu-item-price">Price: $${entry.Price}</div>
									<button class="btn diet-facts menu-item-button" type="button">View Dietary Facts</button>
									<div class="show-diet-facts">
										2<span class="diet-facts"> Dairy ${entry.Dairy}</span>
										<span class="diet-facts"> Gluten ${entry.Gluten}</span>
										<span class="diet-facts"> Raw ${entry.Raw}</span>
										<span class="diet-facts"> Soy ${entry.Soy}</span>
										<span class="diet-facts"> Spicy ${entry.Spicy}</span>
										<span class="diet-facts"> Vegan ${entry.Vegan}</span>
										<span class="diet-facts"> Vegetarian ${entry.Vegetarian}</span>
									</div>
									<button class="btn btn-primary menu-item-button" type="button">ADD TO CART</button>
								</div>
							</div>
						</div>`;
			disMenu.insertAdjacentHTML("afterend", html);
		})
	})
}
function queryMenu(searchInput) { //docID, searchInput) {
	const docRef = doc(db, "Momo Menu", searchInput);
	const docSnap = getDoc(docRef);

	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	}
	else {
	  console.log("No such document!");
	}
}