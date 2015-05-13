// version 0.8 Agent Library
/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
// localStorage  should be used to save, also export to txt
//TODO: I should refactor the code so that it uses the parameter object instead of local values 
// TODO: NO LOCAL VARIABLES for agent classes. Save params in allAgentList
// 
var AgentLib =
	{
        REVISION: '3.1'
    };

    AgentLib.AgentClock = new THREE.Clock(true);

    AgentLib.agentList =
	{
        agentsParams : [],
		allAgents :
			[],
		activeAgents :
			[]  
	}; 
    
    AgentLib.materials = [];

    AgentLib.getRND_V3_101 = function (){
        return new THREE.Vector3((Math.random()-0.5)*2,0,(Math.random()-0.5)*2);
    };
    AgentLib.getRND_V3_010 = function (){
        return new THREE.Vector3( 0,Math.random()*2*Math.PI,0);
    };
    AgentLib.updateParams = function (a,b) {
        
        // copies contents of params into parameters
        
        if(a!==undefined && b!==undefined )
        for (var attrname in b) { a[attrname] = b[attrname]; }
        
    }

  
if (window.scene === undefined)
{
	var scene = new THREE.Scene();
}
else
{
    var scene = window.scene;
}

// initialize materials for agents
(function()
{ 
    'use strict';
    window.AgentLib.materials.push(new THREE.MeshBasicMaterial( { }));
    window.AgentLib.materials.push(new THREE.MeshBasicMaterial(
    {
        color : "yellow"
    }));
	window.AgentLib.materials.push(new THREE.MeshPhongMaterial(
		{ 
			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/greyc.jpg")
		}));

	window.AgentLib.materials.push(new THREE.MeshPhongMaterial(
		{
			// light
			specular : '#010101',
			// intermediate
			color : '#883311',
			// dark
			// emissive: '#505063',
			shininess : 50
		}));
	window.AgentLib.materials.push(new THREE.MeshPhongMaterial(
		{ 
			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.jpg"),
			specularMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg"),
			normalMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_normal_2048.jpg"),
			normalScale : new THREE.Vector2(0.85, 0.85)

		}));

}());

// parent to all agents
// parameters {name,id}
var SimpleAgent = function(parameters)
{ 
	'use strict';
	// private variable contains name of class or object
	// private variable should contain unique id
 
 
	// Initializing variables _name, _uuid if provided
	// This function calls itself after declaring itself

    var initial = function (parameters){
            parameters = parameters || {};
            parameters.uuid =parameters.uuid || Math.random();
            parameters.name = parameters.name || 'SimpleAgent : '+parameters.uuid;
            parameters.type = parameters.type || 'SimpleAgent';
            
        var addToList = function(agentParam){
        //    AgentLib.agentList.agentsParams.indexOf(AgentLib.agentList.agentsParams.)
            if(parameters.id ===undefined)
                {
                    AgentLib.agentList.agentsParams.push(agentParam); 
                    agentParam.id = AgentLib.agentList.agentsParams.indexOf(agentParam);
                    
                }
        };
            };
    
    this.initialize = initial ; 
    this.parameters = parameters;
 
    //	AgentLib.agentList.allAgents.push(this);

    
};

