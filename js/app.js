/*
This is the main JavaScript file for all the functions running on the web page. The functions are written in mixture of jQuery and pure JavaScript.
*/
//Global Variables
var pillar_state = "";
var pillar_name = ['academics', 'interest', 'portfolio'];
var slick_id = 0;
var venn_interact = false;
var venn_rotation_speed = 10000; // Venn rotation speed 10 seconds
var w = $(document).width(); // variable for window width
var sets;
var div = d3.select("#venn");
//for keeping track of scroll
var scroll;
var currentposition;

//List of functions to use
function jumpto(elementid) {
    //this is the function for smooth scrolling between the components when the buttons at the bottom of the component is clicked
    $([document.documentElement, document.body]).animate({
        scrollTop: $(elementid).offset().top
    }, 1000);
}

function loginboxclose() {
    document.getElementById("component-loginbox").style.display = "none";
    window.scrollTo(0, currentposition);
    //$(".navbar").show();
    //$(".content").show();
}

//Overlay
function on(header,imgurl,sentence) {
    var content="<div id='popup-inside'><div id='offbtn' onclick='off()'>X</div><br><img class='tutimage' style='margin-right:30px' src='"+imgurl+"'>"+"<span style='color:#9b1c31;font-size:1.3em;'>"+header+"</span><hr>"+sentence+"</div>";
    document.getElementById("component-popup").style.display = "block";
    document.getElementById("component-popup").innerHTML = content;
}
  
