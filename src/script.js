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

window.onload = () => {
	let last_hash =
		sessionStorage.last_hash === undefined ? "home" : sessionStorage.last_hash;
	// sessionStorage.pageHistory === undefined ? [] : sessionStorage.pageHistory;

	function changeContent(pagename) {
		console.log("changing content...");

		$.get(`./pages/${pagename}.html`, function (data) {
			//do something after getting the result
			$("#contents").html($(data));

			// page_list.push(pagename);
			window.location.hash = pagename;
			sessionStorage.last_hash = pagename;
			// console.log("window.location.hash");
			console.log(window.location.hash + "HASH");

			// if (Canvas !== null) {
			//     Canvas
			// }

			// Regisster events - unbind existing so that they won't be triggered when jquery detected that they are already bound
			$("#home")
				.off()
				.on("click", () => {
					console.log("HOME IS CLICKED");
					changeContent("home");
				});
			$(".CA")
				.off()
				.on("click", () => {
					console.log("CAPILLARY ACTION IS CLICKED");
					changeContent("capillary-action");
				});
			$(".ST")
				.off()
				.on("click", () => {
					console.log("SURFACE TENSION IS CLICKED");
					changeContent("surface-tension");
				});

			if (pagename !== "home") {
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
				Filters.set();
				// Controls.set();

				document.getElementById("particles").onwheel = function (event) {
					window.addEventListener("wheel", null, true);
				};

				document.getElementById("static").onwheel = function (event) {
					window.addEventListener("wheel", null, true);
				};
			}

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

				$(".main-carousel").flickity({
					// options
					cellAlign: "center",
					// contain: true,
					wrapAround: true,
				});
			}
		});
	}

	changeContent(last_hash);

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

// declare global {
// 	interface JQuery {
// 		waitForImages(func: Function): void;
// 		// flickity(options: any);
// 	}
// 	interface Flickity {
// 		setJQuery(): any;
// 	}
// }

// let range = Array.from({ length: 54 }, (_, i) => i + 1);
// // console.log(range);

// for (let index = 0; index < 5; index++) {
// 	let $gallery = $([`<div class="carousel">`, `</div>`].join("\n"));

// 	// let $gallery = $(".carousel");

// 	for (let index = 1; index < 10; index++) {
// 		let rand_index = Math.floor(Math.random() * range.length);
// 		// console.log(rand_index);
// 		// console.log(range[rand_index]);
// 		$gallery.append(
// 			'<div class="carousel-cell"><img id="image" src="./assets/img(' +
// 				range[rand_index] +
// 				').jpg" alt="" /></div>'
// 		);
// 		range.splice(rand_index, 1);
// 	}

// 	$(".gallery-container").append($gallery);
// }

// $("body").waitForImages(function () {
// 	// console.log("Images have been loaded");
// 	$(".carousel").each(function (index, element) {
// 		console.log(element);
// 		let odd_or_even = index % 2 == 0;

// 		Flickity.setJQuery($);
// 		jQueryBridget("flickity", Flickity, $);

// 		$(element).flickity({
// 			wrapAround: true,
// 			percentPosition: false,
// 			autoPlay: odd_or_even ? 2000 : 1500,
// 			imagesLoaded: true,
// 			rightToLeft: odd_or_even ? true : false,
// 			prevNextButtons: false,
// 			pageDots: false,
// 			pauseAutoPlayOnHover: false,
// 			cellAlign: "left",
// 		});
// 	});
// });

// let descriptionş: IStringIndex = {
// 	Beautiful: "😊",
// 	Loved: "💗",
// 	Cute: "😉",
// 	Sexy: "🤭",
// 	Smart: "🎓",
// 	Creative: "🎨",
// 	Enough: "🥰",
// 	"Worth it": "😚",
// };

// let t = Object.keys(descriptionş);
// function generateDescription() {
// 	let i: string = t.splice(Math.floor(t.length * Math.random()), 1).join();

// 	console.log(i);
// 	console.log(descriptionş[i]);

// 	return (
// 		"<span id='description'>" +
// 		i +
// 		"</span>" +
// 		"<span id='emoji'>" +
// 		descriptionş[i] +
// 		"</span>"
// 	);
// }

// window.onload = function () {
// 	new TypeIt("#typedtext", {
// 		// strings: ["test"],
// 		speed: 80,
// 		startDelay: 900,
// 		waitUntilVisible: true,
// 		afterComplete: async (n: any) => {
// 			let $description = $(
// 				[`<h3 id="description-container">`, `</h3>`].join("\n")
// 			);
// 			$("#type-container").append($description);

// 			n.destroy();

// 			let f = new TypeIt("#description-container", {
// 				speed: 80,
// 				startDelay: 500,
// 				// waitUntilVisible: true,
// 			})
// 				.type("&nbsp;")
// 				// .break()
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.pause(500)
// 				.delete("#description")
// 				.type(generateDescription())
// 				.go();
// 		},
// 	})
// 		.type("Hi!👋", { delay: 1500, lifeLike: true })
// 		.pause(500)
// 		.delete()
// 		.type("How are you?😊", { lifeLike: true })
// 		.pause(1000)
// 		.delete()

// 		.type("I hope you're doing well, my love!😘", {
// 			lifeLike: true,
// 		})
// 		.pause(2500)
// 		.delete()
// 		.type("I just want to say that...", { lifeLike: true })
// 		.pause(1500)
// 		.delete()
// 		.type("You are")
// 		// .type("Testing")
// 		.pause(500)
// 		.go();
// 	// .destroy();

// 	//color each description
// };

//Hi!👋", "How are you?😊", "I hope you're doing well, my love!😘", "I just want to say that...", 1.5, (caret-width: 2px, caret-space: 2px, iterations: 1, end-on: "You are
