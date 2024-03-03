// A custom wrapper function for initializing the Matter.js Physics Engine
export const Physics = (bodies) => {
	const Runner = Matter.Runner;
	const Engine = Matter.Engine;
	const Bodies = Matter.Bodies;
	const Body = Matter.Body;
	const Composite = Matter.Composite;
	const Constraint = Matter.Constraint;

	// { positionIterations: 4 }

	const engine = Engine.create();
	const runner = Runner.create({ isFixed: true });

	let mouse = Matter.Mouse.create(document.querySelector("#particles"));

	let mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			damping: 0.1,
			render: {
				visible: true,
			},
		},
	});

	const initialBodies = bodies(Bodies, Constraint, engine, mouseConstraint);

	Runner.start(runner, engine);
	Composite.add(engine.world, initialBodies);
	Composite.add(engine.world, mouseConstraint);

	const addBodies = (bodies) => {
		const addedBodies = bodies(Bodies);
		Composite.add(engine.world, addedBodies);

		return addedBodies;
	};

	const removeBody = (body) => {
		Composite.remove(engine.world, body);
	};

	const timeScale = (scale) => {
		engine.timing.timeScale = scale;
	};

	return {
		addBodies,
		removeBody,
		timeScale,
		initialBodies,
	};
};
