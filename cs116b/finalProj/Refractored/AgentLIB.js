/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// version 0.8r Agent Library refactored
// disable jslint issue that I dont care about
// localStorage  should be used to save, also export to txt
//TODO: I should refactor the code so that it uses the parameter object instead of local values 
var AgentClock = new THREE.Clock(true);

var AGENTLIB =
	{
		REVISION : '3'
	};

// borrowed code from THREE.js .. I dont understand it
 if ( typeof module === 'object' ) {

 module.exports = AGENTLIB;
 }

// /////////////////
// Variable list //
// /////////////////

////// local ref to scene from THREE.js
//var scene;

// var agentList = []; // list of all agents
// var realAgentList = []; // list of all agents with mesh
// var materialsForAgents = []; // list of materials
// var activeAgents = []; // list for update to be called on.

AGENTLIB.materials = [];
AGENTLIB.agentList =
	{
		allAgents :
			[],
		materials :
			[],
		activeAgents :
			[]
	};

// AgentLibrary initialization
(function()
{

	'use strict';
	// initialize _scene as scene or make a new THREE.Scene

//	 scene = window.scene || new THREE.Scene();

	// initialize materials list
    
	AGENTLIB.materials.push(new THREE.MeshBasicMaterial(
		{
			color : "yellow"
		}));
	AGENTLIB.materials.push(new THREE.MeshPhongMaterial(
		{
			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/greyc.jpg")
		}));
	AGENTLIB.materials.push(new THREE.MeshPhongMaterial(
		{
			// light
			specular : '#010101',
			// intermediate
			color : '#883311',
			// dark
			// emissive: '#505063',
			shininess : 50
		}));

	AGENTLIB.materials.push(new THREE.MeshPhongMaterial(
		{

			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.jpg"),
			specularMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg"),
			normalMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_normal_2048.jpg"),
			normalScale : new THREE.Vector2(0.85, 0.85)
		}));

}());

// Parent of all agents
// parameters {name,uuid}

var SimpleAgent = function(parameters)
{

	'use strict';
	// private variable contains name of class or object
	// private variable should contain unique id
	// var _name, _uuid;

	// Initializing variables _name, _uuid if provided
	// This function calls itself after declaring itself
	(function()
	{

		if (parameters === undefined)
		{
			parameters =
				{};
		}

		if (parameters.name === undefined)
		{
			parameters.name = "Agent"; // default
		}

		if (parameters.uuid === undefined)
		{
			parameters.uuid = THREE.Math.generateUUID();

			// probably a better way of picking an unique
			// found it, THREEjs has its own uuid generator
			// _uuid = THREE.Math.generateUUID();
			// parameters.uuid = Math.random();
			// THREE.Math.generateUUID();;

		}
	}());

	// getter and setter for name
	var _getName = function()
	{

		return parameters.name;
	};
	var _setName = function(name)
	{

		parameters.name = name;
	};
	// getter and setter for ID
	var _getID = function()
	{

		return parameters.uuid;
	};
	var _setID = function(newID, override)
	{

		if (override === undefined)
		{
			THREE.warn('SetID should not be used unless restoring Agents from save');
		}

		parameters.name = newID;
	};

	var _updateAgent = function(parameters)
	{

//		console.log("SIMPLE_UPDATE");
		// to be overrided by child agents
	};
 
	AGENTLIB.agentList.allAgents.push(this);

	this.type = "Agent"; // Agent Type , following example from THREE.js
	this.getName = _getName;
	this.setName = _setName;
	this.getID = _getID;
	this.setID = _setID; // should not be used
	this.updateAgent = _updateAgent; 
};

