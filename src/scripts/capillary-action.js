import { Config } from "../jsfluid/config.js";
import { Physics } from "../jsfluid/physics.js";

const Composites = Matter.Composites;
const Body = Matter.Body;
const Events = Matter.Events;
const shelf_width = 400;
let composite_tube_object_dict = {};

const CompositeTubeFactory = {
	//[particle, factor]
	particles_to_move_up: [],
	collider: [],

	init: function (x, y, Bodies, engine, rows = 10, columns = 4) {
		let current_row = 0;
		let current_column = 1;
		let row_dictionary = {};

		const cubes = Composites.stack(
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

				if (current_column == columns) {
					// console.log(current_column, current_row);

					// current_column = 0;
					composite_tube_object_dict[current_row] = row_dictionary;
					row_dictionary = {};

					current_column = 1;
					current_row++;
				} else {
					current_column++;
				}

				// console.log(current_column, current_row);

				return cube;
				// return Bodies.circle(x, y, 10);
			}
		);

		// console.log(composite_tube_object_dict);

		const composite_tube = Body.create({
			parts: cubes.bodies,
			label: "tube",
			// density: 2,
			friction: 1,
			// mass: 10,
			restitution: 0,
			// frictionStatic: 10,
		});
		// console.log(composite_tube);

		Events.on(engine, "beforeUpdate", function () {
			Matter.Body.setAngularVelocity(composite_tube, 0);
			// Matter.Body.setMass(composite_tube, 10);
		});

		for (let index = rows - 1; index > 0; ) {
			// for (let index = 6; index > -1; ) {
			// console.log(index);
			// console.log(composite_tube_object_dict[index]);
			this.collider.push(composite_tube_object_dict[index][2]);
			this.collider.push(composite_tube_object_dict[index][3]);
			index -= 1;
		}

		// console.log("collider");
		// console.log(collider);
		composite_tube.collider = this.collider;
		composite_tube.particles_to_move_up = this.particles_to_move_up;

		return composite_tube;
	},
};

export const CA = {
	physics: function (canvasHeight, canvasWidth) {
		return Physics((Bodies, Constraint, engine, mouseConstraint) => {
			this.engine = engine;

			// console.log(engine.gravity.y);
			engine.gravity.y = 0.4;
			// console.log(engine.gravity.y);

			const COS = Math.cos((Config.slantRectAngle * Math.PI) / 180);
			const SIN = Math.sin((Config.slantRectAngle * Math.PI) / 180);

			// console.log(this.particlesCanvas.height);
			// console.log(this.particlesCanvas.width);
			// console.log(this.particlesContext.canvas.height);
			// console.log(this.particlesContext.canvas.width);

			let PCHeight = canvasHeight; //* 2; // scaled to 2
			let PCWidth = canvasWidth;
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
				let force_map = {
					3: 0.9945,
					4: 0.9955,
					5: 0.997,
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

					// console.log(elm.particles_to_move_up);
					for (
						let index = 0;
						index < elm.particles_to_move_up.length;
						index++
					) {
						// console.log("moving");
						const data = elm.particles_to_move_up[index];

						let element = data[0];
						let factor = data[1];

						// console.log(factor);

						var py = element.position.y * factor;
						// console.log(py - element.position.y);
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
				// console.log(event);

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
	},
};
