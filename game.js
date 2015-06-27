// CORE OBJECTS
var scene;
var cam;
var renderer;

// SCENE OBJECTS
var cube;

// CONTROLS
var keys = new Array();
var controls_view = {
	MOVE_FORWARD: 87,
	MOVE_BACK: 83,
	MOVE_LEFT: 65,
	MOVE_RIGHT: 68,
	MOVE_UP: 32
	/*LOOK_UP: 38,
	LOOK_DOWN: 40,
	LOOK_LEFT: 37,
	LOOK_RIGHT: 39*/
};


function init() {
	scene = new THREE.Scene();
	cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	cube.rotation.x = Math.PI / 8;
	
	var pointLight = new THREE.PointLight(0xFFEEFF);
	pointLight.position.x = 0;
	pointLight.position.y = 0;
	pointLight.position.z = 5;
	scene.add(pointLight);

	cam.position.z = 5;
}


function update(delta) {
	cube.rotation.y += 1 * delta;
}

function render() {
	renderer.render(scene, cam);
}

var lastTime = -1;
function tick() {
	var time = new Date().getTime();
	if(lastTime == -1)
		lastTime = time;
	var delta = (time - lastTime) / 1000;
	lastTime = time;

	requestAnimationFrame(tick);
	update(delta);
	render();
}


// WINDOW EVENTS
window.onload = function() {
	init();
	tick();
};

window.onresize = function() {
	cam.aspect = window.innerWidth / window.innerHeight;
	cam.updateProjectionMatrix();	
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('keydown', function(e) {
	var code = e.which || e.keyCode;
	keys[code] = true;
});

window.addEventListener('keyup', function(e) {
	var code = e.which || e.keyCode;
	keys[code] = false;
});