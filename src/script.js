// import "https://code.jquery.com/jquery-3.6.3.slim.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js";

// import "../node_modules/flickity/dist/flickity.pkgd.min.js"; // //todo: make this persist on build

//import Flickity from "flickity"; // todo: make this persist in dev
// import Matter from "matter-js";
import { Canvas } from "./jsfluid/canvas.js";
// import { createCanvas } from "./jsfluid/canvas.js";
import { Filters } from "./jsfluid/filters.js";

import "./styles/jsfluid.scss";
// import "./styles/styles.scss";

// import "./styles/styles.scss";
// import "./scripts/interfaces.ts";

let canvas = null;
// let currently_setting_hash = false;
// let caused_by_internal = false;

import "./assets/ATOM.jpg";
import "./assets/redstone.png";
import "./assets/screenshot.png";
import "./assets/STEM.jpg";

import { Ambient } from "./scripts/ambient.min.js";

window.onload = () => {
	var ambient = new Ambient({ blur: -10 });

	let pageload = {
		ignorehashchange: false,
		loadUrl: function (event) {
			if (pageload.ignorehashchange == false) {
				//code to parse window.location.hash and load content
				let new_hash = event.newURL.slice(event.newURL.indexOf("#") + 1);
				console.log(new_hash);
				changeContent(new_hash);
			}
		},
	};

	let last_hash =
		sessionStorage.last_hash === undefined ? "home" : sessionStorage.last_hash;

	console.log("last_hash");
	console.log(last_hash);
	console.log(sessionStorage.last_hash);
	// sessionStorage.pageHistory === undefined ? [] : sessionStorage.pageHistory;

	window.addEventListener("hashchange", pageload.loadUrl, false);

	// window.onhashchange = function (event) {
	// 	// console.log("HASH CHANGE");
	// 	window.alert("HASH CHANGE: " + window.location.hash + event.newURL);
	// 	// window.alert(event.newURL);
	// 	let new_hash = event.newURL.slice(event.newURL.indexOf("#") + 1);
	// 	// window.alert(new_hash);
	// 	// if (window.location.hash !== "") {
	// 	if (new_hash !== "") {
	// 		// changeContent(window.location.hash);
	// 		changeContent(new_hash);
	// 		last_hash = new_hash;
	// 		// caused_by_internal = true

	// 		// return;
	// 	} else if (new_hash === "") {
	// 		// changeHash("home");
	// 	}

	// 	// event.stopImmediatePropagation();
	// };

	function changeContent(pagename) {
		// should be placed in the event handler but for effciency
		if (is_dragging) {
			return;
		}

		if (pagename.startsWith("#")) {
			pagename = pagename.slice(1);
		}

		// if (pagename === window.location.hash) {
		// 	console.log("ALREADY DISPLAYED: NOT CHANGING");
		// 	return;
		// }

		console.log("changing content...");

		function func() {
			$.get(`./pages/${pagename}.html`, function (data) {
				//do something after getting the result
				$("#contents").html($(data));

				// page_list.push(pagename);

				// if (Canvas !== null) {
				//     Canvas
				// }
				console.log("PAGE NAME: " + pagename);
				if (pagename !== "") {
					pageload.ignorehashchange = true;
					window.location.hash = pagename;

					setTimeout(function () {
						pageload.ignorehashchange = false;
					}, 100);
					// history.pushState(
					// 	"",
					// 	document.title,
					// 	window.location.pathname + "#" + pagename
					// );
					// history.replaceState(undefined, undefined, "#" + pagename);
					sessionStorage.last_hash = pagename;
					// console.log("window.location.hash");
					console.log(window.location.hash + " -> HASH");
					// window.alert(window.location.hash + " -> HASH");
				}

				// Regisster events - unbind existing so that they won't be triggered when jquery detected that they are already bound
				$("#home")
					.off()
					.on("click", () => {
						// console.log("HOME IS CLICKED");
						// caused_by_internal = true;
						changeContent("home");
						// window.location.hash = "home";
					});
				$(".CA")
					.off()
					.on("click", () => {
						// console.log("CAPILLARY ACTION IS CLICKED");
						// caused_by_internal = true;

						changeContent("capillary-action");
						// window.location.hash = "capillary-action";
					});
				$(".ST")
					.off()
					.on("click", () => {
						// console.log("SURFACE TENSION IS CLICKED");
						// caused_by_internal = true;
						changeContent("surface-tension");
						// window.location.hash = "surface-tension";
					});
				$(".VP")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("vapor-pressure");
						// window.location.hash = "vapor-pressure";
					});
				$(".BP")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("boiling-point");
						// window.location.hash = "vapor-pressure";
					});
				$(".V")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("viscosity");
						// window.location.hash = "vapor-pressure";
					});

				$(".MHV")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("molar-heat-of-vaporization");
						// window.location.hash = "vapor-pressure";
					});
				$(".FP")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("freezing-point");
						// window.location.hash = "vapor-pressure";
					});
				$(".MP")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("melting-point");
						// window.location.hash = "vapor-pressure";
					});
				$(".S")
					.off()
					.on("click", () => {
						// console.log("VAPOR PRESSURE IS CLICKED");
						// caused_by_internal = true;
						changeContent("sublimation");
						// window.location.hash = "vapor-pressure";
					});

				if (pagename !== "home") {
					try {
						let vid = document.getElementById("demo-vid");
						vid.currentTime = 22;
					} catch (error) {}

					ambient.mount();
					// VideoJS.setupAllWhenReady();
					let iter = 4;

					$("#change-liquid").on("click", () => {
						console.log("CHANGING LIQUID");
						// Matter.Composite.clear(engine.world, true);
						Canvas.reset();
						Canvas.init(pagename, iter % 3);
						Canvas.draw();
						iter++;

						// replaceFluid();
					});

					// if (canvas !== null) {
					// 	console.log("deleting pre physiscs");
					// 	// canvas.particles = null;
					// 	// canvas.particles = null;
					// 	// Matter.Composite.clear(canvas.physics.engine, false, true);
					// 	// delete canvas.physics;
					// }
					// if (canvas === null) {
					// 	// canvas = createCanvas();
					// }

					Canvas.reset();
					Canvas.init(pagename);
					Canvas.draw();
					// Filters.set();

					// Controls.set();

					document.getElementById("particles").onwheel = function (event) {
						window.addEventListener("wheel", null, true);
					};

					document.getElementById("static").onwheel = function (event) {
						window.addEventListener("wheel", null, true);
					};
				}

				// window.alert("setting eventlistener");

				if (pagename === "home") {
					new TypeIt("#title", {
						speed: 75,
						delay: 500,
						// loop: true,
					})
						.type("Redstone SURGE!")
						.pause(300)
						// .type("<br id='de'>")
						.type(
							"<span id='greet' style='font-size: 0.8em; white-space: pre-line'>\nEnjoy your visit!</span>"
						)
						.pause(500)
						.delete("#greet")
						// .delete("#de")
						.go();

					let carousel = $(".main-carousel").flickity({
						// options
						cellAlign: "center",
						// contain: true,
						autoPlay: true,
						pauseAutoPlayOnHover: true,

						wrapAround: true,
					});
					carousel.on("dragStart.flickity", function (event, pointer) {
						is_dragging = true;
						// window.alert("DRAG");
					});
					carousel.on("dragEnd.flickity", function (event, pointer) {
						setTimeout(() => {
							is_dragging = false;
						}, 200);
						// window.alert("DRAG");
					});
				}

				$("#myDropdown1").on("click", () => {
					console.log("DROPDOWN CLICKED 1");
					$("#myDropdown1").toggleClass("show");
				});
				$("#myDropdown2").on("click", () => {
					console.log("DROPDOWN CLICKED 2");
					$("#myDropdown2").toggleClass("show");
				});

				window.onclick = (e) => {
					let myDropdown1 = document.getElementById("myDropdown1");
					let myDropdown2 = document.getElementById("myDropdown2");
					let t = [myDropdown1, myDropdown2];

					t.forEach((element) => {
						// console.log(element.previousElementSibling);
						// console.log(e.target);
						// console.log(element.previousElementSibling != e.target);
						console.log("COMPARISON");
						console.log(e.target);
						console.log(element.previousElementSibling);
						if (element.previousElementSibling != e.target) {
							if (element.classList.contains("show")) {
								element.classList.remove("show");
							}
						}
					});
				};
			});
		}
		// caused_by_internal = false;
		func();
		// setInterval(func, 10000);
	}

	// function changeHash(hash) {
	// 	window.location.hash = hash;
	// 	last_hash = hash;
	// }

	let is_dragging = false;
	let is_clicked = false;

	// window.addEventListener("onmousedown", (event) => {

	// $(".caroucel-cell").on("mouseup", () => {
	// 	is_dragging = false;
	// });

	// changeHash(last_hash)
	// ambient.mount();

	changeContent(last_hash);

	// when this is called, the onhashchange is called, which callchangecontent again, this time false.

	// force brute to make this run only once

	// the sole purpose of this is to catch the back

	// changeContent("capillary-action");
	// changeContent("surface-tension");

	// $("#contents")

	// .load(function () {
	// });

	// function mv(event) {
	// 	console.log(event);

	// 	console.log($("html"));

	// 	$("html").animate(
	// 		{
	// 			scrollTop: event.deltaY,
	// 		},
	// 		800
	// 	);
	// }

	// document.getElementById("static").onmousewheel = function (event) {
	// 	event.preventDefault();
	// 	// window.scrollBy(event.deltaX, event.deltaY);
	// 	mv(event);
	// };
};