function off() {
    document.getElementById("component-popup").style.display = "none";
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
        checklist[2] = true;
        //$('#schedule-form-errors').html("Please enter a valid email address.");
        //$('#schedule-form-errors').fadeIn();
    }

    if (phone.length > 0) {
        checklist[3] = true;
    } else {
        checklist[3] = true;
        //$('#schedule-form-errors').html("Please enter phone number.");
        //$('#schedule-form-errors').fadeIn();
    }

    if (/^\d+$/.test(phone)) {
        checklist[4] = true;
    } else {
        checklist[4] = true;
        //$('#schedule-form-errors').html("Please enter a valid phone number.");
        //$('#schedule-form-errors').fadeIn();
    }

    if (email.length > 0) {
        checklist[0] = true;
    } else {
        checklist[0] = true;
        //$('#schedule-form-errors').html("Please fill in your email.");
        //$('#schedule-form-errors').fadeIn();
    }

    if (name.length > 0) {
        checklist[1] = true;
    } else {
        $('#schedule-form-errors').html("Please enter your full name.");
        $('#schedule-form-errors').fadeIn();
    }

    if (checklist[0] == true && checklist[1] == true && checklist[2] == true && checklist[3] == true && checklist[4] == true) {
        //Send form
        
        var customer = $(".mad-select").find("input").val();
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var school = $("#school").val();
        var howhelp = $("#howhelp").val();

        var query = "?customer=" + customer + "&name=" + name + "&email=" + email + "&phone=" + phone + "&school=" + school + "&howhelp=" + howhelp;

        //console.log(query);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
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
                var contact_message = ""; //loading bar
                $('#schedule-form-success').html("<br>" + contact_message);
                $('#schedule-form-success').fadeIn();
            }
        };
        console.log("./inquiry/" + query);
        xhttp.open("GET", "./inquiry/" + query, true);
        xhttp.send();
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
        function(d, i) {
            if (d.label == "ZMS") {
                return "#ca2128";
            } else if (d.label == "Competence" || d.label == "Motivation" || d.label == "Fit") {
                return '#666666';
            } else {
                return '#9b1c31';
            }
        }
    ).style("fill-opacity",
        function(d, i) {
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
        function(d, i) {
            if (d.label.toLowerCase() == pillar.toLowerCase()) {
                pillar_state = d.label.toLowerCase();
                update_slick_id(pillar_state);
                return '#fff';
            } else {
                return '#fff';
            }
        }).style('fill-opacity',
        function(d, i) {
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
    //console.log("Current Slick ID : " + slick_id + " - Pillar State : " + pillar_state);
}

/*
//Timer for Venn Diagram
var c = 0;
var t;
var timer_is_on = 0;

function timedCount() {
	next_slide();
	console.log(c);
	c = c + 1;
	//here is the number of seconds for rotation
	t = setTimeout(timedCount, 20000);
}

function startCount() {
	console.log('Venn Diagram Timer Started');
	if (!timer_is_on) {
		timer_is_on = 1;
		timedCount();
	}
}

function stopCount() {
	console.log('Venn Diagram Timer Paused');
	clearTimeout(t);
	timer_is_on = 0;
}
*/

function venn_resize() {

    var chart;
    /*
    console.log("w:"+w);
    console.log("Outer Width:"+window.outerWidth);
    console.log("Screen Width:"+screen.width);
    console.log("jquery Window Width:"+$(window).width())
    */
    var overlapping = 3;
    //Responsive overlapping for venn diagram
    if (w > 1260 && w < 1600) {
        //desktops
        overlapping = 3;
    } else if (w > 1120 && w < 1260) {
        //tablets
        overlapping = 5;
    } else if (w > 650 && w < 1175) {
        //phones
        overlapping = 5;
    } else if (w > 400 && w < 650) {
        //phones
        overlapping = 6;
    } else {
        //fallback
        overlapping = 5;
    }

    //Venn Diagram Mouse hover code using D3 js and venn js
    sets = [{
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
            size: overlapping
        },
        {
            sets: ['A', 'C'],
            label: 'Competence',
            size: overlapping
        },
        {
            sets: ['B', 'C'],
            label: 'Motivation',
            size: overlapping
        },
        {
            sets: ['A', 'B', 'C'],
            label: 'ZMS',
            size: 3
        }
    ];
}

function draw_venn() {
    console.log("Drawing Venn Diagram");
    w = $(document).width();
    //Get screen sizes and font sizes for venn diagram responsive design
    if (w > 1260) {
        //desktops
        console.log('Size: 1260 and above');
        chart = venn.VennDiagram().width(w / 3).height(w / 3);
        div.datum(sets).call(chart);
        color_venn();
        d3.selectAll("#venn text").style("fill", "#fff");
        d3.selectAll("#venn text").style("font-size", "0.8em");

    } else if (w > 1120 && w < 1260) {
        //tablets
        console.log('Size: 1120 and 1260');
        chart = venn.VennDiagram().width(w / 3).height(w / 3);
        div.datum(sets).call(chart);
        color_venn();
        d3.selectAll("#venn text").style("fill", "#fff");
        d3.selectAll("#venn text").style("font-size", "0.7em");
    } else if (w > 650 && w < 1175) {
        //phones
        console.log('Size: 650 and 1175');
        chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
        div.datum(sets).call(chart);
        color_venn();
        d3.selectAll("#venn text").style("fill", "#fff");
        d3.selectAll("#venn text").style("font-size", "0.8em");
    } else if (w > 400 && w < 650) {
        //phones
        console.log('Size: 400 and 650');
        chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
        div.datum(sets).call(chart);
        color_venn();
        d3.selectAll("#venn text").style("fill", "#fff");
        d3.selectAll("#venn text").style("font-size", "0.5em");
    } else {
        //fallback
        console.log('Size: others');
        chart = venn.VennDiagram().width(w / 1.2).height(w / 1.2);
        div.datum(sets).call(chart);
        color_venn();
        d3.selectAll("#venn text").style("fill", "#fff");
        d3.selectAll("#venn text").style("font-size", "0.5em");
    }
}

//Main function which runs when the page loads
$(document).ready(function() {

    window.addEventListener("scroll", function(event) {
        scroll = this.scrollY;
    });

    venn_resize();
    draw_venn();

    var div = d3.select("#venn");

    div.selectAll("g")
        .on("mouseover", function(d, i) {
            //disable interaction with venn diagram if it is viewed on phone
            if (w >= 600) {
                color_venn();
                // highlight the current path
                if (d.label == "Academics" || d.label == "Portfolio" || d.label == "Interest") {
                    //stopCount();
                    $('.carousel-class').slick('slickPause');
                    //console.log('User interacts with venn diagram');
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
                    $('.carousel-class').slick('slickPlay');
                    //To-do: Change Quote Function here
                }
            }

        })
        .on("mouseout", function(d, i) {
            //Bug
            if (w >= 600) {
                $('.carousel-class').slick('slickPlay');
                var selection = d3.select(this);
                $('#quotearea').html("");
                selection.select("path")
                    .style("stroke-width", 2)
                    .style("fill", "#fff")
                    .style("fill-opacity", '0')
                    .style("stroke-opacity", 1);
                color_venn();
            }
        });
    //Venn Diagram Mouse hover code ends

    //Quote Carousel using slick - initiate
    $('.carousel-class').slick({
        slidesToShow: 1,
        dots: true,
        speed: 100,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: venn_rotation_speed
    });

    next_slide();

    //Linking between slick carousel (quotes) -> venn
    $('.carousel-class').on('afterChange', function(event, slick, currentSlide) {
        if (venn_interact == true) {

        } else {
            //console.log('User interacts with quotes');
            venn_select(pillar_name[currentSlide]);
        }
    });

    $("#quotecontainer").mouseover(function() {
        //console.log("pause quote mouse in");
        $('.carousel-class').slick('slickPause');
    });

    $('#quotecontainer').mouseout(function() {
        //console.log("counting again after quote mouse out");
        $('.carousel-class').slick('slickPlay');
    });


    //All Venn Diagram Related Functions ends

    //Hide unnecessary components (such as notices and validation messages) for fade in
    $('#username_navbar').hide();
    $('#schedule-form-success').hide();

    //Log in Popup
    $('#loginbutton').click(function() {
        //currentposition = scroll;
        //document.getElementById("component-loginbox").style.display = "block";
        //hides navbar for a while
        //$(".navbar").hide();
        //$(".content").hide();
    });

    //Function to close the login box and 
    $('#loginbox-close').click(function() {
        loginboxclose();
    });
});