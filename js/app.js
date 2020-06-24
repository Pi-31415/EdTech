/*
This is the main JavaScript file for all the functions running on the web page. The functions are written in mixture of jQuery and pure JavaScript.
*/

//List of functions to use
function jumpto(elementid){
	//this is the function for smooth scrolling between the components when the buttons at the bottom of the component is clicked
	$([document.documentElement, document.body]).animate({
        scrollTop: $(elementid).offset().top
    }, 1000);
}

//Main function which runs when the page loads
$(document).ready(function () {

	$('#loginbutton').click(function () {
		$(".component-loginbox").addClass("active");
		//hides navbar for a while
		$(".navbar").hide();
		$(".content").hide();
	});
	
	
	//Function to close the login box and 
	$('#loginbox-close').click(function () {
		$(".component-loginbox").removeClass("active");
		$(".navbar").show();
		$(".content").show();
	});
	
	

});