// class for things that exist in the scene
// parameters {name,id,geometry,material,birthday,direction,position,scale,mesh}
var RealAgent = function(scene,parameters) // 
{
 
	'use strict';
    var _thisAgent = this; 
	// ////////////

    parameters = parameters ||{};
    parameters.name = parameters.name || 'RealAgent';
	   
	SimpleAgent.call(this, parameters);

	// ////////////

	(function( )
	{ 
		parameters.geometry = parameters.geometry || new THREE.SphereGeometry(4, 32, 32);
		// parameters.material = parameters.material ;

		parameters.innerMesh = parameters.innerMesh || new THREE.Mesh(parameters.geometry, parameters.material);

		parameters.outerObject = parameters.outerObject || new THREE.Object3D();
		parameters.outerObject.add(parameters.innerMesh);

		parameters.scale = parameters.scale || new THREE.Vector3(1, 1, 1);
		parameters.direction = parameters.direction || (new THREE.Vector3(Math.random(), Math.random(), Math.random())).normalize();
		parameters.position = parameters.position || new THREE.Vector3();// should
		// be
		// (0,0,0)
		parameters.birthdate = parameters.birthdate || AgentClock.getElapsedTime();

// parameters.innerMesh.();
        
        var helper = new THREE.BoundingBoxHelper(parameters.innerMesh, 0xff0000);
        helper.update();
// // If you want a visible bounding box
// scene.add(helper);
// // If you just want the numbers
// console.log(helper.box.min);
// console.log(helper.box.max);
        
		parameters.boundingBox = parameters.boundingBox || helper.box.max;

		parameters.caster = parameters.caster || new THREE.Raycaster();
		parameters.intersectObjects = parameters.caster.intersectObjects(window.scene.children);

		// //////////// //
		// /Initialize/ //
		// //////////// //

		// move it to ground level
		parameters.innerMesh.translateY(parameters.boundingBox.y / 2);
		// move it forward, so that it has a 'front'
		parameters.innerMesh.translateZ(parameters.boundingBox.z / 2);
		// 

		// note to access the global coordinate of the inner mesh
		// _scene.updateMatrixWorld();
		// var vector = new THREE.Vector3();
		// vector.setFromMatrixPosition( child.matrixWorld );

		parameters.outerObject.translateX(parameters.position.x);
		parameters.outerObject.translateY(parameters.position.y);
		parameters.outerObject.translateZ(parameters.position.z);

		if (parameters.translateOnAxis !== undefined)
		{
			parameters.outerObject.translateOnAxis(parameters.translateOnAxis.axis, parameters.translateOnAxis.distance);
		}

		parameters.outerObject.rotateX(parameters.direction.x);
		parameters.outerObject.rotateY(parameters.direction.y);
		parameters.outerObject.rotateZ(parameters.direction.z);

		parameters.outerObject.scale.set(THREE.Vector3.x, THREE.Vector3.y, THREE.Vector3.z);

	}( ));

	var _resetOffset = function()
	{

		// reset location of offset
		parameters.innerMesh.position.set(0, 0, 0);
		// move it to ground level
		parameters.innerMesh.translateY(parameters.boundingBox.y / 2);
		// move it forward, so that it has a 'front'
		parameters.innerMesh.translateZ(parameters.boundingBox.z / 2);

		parameters.outerObject.translateX(parameters.position.x);
		parameters.outerObject.translateY(parameters.position.y);
		parameters.outerObject.translateZ(parameters.position.z);

		if (parameters.translateOnAxis !== undefined)
		{
			parameters.outerObject.translateOnAxis(parameters.translateOnAxis.axis, parameters.translateOnAxis.distance);
		}

		parameters.outerObject.rotateX(parameters.direction.x);
		parameters.outerObject.rotateY(parameters.direction.y);
		parameters.outerObject.rotateZ(parameters.direction.z);
	};
    
    var _calculateMesh = function(params)
    {
        parameters.geometry = params.geometry || parameters.geometry ;
        parameters.material = params.material || parameters.material ;
        
        parameters.innerMesh = new THREE.Mesh(parameters.geometry,parameters.material);
    };

	var _setVisable = function(scene,bool)
	{

		if (bool === false)
		{
			if (scene !== undefined)
			{
				scene.remove(parameters.outerObject);
			}
			else
			{
				window.scene.remove(parameters.outerObject);
			}
			return parameters.name + " removed";
		}
		else
		{
			if (scene !== undefined)
			{
				scene.add(parameters.outerObject);
			}
			else
			{
				window.scene.add(parameters.outerObject);
			}
			return parameters.name + " added";
		}

	};

	var _updateAgent = function()
	{

//		console.log("REAL_UPDATE");
		// this.classSpecificUpdate();
	};
	// var _classSpecificUpdate = function(parameters)
	// {
	// // to be overrided
	// };

	this.updateAgent = _updateAgent;
	// not sure I should do this as it exposes inner vars
	this.parameters = parameters;
	this.resetOffset = _resetOffset;
	this.setVisable = _setVisable;
    
	AGENTLIB.agentList.activeAgents.push(this);
};
RealAgent.prototype = new SimpleAgent();
RealAgent.prototype.constructor = RealAgent;

