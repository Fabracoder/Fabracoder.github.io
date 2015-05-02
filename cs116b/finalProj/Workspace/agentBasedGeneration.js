var camera, scene, renderer;
var mesh;

init();
animate();

function init()
{

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
	document.body.appendChild(renderer.domElement);

	//

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 400;

     //     LightingInit();
     dirLight = new THREE.DirectionalLight(0x999999);
     dirLight.position.set(0, 1, 1).normalize();
//     dirLight.castShadow = true;
//     dirLight.shadowDarkness = 0.4;

     ambientLight = new THREE.AmbientLight(0x515151);

    scene = new THREE.Scene();
     scene.add(dirLight);
     scene.add(ambientLight);
    
	initSceneContents();

	window.addEventListener('resize', onWindowResize, false);

}

function initSceneContents()
{
    
    initializeGround();

	// functions are scope delimiters not code blocks
	var geometry = new THREE.BoxGeometry(2, 2, 2);
	var material = new THREE.MeshBasicMaterial();
	mesh = new THREE.Mesh(geometry, material); // thats why this is a global variable
	// also any variables assigned to that was not declared, automaticall is declared global
	scene.add(mesh); //scene is a global

    anAgent = new SimpleAgent(
		{
			name : "TeaPot",
			id : 0
		});
	aPerson = new personAgent(
		{
			name : "John",
			id : 1,
			position : new THREE.Vector3(10, 10, 10)
            
		})
    
	// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
	aPerson.setVisable(true);


}

function initializeGround(){
 
    var geometry = new THREE.BoxGeometry(2000, 200, 2000);
	var material = new THREE.MeshBasicMaterial();
	ground = new THREE.Mesh(geometry, material); 
      
    ground.translateY(-100);
	scene.add(ground); //scene is a global

}

function onWindowResize()
{

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate()
{

	requestAnimationFrame(animate);

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render(scene, camera);

}
