/*
This is the main JavaScript file for all the functions running on the web page. The functions are written in mixture of jQuery and pure JavaScript.
*/

//List of functions to use
function jumpto(elementid) {
	//this is the function for smooth scrolling between the components when the buttons at the bottom of the component is clicked
	$([document.documentElement, document.body]).animate({
		scrollTop: $(elementid).offset().top
	}, 1000);
}

function loginboxclose() {
	$(".component-loginbox").removeClass("active");
	$(".navbar").show();
	$(".content").show();
}

//These are pseudo functions to demonstrate login and schedule
function login() {
	//array to validate conditions
	/*
	checklist[0] = Is the email field filled?
	checklist[1] = Is the password field filled?
	checklist[2] = Does email include an @ sign?
	*/
	$('#login-form-errors').html("");
	$('#login-form-errors').hide();

	var checklist_login = [false, false, false];
	var email = document.getElementById("email-login").value;
	var password = document.getElementById("password").value;

	if (email.length > 0) {
		checklist_login[0] = true;
	} else {
		$('#login-form-errors').html("Please fill in your email.");
		$('#login-form-errors').fadeIn();
	}

	if (password.length > 0) {
		checklist_login[1] = true;
	} else {
		$('#login-form-errors').html("Please enter your password.");
		$('#login-form-errors').fadeIn();
	}

	if (email.includes("@") == true) {
		checklist_login[2] = true;
	} else {
		$('#login-form-errors').html("Please enter a valid email address.");
		$('#login-form-errors').fadeIn();
	}
	//request to login API once all the conditions are met
	if (checklist_login[0] == true && checklist_login[1] == true && checklist_login[2] == true) {
		//create a temporary login effect
		var logout_button = "<a href=\"#\" id='logoutbutton' onclick='logout()'><u>Log Out</u></a>";
		$('#username_navbar').html(email + " - " + logout_button);
		$('#username_navbar').show();
		$('#loginbutton').hide();
		loginboxclose();
	}
}

function logout() {
	//Pseudo logout function
	$('#username_navbar').hide();
	$('#loginbutton').show();
}

function schedule() {
	//array to validate conditions
	/*
	checklist[0] = Is the email field filled?
	checklist[1] = Is the name field filled?
	checklist[2] = Does email include an @ sign?
	checklist[3] = Is the phone field filled?
	checklist[4] = Is phone field only digits?
	*/
	$('#schedule-form-errors').html("");
	$('#schedule-form-errors').hide();

	var checklist = [false, false, false, false, false];
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;

	if (email.includes("@") == true) {
		checklist[2] = true;
	} else {
		jumpto('#schedule-form-errors');
		$('#schedule-form-errors').html("Please enter a valid email address.");
		$('#schedule-form-errors').fadeIn();
	}
	
	if (phone.length > 0) {
		checklist[3] = true;
	} else {
		jumpto('#schedule-form-errors');
		$('#schedule-form-errors').html("Please enter phone number.");
		$('#schedule-form-errors').fadeIn();
	}
	
	if (/^\d+$/.test(phone)) {
		checklist[4] = true;
	} else {
		jumpto('#schedule-form-errors');
		$('#schedule-form-errors').html("Please enter a valid phone number.");
		$('#schedule-form-errors').fadeIn();
	}
	
	if (email.length > 0) {
		checklist[0] = true;
	} else {
		jumpto('#schedule-form-errors');
		$('#schedule-form-errors').html("Please fill in your email.");
		$('#schedule-form-errors').fadeIn();
	}
	
	if (name.length > 0) {
		checklist[1] = true;
	} else {
		jumpto('#schedule-form-errors');
		$('#schedule-form-errors').html("Please enter your full name.");
		$('#schedule-form-errors').fadeIn();
	}
	
	if (checklist[0] == true && checklist[1] == true && checklist[2] == true && checklist[3] == true && checklist[4] == true) {
		//clear the form fields
		$("#name").val("");
		$("#email").val("");
		$("#phone").val("");
		//create a temporary login effect
		var contact_message = "Thank you very much. We will be contacting you soon.";
		$('#schedule-form-success').html("<br>"+contact_message);
		$('#schedule-form-success').fadeIn();
	}
	
}

//Main function which runs when the page loads
$(document).ready(function () {
	//Hide unnecessary components (such as notices and validation messages) for fade in
	$('#username_navbar').hide();
	$('#schedule-form-success').hide();
	
	//Log in Popup
	$('#loginbutton').click(function () {
		$(".component-loginbox").addClass("active");
		//hides navbar for a while
		$(".navbar").hide();
		$(".content").hide();
	});

	//Function to close the login box and 
	$('#loginbox-close').click(function () {
		loginboxclose();
	});


});