// parameters
// (name, id, geometry, position, direction, birthdate,wanderlust,money,..)
var PersonAgent = function(scene,parameters)
{

	'use strict';
    var _thisAgent = this; 
    
    var _getNewRND_V3_101 = function()
	{

		return new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2);
	};

	(function()
	{

		parameters = parameters ||
			{};
		parameters.minWander = parameters.minWander || 100;
		parameters.maxWander = parameters.maxWander || 60 * 10;
		// this person's wander time
		parameters.wanderTime = parameters.wanderTime || 100;
		parameters.isWandering = parameters.isWandering || true;

		parameters.wanderLust = parameters.wanderLust || (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;

		parameters.restless = parameters.restless || 0;// amount of time
		// wandering so far
		parameters.rest = parameters.rest || AgentClock.getElapsedTime();
		parameters.direction = parameters.direction || _getNewRND_V3_101();
		parameters.directionTime = parameters.directionTime ||
			{
				count : 0,
				newDirection : _getNewRND_V3_101()
			};
		parameters.speed = parameters.speed || 1;
		parameters.insideBuilding = parameters.insideBuilding || null;
		// ? i think this was to check if I can build a builing of a given size
		// can also be a THREE.Vector3
		parameters.size = parameters.size ||
			{
				x : 50,
				y : 10,
				z : 50
			};

		// parameters.money = parameters.money || 1000;
		// parameters.food = parameters.food || 1000; // not used currently

		parameters.geometry = parameters.geometry || new THREE.SphereGeometry(5, 32, 32);
		parameters.position.set ( parameters.position || new THREE.Vector3(0, 0, 0));

	}());

    RealAgent.call(this, scene, parameters);


	var _resetDirection = function(param)
	{

		if (param === undefined)
		{
			parameters.direction = _getNewRND_V3_101();
		}else
		{
			parameters.direction = param;
		}

	};
	var _startWander = function(bool)
	{

		if (bool === undefined)
		{
			this.parameters.isWandering = true;
			return;
		}

        this.parameters.isWandering = bool;
	};
    
    var _updatePerson = function(scene,params)
    {
        
//		console.log("Person_UPDATE");
		if (parameters.isWandering)// if the person is wandering then move
		{
			 parameters.outerObject.translateOnAxis(parameters.direction,parameters.speed);
 
            if (parameters.wanderLust-parameters.restless< 0)
			{
				parameters.isWandering = false;
			}

			parameters.restless = parameters.restless + 1;
		}
		else
		{
			if (parameters.insideBuilding === null)
			{
				// build house

				// If on a road, build a house on the road or a connecting road
				// if in the open, build a house nearby that will fit without
				// intersection

				var aBuilding = new BuildingAgent(
					{
						position : parameters.innerMesh.position,
						buildingSize : parameters.size
					});
				// aBuilding.addResident(this); //TODO: does not work right
				AGENTLIB.agentList.activeAgents.push(aBuilding);
				window.scene.add(aBuilding.parameters.outerObject);
				this.setVisable(scene,false);
				parameters.insideBuilding = aBuilding; // stops this from
														// building
												// another house , also adds
												// itself to the house
			}
		}

		if (parameters.directionTime.count < 0)
		{
			parameters.directionTime.newDirection = _getNewRND_V3_101(); 
			parameters.directionTime.count = 100 * Math.random();
		}
		else
		{
			parameters.direction = parameters.direction.add(parameters.directionTime.newDirection.multiplyScalar(0.4));
			parameters.direction = parameters.direction.normalize();
			parameters.directionTime.count -= 1;
		}

    };
    this.parameters = parameters;
    this.startWander = _startWander;
    this.resetDirection = _resetDirection;
    this.parameters = parameters;
    this.updateAgent = _updatePerson;
};
PersonAgent.prototype = new RealAgent();
PersonAgent.prototype.constructor = PersonAgent;


var makePerson = function(scene,parameters)
{    'use strict';
    var aPerson = new PersonAgent(scene,parameters); 
//    scene.add( aPerson.parameters.outerObject);
    aPerson.setVisable(scene,true);
	aPerson.startWander(true);
	return aPerson; 
    
};
 

// parameters
// {name,id,geometry,material,birthday,direction,position,scale,mesh,
// buildingSize}
var BuildingAgent = function(scene,parameters)
{    'use strict';
    var _thisAgent = this;  

	//
	// portals is a private variable to indicate where roads and other
	// buildings
	// should connect to this building
	// : list of objects which contain
	// {location:THREE.Vector3 , direction:THREE.Vector3,size:THREE.Vector3
	// }
	// 
    
    parameters = parameters ||{};
    parameters.portals = parameters.portals || []; 
    parameters.residents = parameters.residents || []; 
    parameters.name =parameters.name || "BuildingAgent";
    parameters.buildingSize =parameters.buildingSize || new THREE.Vector3(50, 20, 50); // default
																						// size
// parameters.geometryOffset = 25;// from the road
// parameters.translateY = parameters.buildingSize.y / 2; // to make level
// // with the
// // world

		// size 
	 parameters.geometry = parameters.geometry|| 
  new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.y, parameters.buildingSize.z);
