import { Physics } from "./physics.js";
import { Config } from "./config.js";
import Matter from "matter-js";
// import { error } from "jquery";

// const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Body = Matter.Body;
const Events = Matter.Events;
// const Constraint = Matter.Constraint

let composite_tube_object_dict = {};

// const CANVAS_HEIGHT = 1800;
// const CANVAS_WIDTH = 1800;

const shelf_width = 400;

const CompositeTubeFactory = {
	//[particle, factor]
	particles_to_move_up: [],
	collider: [],

	init: function (x, y, Bodies, engine, rows = 10, columns = 4) {
		let current_row = 0;
		let current_column = 1;
		let row_dictionary = {};

		const cubes = Composites.stack(
			// CANVAS_WIDTH / 2,
			x,
			y,
			columns,
			rows,
			-5,
			-5,
			function (x, y) {
				// console.log(current_column);
				let isSensor = true;
				if (current_column == 1 || current_column == columns) {
					isSensor = false;
				}
				// if (current_row == rows - 1 || current_row == rows) {
				// 	isSensor = true;
				// }

				if (current_column == columns) {
					// console.log(current_column, current_row);

					current_column = 0;
					composite_tube_object_dict[current_row] = row_dictionary;
					row_dictionary = {};
					current_row++;
				}
				// console.log(current_column, current_row);

				// console.log(columns);

				let cube = Bodies.rectangle(x, y, 25, 25, {
					cordinates: [current_column, current_row],
					// isSensor: current_column == 1 || current_column == 4 ? false : true,
					isSensor: isSensor,
					restitution: 0,
					isPartofTube: true,
					// density: 10,
					// mass: 10,
					isStatic: true,
					tubeWidth: columns,
				});

				row_dictionary[current_column] = cube;

				current_column++;

				return cube;
				// return Bodies.circle(x, y, 10);
			}
		);

		console.log(composite_tube_object_dict);

		const composite_tube = Body.create({
			parts: cubes.bodies,
			label: "tube",
			// density: 2,
			friction: 1,
			// mass: 10,
			restitution: 0,
			// frictionStatic: 10,
		});
		console.log(composite_tube);

		Events.on(engine, "beforeUpdate", function () {
			Matter.Body.setAngularVelocity(composite_tube, 0);
			// Matter.Body.setMass(composite_tube, 10);
		});

		for (let index = rows - 1; index > 2; ) {
			// for (let index = 6; index > -1; ) {
			// console.log(index);
			// console.log(composite_tube_object_dict[index]);
			this.collider.push(composite_tube_object_dict[index][2]);
			this.collider.push(composite_tube_object_dict[index][3]);
			index -= 1;
		}

		// Matter.Body.set(composite_tube_object_dict[18][0], { friction: 1 });
		// Matter.Body.set(composite_tube_object_dict[18][1], { friction: 1 });
		// Matter.Body.set(composite_tube_object_dict[18][2], { friction: 1 });
		// Matter.Body.set(composite_tube_object_dict[18][3], { friction: 1 });
		// composite_tube_object_dict[9][2], ;

		// console.log("collider");
		// console.log(collider);
		composite_tube.collider = this.collider;
		composite_tube.particles_to_move_up = this.particles_to_move_up;

		return composite_tube;
	},
};

