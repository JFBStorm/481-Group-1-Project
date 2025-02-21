//Users signing up
const signupForm = document.querySelector('#signup-form');

//Checks to make sure its not null
if (signupForm) {
	signupForm.addEventListener('submit-signup',(e) => {
		e.preventDefault();
		const email = loginForm['signup-email'].value;
		const password = loginForm['signup-password'].value;
		
		auth.createUserWithEmailAndPassword(email, password).then(cred => {
			console.log(cred)
		})
		
	})
};

//Users logging in
const loginForm = document.querySelector('#login-form');

//Checks to make sure its not null
if (loginForm) {
	loginForm.addEventListener('submit-login',(e) => {
		e.preventDefault();
		const username = loginForm['username-box'].value;
		const password = loginForm['username-box'].value;
		
		auth.createUserWithEmailAndPassword(email, password).then()
		
	})
};

//Users logging off