// import { Physics } from "./physics.js";
import { Config } from "./config.js";
import Matter from "matter-js";

import { CA } from "../scripts/capillary-action.js";
import { ST } from "../scripts/surface-tension.js";
// const Composite = Matter.Composite;
// const Composites = Matter.Composites;
// const Body = Matter.Body;
// const Events = Matter.Events;
// const Constraint = Matter.Constraint

// let composite_tube_object_dict = {};

// const CANVAS_HEIGHT = 1800;
// const CANVAS_WIDTH = 1800;

export const Canvas = {
	// Colors for the particles to be set in sequential order
	colors: ["#ffbf00", "#dc143c", "#8e2de2", "#2196f3", "#39ff14"],
	colorIndex: -1,

	init: function (demoName) {
		this.staticCanvas = document.querySelector("#static");
		this.particlesCanvas = document.querySelector("#particles");
		this.staticContext = this.staticCanvas.getContext("2d");
		this.particlesContext = this.particlesCanvas.getContext("2d");

		this.staticContext.canvas.width = Config.canvasWidth;
		this.staticContext.canvas.height = Config.canvasHeight;
		this.particlesContext.canvas.width = Config.canvasWidth;
		this.particlesContext.canvas.height = Config.canvasHeight;

		// Initializing the Matter.js Physics Engine using a custom wrapper
		// Matter.Bodies: https://brm.io/matter-js/docs/classes/Bodies.html
		// Matter.Constraint: https://brm.io/matter-js/docs/classes/Constraint.html
		let demo = null;
		let generateParticles = false;
		this.customParticleRadius = Config.particleRadius;
		// this.staticBodies = [];
		this.particles = [];

		if (demoName == "capillary-action") {
			demo = CA;
			generateParticles = true;
			this.customParticleRadius = 4;
			// console.log(CA);
		} else if (demoName === "surface-tension") {
			demo = ST;
		}

		this.physics = demo.physics(Config.canvasHeight, Config.canvasWidth);
		this.staticBodies = this.physics.initialBodies;
		if (generateParticles) {
			console.log(this.physics);
			this.particles = [];
			this.addParticles();
		}
	},

	addParticles: function () {
		let PCHeight = this.particlesCanvas.height; //* 2; // scaled to 2
		let PCWidth = this.particlesCanvas.width;

		this.colorIndex++;
		if (this.colorIndex >= this.colors.length) {
			this.colorIndex = 0;
		}
		const fillStyle = this.colors[this.colorIndex];

		for (let i = 0; i < Config.particleCount; i++) {
			this.physics
				.addBodies((Bodies) => {
					return [
						Bodies.circle(
							// this.particlesCanvas.width / 2 -
							// 	Config.slantRectDeltaX -
							// 	(Config.slantRectWidth *
							// 		Math.cos((Config.slantRectAngle * Math.PI) / 180)) /
							// 		2 +
							// 	~~(Math.random() * Config.particlesStreamInitialWidth) +
							// 	Config.particlesStreamInitialWidth +
							// 	((i + 1) % 10) * Config.particleRadius,
							// -~~((Config.particleCount + 1) / 10) * Config.particleRadius +
							// 	~~((i + 1) / 10) * Config.particleRadius,

							// Math.random() * (PCWidth * 2 - shelf_width * 2.5),
							Math.random() * 500,

							// Math.random() * (PCHeight * 2) - 500,
							Math.random() * 200 + 300,
							this.customParticleRadius,
							{ restitution: 0.2, friction: 0 }
						),
					];
				})
				.forEach((body) => {
					this.particles.push({ body, fillStyle });
				});
		}
	},

	draw: function () {
		this.staticContext.clearRect(
			0,
			0,
			this.staticCanvas.width,
			this.staticCanvas.height
		);
		this.particlesContext.clearRect(
			0,
			0,
			this.particlesCanvas.width,
			this.particlesCanvas.height
		);

		let th = this;

		this.staticBodies.forEach((s) => {
			let iteration = 0;

			function drawparticle(s, staticContext, color = "#fff") {
				staticContext.beginPath();
				if (s.label === "Rectangle Body") {
					if (s.isSensor && !s.isPartofTube) {
						return;
					}
					staticContext.fillStyle = color;
					staticContext.moveTo(s.vertices[0].x, s.vertices[0].y);
					staticContext.lineTo(s.vertices[1].x, s.vertices[1].y);
					staticContext.lineTo(s.vertices[2].x, s.vertices[2].y);
					staticContext.lineTo(s.vertices[3].x, s.vertices[3].y);
				}
				if (s.label === "Circle Body") {
					staticContext.fillStyle = color;
					staticContext.arc(
						s.position.x,
						s.position.y,
						s.circleRadius,
						0,
						2 * Math.PI
					);
				}
				if (s.label === "Constraint") {
					staticContext.fillStyle = color;
					staticContext.arc(s.pointA.x, s.pointA.y, 4, 0, 2 * Math.PI);
				}
				if (s.label === "tube") {
					if (iteration == 0) {
						iteration++;
						let col = "#fff";
						let colorInd = 0;
						for (let index = 0; index < s.parts.length; index++) {
							const cube = s.parts[index];
							if (cube.isSensor) {
								// col = "#353745";
								// col = th.colors[Math.floor(Math.random() * th.colors.length)];
								col = th.colors[colorInd];
								colorInd++;
								if (colorInd >= 5) {
									colorInd = 0;
								}
							} else {
								col = "#fff";
							}
							drawparticle(cube, staticContext, col);
						}
					}
				}
				if (s.label === "Soft Body") {
					for (let index = 0; index < s.bodies.length; index++) {
						const element = s.bodies[index];
						drawparticle(element, staticContext);
					}
				}
				if (s.label === "triangle") {
					// console.log("drawing triangle");
					// console.log(s);
					staticContext.fillStyle = color;
					staticContext.moveTo(s.vertices[0].x, s.vertices[0].y);
					staticContext.lineTo(s.vertices[1].x, s.vertices[1].y);
					staticContext.lineTo(s.vertices[2].x, s.vertices[2].y);
					// staticContext.lineTo(s.vertices[3].x, s.vertices[3].y);
				}
				if (s.label === "") staticContext.closePath();
				staticContext.fill();
			}
			drawparticle(s, this.staticContext);
		});

		for (let i = 0; i < this.particles.length; i++) {
			const position = this.particles[i].body.position;

			this.particlesContext.fillStyle = this.particles[i].fillStyle;
			this.particlesContext.beginPath();
			this.particlesContext.arc(
				position.x,
				position.y,
				Config.particleRadius,
				0,
				2 * Math.PI
			);
			this.particlesContext.closePath();
			this.particlesContext.fill();

			// Remove the particle when it goes off the visual viewport
			if (position.y > this.particlesCanvas.height + Config.particleRadius) {
				this.physics.removeBody(this.particles[i].body);
				this.particles.splice(i, 1);
				i--;
			}
			// Initiate the next stream of particles when the current count is less than 75% of the initial count
			// if (this.particles.length < Config.particleCount * 0.75) {
			// 	this.addParticles();
			// }
		}
		window.requestAnimationFrame(() => {
			this.draw();
		});
	},
	reset: function () {
		// this.particles = [];
		// try {
		// this.physics.initialBodies = [];
		// this.physics = null;
		// this.physics.addBodies = null;
		// } catch

		try {
			// Matter.Composite.clear(this.engine, false, true);

			console.log("TESTISET");
			// console.log(Matter.Composite.allBodies(this.engine.world));
			// console.log(
			this.physics.reSEAT();
			// );
		} catch (error) {
			console.log(error);
		}
	},
};

// let instances = [];
// export const createCanvas = function () {
// 	instances.forEach((elem) => {
// 		elem = null;
// 	});

// 	var v = jQuery.extend(true, {}, Canvas);

// 	// let v = structuredClone(Canvas);
// 	instances.push(v);
// 	return v;
// };
