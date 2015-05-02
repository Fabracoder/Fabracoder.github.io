var Lsystem = function(parameters)
{

	'use strict'; 
	if (parameters === undefined)
	{
		parameters =
			{};
		// I would define stuff here but it decentralizes the intialization
	} 
//	parent.call(this, parameters);

};
//RoadAgent.prototype = new RealAgent();
//RoadAgent.prototype.constructor = RoadAgent;

//
//var Lsystem.tree = function()
//{
//    
//};
//
// 
//


// What do I need to do?
// Well, if I want to make this I need to define a space, then what to do relative to that space


// Basic building block of the system 
var GlassBox = function(size,position,direction,meshes){
  
    glass = new THREE.Object3D();
    
    if(isArray(meshes) )
        {
            for(var i;i<meshes.length;i++)
                {
                    glass.add(meshes[i]);
                }
        } 
    if(size===undefined)
        {
            var size = new THREE.Vector3(10,10,10);
        } 
    this.size3d = size; 
    
    if(position===undefined)
        {
            var position = new THREE.Vector3(10,10,10);
        } 
    this.position = position; 
    
    
    
} 

var isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};
 
// what to do now?
// well you can load an object in a region
// and then each region can be transformed,scaled,rotated
// so.. we need to wrap it in a Object3d


