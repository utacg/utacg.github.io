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

$("#gallery img").on("click", (e)=> {
	const header = document.querySelector(".header-area");
	header.style.display = "none";
	const modal = document.getElementById("myModal");
	console.log(e);
	const target_img = e.target;
	const modalImg = document.getElementById("img01");
	const captionText = document.getElementById("caption");
	modal.style.display = "block";
	modalImg.src = target_img.src;
	captionText.innerHTML = target_img.alt;
})

$(".close").on("click", ()=> {
	const modal = document.getElementById("myModal");
	modal.style.display = "none";
	const header = document.querySelector(".header-area");
	header.style.display = "block";
})