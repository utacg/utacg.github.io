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