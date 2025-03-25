import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

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
const colRef = collection(db, 'Momo Menu')

getDocs(colRef).then((snapshot) => {
	let Menu = []
	snapshot.docs.forEach((doc) => {
		Menu.push({ ...doc.data() })
	})
	console.log(Menu)
	displayMenu(Menu);
})
	.catch(err => {
		console.log(err.message)
	})

function displayMenu(arr) {
	console.log("testing 123")
	insertAdjacentHTML("afterbegin, 'hello')
}