export const Canvas = {
	// Colors for the particles to be set in sequential order
	colors: ["#ffbf00", "#dc143c", "#8e2de2", "#2196f3", "#39ff14"],
	colorIndex: -1,

	init: function () {
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
		this.physics = Physics((Bodies, Constraint, engine, mouseConstraint) => {
			const COS = Math.cos((Config.slantRectAngle * Math.PI) / 180);
			const SIN = Math.sin((Config.slantRectAngle * Math.PI) / 180);

			// console.log(this.particlesCanvas.height);
			// console.log(this.particlesCanvas.width);
			// console.log(this.particlesContext.canvas.height);
			// console.log(this.particlesContext.canvas.width);

			let PCHeight = this.particlesCanvas.height; //* 2; // scaled to 2
			let PCWidth = this.particlesCanvas.width;
			let Thickness_clipping = Config.rectThickness / 2;

			const leftVerticalRect = Bodies.rectangle(
				Thickness_clipping, //can't use zero since
				0,
				Config.rectThickness,
				PCHeight * 2,
				{ isStatic: true }
			);

			const rightVerticalRect = Bodies.rectangle(
				PCWidth - Thickness_clipping - shelf_width,
				100,
				Config.rectThickness,
				PCHeight * 2,
				{ isStatic: true }
			);

			const topSlantRect = Bodies.rectangle(
				100,
				PCHeight - Thickness_clipping,
				PCWidth * 2 - shelf_width * 2.5,
				Config.rectThickness,
				{ isStatic: true }
			);

			const shelf_floor = Bodies.rectangle(
				PCWidth * 2 - shelf_width * 2.5 + 125, //plus margin
				PCHeight - Thickness_clipping,
				shelf_width * 2.5,
				Config.rectThickness,
				{ isStatic: true, friction: 1, restitution: 0 }
			);

			// const shelf_holder = Bodies.rectangle(
			// 	PCWidth * 2 - shelf_width * 2.5 + 125, //plus margin
			// 	PCHeight - Thickness_clipping - 100,
			// 	shelf_width * 2.5,
			// 	Config.rectThickness,
			// 	{ isStatic: true, isSensor: true }
			// );

			// Events.on(engine, "collisionStart", function (evt) {
			// 	// console.log(evt.pairs);
			// 	// evt.pairs.filter(() => {});
			// 	var pairs = evt.pairs;

			// 	for (var i = 0, j = pairs.length; i != j; ++i) {
			// 		var pair = pairs[i];

			// 		// if (pair.bodyA.isStatic) {
			// 		// 	continue;
			// 		// }
			// 		// if (pair.bodyB.isStatic) {
			// 		// 	continue;
			// 		// }

			// 		if (shelf_holder === pair.bodyA) {
			// 			// Matter.Body.applyForce(pair.bodyB, pair.bodyB.position, {
			// 			// 	// x: -100,
			// 			// 	y: -1300,
			// 			// });
			// 			// Matter.Body.setPosition(pair.bodyB, { x: 100, y: 100 }, true);
			// 			// console.log(pair.bodyB);
			// 			// pair.bodyB.render.opacity = 0;
			// 			Matter.Body.setVelocity(pair.bodyB.parent, { x: 0, y: -1 });

			// 			// console.log(composite_tube_object_dict[18][1].cordinates);
			// 			// if (pair.bodyA == composite_tube_object_dict[18][1]) {
			// 			// 	console.log("detected");
			// 			// }
			// 			// console.log("detected");
			// 		} else if (shelf_holder === pair.bodyB) {
			// 			// console.log("detected");
			// 			// particles_to_move_up.push(pair.bodyA);
			// 			Matter.Body.setVelocity(pair.bodyA.parent, { x: 0, y: -1 });
			// 			// console.log(pair.bodyA);
			// 			// Matter.Body.setPosition(pair.bodyA, { x: 100, y: 100 }, true);
			// 			// Matter.Body.applyForce(pair.bodyA, pair.bodyA.position, {
			// 			// 	// x: -100,
			// 			// 	y: -1300,
			// 			// });
			// 			// pair.bodyA.render.opacity = 0;
			// 		}
			// 		// Matter.Body.setVelocity(pair.bodyB, { y: 0 });
			// 	}
			// });

			const square = Bodies.rectangle(100, 100, 100, 100);

			const composite_tube = CompositeTubeFactory.init(
				PCWidth - shelf_width + 65,
				110,
				Bodies,
				engine,
				15,
				4
			);

			const composite_tube1 = CompositeTubeFactory.init(
				PCWidth - shelf_width + 65 + 100,
				110,
				Bodies,
				engine,
				15,
				5
			);

			const composite_tube2 = CompositeTubeFactory.init(
				PCWidth - shelf_width + 65 + 100 + 120,
				110,
				Bodies,
				engine,
				15,
				3
			);

			const composite_tubes = [
				composite_tube,
				composite_tube1,
				composite_tube2,
			];

			Events.on(engine, "collisionStart", function (evt) {
				// let inMin = 3;
				// let inMax = 5;
				// let outMin = 0.999;
				// let outMax = 0.989;
				let force_map = {
					3: 0.996,
					4: 0.998,
					5: 0.999,
				};

				for (var k = 0; k < composite_tubes.length; k++) {
					let elm = composite_tubes[k];

					// console.log(elm);
					// console.log(elm.collider);
					// console.log(elm.particles_to_move_up);
					var pairs = evt.pairs;

					elm.particles_to_move_up = []; // clear every update

					for (var i = 0, j = pairs.length; i != j; ++i) {
						var pair = pairs[i];

						// if (pair.bodyA.isStatic) {
						// 	if (pair.bodyB.isPartofTube) {
						// 		pair.bodyB.parent.isStatic = true;
						// 	}
						// 	// pair.isActive = false;
						// 	// Matter.Body.setPosition(pair.bodyB, pair.bodyB.positionPrev);
						// 	// console.log(pair.bodyA.position.y - pair.bodyA.positionPrev.y);
						// 	// console.log(
						// 	// 	`${pair.bodyB.positionPrev.y} : ${pair.bodyB.position.y}`
						// 	// );
						// 	continue;
						// }
						// if (pair.bodyB.isStatic) {
						// 	if (pair.bodyA.isPartofTube) {
						// 		pair.bodyA.parent.isStatic = true;
						// 	}
						// 	continue;
						// 	// pair.isActive = false;
						// 	// Matter.Body.setPosition(pair.bodyA, pair.bodyA.positionPrev);
						// }

						if (
							pair.bodyA.label !== "Circle Body" &&
							pair.bodyB.label !== "Circle Body"
						) {
							continue;
						}

						if (
							pair.bodyA.label === "Circle Body" &&
							pair.bodyB.label === "Circle Body"
						) {
							continue;
						}

						// console.log(pair.bodyA);
						// if (pair.bodyA.isPartofTube) {
						// 	console.log("det");
						// 	if (!pair.bodyA.isSensor) {
						// 		pair.isActive = false;
						// 	}
						// }

						// // console.log(pair.bodyB);
						// if (pair.bodyB.isPartofTube) {
						// 	console.log("det");
						// 	if (!pair.bodyB.isSensor) {
						// 		pair.isActive = false;
						// 	}
						// }

						// improve checking
						if (elm.collider.some((elem) => elem === pair.bodyA)) {
							// Matter.Body.applyForce(pair.bodyB, pair.bodyB.position, {
							// 	// x: -100,
							// 	y: -1300,
							// });
							// Matter.Body.setPosition(pair.bodyB, { x: 100, y: 100 }, true);
							// console.log(pair.bodyB);
							// pair.bodyB.render.opacity = 0;

							// make it check the label if either one is "Circle Body"
							elm.particles_to_move_up.push([
								pair.bodyB,
								// ((pair.bodyA.tubeWidth - inMin) * (outMax - outMin)) /
								// 	(inMax - inMin) +
								// 	outMin,
								force_map[pair.bodyA.tubeWidth],
							]);

							// console.log(composite_tube_object_dict[18][1].cordinates);
							// if (pair.bodyA == composite_tube_object_dict[18][1]) {
							// console.log("detected");
							// }
						} else if (elm.collider.some((elem) => elem === pair.bodyB)) {
							// console.log("detected");

							elm.particles_to_move_up.push([
								pair.bodyA,
								force_map[pair.bodB.tubeWidth],
								// ((pair.bodyB.tubeWidth - inMin) * (outMax - outMin)) /
								// 	(inMax - inMin) +
								// 	outMin,
							]);

							// console.log(pair.bodyA);
							// Matter.Body.setPosition(pair.bodyA, { x: 100, y: 100 }, true);
							// Matter.Body.applyForce(pair.bodyA, pair.bodyA.position, {
							// 	// x: -100,
							// 	y: -1300,
							// });
							// pair.bodyA.render.opacity = 0;
						}

						// Matter.Body.setVelocity(pair.bodyB, { y: 0 });
					}
				}
			});

			Events.on(engine, "beforeUpdate", function (evt) {
				for (var k = 0; k < composite_tubes.length; k++) {
					let elm = composite_tubes[k];
					for (
						let index = 0;
						index < elm.particles_to_move_up.length;
						index++
					) {
						// console.log("moving");
						const data = elm.particles_to_move_up[index];

						let element = data[0];
						let factor = data[1];

						var py = element.position.y * factor;
						// var py = element.position.y * 0.996;

						Body.setPosition(element, { x: element.position.x, y: py }, true);
					}
				}
			});

			let dragBody;

			// make it not static when it is in a certain region
			Events.on(mouseConstraint, "startdrag", function (event) {
				dragBody = event.body;

				if (!dragBody.isStatic) {
					return;
				}
				console.log(event);

				if (dragBody.label === "tube") {
					dragBody.isStatic = false;
				}
			});

			Events.on(mouseConstraint, "enddrag", function (event) {
				dragBody = null;
			});
			// const composite_tube2 = CompositeTubeFactory.init(
			// 	PCWidth * 2 - 400,
			// 	100,
			// 	Bodies,
			// 	engine
			// );

			// const composite_tube3 = CompositeTubeFactory.init(
			// 	PCWidth * 2 - 300,
			// 	100,
			// 	Bodies,
			// 	engine
			// );

			// Events.on(engine, "beforeUpdate", function () {
			// 	// console.log(composite_tube);

			// 	for (var k = 0; k < composite_tubes.length; k++) {
			// 		let elm = composite_tubes[k];

			// 		if (elm.velocity.x > -5 || elm.velocity.x < 2) {
			// 			// Matter.Body.setPosition(composite_tube, pos, true);
			// 			elm.position.x = elm.positionPrev.x;
			// 		}

			// 		// if (elm.velocity.y > -5 || elm.velocity.y < 2) {
			// 		// 	// Matter.Body.setPosition(composite_tube, pos, true);
			// 		// 	elm.position.y = elm.positionPrev.y;
			// 		// }

			// 		// if (
			// 		// 	composite_tube.velocity.y > -0.7 ||
			// 		// 	composite_tube.velocity.y < 0.7
			// 		// ) {
			// 		// 	// Matter.Body.setPosition(composite_tube, pos, true);
			// 		// 	composite_tube.position.y = composite_tube.positionPrev.y;
			// 		// }
			// 		// console.log(composite_tube.position.y - composite_tube.positionPrev.y);
			// 		// console.log(composite_tube.inertia);
			// 		// if (elm.inertia > 300) {
			// 		// 	Matter.Body.setInertia(elm, 300);
			// 		// }

			// 		// if (elm.mass > 5) {
			// 		// 	Matter.Body.setMass(elm, 5);
			// 		// }
			// 		// console.log(composite_tube.angularSpeed);
			// 		// if (composite_tube.angularVelocity > 0) {
			// 		// 	Matter.Body.setAngularVelocity(composite_tube, 0);
			// 		// }
			// 	}
			// });

			return [
				leftVerticalRect,
				topSlantRect,
				rightVerticalRect,
				shelf_floor,
				composite_tube,
				composite_tube1,
				composite_tube2,
				// shelf_holder,
				// square,
			];
		});

		this.staticBodies = this.physics.initialBodies;
		this.particles = [];
		this.addParticles();
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
							Config.particleRadius,
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
};
