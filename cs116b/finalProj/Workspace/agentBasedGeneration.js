var camera, scene, renderer;
var mesh;

init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    scene = new THREE.Scene();
    
    initSceneContents();

    window.addEventListener( 'resize', onWindowResize, false );

}

function initSceneContents(){
    // functions are scope delimiters not code blocks
    var geometry = new THREE.BoxGeometry( 200, 200, 200 ); 
    var material = new THREE.MeshBasicMaterial(); 
    mesh = new THREE.Mesh( geometry, material ); // thats why this is a global variable
    // also any variables assigned to that wwas not declared, automaticall is declared global
    scene.add( mesh ); //scene is a global
    
};

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );

}

