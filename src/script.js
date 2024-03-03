import "https://code.jquery.com/jquery-3.6.3.slim.js";
import "https://cdnjs.cloudflare.com/ajax/libs/jquery.waitforimages/1.5.0/jquery.waitforimages.min.js";

// import "../node_modules/flickity/dist/flickity.pkgd.min.js"; // //todo: make this persist on build

//import Flickity from "flickity"; // todo: make this persist in dev
// import Matter from "matter-js";
import { Canvas } from "./jsfluid/canvas.js";
import { Controls } from "./jsfluid/controls.js";
import { Filters } from "./jsfluid/filters.js";

import "./styles/jsfluid.scss";
// import "./styles/styles.scss";

// import "./styles/styles.scss";
// import "./scripts/interfaces.ts";

window.onload = () => {
	Canvas.init();
	Canvas.draw();
	Filters.set();
	Controls.set();

	document.getElementById("particles").onwheel = function (event) {
		event.preventDefault();
		window.scrollBy(event.deltaX, event.deltaY);
	};

	document.getElementById("particles").onmousewheel = function (event) {
		event.preventDefault();
		window.scrollBy(event.deltaX, event.deltaY);
	};

	document.getElementById("static").onwheel = function (event) {
		event.preventDefault();
		window.scrollBy(event.deltaX, event.deltaY);
	};

	document.getElementById("static").onmousewheel = function (event) {
		event.preventDefault();
		window.scrollBy(event.deltaX, event.deltaY);
	};
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
