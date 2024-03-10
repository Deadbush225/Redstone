import { Config } from "../jsfluid/config.js";
import { Physics } from "../jsfluid/physics.js";

const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const Common = Matter.Common;

function scale(number, inMin, inMax, outMin, outMax) {
	return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

let M = 450; //middle between 700 - 200
// let matcher = 100; // divide by 10, 20 - 70

let softBody = function () {
	let center = Matter.Bodies.circle(500, 600, 1);

	let composite = Matter.Composite.create();
	Matter.Composite.add(composite, center);

	// let first = Bodies.circle(beginVector.x, beginVector.y, 10, {
	// 	isStatic: true,
	// });
	// let second = Bodies.circle(endvector.x, endvector.y, 10, { isStatic: true });
	// Matter.Composite.add(composite, first);
	// Matter.Composite.add(composite, second);

	let deg = 0;
	let prev_body;
	let ring = [];
	let NUM = 50;

	for (let index = 0; index < NUM + 1; index++) {
		let blob_rad = 350;
		let x = 500 - blob_rad * Math.cos(deg); // 100 is offset
		let y = 600 - blob_rad * Math.sin(deg);
		// console.log(x);
		// console.log(y);

		let circle = Bodies.circle(x, y, 15, {
			isStatic: index == 0 || index == NUM ? true : false,
		});

		if (prev_body) {
			let constraint = Matter.Constraint.create({
				bodyA: prev_body,
				bodyB: circle,
				stiffness: 0.1,
				damping: 0.3,
				// length: 4,
			});
			Matter.Composite.add(composite, constraint);
		}
		let constraint3 = Matter.Constraint.create({
			bodyA: center,
			bodyB: circle,
			stiffness: 0.1,
			damping: 0.3,
		});
		Matter.Composite.add(composite, constraint3);

		ring.push(circle);
		// prev = circle;
		deg += (1 / NUM) * Math.PI;
		Matter.Composite.add(composite, circle);

		prev_body = circle;
	}

	// let constraint = Matter.Constraint.create({
	// 	bodyA: ring[0],
	// 	bodyB: ring[NUM],
	// });
	// Matter.Composite.add(composite, constraint);

	let fill = [];
	for (let index = 0; index < NUM; index += 5) {
		let blob_rad = 350;
		let negator = Math.random() > 0.5 ? -1 : 1;
		let random_degree = Math.PI * Math.random();

		let x = 500 - blob_rad * Math.cos(random_degree) * Math.random(); // * negator; // 100 is offset
		let y = 600 - blob_rad * Math.sin(random_degree) * Math.random(); // * negator;

		let circle = Bodies.circle(x, y, 10, { mass: 0 });
		// let constraint = Matter.Constraint.create({
		// 	bodyA: center,
		// 	bodyB: circle,
		// 	stiffness: 0.2,
		// 	damping: 0.5,
		// });
		// if (index % 1 == 0) Matter.Composite.add(composite, constraint);

		// for (let index = 0; index < fill.length; index += 6) {
		// 	const element = fill[index];
		// 	let constraint = Matter.Constraint.create({
		// 		bodyA: element,
		// 		bodyB: circle,
		// 		stiffness: 0.2,
		// 		// damping: 0.5,
		// 	});
		// 	Matter.Composite.add(composite, constraint);
		// }
		for (let index = 0; index < ring.length; index += 1) {
			const element = ring[index];
			let constraint = Matter.Constraint.create({
				bodyA: element,
				bodyB: circle,
				stiffness: 0.1,
				damping: 0.5,
			});
			Matter.Composite.add(composite, constraint);
		}
		fill.push(circle);
		// Matter.Composite.add(composite, circle);
	}

	// liquid
	let liquid = [];
	for (let index = 0; index < 300; index += 1) {
		let blob_rad = 350;
		let negator = Math.random() > 0.5 ? -1 : 1;
		let random_degree = Math.PI * Math.random();

		let x = 500 - blob_rad * Math.cos(random_degree) * Math.random(); // * negator; // 100 is offset
		let y = 600 - blob_rad * Math.sin(random_degree) * Math.random(); // * negator;

		let circle = Bodies.circle(x, y, 15, { mass: 0 });
		fill.push(circle);
		Matter.Composite.add(composite, circle);
	}

	composite.label = "Soft Body";

	return composite;
};

let fluidToDrop = function (
	x,
	y,
	w,
	h,
	friction,
	frictionAir,
	frictionStatic,
	fill,
	restitution
) {
	let composite = Matter.Composite.create();
	// let liquid = [];
	for (let index = 0; index < 200; index += 1) {
		// let blob_rad = 350;
		// let negator = Math.random() > 0.5 ? -1 : 1;
		// let random_degree = Math.PI * Math.random();

		let _x = x + w * Math.random(); // * negator; // 100 is offset
		let _y = y + h * Math.random(); // * negator;

		let circle = Bodies.circle(_x, _y, 15, {
			mass: 0,
			isStatic: false,
			friction: friction,
			frictionAir: frictionAir,
			frictionStatic: frictionStatic,
			fill: fill,
			restitution: restitution,
		});
		// liquid.push(circle);
		Matter.Composite.add(composite, circle);
	}

	// console.log(composite);

	composite.label = "Soft Body";
	return composite;
};

export const MP = {
	physics: function (canvasHeight, canvasWidth) {
		return Physics((Bodies, Constraint, engine, mouseConstraint) => {
			const COS = Math.cos((Config.slantRectAngle * Math.PI) / 180);
			const SIN = Math.sin((Config.slantRectAngle * Math.PI) / 180);

			engine.gravity.y = 1;
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
				PCWidth - Thickness_clipping,
				100,
				Config.rectThickness,
				PCHeight * 2,
				{ isStatic: true }
			);

			const topSlantRect = Bodies.rectangle(
				100,
				PCHeight - Thickness_clipping,
				PCWidth * 2,
				Config.rectThickness * 2,
				{ isStatic: true }
			);

			var slider = document.getElementById("tempRange");
			slider.oninput = function () {
				M = scale(this.value, 1, 100, 700, 200);
				console.log(M);
			};

			let grid = [];
			let row = 0;
			let col = 0;
			let SIDE = 20;

			let row_array = [];
			const ice = Composites.stack(350, 150, SIDE, SIDE, 1, 1, (x, y) => {
				let particle = Bodies.circle(x, y, 7, { isStatic: true });

				row_array.push(particle);
				if (col == SIDE - 1) {
					grid[row] = row_array;
					row++;
					row_array = [];
					col = 0;
				} else {
					col++;
				}

				return particle;
			});

			// console.log("grid");
			// console.log(grid);

			// const ice = Composites.mesh
			let inverted_grid = [];
			for (let i = 0; i < grid.length; i++) {
				inverted_grid[i] = [];
			}

			for (let index = 0; index < grid.length; index++) {
				const row = grid[index];
				for (let j = 0; j < row.length; j++) {
					// let j_col = [];
					// const col = row[j];
					inverted_grid[j][index] = grid[index][j];
					// j_col.push(grid[index][j]);
				}
				// inverted_grid.push(j_col);
			}

			// console.log(inverted_grid);

			ice.label = "Soft Body";

			// const shelf_floor = Bodies.rectangle(
			// 	PCWidth * 2 - shelf_width * 2.5 + 125, //plus margin
			// 	PCHeight - Thickness_clipping,
			// 	shelf_width * 2.5,
			// 	Config.rectThickness,
			// 	{ isStatic: true, friction: 1, restitution: 0 }
			// );
			// const piston_head = Bodies.rectangle(
			// 	Thickness_clipping * 2, //can't use zero since
			// 	// 100,
			// 	200,
			// 	100,
			// 	PCWidth * 2,

			// 	// 100
			// 	Config.rectThickness * 2,
			// 	// PCHeight * 2,
			// 	{ isStatic: true }
			// );
			function removeRandomConstraint(numParticles) {
				if (numParticles <= 0) {
					return;
				}
				try {
					let firstcol = inverted_grid[0];
					let secondcol = inverted_grid[inverted_grid.length - 1];

					let randIndFirst =
						firstcol.length == 1
							? 0
							: Math.floor(firstcol.length * Math.random());
					let randIndSecond =
						secondcol.length == 1
							? 0
							: Math.floor(secondcol.length * Math.random());

					// let allBodies = Matter.Composite.allBodies(engine.world);
					// let allBodies = engine.world.composites[0].bodies;
					// console.log(allBodies);
					// console.log(engine.world);
					// console.log(engine.world.composites[0].bodies);
					// let index =
					// 	allBodies.length != 1
					// 		? Math.floor(allBodies.length * Math.random())
					// 		: 0;
					// // allBodies.constraints.forEach(() => {
					// // });
					// // allBodies.forEach((circle) => {
					// // 	circle.isStatic = false;
					// // 	Matter.Body.setVelocity(circle, { x: 1, y: 1 });
					// // });
					// let element = allBodies[index];
					// element.isStatic = false;
					// Matter.Body.setVelocity(element, { x: 1, y: 1 });
					// console.log(firstcol[randIndFirst]);
					// Matter.Composite.remove(engine.world, firstcol[randIndFirst]);
					// Matter.Composite.remove(engine.world, secondcol[randIndSecond]);
					Matter.Body.setStatic(firstcol[randIndFirst], false);
					Matter.Body.setStatic(secondcol[randIndSecond], false);

					firstcol.splice(randIndFirst, 1);
					secondcol.splice(randIndSecond, 1);
					if (firstcol.length == 0) {
						inverted_grid.splice(0, 1);
					}
					if (secondcol.length == 0) {
						inverted_grid.splice(inverted_grid.length - 1, 1);
					}
					setTimeout(
						removeRandomConstraint(numParticles - 1),
						M * Math.random()
					);
				} catch (error) {
					console.log(error);
				}
			}

			setInterval(() => {
				removeRandomConstraint(scale(M, 700, 200, 1, 15));
			}, 1000);

			Events.on(engine, "beforeUpdate", function () {
				// Matter.Body.setAngularVelocity(piston_head, 0);
				// piston_head.setPosition(piston_head, { x: piston_head.positionPrev });
				// console.log(piston_head.position.y + " : " + piston_head.position.x);
				// if (300 > piston_head.position.y > 200) {
				// piston_head.position.y = 200;
				// piston_head.position.x = 0;
				// Matter.Body.set(piston_head, { x: 0, y: 200 });
				// }
				// Matter.Body.setMass(composite_tube, 10);
			});

			Events.on(engine, "collisionStart", function (evt) {
				for (var i = 0, j = evt.pairs.length; i != j; ++i) {
					var pair = evt.pairs[i];
					if (pair.bodyA.isStatic && pair.bodyB.isStatic) {
						return;
					}
					// console.log("PROMISING");
					// if (pair.bodyA != pricker && pair.bodyB != pricker) {
					// 	return;
					// }
					// collision occured so remove the constraints
					// var timeScale = 1000 / 60 / engine.timing.lastDelta;
					// var bodies = Composite.allBodies(engine.world);
					// // console.log(bodies);
					// for (var i = 0; i < bodies.length; i++) {
					// 	var body = bodies[i];
					// 	if (
					// 		!body.isStatic
					// 		// body.position.y >= 300
					// 		// body.label === "Circle Body"
					// 	) {
					// 		// scale force for mass and time applied
					// 		// apply the force over a single update
					// 		var forceMagnitude = 0.03 * body.mass * timeScale;
					// 		Body.setVelocity(body, {
					// 			x:
					// 				(forceMagnitude + Common.random() * forceMagnitude) *
					// 				Common.choose([1, -1]),
					// 			y: -forceMagnitude + Common.random() * -forceMagnitude,
					// 		});
					// 		// console.log("pushing");
					// 	}
					// }

					//CONVECTION CURRENT
					// if (pair.bodyA.isStatic & (pair.bodyB.label === "Circle Body")) {
					// 	// console.log(pair.bodyB.speed);
					// 	// console.log(Matter.Body);
					// 	Matter.Body.setVelocity(pair.bodyB, {
					// 		y: -M,
					// 		x: M,
					// 	});
					// 	// Body.setSpeed(pair.bodyB, pair.body.speed * 1.01);
					// }
					// if (pair.bodyB.isStatic & (pair.bodyA.label === "Circle Body")) {
					// 	// console.log(pair.bodyA.speed);
					// 	// console.log(Matter.Body);
					// 	Matter.Body.setVelocity(pair.bodyA, {
					// 		y: -M,
					// 		x: M,
					// 	});
					// 	// Body.setSpeed(pair.bodyB, pair.body.speed * 1.01);
					// }
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
					// if (elm.collider.some((elem) => elem === pair.bodyA)) {
					// 	// Matter.Body.applyForce(pair.bodyB, pair.bodyB.position, {
					// 	// 	// x: -100,
					// 	// 	y: -1300,
					// 	// });
					// 	// Matter.Body.setPosition(pair.bodyB, { x: 100, y: 100 }, true);
					// 	// console.log(pair.bodyB);
					// 	// pair.bodyB.render.opacity = 0;
					// 	// make it check the label if either one is "Circle Body"
					// 	elm.particles_to_move_up.push([
					// 		pair.bodyB,
					// 		// ((pair.bodyA.tubeWidth - inMin) * (outMax - outMin)) /
					// 		// 	(inMax - inMin) +
					// 		// 	outMin,
					// 		force_map[pair.bodyA.tubeWidth],
					// 	]);
					// 	// console.log(composite_tube_object_dict[18][1].cordinates);
					// 	// if (pair.bodyA == composite_tube_object_dict[18][1]) {
					// 	// console.log("detected");
					// 	// }
					// } else if (elm.collider.some((elem) => elem === pair.bodyB)) {
					// 	// console.log("detected");
					// 	elm.particles_to_move_up.push([
					// 		pair.bodyA,
					// 		force_map[pair.bodB.tubeWidth],
					// 		// ((pair.bodyB.tubeWidth - inMin) * (outMax - outMin)) /
					// 		// 	(inMax - inMin) +
					// 		// 	outMin,
					// 	]);
					// 	// console.log(pair.bodyA);
					// 	// Matter.Body.setPosition(pair.bodyA, { x: 100, y: 100 }, true);
					// 	// Matter.Body.applyForce(pair.bodyA, pair.bodyA.position, {
					// 	// 	// x: -100,
					// 	// 	y: -1300,
					// 	// });
					// 	// pair.bodyA.render.opacity = 0;
					// }
					// Matter.Body.setVelocity(pair.bodyB, { y: 0 });
				}
			});

			// Events.on(engine, "collisionStart", function (evt) {
			// 	for (var i = 0, j = evt.pairs.length; i != j; ++i) {
			// 		var pair = evt.pairs[i];

			// 		if (!pair.bodyA.isSensor && !pair.bodyB.isSensor) {
			// 			return;
			// 		}
			// 		console.log("PROMISING");
			// 		if (pair.bodyA != pricker && pair.bodyB != pricker) {
			// 			return;
			// 		}

			// 		// collision occured so remove the constraints
			// 		console.log("POP!");
			// 		s.constraints?.forEach((element) => {
			// 			Matter.Composite.remove(s, element, true);
			// 		});
			// 		s.constraints?.forEach((element) => {
			// 			Matter.Composite.remove(s, element, true);
			// 		});

			// 		s.constraints?.forEach((element) => {
			// 			Matter.Composite.remove(s, element, true);
			// 		});

			// 		var timeScale = 1000 / 60 / engine.timing.lastDelta;
			// 		var bodies = Composite.allBodies(engine.world);

			// 		for (var i = 0; i < bodies.length; i++) {
			// 			var body = bodies[i];

			// 			if (!body.isStatic && body.position.y >= 400) {
			// 				// scale force for mass and time applied
			// 				var forceMagnitude = 0.03 * body.mass * timeScale;

			// 				// apply the force over a single update
			// 				Body.applyForce(body, body.position, {
			// 					x:
			// 						(forceMagnitude + Common.random() * forceMagnitude) *
			// 						Common.choose([1, -1]),
			// 					y: -forceMagnitude + Common.random() * -forceMagnitude,
			// 				});
			// 			}
			// 		}

			// 	}
			// });
			// const composite_tubes = [

			return [
				leftVerticalRect,
				topSlantRect,
				rightVerticalRect,
				// shelf_floor,
				// composite_tube,
				// composite_tube1,
				// composite_tube2,
				// pricker,
				// square_sensor,
				// s,
				// sensor,
				// ramp,
				// piston,
				// piston_head,
				// piston_holder,
				// fluid,
				ice,
			];
		});
	},
};