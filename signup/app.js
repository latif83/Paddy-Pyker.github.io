//Assigning DOM elements to variables
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const country = document.getElementById('contry');
const countries = document.getElementsByTagName('option');
const terms_and_conditions = document.getElementById('terms');



//Listen for for submission
form.addEventListener('submit', (e) => {  
//prevent default loading when form is submitted
    e.preventDefault();
	

  // Get values of form fields and assign to new variables
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const password2Value = password2.value;
	const countryValue = country.value.toLowerCase();
	const terms_and_conditions_value = terms_and_conditions.checked;
  
  //conditional statements to check if form value is valid ..... If form value is not valid an error function is triggered but if it is valid a success function is triggered

    if (/[^a-z0-9-]/i.test(String(usernameValue)) || usernameValue === '' || /^[0-9]/.test(String(usernameValue))) {
        errorMessage(username, "Username must begin with alphabet and may include numbers or hyphen");
    } 
     else {
        successMessage(username);
    }

    if (emailValue === '') {
        errorMessage(email, "Email is empty");
    } else if (!validateEmail(emailValue)) {
        errorMessage(email, "Email is invalid");
    } else {
        successMessage(email);
    }

    if (passwordValue.length <=7 ) {
        errorMessage(password, "Password must be at least 8 characters");
    } else {
        successMessage(password);
    }

    if (password2Value === '') {
        errorMessage(password2, "Password is empty");
    } else if (password2Value !== passwordValue) {
        errorMessage(password2, "Both Passwords does not match");
    } else {
        successMessage(password2);
    }
	
	var verify = false;
	
	for(var i = 0; i<countries.length;i++)
		{
			if(countries[i].value.toLowerCase() === countryValue){
				verify=true;
				break;
			}
			
		}
	
	if(verify){
		successMessage(country);
	} else if(countryValue == ''){
			  errorMessage(country,"you must select your country of origin")
			  }  else errorMessage(country,"Are you trying to create your own country?");
	
	if(terms_and_conditions_value == true)	   
		successMessage(terms_and_conditions)
	else errorMessage(terms_and_conditions,"You must select our terms and conditions first");
	
	

// conditional statement to check if all values are valid so the form is submitted
    if (username.parentElement.classList.contains('success') && email.parentElement.classList.contains('success') && password.parentElement.classList.contains('success') &&
	password2.parentElement.classList.contains('success') &&
	country.parentElement.classList.contains('success') && 
	terms_and_conditions.parentElement.classList.contains('success')) {

        form.submit();

    }
});


// function to be triggered if form valu is not valid. This function simply adds the error CSS class and removes that of success if it exists

function errorMessage(value, message) {
    const formControl = value.parentElement;


    if (formControl.classList.contains('success')) {
        formControl.classList.remove('success');
        formControl.classList.add('error');

    } else if(formControl.classList.contains('error')) {
        formControl.classList.remove('error');
		formControl.classList.add('error2');
		
        } else if(formControl.classList.contains('error2')){
        formControl.classList.remove('error2');
        formControl.classList.add('error');
			
    } else  formControl.classList.add('error');
        
    
    formControl.querySelector('.errorMessage').textContent = message;


}

// function to be triggered if form valu is valid. This function simply adds the success CSS class and removes that of error if it exists

function successMessage(value) {
    const formControl = value.parentElement;

    if (formControl.classList.contains('error')) {
        formControl.classList.remove('error');
        formControl.classList.add('success');
    } else if(formControl.classList.contains('error2')){
    	formControl.classList.remove('error2');
    	formControl.classList.add('success');
    }else {
        formControl.classList.add('success');
    }
}

//This is a simple function to validate the email 

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}