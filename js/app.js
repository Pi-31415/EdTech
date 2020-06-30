/*
This is the main JavaScript file for all the functions running on the web page. The functions are written in mixture of jQuery and pure JavaScript.
*/

//Global Variables
var venn_id_global = ['venn-interest', 'venn-portfolio', 'venn-academics'];

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

//Venn Diagram relate functions
function vennhighlight(vennid) {
	//clear all selected
	$("path").removeClass();
	//select when mouse hovers
	$("#" + vennid).addClass("activated");
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
		$('#schedule-form-errors').html("Please enter a valid email address.");
		$('#schedule-form-errors').fadeIn();
	}

	if (phone.length > 0) {
		checklist[3] = true;
	} else {
		$('#schedule-form-errors').html("Please enter phone number.");
		$('#schedule-form-errors').fadeIn();
	}

	if (/^\d+$/.test(phone)) {
		checklist[4] = true;
	} else {
		$('#schedule-form-errors').html("Please enter a valid phone number.");
		$('#schedule-form-errors').fadeIn();
	}

	if (email.length > 0) {
		checklist[0] = true;
	} else {
		$('#schedule-form-errors').html("Please fill in your email.");
		$('#schedule-form-errors').fadeIn();
	}

	if (name.length > 0) {
		checklist[1] = true;
	} else {
		$('#schedule-form-errors').html("Please enter your full name.");
		$('#schedule-form-errors').fadeIn();
	}

	if (checklist[0] == true && checklist[1] == true && checklist[2] == true && checklist[3] == true && checklist[4] == true) {
		//clear the form fields
		$("#name").val("");
		$("#email").val("");
		$("#phone").val("");
		$("#school").val("");
		$("#howhelp").val("");
		//create a temporary login effect
		var contact_message = "Thank you very much. We will be contacting you soon.";
		$('#schedule-form-success').html("<br>" + contact_message);
		$('#schedule-form-success').fadeIn();
	} else {
		jumpto('#component-freetrial');
	}

}

//Main function which runs when the page loads
$(document).ready(function () {

	//venn new test
	var sets = [{
			sets: ['A'],
			label: 'Interest',
			size: 12
		},
		{
			sets: ['B'],
			label: 'Portfolio',
			size: 12
		},
		{
			sets: ['C'],
			label: 'Academics',
			size: 12
		},
		{
			sets: ['A', 'B'],
			label: 'Fit',
			size: 3
		},
		{
			sets: ['A', 'C'],
			label: 'Motivation',
			size: 3
		},
		{
			sets: ['B', 'C'],
			label: 'Competence',
			size: 3
		},
		{
			sets: ['A', 'B', 'C'],
			label: 'ZMS',
			size: 3
		}
	];

	//Get screen sizes and font sizes for venn diagram responsive design


	var w = window.innerWidth;

	if (window.innerWidth > 1260 && window.innerWidth < 1600) {
		//desktops
		var chart = venn.VennDiagram().width(w / 3).height(w / 3);
		var div = d3.select("#venn");
		div.datum(sets).call(chart);
		d3.selectAll("#venn .venn-circle path")
			.style("fill-opacity", 0)
			.style("stroke-width", 2)
			.style("stroke", "#fff");
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.8em");

	} else if (window.innerWidth > 1120 && window.innerWidth < 1260) {
		//tablets
		var chart = venn.VennDiagram().width(w / 3).height(w / 3);
		var div = d3.select("#venn");
		div.datum(sets).call(chart);
		d3.selectAll("#venn .venn-circle path")
			.style("fill-opacity", 0)
			.style("stroke-width", 2)
			.style("stroke", "#fff");
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.6em");
	} else if (window.innerWidth > 650 && window.innerWidth < 1175) {
		//phones
		var chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
		var div = d3.select("#venn");
		div.datum(sets).call(chart);
		d3.selectAll("#venn .venn-circle path")
			.style("fill-opacity", 0)
			.style("stroke-width", 2)
			.style("stroke", "#fff");
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "1em");
	} else if (window.innerWidth > 400 && window.innerWidth < 650) {
		//phones
		var chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
		var div = d3.select("#venn");
		div.datum(sets).call(chart);
		d3.selectAll("#venn .venn-circle path")
			.style("fill-opacity", 0)
			.style("stroke-width", 2)
			.style("stroke", "#fff");
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.7em");
	} else {
		//fallback
		var chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
		var div = d3.select("#venn");
		div.datum(sets).call(chart);
		d3.selectAll("#venn .venn-circle path")
			.style("fill-opacity", 0)
			.style("stroke-width", 2)
			.style("stroke", "#fff");
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.8em");
	}

	div.selectAll("g")
		.on("mouseover", function (d, i) {
			// highlight the current path
			var selection = d3.select(this);
			console.log(selection);
			selection.select("path")
				.style("stroke-width", 3)
				.style("fill", "#fff")
				.style("fill-opacity", '0.4')
				.style("stroke-opacity", 1);
		})
		.on("mouseout", function (d, i) {
			var selection = d3.select(this);
			selection.select("path")
				.style("stroke-width", 2)
				.style("fill", "#fff")
				.style("fill-opacity", '0')
				.style("stroke-opacity", 1);
		});

	//Venn Diagram Highlight on hover
	$(".venn-btn").hover(function (event) {
		$(".venn-btn").css('-webkit-text-fill-color', '#fff');
		$(".venn-btn").css('-webkit-text-stroke-width', '0px');
		$(".venn-btn").css('-webkit-text-stroke-color', '#fff');
		var clicked = $(this);
		clicked.css('-webkit-text-stroke-width', '2px');
	});

	//Venn Diagram auto rotation code

	vennhighlight('venn-interest');
	var venn_index = 0;
	var venn_interval_time = 2000;
	var venn_id = venn_id_global;
	var venn_auto_rotate = setInterval(function () {
		if (venn_index == venn_id.length) {
			venn_index = 0;
		}
		vennhighlight(venn_id[venn_index]);
		$('.carousel-class').slick('slickGoTo', venn_index);
		venn_index++;
	}, venn_interval_time);

	//venn diagram rotate pause when mouse in
	$(".venn-btn").mouseover(function () {
		clearInterval(venn_auto_rotate);
	});
	$(".venn-btn").mouseout(function () {
		venn_auto_rotate = setInterval(function () {
			if (venn_index == venn_id.length) {
				venn_index = 0;
			}
			vennhighlight(venn_id[venn_index]);
			$('.carousel-class').slick('slickGoTo', venn_index);
			venn_index++;
		}, venn_interval_time);
	});

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
