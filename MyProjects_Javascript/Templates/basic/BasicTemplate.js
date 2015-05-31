 
// global variables
var container;
// 
var camera, scene, renderer;

init();
animate();

function init() {
var light, object;

container = document.createElement( 'div' );
document.body.appendChild( container );

camera = init_Camera({position:{x:0,y:400,z:0}});

scene = init_Scene();
  
scene.add( new THREE.AmbientLight( 0x404040 ) );

light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 0 );
scene.add( light ); 

var map = THREE.ImageUtils.loadTexture( "../../Libraries/THREE_d49bb0e/examples/textures/UV_Grid_Sm.jpg" );
map.wrapS = map.wrapT = THREE.RepeatWrapping;
map.anisotropy = 16;

var material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );

//

object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
object.position.set( -400, 0, 200 );
scene.add( object );

object = new THREE.Mesh( new THREE.IcosahedronGeometry( 75, 1 ), material );
object.position.set( -200, 0, 200 );
scene.add( object );

object = new THREE.Mesh( new THREE.OctahedronGeometry( 75, 2 ), material );
object.position.set( 0, 0, 200 );
scene.add( object );

object = new THREE.Mesh( new THREE.TetrahedronGeometry( 75, 0 ), material );
object.position.set( 200, 0, 200 );
scene.add( object );
    
object = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100, 4, 4 ), material );
object.position.set( -400, 0, 0 );
scene.add( object );

object = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 ), material );
object.position.set( -200, 0, 0 );
scene.add( object );

object = new THREE.Mesh( new THREE.CircleGeometry( 50, 20, 0, Math.PI * 2 ), material );
object.position.set( 0, 0, 0 );
scene.add( object );

object = new THREE.Mesh( new THREE.RingGeometry( 10, 50, 20, 5, 0, Math.PI * 2 ), material );
object.position.set( 200, 0, 0 );
scene.add( object );

object = new THREE.Mesh( new THREE.CylinderGeometry( 25, 75, 100, 40, 5 ), material );
object.position.set( 400, 0, 0 );
scene.add( object );

//

var points = [];

for ( var i = 0; i < 50; i ++ ) {

    points.push( new THREE.Vector3( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, 0, ( i - 5 ) * 2 ) );

}

object = new THREE.Mesh( new THREE.LatheGeometry( points, 20 ), material );
object.position.set( -400, 0, -200 );
scene.add( object );

object = new THREE.Mesh( new THREE.TorusGeometry( 50, 20, 20, 20 ), material );
object.position.set( -200, 0, -200 );
scene.add( object );

object = new THREE.Mesh( new THREE.TorusKnotGeometry( 50, 10, 50, 20 ), material );
object.position.set( 0, 0, -200 );
scene.add( object );

object = new THREE.AxisHelper( 50 );
object.position.set( 200, 0, -200 );
scene.add( object );

object = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, 0, 0 ), 50 );
object.position.set( 400, 0, -200 );
scene.add( object );

//

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

container.appendChild( renderer.domElement );

//

window.addEventListener( 'resize', onWindowResize, false );

}

function init_Camera (ParamsObj)
{
    ParamsObj = ParamsObj || {}; 
    ParamsObj.position = ParamsObj.position || {}; 
    ParamsObj.cameraType = ParamsObj.cameraType || 'Perspective';
    ParamsObj.cameraWidth = ParamsObj.cameraWidth || window.innerWidth;
    ParamsObj.cameraHeight = ParamsObj.cameraHeight || window.innerHeight;
    ParamsObj.near = ParamsObj.near || 1;
    ParamsObj.far = ParamsObj.far || 2000;
    
    
    
    var cam;
    
    switch(ParamsObj.cameraType)
    {
        case 'Perspective':
                {
                    cam= new THREE.PerspectiveCamera( 45, ParamsObj.cameraWidth / ParamsObj.cameraHeight, ParamsObj.near, ParamsObj.far );     
                    break; 
                }
        case 'perspective':
                {
                    cam= new THREE.PerspectiveCamera( 45, ParamsObj.cameraWidth / ParamsObj.cameraHeight, ParamsObj.near, ParamsObj.far );     
                    break; 
                }
            
        case 'Orthographic':
                { 
                    cam = 
                        new THREE.OrthographicCamera(  
                            ParamsObj.cameraWidth / - 2,
                            ParamsObj.cameraWidth / 2,
                            ParamsObj.cameraHeight / 2,
                            ParamsObj.cameraHeight / - 2,
                            ParamsObj.near,
                            ParamsObj.far
                        ); 
                    break;
                }
        case 'orthographic':
                { 
                    cam = 
                        new THREE.OrthographicCamera(  
                            ParamsObj.cameraWidth / - 2,
                            ParamsObj.cameraWidth / 2,
                            ParamsObj.cameraHeight / 2,
                            ParamsObj.cameraHeight / - 2,
                            ParamsObj.near,
                            ParamsObj.far
                        ); 
                    break;
                }
        case 'cube' :
            {
                cam = THREE.CubeCamera( 1, 100000, 128 );
            }
            
            
    } 
    
    cam.position.x = ParamsObj.position.x || 0;
    cam.position.y = ParamsObj.position.y || 0;
    cam.position.z = ParamsObj.position.z || 0;
 
    cam.ParamsObj = ParamsObj;   
    return cam;
};
function init_Scene (ParamsObj)
{
    var scene;
    ParamsObj = ParamsObj || {};
    ParamsObj.scene = ParamsObj.scene || new THREE.Scene();
    ParamsObj.scene.ParamsObj = ParamsObj;
    return ParamsObj.scene;
}
 

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );
 
}

//

function animate() {


requestAnimationFrame( animate );

render(); 
}

function render() {
updateFromWebWorker(); // if webworker sent new data, process it and integrate it

var timer = Date.now() * 0.0001;

camera.position.x = Math.cos( timer ) * 800;
camera.position.z = Math.sin( timer ) * 800;

camera.lookAt( scene.position );

for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

    var object = scene.children[ i ];

    object.rotation.x = timer * 5;
    object.rotation.y = timer * 2.5;

}

renderer.render( scene, camera );

}

function updateFromWebWorker (){};