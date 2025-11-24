/**
 * Physics Engine Module
 * Integrates Matter.js to provide gravity and interactivity for DOM elements.
 */

const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

let engine;
let runner;
let render;
let container;
let bodies = []; // Keep track of { body, element } pairs

/**
 * Initializes the physics engine within the specified container.
 * @param {HTMLElement} domContainer - The container element for the physics world.
 */
export function initPhysics(domContainer) {
    container = domContainer;
    
    // Create engine
    engine = Engine.create();
    
    // Create renderer (optional, mostly for debugging, but we use it to capture mouse events properly)
    // We won't actually render the wireframes on top, or we can make it transparent.
    // For this "DOM-based" physics, we often don't need the canvas renderer for visuals, 
    // but we need the engine running.
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create a runner
    runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries (ground, walls)
    updateBoundaries();

    // Add mouse control
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with rendering
    // (Since we aren't using the standard render loop for visuals, we just need the mouse)
    
    // Start the update loop for syncing DOM elements
    requestAnimationFrame(updateLoop);

    // Handle resize
    window.addEventListener('resize', () => {
        updateBoundaries();
    });
}

/**
 * Adds a DOM element to the physics world.
 * @param {HTMLElement} element - The DOM element to add.
 */
export function addBody(element) {
    // Ensure element is in the DOM to measure it
    if (!element.parentElement) {
        container.appendChild(element);
    }

    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate position relative to container
    // Start them a bit random horizontally, and above the top
    const startX = Math.random() * (containerRect.width - rect.width) + rect.width / 2;
    const startY = -rect.height - (Math.random() * 500); // Start above view

    // Create physics body
    const body = Bodies.rectangle(
        startX, 
        startY, 
        rect.width, 
        rect.height, 
        { 
            restitution: 0.5, // Bounciness
            friction: 0.1,
            density: 0.001
        }
    );

    // Add to world
    Composite.add(engine.world, body);

    // Track it
    bodies.push({ body, element });

    // Initial sync
    syncElement(body, element);
}

/**
 * Clears all bodies from the world (except boundaries).
 */
export function clearBodies() {
    bodies.forEach(({ body, element }) => {
        Composite.remove(engine.world, body);
        if (element.parentElement) {
            element.parentElement.removeChild(element);
        }
    });
    bodies = [];
}

function updateBoundaries() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const wallThickness = 60;

    // Clear existing static bodies (walls/ground) if any
    // For simplicity in this prototype, we just add them once or clear all.
    // A robust solution would track IDs. 
    // Let's just clear everything static that isn't a car.
    const allBodies = Composite.allBodies(engine.world);
    const walls = allBodies.filter(b => b.isStatic && b.label === 'wall');
    Composite.remove(engine.world, walls);

    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width, wallThickness, { isStatic: true, label: 'wall' });
    const leftWall = Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true, label: 'wall' });
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 5, { isStatic: true, label: 'wall' });

    Composite.add(engine.world, [ground, leftWall, rightWall]);
}

function updateLoop() {
    bodies.forEach(({ body, element }) => {
        syncElement(body, element);
    });
    requestAnimationFrame(updateLoop);
}

function syncElement(body, element) {
    const { x, y } = body.position;
    const angle = body.angle;

    // Translate DOM coordinates (top-left) from Physics coordinates (center)
    // The body position is its center.
    // We use transform to move the element.
    
    // However, since the element is absolute positioned in the container,
    // we need to offset by half its width/height to match the center-based physics.
    // OR, we just set left/top to x/y and use translate(-50%, -50%).
    
    element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad) translate(-50%, -50%)`;
    
    // Note: In CSS, the element should be position: absolute; left: 0; top: 0;
    // and we move it entirely with transform.
}
