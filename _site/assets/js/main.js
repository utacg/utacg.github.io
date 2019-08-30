/* =================================
------------------------------------
	EndGam - Gaming Magazine Template
	Version: 1.0
 ------------------------------------
 ====================================*/


'use strict';


$(window).on('load', function () {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

$(window).on('scroll', function () {
	if ($(window).scrollTop() > 20) {
		$('.header-area').addClass('sticky');
	} else {
		$('.header-area').removeClass('sticky');
	}
});

(function ($) {
	/*------------------
		Navigation
	--------------------*/



	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function () {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});




	/*------------------
		Hero Slider
	--------------------*/
	$('.hero-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		navText: ['', '<img src="img/icons/solid-right-arrow.png">'],
		mouseDrag: false,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		//autoplay: true,
		autoplayTimeout: 10000,
	});

	var dot = $('.hero-slider .owl-dot');
	dot.each(function () {
		var index = $(this).index() + 1;
		if (index < 10) {
			$(this).html('0').append(index + '.');
		} else {
			$(this).html(index + '.');
		}
	});



	/*------------------
		Video Popup
	--------------------*/
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});

	$('#stickySidebar').stickySidebar({
		topSpacing: 60,
		bottomSpacing: 60
	});


})(jQuery);

$(function () {
	var selectedClass = "";
	$(".gallery-filter").click(function () {
		selectedClass = $(this).attr("data-rel");
		$("#gallery").fadeTo(100, 0.1);
		$("#gallery .row div").not("." + selectedClass).fadeOut().removeClass('gallery-animation');
		setTimeout(function () {
			$("." + selectedClass).fadeIn().addClass('gallery-animation');
			$("#gallery").fadeTo(300, 1);
		}, 300);
	});
});
