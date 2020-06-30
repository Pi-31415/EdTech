/*
This is the main JavaScript file for all the functions running on the web page. The functions are written in mixture of jQuery and pure JavaScript.
*/
//Global Variables
var pillar_state = "";
var pillar_name = ['academics', 'interest', 'portfolio'];
var slick_id = 0;
var venn_interact = false;

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
		//Send form
		$("#name").val("");
		$("#email").val("");
		$("#phone").val("");
		$("#school").val("");
		$("#howhelp").val("");



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

//Venn Diagram Related Functions outside DOM

function color_venn() {
	d3.selectAll("#venn .venn-circle path")
		.style("stroke-width", 2)
		.style("stroke", "#fff");

	d3.selectAll("#venn .venn-area path").style("stroke-width", 2).style("stroke", "#fff").style("fill",
		function (d, i) {
			if (d.label == "ZMS") {
				return "#ca2128";
			} else if (d.label == "Competence" || d.label == "Motivation" || d.label == "Fit") {
				return '#666666';
			} else {
				return '#9b1c31';
			}
		}
	).style("fill-opacity",
		function (d, i) {
			if (d.label == "ZMS") {
				return 1;
			} else if (d.label == "Competence" || d.label == "Motivation" || d.label == "Fit") {
				return 1;
			} else {
				return 0;
			}
		}
	);
}

//Venn Diagram Selection Code
function venn_select(pillar) {
	color_venn();
	d3.selectAll("#venn .venn-circle path").style("fill",
		function (d, i) {
			if (d.label.toLowerCase() == pillar.toLowerCase()) {
				pillar_state = d.label.toLowerCase();
				update_slick_id(pillar_state);
				return '#fff';
			} else {
				return '#fff';
			}
		}).style('fill-opacity',
		function (d, i) {
			if (d.label.toLowerCase() == pillar.toLowerCase()) {
				return 0.4;
			} else {
				return 0;
			}
		});
}

//carousel related functions
function next_slide() {
	$('.carousel-class').slick('slickNext');
	if (slick_id >= 2) {
		slick_id = 0;
	} else {
		slick_id++;
	}
	pillar_state = pillar_name[slick_id];
	update_slick_id(pillar_state);
	venn_select(pillar_state);
}

function update_slick_id(pillar) {
	if (pillar == pillar_name[0]) {
		slick_id = 0;
	} else if (pillar == pillar_name[1]) {
		slick_id = 1
	} else {
		slick_id = 2;
	}
	console.log("Current Slick ID : " + slick_id + " - Pillar State : " + pillar_state);
}

//Timer for Venn Diagram
var c = 0;
var t;
var timer_is_on = 0;

function timedCount(seconds) {
	var x = parseInt(seconds,10);
	console.log(c%x);
	c = c + 1;
	t = setTimeout(timedCount, 1000);
}

function startCount(modulo) {
	if (!timer_is_on) {
		timer_is_on = 1;
		timedCount(modulo);
	}
}

function stopCount() {
	clearTimeout(t);
	timer_is_on = 0;
}


//Main function which runs when the page loads
$(document).ready(function () {

	//Venn Diagram Mouse hover code using D3 js and venn js
	var sets = [{
			sets: ['A'],
			label: 'Portfolio',
			size: 12
		},
		{
			sets: ['B'],
			label: 'Interest',
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
			label: 'Competence',
			size: 3
		},
		{
			sets: ['B', 'C'],
			label: 'Motivation',
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
	var div;
	var div = d3.select("#venn");

	if (window.innerWidth > 1260 && window.innerWidth < 1600) {
		//desktops
		var chart = venn.VennDiagram().width(w / 3).height(w / 3);
		div.datum(sets).call(chart);
		color_venn();
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.8em");

	} else if (window.innerWidth > 1120 && window.innerWidth < 1260) {
		//tablets
		var chart = venn.VennDiagram().width(w / 3).height(w / 3);
		div.datum(sets).call(chart);
		color_venn();
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.6em");
	} else if (window.innerWidth > 650 && window.innerWidth < 1175) {
		//phones
		var chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
		div.datum(sets).call(chart);
		color_venn();
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "1em");
	} else if (window.innerWidth > 400 && window.innerWidth < 650) {
		//phones
		var chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
		div.datum(sets).call(chart);
		color_venn();
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.7em");
	} else {
		//fallback
		var chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
		div.datum(sets).call(chart);
		color_venn();
		d3.selectAll("#venn text").style("fill", "#fff");
		d3.selectAll("#venn text").style("font-size", "0.8em");
	}

	div.selectAll("g")
		.on("mouseover", function (d, i) {

			//disable interaction with venn diagram if it is viewed on phone

			if (w >= 600) {
				color_venn();
				// highlight the current path
				if (d.label == "Academics" || d.label == "Portfolio" || d.label == "Interest") {
					console.log('User interacts with venn diagram');
					venn_interact = true;
					pillar_state = d.label.toLowerCase();
					update_slick_id(pillar_state);
					$('.carousel-class').slick('slickGoTo', slick_id);
					$('#quotearea').html(d.label);
					venn_interact = false;
					var selection = d3.select(this);
					selection.select("path")
						.style("stroke-width", 2)
						.style("fill", "#fff")
						.style("fill-opacity", '0.4')
						.style("stroke-opacity", 1);
				} else {

					//To-do: Change Quote Function here
				}
			}

		})
		.on("mouseout", function (d, i) {
			var selection = d3.select(this);
			$('#quotearea').html("");
			selection.select("path")
				.style("stroke-width", 2)
				.style("fill", "#fff")
				.style("fill-opacity", '0')
				.style("stroke-opacity", 1);
			color_venn();
		});
	//Venn Diagram Mouse hover code ends

	//Quote Carousel using slick - initiate
	$('.carousel-class').slick({
		slidesToShow: 1,
		dots: true,
		speed: 100,
		centerMode: false
	});

	//Linking between slick carousel (quotes) -> venn
	$('.carousel-class').on('afterChange', function (event, slick, currentSlide) {
		if (venn_interact == true) {

		} else {
			console.log('User interacts with quotes');
			venn_select(pillar_name[currentSlide]);
		}
	});

	//System Runtime Code for whole venn diagram interaction
	startCount(3);

	//All Venn Diagram Related Functions ends

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
