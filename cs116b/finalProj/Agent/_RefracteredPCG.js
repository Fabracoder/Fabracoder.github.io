var WINDOW_NameSpace =
    {
        
        this.MARGIN = 10;
        this.SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
        this.SCREEN_WIDTH = window.innerWidth;
        
        this.container;
        this.stats;

        this.init = function()
        {
        
        };
    }

var CANVAS_NameSpace = 
    {
        
        this.camera;
        this.controls;
        this.scene;
        this.sceneCube; 
        this.raycaster; 
        this.renderer;

        this.dirLight;
        this.pointLight;
        this.ambientLight;
    }


var clock; 


var PCG_NameSpace =
    {
        
    this.floorHeight = 1000;
    this.cameraSpeed = 100000;
    this.SimulationSpeed = 5;
    this.minBuildingSize = 10;
    this.minPlotSize = 50;
    this.helper; // if = false then it disables it

    this.materials;
    this.materials.Basic; // basic 
    this.materials.Phong;    
    this.materials.Phong.earth2; // Phong with earth texture
  
    this.agentManager; // should be another thread
    this.agentList;
    }


// Runs page
WINDOW_NameSpace.init();
init();
animate();

// // // // // Code Body

function init() // Initialization
{

	WINDOW_NameSpace.container = document.createElement('div');
	document.body.appendChild(container);

	initCamera();
	initScene();
	initControl();
	initLighting();
	initMaterials();
	initRenderer();

	clock = new THREE.Clock();

	generateFloor();
	generateStuff();

	agentList = [];
	generateAgents();

	initStats();

	window.addEventListener('resize', onWindowResize, false);

};

function initStats()
{
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild(stats.domElement);
};
function initRenderer()
{
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.render(scene, camera);
	container.appendChild(renderer.domElement);
};
function initCamera()
{
	camera = new THREE.PerspectiveCamera(25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7);
//	camera.position.z = 1000;
	camera.position.y = 10000;
    camera.lookAt(new THREE.Vector3(0,0,0));

};
function initScene()
{
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x0000f0, 0.00000025);

};
function initControl()
{
	controls = new THREE.FlyControls(camera);
	controls.movementSpeed = cameraSpeed;
	controls.domElement = container;
	controls.rollSpeed = Math.PI / 24;
	controls.autoForward = false;
	controls.dragToLook = false;
};
function initLighting()
{
	dirLight = new THREE.DirectionalLight(0x999999);
	dirLight.position.set(0, 1, 1).normalize();
	scene.add(dirLight);

	ambientLight = new THREE.AmbientLight(0x515151);
	scene.add(ambientLight);
};
function initMaterials()
{
	materialQ = new THREE.MeshPhongMaterial(
		{

			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/greyc.jpg")
		// ,specularMap:
		// THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg")
		});

	materialX = new THREE.MeshPhongMaterial(
		{
			// light
			specular : '#010101',
			// intermediate
			color : '#883311',
			// dark
			// emissive: '#505063',
			shininess : 50
		});
	materialNormalMap = new THREE.MeshPhongMaterial(
		{

			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.jpg"),
			specularMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg"),
			normalMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_normal_2048.jpg"),
			normalScale : new THREE.Vector2(0.85, 0.85)

		});
};

function generateFloor()
{
	var floorGeometry = new THREE.BoxGeometry(100000, floorHeight, 100000);
	var floorMesh = new THREE.Mesh(floorGeometry, materialNormalMap);

	floorMesh.translateY(-floorHeight / 2);
	floorMesh.recieveShadow = true;
	scene.add(floorMesh);
};

function generateStuff()
{

	var aGeometry = new THREE.BoxGeometry(100, 100, 100);
	var aMesh = new THREE.Mesh(aGeometry, materialNormalMap);
	aMesh.positionY = 0;
	scene.add(aMesh);

	generateHelperGrid();
};

function generateHelperGrid()
{
	if (helper == false)
	{
		helper = new Object();
		helper.update = function()
		{
		};
	} else
	{

		helper = new THREE.GridHelper(100 * minPlotSize, minPlotSize);

		helper.setColors(0x0000ff, 0x808080);
		helper.position.y = 10;

		helper.update = function()
		{
			helper.position.x = Math.floor(camera.position.x / minPlotSize) * minPlotSize;
			helper.position.z = Math.floor(camera.position.z / minPlotSize) * minPlotSize;
		};
	}

	scene.add(helper);
};

function updateStuff() // should be refactored and removed
{
    if(agentList[0]!=undefined)
    { 
//	agentList[0].position.x = agentList[0].position.x + agentList[0].direction.x;
    agentList[0].updateMove();
//	console.log(agentList[0].position.x + agentList[0].position.y );
    }
};

function onWindowResize(event)
{

	SCREEN_HEIGHT = window.innerHeight;
	SCREEN_WIDTH = window.innerWidth;

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

};

function generateAgents()
{
    
	var anAgent = new PersonAgent(new THREE.Vector3(0,0,0));
	agentList.push(anAgent);

	anAgent.direction = new THREE.Vector3(Math.random() * 100, 0, Math.random() * 100);
	scene.add(anAgent.mesh);
};

function animate()
{

	requestAnimationFrame(animate);

	render();
    	updateStuff();
	stats.update();

};

function render()
{

	var delta = clock.getDelta();

	controls.movementSpeed = cameraSpeed * (delta);
	controls.update(delta);
	// agentManager.update();

	helper.update();

	renderer.render(scene, camera);

};