// class for things that exist in the scene
// parameters {name,id,geometry,material,birthday,direction,position,scale,mesh}
var RealAgent = function(parameters) // 
{ 
    'use strict';
    
    parameters = parameters || {}; 
    parameters.name = parameters.name|| 'RealAgent'; 
    
	SimpleAgent.call(this, parameters);

//    parameters.geometry = parameters.geometry || new THREE.
//    parameters.innerMesh = parameters.innerMesh || new THREE.Mesh(parameters.geometry,parameters.material);
	// var _geometry; // will be stored in the mesh
	// var _material; // will be stored in the mesh

  
    var _resetOffset = function(params)
    {
                
        params.innerMesh.geometry.computeBoundingBox();
        var dist= new THREE.Vector3() ;
        dist.subVectors((params.innerMesh.geometry.boundingBox.max),(params.innerMesh.geometry.boundingBox.min));
        params.innerMesh.translateY(dist.y/2); // even to floor
        params.innerMesh.translateZ(-dist.z/2);// 
        
    };
    

    
    parameters.geometry = parameters.geometry || new THREE.SphereGeometry( 10, 32, 32 ); 
    parameters.geometry.computeBoundingBox();
    parameters.material = parameters.material || new THREE.MeshBasicMaterial( {color: 0xafff00} );
    parameters.innerMesh = parameters.innerMesh || new THREE.Mesh( parameters.geometry, parameters.material );
    _resetOffset(parameters);
    
    parameters.outerObject = parameters.outerObject || new THREE.Object3D();   
    parameters.outerObject.add(parameters.innerMesh);

    parameters.birthdate =parameters.birthdate || AgentLib.AgentClock.getElapsedTime(); 
    parameters.direction = parameters.direction || AgentLib.getRND_V3_101();
    
    parameters.rayCaster =parameters.rayCaster||   new THREE.Raycaster();
    parameters.scene = parameters.scene || window.scene ||undefined;
	parameters.intersects = parameters.rayCaster.intersectObjects(parameters.scene.children);
     
	// Initializing variables _name, _uuid if provided
	// This function calls itself after declaring itself
	// also provides a local private scope
 
			// scale, rotate, translate
			if (parameters.position !== undefined)
			{
				// _setPosition(parameters.position);
				parameters.outerObject.translateX(parameters.position.x);
				parameters.outerObject.translateY(parameters.position.y);
				parameters.outerObject.translateZ(parameters.position.z);

			}
            else
                {parameters.position =  new THREE.Vector3();}

			if (parameters.direction !== undefined)
			{
				// _mesh.lookAt(parameters.direction);
				parameters.outerObject.rotateX(parameters.direction.x);
				parameters.outerObject.rotateY(parameters.direction.y);
				parameters.outerObject.rotateZ(parameters.direction.z);
			}  else
                {parameters.direction =  AgentLib.getRND_V3_101();}
  

	var _scaleAgent = function(Vector3)
	{ 
		parameters.outerObject.set(Vector3.x, Vector3.y, Vector3.z);
	};
	var _getPosition = function()
	{ 
		return parameters.outerObject.position;
	};
//
//	var _setPosition = function(parameters)
//	{
//
//		if (parameters === undefined)
//		{
//			return;
//		}
//		if (parameters.position !== undefined)
//		{
//			_object.translateX = parameters.position.x;
//			_object.translateY = parameters.position.y;
//			_object.translateZ = parameters.position.z;
//			return;
//		}
//		if (parameters.positionX !== undefined)
//		{
//			_object.translateX = parameters.positionX;
//		}
//		if (parameters.positionY !== undefined)
//		{
//			_object.translateY = parameters.positionY;
//		}
//		if (parameters.positionZ !== undefined)
//		{
//			_object.translateZ = parameters.positionZ;
//		}
//	};

	var _moveAgentInWorld = function(params)
	{

		if (params === undefined)
		{
			return;
		}

		if (params.distance !== undefined && params.direction !== undefined)
		{
			paramaters.outerObject.translateOnAxis(params.direction.normalize(), params.distance);
			return;
		}

		if (params.translate !== undefined)
		{
			paramaters.outerObject.translateX(params.translate.x);
			paramaters.outerObject.translateY(params.translate.y);
			paramaters.outerObject.translateZ(params.translate.z);
			return;
		}
		else
		{
			if (params.translateX !== undefined)
			{
				paramaters.outerObject.translateX(params.translateX);
			}
			if (params.translateY !== undefined)
			{
				paramaters.outerObject.translateX(params.translateY);
			}
			if (params.translateZ !== undefined)
			{
				paramaters.outerObject.translateX(params.translateZ);
			}
			return;
		}

	};

	var _getMesh = function()
	{

		return _mesh;
	};
	var _setMesh = function(newMesh)
	{

		_mesh = newMesh;
	};

	var _updateMesh = function(parameters)
	{

		var _geom, _mats, tempOffset;

		if (parameters === undefined)
		{
			return;
		}
		if (parameters.geometry !== undefined)
		{
			_geom = parameters.geometry;

			_mesh.geometry = _geom;
			if (parameters.geometryOffset)
				{_mesh.translateZ(-parameters.geometryOffset);}
		}
		else
		{
			_geom = _mesh.geometry;
		}
		if (parameters.material !== undefined)
		{
			_mats = parameters.material;
			_mesh.material = _mats;
		}
		else
		{
			_mats = _mesh.material;
		}

	};
	var _getObject = function()
	{

		return _object;
	};
	var _setObject = function(newObj)
	{

		_object = newObj;
	};
	var _getBirthdate = function()
	{ 
		return parameters.birthdate;
	}; 
	var _setVisable = function(bool, scene)
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
			return "Object removed";
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
			return "Object added";
		}

	};
	// var _getVisable = function(scene){
	// //TODO: not sure how to implement
	// };

	var _update = function(parameters)
	{

		if (parameters !== undefined)
		{
			if (parameters.position !== undefined)
			{
				_object.position = parameters.position;
			}
			if (parameters.direction !== undefined)
			{
				_object.rotateX(parameters.direction.x);
				_object.rotateY(parameters.direction.y);
				_object.rotateZ(parameters.direction.z);
			}
			if (parameters.lookAt !== undefined)
			{
				_object.lookAt(parameters.lookAt);
			}

		}
		this.classSpecificUpdate(parameters);
	};

	var _classSpecificUpdate = function(parameters)
	{

		// to be overrided
	};

    
    this.parameters = parameters;
	this.getPosition = _getPosition; 
	this.moveAgentInWorld = _moveAgentInWorld;
	this.scaleAgent = _scaleAgent;
 
	this.updateMesh = _updateMesh;
 
	this.getBirthdate = _getBirthdate;
    
	this.setVisable = _setVisable;
	this.updateAgent = _update;
	this.classSpecificUpdate = _classSpecificUpdate;
    this.resetOffset = _resetOffset;
 

	AgentLib.agentList.activeAgents.push(this);
};
RealAgent.prototype = new SimpleAgent();
RealAgent.prototype.constructor = RealAgent;

// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
var PersonAgent = function(parameters)
{
    'use strict';

    
		parameters = parameters || {};
		parameters.minWander = parameters.minWander || 100;
		parameters.maxWander = parameters.maxWander || 60 * 10;
		// this person's wander time
		parameters.wanderTime = parameters.wanderTime || 100;
		parameters.isWandering = parameters.isWandering || true;
        // maximum time wandering 
		parameters.wanderLust = parameters.wanderLust || (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;

		parameters.restless = parameters.restless || 0;// amount of time
		// wandering so far
		parameters.rest = parameters.rest || AgentLib.AgentClock.getElapsedTime();
		parameters.direction = parameters.direction || AgentLib.getRND_V3_101();
		parameters.directionTime = parameters.directionTime ||
			{
				count : 0,
				newDirection : AgentLib.getRND_V3_101()
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
    
    
	var _isWandering = true; // set to false when residing in a building
	var _direction; // direction facing
	var _speed = 1;// speed = feet per update?
	parameters.insideBuilding = null;
	var _directionTime =
		{
			count : 0,
			newDirection : AgentLib.getRND_V3_101()
		};
	var _size =
		{
			x : 50,
			y : 10,
			z : 50
		};

    
    
	function resetDirection(Vector3)
	{
        parameters.direction = Vector3 ||  AgentLib.getRND_V3_101(); 
 
	}
    parameters.direction = parameters.direction || resetDirection();
     
	// we set the default parameters before we call the super
	RealAgent.call(this, parameters);

	// other things to add
	// {job,hunger,relatives,friends,health}
  
	var _startWander = function(bool)
	{

		if (bool === undefined)
		{
			parameters.isWandering = true;
			return;
		}

		parameters.isWandering = bool;
	};

	var _classSpecificUpdate = function(params)
	{
        // copies contents of params into parameters
        if(params!==undefined)
        for (var attrname in params) { parameters[attrname] = params[attrname]; }
        
        
		if (parameters.isWandering)// if the person is wandering then move
		{
			// TODO: I need to get direction from somewhere or make it
            this.moveAgentInWorld(
				{
					direction : parameters.direction,
					distance : parameters.distance
				});
			if (parameters.wanderlust < 0)
			{
				parameters.isWandering = false;
			}

///			parameters.wanderlust = parameters.wanderlust - 1;
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
						position : this.getMesh().position,
						buildingSize : _size
					});
				// aBuilding.addResident(this); //TODO: does not work right
				AgentLib.agentList.activeAgents.push(aBuilding);
				scene.add(aBuilding.getObject());
				this.setVisable(false);
				parameters.insideBuilding = aBuilding; // stops this from building
				// another house , also adds
				// itself to the house
			}
		}

		if (parameters.directionTime.count < 0)
		{
			parameters.directionTime.newDirection = AgentLib.getRND_V3_101();

			parameters.directionTime.count = 100 * Math.random();
		}
		else
		{
			parameters.direction = parameters.direction.add(_directionTime.newDirection.multiplyScalar(0.45));
			parameters.direction = parameters.direction.normalize();
			parameters.directionTime.count -= 1;
		}

	};

	var _getWanderLust = function()
	{ 
		return parameters.wanderlust;
	};
 
 
    this.startWander = _startWander;

    this.parameters = parameters;

};
PersonAgent.prototype = new RealAgent();
PersonAgent.prototype.constructor = PersonAgent;

