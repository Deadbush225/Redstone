// import { Physics } from "./physics.js";
import { Config } from "./config.js";
import Matter from "matter-js";

import { CA } from "../scripts/capillary-action.js";
import { ST } from "../scripts/surface-tension.js";
import { V } from "../scripts/viscosity.js";
import { VP } from "../scripts/vapor-pressure.js";
import { S } from "../scripts/sublimation.js";
import { MP } from "../scripts/mellting-point.js";
// const Composite = Matter.Composite;
// const Composites = Matter.Composites;
// const Body = Matter.Body;
const Bodies = Matter.Bodies;
// const Events = Matter.Events;
// const Constraint = Matter.Constraint

// let composite_tube_object_dict = {};

// const CANVAS_HEIGHT = 1800;
// const CANVAS_WIDTH = 1800;

export const Canvas = {
	// Colors for the particles to be set in sequential order
	colors: ["#ffbf00", "#dc143c", "#8e2de2", "#2196f3", "#39ff14"],
	colorIndex: -1,

	// fluidToDrop: function (x, y, w, h, friction, frictionAir, frictionStatic) {
	// 	// let composite = Matter.Composite.create();
	// 	// let liquid = [];
	// 	for (let index = 0; index < 200; index += 1) {
	// 		// let blob_rad = 350;
	// 		// let negator = Math.random() > 0.5 ? -1 : 1;
	// 		// let random_degree = Math.PI * Math.random();

	// 		let _x = (x + w) * Math.random(); // * negator; // 100 is offset
	// 		let _y = (y + h) * Math.random(); // * negator;

	// 		let circle = Bodies.circle(_x, _y, 15, {
	// 			mass: 0,
	// 			isStatic: false,
	// 			friction: friction,
	// 			frictionAir: frictionAir,
	// 			frictionStatic: frictionStatic,
	// 		});
	// 		// liquid.push(circle);
	// 		this.particles.push({ body: circle, fillstyle: this.colors[0] });
	// 		// Matter.Composite.add(composite, circle);
	// 	}

	// 	// console.log(composite);

	// 	// composite.label = "Soft Body";
	// 	// return composite;
	// 	console.log("PARTICLES GENERATED");
	// 	console.log(this.particles);
	// },

	init: function (demoName, arrayIndex = 0) {
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
		let generateReplaceableParticles = false;
		this.customParticleRadius = Config.particleRadius;
		// this.staticBodies = [];
		this.particles = [];

		console.log(`DEMO NAME - ${demoName}`);

		let map = [
			[0, 0.01, 1, "skyblue"],
			[1, 0.02, 5, "orange"],
			[1, 0.1, 10, "yellow"],
		];

		if (demoName == "capillary-action") {
			demo = CA;
			generateParticles = true;
			this.customParticleRadius = 4;
			// console.log(CA);
		} else if (demoName === "surface-tension") {
			demo = ST;
		} else if (demoName === "viscosity") {
			// console.log("viscosity");
			// this.customParticleRadius = 4;
			// generateReplaceableParticles = true;

			console.log("arrayIndex");
			console.log(arrayIndex);
			console.log(map[arrayIndex]);
			demo = V;
			demo.exampleInitialize(map[arrayIndex]);
		} else if (demoName === "vapor-pressure") {
			demo = VP;
		} else if (demoName === "boiling-point") {
			demo = VP;
		} else if (demoName === "freezing-point") {
		} else if (demoName === "melting-point") {
			demo = MP;
		} else if (demoName === "molar-heat-of-vaporization") {
			demo = VP;
		} else if (demoName === "sublimation") {
			demo = S;
		}

		console.log("DEMO");
		console.log(demo);
		this.physics = demo.physics(Config.canvasHeight, Config.canvasWidth);

		this.staticBodies = this.physics.initialBodies;

		console.log(this.staticBodies);
		console.log("PHYSICS");
		console.log(this.physics);

		this.particles = [];
		if (generateParticles) {
			console.log(this.physics);
			this.addParticles();
		}
		// if (generateReplaceableParticles) {
		// let t = this;
		// console.log(t);
		// function replaceFluid() {
		// 	t.fluidToDrop(50, 50, 100, 100, 1, 0.1, 10);
		// }
		// $("#change-liquid").on("click", () => {
		// 	t.clear();
		// 	replaceFluid;
		// });
		// replaceFluid();
		// }
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
					this.particles.push({ body: body, fillStyle: fillStyle });
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

		// console.log(this.staticBodies);

		this.staticBodies.forEach((s) => {
			let iteration = 0;

			function drawparticle(s, staticContext, color = "#fff") {
				staticContext.beginPath();
				if (s.label === "Rectangle Body") {
					if (s.isSensor) {
						// if (s.isSensor && !s.isPartofTube) {
						return;
					}
					// console.log("drawing square");
					staticContext.fillStyle = color;
					staticContext.moveTo(s.vertices[0].x, s.vertices[0].y);
					staticContext.lineTo(s.vertices[1].x, s.vertices[1].y);
					staticContext.lineTo(s.vertices[2].x, s.vertices[2].y);
					staticContext.lineTo(s.vertices[3].x, s.vertices[3].y);
				}
				if (s.label === "Circle Body") {
					staticContext.fillStyle = s.fill !== undefined ? s.fill : color;
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

		// console.log(this.particles);
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

			// console.log("RESET FUNCTION");
			// console.log(Matter.Composite.allBodies(this.engine.world));
			// console.log(
			this.physics.reSEAT();
			// );
		} catch (error) {
			// console.log(error);
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
