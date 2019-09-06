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


// Selecting the DOM objects
const header = document.querySelector(".header-area");
const modal = document.querySelector("#myModal");
const modalImg = document.querySelector("#img01");
const captionText = document.querySelector("#caption");

// Modal img 
$("#gallery img").on("click", (e) => {
	const target_img = e.target;
	header.style.display = "none";
	modal.style.display = "block";
	modalImg.src = target_img.src;
	captionText.innerHTML = "Credit: " + target_img.alt;
})

$(".close").on("click", () => {
	modalImg.classList.add("shrink");
	captionText.classList.add("fade_away");
	setTimeout(() => {
		modal.style.display = "none";
		header.style.display = "block";
		modalImg.classList.remove("shrink");
		captionText.classList.remove("fade_away");
	}, 550);
})