// parameters.geometryOffset = parameters.buildingSize.z / 2; // from the
// // road
// parameters.translateY = parameters.buildingSize.y / 2;// to make level
// // with the
// // world
// 
	// if(parameters.height === undefined)
	// {
	// parameters.height = parameters.buildingSize.y/2;
	// }
    RealAgent.call(this,scene,parameters);
	var _generatePortals = function(positions)
	{

		// positions contain global positions of where new doors are beng
		// requested
		// it will return false if it is unable to make a door there

		// TODO: figure out where the doors are
		// front of Building should always have a door
	};

	var _addResident = function(aPerson)
	{ 
		_residents.push(aPerson);
	};
	var _RemoveResident = function(aPerson)
	{

		_residents.pop(_residents.indexOf(aPerson));
	};

	RealAgent.call(this,scene, parameters);

	this.addResident = _addResident;
	this.removeResident= _RemoveResident;

};
BuildingAgent.prototype = new RealAgent();
BuildingAgent.prototype.constructor = BuildingAgent;

// position,direction,size,geometry
var makeBuilding = function(parameters)
{ 
	'use strict';
};
 




















// roads grow
// initially as a dirt path ( 1 lane )
// whose opacity slowly becomes 1 over a period of 5 seconds
// (represents construction time)
// then becomes other colors/textures as it increases in capacity and size
// roads grow from building to building, // in the future it wont be limited
// to
// the grid
// roads become seed points for new buildings
// buildings on a road can 'move' if another road wants to intersect
// NOTE: only check for collision when it something changes ( like moves or
// grows )
//
// RoadAgent
// XroadAgent = RoadIntersectionAgent
var RoadAgent = function(scene,parameters)
{

	'use strict';
 
	var thisAgent = this;
    parameters = parameters ||{};
    parameters.name =parameters.name ||"RoadAgent";
    // height is determined by log of width
    // default 50 feet long, 10 width, type 0
    parameters.laneCount = parameters.laneCount || 1;
	 
	// default 1 lane = 10 feet
    parameters.laneWidth = parameters.laneWidth || 10; 
    // if position and direction don't exist they default to 0,0,0 and rnd;
    
    parameters.roadWidth = parameters.roadWidth ||  parameters.laneCount * parameters.laneWidth;
	parameters.roadHeight = parameters.roadHeight|| Math.log(parameters.laneCount * parameters.laneWidth)/ 10;
    
    parameters.roadLength = parameters.roadLength || 50;
    
	parameters.geometry = new THREE.BoxGeometry(parameters.roadWidth, parameters.roadHeight ,  parameters.roadLength);
	parameters.geometryOffset = parameters.roadLength / 2;
	parameters.material = AGENTLIB.materials[2];
    parameters.isGrowing = parameters.isGrowing || true;
	RealAgent.call(this,scene, parameters);

	var _growLength = function(value)
	{
		parameters.roadLength = parameters.roadLength + value;
		parameters.geometryOffset = value / 2;
		parameters.geometry = new THREE.BoxGeometry(parameters.roadWidth, parameters.roadHeight, parameters.roadLength);
		_updateMesh(parameters);
	};

    
    var _updateMesh = function(params)
	{

// var _geom, _mats, tempOffset;

		if (params === undefined)
		{
			return;
		}
// if (params.geometry !== undefined)
// {
// parameters.innerMesh.geometry
			
             thisAgent.resetOffset();
// }
		if (params.material !== undefined)
		{
			parameters.material = params.material; 
		}
			parameters.innerMesh.material = parameters.material ;
	};
    
	var _update = function()
	{
//        console.log("Road_UPDATE");
		if (parameters.isGrowing)
		{
			_growLength(1);
			// chance to spawn XroadAgent
		}
	};
 
	this.growLength = _growLength;
	this.updateAgent = _update();
	 
}; 
RoadAgent.prototype = new RealAgent();
RoadAgent.prototype.constructor = RoadAgent;
 
// this agent represents the crossroads. It is a short cylinder
// roads can connect to it from all angles
// but it has a 6 road max?
//
var XRoadAgent = function(scene,parameters)
{
    'use strict';
    RealAgent.call(scene,parameters);
    var _update = function()
	{ 
	 console.log("Xroad");
	};
    this.updateAgent = _update();
};
XRoadAgent.prototype = new RealAgent();
XRoadAgent.prototype.constructor = XRoadAgent;



// people make buildings 
// buildings make XRoads
// XRoads make roads
// roads make XRoads
// buildings make people
