/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
var floorHeight = 1000;
var speed = 100000;
var cameraX=210;
var cameraY=100;
var cameraZ=0;

var minBuildingSize;


var MARGIN = 10;
var SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
var SCREEN_WIDTH = window.innerWidth - MARGIN * 2;

var container, stats;
var camera, controls, scene, sceneCube, renderer;
var buildings = [];
var dirLight, pointLight, ambientLight;
var helper;
var clock = new THREE.Clock();
var minPlotSize =50;
 
var materialQ = new THREE.MeshPhongMaterial({

     specular: 0x333333,
     shininess: 15,
     map: THREE.ImageUtils.loadTexture("Resources/final_textures/greyc.jpg")
         //    ,specularMap: THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg")
 });

 var materialX = new THREE.MeshPhongMaterial({
     // light
     specular: '#010101',
     // intermediate
     color: '#883311',
     // dark
     //         emissive: '#505063',
     shininess: 50
 });
     var materialNormalMap = new THREE.MeshPhongMaterial({

         specular: 0x333333,
         shininess: 15,
         map: THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.jpg"),
         specularMap: THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg"),
         normalMap: THREE.ImageUtils.loadTexture("Resources/final_textures/ea_normal_2048.jpg"),
         normalScale: new THREE.Vector2(0.85, 0.85)

     });


 init();
 animate();


function cameraInit(){
     camera = new THREE.PerspectiveCamera(25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7);
     camera.position.z = cameraZ;
     camera.position.x = cameraX;     
     camera.position.y = cameraY;
     camera.lookAt(new THREE.Vector3(0,0,0) );
}

 function init() {

     container = document.createElement('div');
     document.body.appendChild(container);

        cameraInit();

      

     //     SceneInit();
     scene = new THREE.Scene();
     scene.fog = new THREE.FogExp2(0x0000f0, 0.00000025);

     //     ControlInit();
     controls = new THREE.FlyControls(camera);
     controls.movementSpeed = speed;
     controls.domElement = container;
     controls.rollSpeed = Math.PI / 24;
     controls.autoForward = false;
     controls.dragToLook = false;

     //     LightingInit();
     dirLight = new THREE.DirectionalLight(0x999999);
     dirLight.position.set(0, 1, 1).normalize();
//     dirLight.castShadow = true;
//     dirLight.shadowDarkness = 0.4;
     scene.add(dirLight);

     ambientLight = new THREE.AmbientLight(0x515151);
     scene.add(ambientLight);

 
     var floorGeometry = new THREE.BoxGeometry(100000, floorHeight, 100000);
     var floorMesh = new THREE.Mesh(floorGeometry, materialNormalMap);
     floorMesh.recieveShadow = true;
     floorMesh.translateY(-floorHeight/2);
     scene.add(floorMesh);
     
     initializeAgents();
 //    runTest();
        
     initializeHelper();
     
     renderer = new THREE.WebGLRenderer();
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
     renderer.render(scene, camera);
     container.appendChild(renderer.domElement);

     stats = new Stats();
     stats.domElement.style.position = 'absolute';
     stats.domElement.style.top = '0px';
     stats.domElement.style.zIndex = 100;
     container.appendChild(stats.domElement);

     window.addEventListener('resize', onWindowResize, false);


 };
function initializeHelper(){
 	if (helper == false)
	{
		helper = new Object();
		helper.update = function()
		{
		};
	} else
	{
 //size,step_
		helper = new THREE.GridHelper(10000, minPlotSize);
        helper2 = new THREE.GridHelper(1000, minPlotSize/5);
		helper.setColors(0x0000ff, 0x808080);
		helper.position.y = 1;
		helper2.setColors(0xf0f00f, 0x008080);
		helper2.position.y = 10;
		helper.update = function()
		{
			helper.position.x = Math.floor(camera.position.x / minPlotSize) * minPlotSize;
			helper.position.z = Math.floor(camera.position.z / minPlotSize) * minPlotSize;
            
            helper2.position.x = Math.floor(camera.position.x / minPlotSize) * minPlotSize;
			helper2.position.z = Math.floor(camera.position.z / minPlotSize) * minPlotSize;
		};
	}

	scene.add(helper);
};
function initializeAgents(){ 
    for(var temp = 0;temp<10;temp++)
        { 
            
            makePerson({
                    name : "PersonAgent_"+temp.toString(), 
                    position : new THREE.Vector3(0, 1, 0),
                    maxWander: Math.random()*6000,
                    minWander: 100  
                });
  
            
        }

    
makePerson(
		{
			name : "Oliver", 
			position : new THREE.Vector3(0, 0, 0)
            
		})
    
 
    	makePerson(
		{
			name : "Dannielle", 
			position : new THREE.Vector3(0, 0, 0) 
		})
 
        
    var pAgent = new RoadAgent();
    pAgent.setVisable(true);
    
   var pAgent2 = new RoadAgent({direction:{x:0,y: degreeToRadian(90) ,z:0},  position : new THREE.Vector3(50,0,0)});
      pAgent2.setVisable(true);

}
function runTest(){
  
 
//    CreateTerrain();
    
    
}
function degreeToRadian(value)
{
    return (value/360)*2*Math.PI;
}

 function onWindowResize(event) {

     SCREEN_HEIGHT = window.innerHeight;
     SCREEN_WIDTH = window.innerWidth;

     renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

     camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
     camera.updateProjectionMatrix();

//     composer.reset();

 };
 
 function animate() {

     requestAnimationFrame(animate);
     render();
     stats.update();

 };

 function render() {

     var delta = clock.getDelta();

     controls.movementSpeed = speed * (delta);
     controls.update(delta);
     for(var i =0;i<realAgentList.length;i++)
         {
             realAgentList[i].updateAgent();
         }
     
     if(helper!=null)
         {
             helper.update();
         }
     //				renderer.clear();
     renderer.render(scene, camera);

 };