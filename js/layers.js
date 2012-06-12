/**
 *
 * License Layers Demo Javascript
 * 
 * copyright 2010, Creative Commons, Nathan Yergler, Alex Roberts
 * licensed to the public under CC BY 3.0 Unported
 * <http://creativecommons.org/licenses/by/3.0/>.
 *
 * Relies on jquery (tested with 1.4.4).
 * 
 **/

$(document).ready(function() {

    // when a license layer (or the CC front-piece) is clicked...
    $(".layer").click(function(e) {

	// shift to isometric projection
	$(".layer").addClass("iso");

	// wait for the transition...
	window.setTimeout(function() {

	    // explode the isometric view
	    $(".iso").addClass("exploded");

	    // attach the hover in/out listeners
	    $(".exploded").hover(
		function(e) {
		    $(".exploded").addClass("dimmed");
		    $(this).removeClass("dimmed").addClass("hover");
		},
		function(e) {
		    $(".exploded").removeClass("hover").removeClass("dimmed");
		});
	    
	}, 750);

    });

    $(".iso").live("click", function(e) {
	
	if ($(this).hasClass("focused")) {
	    // the element was previously focused, return to the stack
            $(this).removeClass("focused");
	    $("#" + $(this).attr("id") + "Desc").removeClass("focusedtext");

	    // show the intro text
	    $("#intro").addClass("focusedtext");
	    
	} else if ($(this).hasClass("exploded")) {

	    // do not process events for the #deck layer after exploding
	    if ($(this).attr("id") == "deck") return;

	    // focus on this layer
	    
	    // -- first unfocus other layers
            $(".iso").removeClass("focused");
            $(".description").removeClass("focusedtext");
	    
	    // -- focus on the layer and show the description
            $(this).addClass("focused");
	    $("#" + $(this).attr("id") + "Desc").addClass("focusedtext");
	} 

    }); // on layer click    
    
    $("#getstarted").click(function(e) {
	$("#deck").click();
	e.preventDefault();
    });

    $("#reset").click(function(e) {

	// unbind the hover listener
	$(".exploded").unbind("hover");

	// remove the exploded class (returning the layers to "iso")
	$(".layer").removeClass("exploded");

	// after the transition completes, return to the non-iso view
	window.setTimeout(function() {
	    $(".layer").removeClass("iso");
	}, 750);

	// do not follow the actual link
	e.preventDefault();
    });

    $(document).click(function(e) {

	// don't handle layer or anchor clicks
	if (!$(e.target).hasClass("layer") &&
	    !$(e.target).attr("href")) {

	    // unfocus all layers
            $(".iso").removeClass("focused");
            $(".description").removeClass("focusedtext");

	    // show the intro text
	    $("#intro").addClass("focusedtext");
	}
    });

});