// parameters
// {name,id,geometry,material,birthday,direction,position,scale,mesh,
// buildingSize}
var BuildingAgent = function(parameters)
{

	'use strict';

	//
	// portals is a private variable to indicate where roads and other
	// buildings
	// should connect to this building
	// : list of objects which contain
	// {location:THREE.Vector3 , direction:THREE.Vector3,size:THREE.Vector3
	// }
	// 
	var _portals =
		[];
	var _residents =
		[];

	if (parameters === undefined)
	{
		parameters =
			{}; // I would define stuff here but it decentralizes the
		// intialization
	}
	if (parameters.name === undefined)
	{
		parameters.name = "BuildingAgent";
	}
	if (parameters.buildingSize === undefined)
	{
		parameters.buildingSize = new THREE.Vector3(50, 20, 50); // default
		parameters.geometryOffset = 25;// from the road
		parameters.translateY = parameters.buildingSize.y / 2; // to make level
		// with the
		// world

		// size
	}
	if (parameters.geometry === undefined)
	{
		parameters.geometry = new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.y, parameters.buildingSize.z);
		parameters.geometryOffset = parameters.buildingSize.z / 2; // from the
		// road
		parameters.translateY = parameters.buildingSize.y / 2;// to make level
		// with the
		// world
	}
	// if(parameters.height === undefined)
	// {
	// parameters.height = parameters.buildingSize.y/2;
	// }
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

	RealAgent.call(this, parameters);

	this.addResident= _addResident;
	this.removeResident= _RemoveResident;

};
BuildingAgent.prototype = new RealAgent();
BuildingAgent.prototype.constructor = BuildingAgent;

// position,direction,size,geometry
var makeBuilding = function(parameters)
{

	'use strict';
};

var makePerson = function(parameters)
{

	'use strict';
	var aPerson = new PersonAgent(parameters);
	// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
	aPerson.setVisable(true);
	aPerson.startWander(true);
	return aPerson;
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
var RoadAgent = function(parameters)
{

	'use strict';

	var _laneCount;
	var _laneWidth;
	var _roadLength;
	var _isGrowing;
	if (parameters === undefined)
	{
		parameters =
			{};
		// I would define stuff here but it decentralizes the intialization
	}
	if (parameters.name === undefined)
	{
		parameters.name = "RoadAgent";
	}
	if (parameters.laneCount === undefined)
	{

		// height is determined by log of width
		_laneCount = parameters.laneCount = 1;
		// default 50 feet long, 10 width, type 0

	}
	if (parameters.laneWidth === undefined)
	{
		_laneWidth = parameters.laneWidth = 9; // default 1 lane = 9 feet
	}
	// if position and direction don't exist they default to 0,0,0 and
	// 0,0,1;

    parameters.direction = parameters.direction || AgentLib.getRND_V3_010();
	var _rWidth = _laneCount * _laneWidth;
	var _rHeight = Math.log(_laneCount * _laneWidth);
	var _rLength = 500;
	parameters.geometry = new THREE.BoxGeometry(_rWidth, _rHeight / 10, _rLength);
//	parameters.geometryOffset = _rLength / 2;
	parameters.material = AgentLib.material;
    
	RealAgent.call(this, parameters);

	var _growLength = function(value)
	{

		_rLength = _rLength + value;
		parameters.geometryOffset = value / 2;
		parameters.geometry = new THREE.BoxGeometry(_rWidth, _rHeight / 10, _rLength);
		_m(parameters);
	};

	var _update = function()
	{

		if (_isGrowing)
		{
			_growLength(1);
			// chance to spawn XroadAgent
		}
	};
	var _m = this.updateMesh;
	this.growLength = _growLength;
	// this.classSpecificUpdate = _update();

};

RoadAgent.prototype = new RealAgent();
RoadAgent.prototype.constructor = RoadAgent;

// this agent represents the crossroads. It is a short cylinder
// roads can connect to it from all angles
// but it has a 6 road max?
//
var XRoadAgent = function(parameters)
{
    'use strict';

	RealAgent.call(parameters);
};
XRoadAgent.prototype = new RealAgent();
XRoadAgent.prototype.constructor = XRoadAgent;
/*
 * 
 */



// Priniciples of Object Oriented Javascript
// By Nicholas Zakas



// my professors personal jim.mildrew@gmail.com

