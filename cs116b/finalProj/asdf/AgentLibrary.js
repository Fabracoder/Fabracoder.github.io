// version 0.8 Agent Library
/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
// localStorage  should be used to save, also export to txt
//TODO: I should refactor the code so that it uses the parameter object instead of local values 
var AgentClock = new THREE.Clock(true);
var agentList =
	[]; // list of all agents
var realAgentList =
	[]; // list of all agents with mesh
var materialsForAgents =
	[]; // list of materials
var activeAgents =
	[]; // list for update to be called on.

if (scene === undefined)
{
	var scene = new THREE.Scene();
}

// initialize materials for agents
(function()
{

	materialsForAgents.push(new THREE.MeshBasicMaterial(
		{
			 
		}));
	materialsForAgents.push(new THREE.MeshPhongMaterial(
		{

			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/greyc.jpg")
		// ,specularMap:
		// THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg")
		}));

	materialsForAgents.push(new THREE.MeshPhongMaterial(
		{
			// light
			specular : '#010101',
			// intermediate
			color : '#883311',
			// dark
			// emissive: '#505063',
			shininess : 50
		}));
	materialsForAgents.push(new THREE.MeshPhongMaterial(
		{

			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.jpg"),
			specularMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg"),
			normalMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_normal_2048.jpg"),
			normalScale : new THREE.Vector2(0.85, 0.85)

		}));

}())

// parent to all agents
// parameters {name,id}
var SimpleAgent = function(parameters)
{

	'use strict';
	// private variable contains name of class or object
	// private variable should contain unique id
	var _name, _uuid;

	// Initializing variables _name, _uuid if provided
	// This function calls itself after declaring itself
	(function()
	{

		if (parameters === undefined)
		{
			_name = "Agent";
			_uuid = Math.random();
		}
		else
		{
			if (parameters.name !== undefined)
			{
				_name = parameters.name;
			}
			else
			{
				_name = "Agent"; // default if no name provided
			}

			if (parameters.id !== undefined)
			{
				_uuid = parameters.id;
			}
			else
			{
				// probably a better way of picking an unique
				// found it, THREEjs has its own uuid generator
				// _uuid = THREE.Math.generateUUID();
				_uuid = Math.random();
				// THREE.Math.generateUUID();;
			}
		}
	})();

	// getter and setter for name
	var _getName = function()
	{

		return _name;
	};
	var _setName = function(name)
	{

		_name = name;
	};
	// getter and setter for ID
	var _getID = function()
	{

		return _uuid;
	};
	var _setID = function(newID)
	{

		_uuid = newID;
	};

	this.getName = _getName;
	this.setName = _setName;
	this.getID = _getID;
	this.setID = _setID; // should not be used
	this.type = "Agent"; // name of class

	agentList.push(this);
};

// class for things that exist in the scene
// parameters {name,id,geometry,material,birthday,direction,position,scale,mesh}
var RealAgent = function(parameters) // 
{

	'use strict';
	if (parameters === undefined)
	{
		parameters =
			{
				name : 'RealAgent'
			};
	}
	else
	{
		if (parameters.name === undefined)
		{
			parameters.name = 'RealAgent';
		}
	}
	SimpleAgent.call(this, parameters);

	// var _geometry; // will be stored in the mesh
	// var _material; // will be stored in the mesh
	var _mesh;
	var _object;
	var _direction; // direction mesh is facing
	var _position; // location of mesh
	var _scale; // scaling of mesh
	var _birthdate; // date created
    var _height; // height of agent
	var _wrapper = new THREE.Object3D();

	// this.rays = [_direction];
	var _caster = new THREE.Raycaster();

	var intersects = _caster.intersectObjects(scene.children);
	var INTERSECTED;
//	var collision = function()
//	{
//_caster = new THREE.Raycaster();
//
//		'use strict';
//		var collisions, i,
//		// Maximum distance from the origin before we consider collision
//		distance = 8,
//		// Get the obstacles array from our scene
//		obstacles = scene.children;
//
//		// We reset the raycaster to this direction
//		 _caster.set(_mesh.position, _direction);
//		// Test if we intersect with any obstacle mesh
//		collisions = this._caster.intersectObjects(obstacles);
//		// And disable that direction if we do
//		if (collisions.length > 0 && collisions[0].distance <= distance)
//		{
//			console.log(collisions[0].name);
//			// TODO: check if it is a building, if so avoid if wanderlust > 50%
//			// avoid by setting new direction (immediate. not a gradual curve)
//		}
//	}

//	if (intersects.length > 0)
//	{
//
//		if (INTERSECTED != intersects[0].object)
//		{
//
//			if (INTERSECTED)
//				INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
//
//			INTERSECTED = intersects[0].object; // object intersected with
//			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex(); // do
//			// stuff
//			// to
//			// object
//			// pointed
//			// at
//			// (highlight)
//			INTERSECTED.material.emissive.setHex(0xff0000);
//
//		}
//
//	}
//	else
//	{
//
//		if (INTERSECTED)
//			INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex); // un
//		// highlight
//
//		INTERSECTED = null;
//
//	}

	// _wrapper.add(this.getMesh());
	// this.setMesh(_wrapper);

	// Initializing variables _name, _uuid if provided
	// This function calls itself after declaring itself
	// also provides a local private scope
	(function()
	{


		_object = new THREE.Object3D(); // higher scoped private obj
        
		if (parameters !== undefined)
		{
            _height = parameters.height | 4;
			if (parameters.geometry === undefined) // set default
			{
				parameters.geometry = new THREE.SphereGeometry(_height, 32, 32);
			}
//			if (parameters.material === undefined) // set default
//			{
//				parameters.material = materialsForAgents[0];
//			}

			_mesh = new THREE.Mesh(parameters.geometry, parameters.material);
            if(parameters.translateY)
                {
                        _mesh.translateY(parameters.translateY);
                }
            else
                {
                    _mesh.translateY(_height / 2); 
                }
            
			if (parameters.geometryOffset === undefined)
			{
				parameters.geometryOffset = 0;
			}
			_mesh.translateZ(-parameters.geometryOffset);

			_object.add(_mesh);

			// scale, rotate, translate
			if (parameters.position !== undefined)
			{
				// _setPosition(parameters.position); 
				_object.translateX(parameters.position.x);
				_object.translateY(parameters.position.y);
				_object.translateZ(parameters.position.z);

				// _object.translateX(parameters.position.x);
				// _object.translateY(parameters.position.y);
				// _object.translateZ(parameters.position.z);
			}
			// else
			// {
			// _position = new THREE.Vector3(0, 0, 0);
			// //not needed as it defaults to 0,0,0 anyway
			// }
			if (parameters.direction !== undefined)
			{
				// _mesh.lookAt(parameters.direction);
				_object.rotateX(parameters.direction.x);
				_object.rotateY(parameters.direction.y);
				_object.rotateZ(parameters.direction.z);

				// _direction = direction;
			}
			else
			{
				// // default direction not needed
				// _mesh.rotateX(parameters.direction.x);
				// _mesh.rotateY(parameters.direction.y);
				// _mesh.rotateZ(parameters.direction.z);
				// _mesh.lookAt(new THREE.Vector3(0, 0, 1));
				// .rotateOnAxis ?
				// (axis.normalized, angleInRadians)
			}

			if (parameters.birthdate !== undefined)
			{
				_birthdate = parameters.birthdate;
			}
			else
			{
				_birthdate = AgentClock.getElapsedTime();
			}
		}
		else
		{
			_mesh = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), materialsForAgents[0]);
			// _mesh.lookAt(new THREE.Vector3(0, 0, 1));
			_birthdate = AgentClock.getElapsedTime();
		}

		_object.updateGeometry = function()
		{

		};
	})();

	var _scaleAgent = function(Vector3)
	{

		_object.scale.set(Vector3.x, Vector3.y, Vector3.z);
	};
	var _getPosition = function()
	{

		return _mesh.position;
	};

	var _setPosition = function(parameters)
	{

		if (parameters === undefined)
		{
			return;
		}
		if (parameters.position !== undefined)
		{
			_object.translateX = parameters.position.x;
			_object.translateY = parameters.position.y;
			_object.translateZ = parameters.position.z;
			return;
		}
		if (parameters.positionX !== undefined)
		{
			_object.translateX = parameters.positionX;
		}
		if (parameters.positionY !== undefined)
		{
			_object.translateY = parameters.positionY;
		}
		if (parameters.positionZ !== undefined)
		{
			_object.translateZ = parameters.positionZ;
		}
	};

	var _translateObject = function(parameters)
	{ 
		if (parameters === undefined)
		{
			return;
		}

		if (parameters.distance !== undefined && parameters.direction !== undefined)
		{
			_mesh.translateOnAxis(parameters.direction.normalize(), parameters.distance);
			return;
		}

		if (parameters.translate !== undefined)
		{
			_mesh.translateX(parameters.translate.x);
			_mesh.translateY(parameters.translate.y);
			_mesh.translateZ(parameters.translate.z);
			return;
		}
		else
		{
			if (parameters.translateX !== undefined)
			{
				_mesh.translateX(parameters.translateX);
			}
			if (parameters.translateY !== undefined)
			{
				_mesh.translateX(parameters.translateY);
			}
			if (parameters.translateZ !== undefined)
			{
				_mesh.translateX(parameters.translateZ);
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
				_mesh.translateZ(-parameters.geometryOffset);
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
	}
	var _setObject = function(newObj)
	{

		_object = newObj;
	};
	var _getBirthdate = function()
	{

		return _birthdate;
	};
	var _setBirthdate = function()
	{

		return _birthdate;
	};
	var _setVisable = function(bool, scene)
	{

		if (bool === false)
		{
			if (scene !== undefined)
			{
				scene.remove(_object);
			}
			else
			{
				window.scene.remove(_object);
			}
			return "Object removed";
		}
		else
		{
			if (scene !== undefined)
			{
				scene.add(_object);
			}
			else
			{
				window.scene.add(_object);
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

	this.getPosition = _getPosition;
	this.setPosition = _setPosition;
	this.translateAgent = _translateObject;
	this.scaleAgent = _scaleAgent;
	this.getMesh = _getMesh;
	this.setMesh = _setMesh;
	this.updateMesh = _updateMesh;

	this.getObject = _getObject;
	this.setObject = _setObject;
	this.getBirthdate = _getBirthdate;
	this.setBirthdate = _setBirthdate;
	this.setVisable = _setVisable;
	this.updateAgent = _update;
	this.classSpecificUpdate = _classSpecificUpdate;

	realAgentList.push(this);
};
RealAgent.prototype = new SimpleAgent();
RealAgent.prototype.constructor = RealAgent;

// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
var PersonAgent = function(parameters)
{
    var _getNewRND_Vector3 = function(){return  new THREE.Vector3((Math.random() - .5) * 2, 0, (Math.random() - .5) * 2)};

	'use strict';
	// 
	var _wanderlust;
	var _minWander; // min time to set wanderlust
	var _maxWander; // max time for wanderlust
	var _money;
	var _restless = Math.random() * 60; // time it wants to wander in seconds
	var _rest = clock.getElapsedTime(); // time last rested
	var _isWandering = true; // set to false when residing in a building
	var _direction; // direction facing
	var _speed = 1;// speed = feet per update?
    var _insideBuilding=null;
	var _directionTime = 
		{
			count : 0,
			newDirection : _getNewRND_Vector3()
		};
    var _size = {x:50,y:10,z:50};

	function resetDirection(parameters)
	{

		_direction = _getNewRND_Vector3();

		if (parameters)
		{
			_direction = parameters.direction;
		}
	}

	(function()
	{

		if (parameters === undefined)
		{
			parameters =
				{
					name : 'PersonAgent',
					maxWander : _maxWander = 60*10, // time in seconds, 1
					// minute
					// default max;
					minWander : _minWander = 10*10,
					// time in seconds, 1 minute default max;

					geometry : new THREE.SphereGeometry(5, 32, 32),
					position : new THREE.Vector3(0, 50, 0)
				};

		}
        else
            {
                if(parameters.maxWander=== undefined)
                    {parameters.maxWander = 60*10;}
                if(parameters.minWander=== undefined)
                    {parameters.minWander = 10*10;}
                
            }
        _maxWander=parameters.maxWander;
        _minWander=parameters.minWander;
		if (parameters.wanderlust === undefined)
		{
			parameters.wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
		}
        		_wanderlust=parameters.wanderlust;
		if (parameters.money === undefined) // money is used to calculate
		// how
		// much building/land to settledown
		// into
		{
			parameters.money = Math.random() * 1000000 + 10;
		}

		resetDirection();
	}());
	// we set the default parameters before we call the super
	RealAgent.call(this, parameters);

	// other things to add
	// {job,hunger,relatives,friends,health}
	(function()
	{

		// _setWanderParams(parameters);
		{
			if (parameters === undefined)
			{
				return;
			}
			if (parameters.maxWander !== undefined)
			{
				_maxWander = parameters.maxWander;
			}
			else
			{
				_maxWander = 60;
			}
			if (parameters.minWander !== undefined)
			{
				_minWander = parameters.minWander;
			}
			else
			{
				_minWander = 60;
			}

			if (_wanderlust > _maxWander)
			{
				_wanderlust = _maxWander;
			}
			if (parameters.wander !== undefined)
			{
				_wanderlust = parameters.wander;
			}
			if (parameters.direction !== undefined)
			{
				_object.setDirection(parameters.direction);// ??
			}
		}
		// _setWanderlust();

		_wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;

		// _wanderlust = parameters.wanderlust; //above line does this
		// already

		if (parameters.money === undefined)
		{
			parameters.money = 10000;
		}
		_money = parameters.money;
	}());

	var _setWanderlust = function(value)
	{

		if (value === undefined)
		{
			_wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
		}
		else
		{
			_wanderlust = value;
		}
	};

	var _setWanderParams = function(parameters)
	{

		if (parameters === undefined)
		{
			return;
		}
		if (parameters.maxWander !== undefined)
		{
			_maxWander = parameters.maxWander;
		}
		else
		{
			_maxWander = 60;
		}
		if (parameters.minWander !== undefined)
		{
			_minWander = parameters.minWander;
		}
		else
		{
			_minWander = 60;
		}

		if (_wanderlust > _maxWander)
		{
			_wanderlust = _maxWander;
		}
		if (parameters.wander !== undefined)
		{
			_wanderlust = parameters.wander;
		}
	};

	var _getWanderParams = function()
	{

		var params =
			{
				maxWander : _maxWander,
				minWander : _minWander,
				wanderlust : _wanderlust
			};
		return params;
	};

	var _startWander = function(bool)
	{

		if (bool === undefined)
		{
			_isWandering = true;
			return;
		}

		_isWandering = bool;
	};

	var _classSpecificUpdate = function(parameters)
	{

		if (_isWandering)// if the person is wandering then move
		{
			// TODO: I need to get direction from somewhere or make it
			this.translateAgent(
				{
					direction : _direction,
					distance : _speed
				});
			if (_wanderlust < 0)
			{
				_isWandering = false;
			}

            _wanderlust = _wanderlust - 1;
		}
		else
		{
        if (  _insideBuilding === null) 
            {
                // build house

                // If on a road, build a house on the road or a connecting road
                // if in the open, build a house nearby that will fit without
                // intersection

                var aBuilding = new BuildingAgent({position: this.getMesh().position , buildingSize: _size});
    //            aBuilding.addResident(this); //TODO: does not work right
                agentList.push(aBuilding);
                scene.add(aBuilding.getObject());
                this.setVisable(false);
                _insideBuilding = aBuilding; // stops this from building another house , also adds itself to the house
            }
		}

		if (_directionTime.count < 0)
		{
			_directionTime.newDirection =  _getNewRND_Vector3();

			_directionTime.count = 100 * Math.random();
		}
		else
		{
			_direction = _direction.add(_directionTime.newDirection.multiplyScalar(0.4));
			_direction = _direction.normalize();
			_directionTime.count -= 1;
		}

	

		//           
		//        
		// var _SettleDown = function()
		// {
		// if (_restless - (_lastClockCall - _birthday) < _restless * 0.2)
		// {
		// return new THREE.Vector3(1000, 100000, 1000);
		// }
		// else
		// {
		// // console.log(this.restless-(this.lastClockCall-this.birthday));
		// }
		// // check if adequate nearby area can be claimed
		// // if found then it saves the x,y,z in size as a THREE.Vector3
		// // to be used
		// return null;
		// };
		//    
		// var _updateMove = function()
		// {
		//
		// var delta = (clock.getElapsedTime() - this.lastClockCall);
		// this.lastClockCall = clock.getElapsedTime();
		//
		// if (this.visable == false)
		// {
		// return
		// }
		//
		// _object.translateX(this.direction.x * delta * 10 * SimulationSpeed);
		// _object.translateZ(this.direction.z * delta * 10 * SimulationSpeed);
		// // this.mesh.translateX((Math.random() - 0.5) *2 * delta*30);
		// // this.mesh.translateZ((Math.random() - 0.5) *2 * delta*30);
		//
		// _size = _SettleDown();
		// if (_size == null)
		// {
		// if (_countdownchange < 1)
		// {
		// _countdownchange = Math.random() * 1000;
		// _directionChange = new THREE.Vector3((Math.random() - 0.5) * 3 *
		// delta, 0, (Math.random() - 0.5) * 3 * delta);
		//
		// }
		// else
		// {
		// _direction = this.direction.add(_directionChange);
		// _direction = this.direction.normalize();
		// _countdownchange--;
		// }
		//
		// }
		// else
		// // create building
		// {
		// // check if nearby road, and build adjacent is so
		// // console.log(this);
		// console.log(_object.position);
		// // console.log(this.size);
		// // var aBuilding = new BuildingAgent(this.mesh.position, this.size);
		//
		// // agentList.push(aBuilding);
		// // scene.add(aBuilding.mesh);
		// _setVisable(false);
		// }
		//
		// // console.log(directionChange.x +":" +directionChange.z + " :->: " +
		// // this.direction.x + " : " + this.direction.z);
		//
		// };

	};

    var _getWanderLust = function (){return _wanderlust;};
	this.startWander = _startWander;
	this.setWanderParams = _setWanderParams;
	this.classSpecificUpdate = _classSpecificUpdate; // runs this on at end
    this.getWanderLust = _getWanderLust;
	// of update function
	// for obj

	setWanderlust: _setWanderlust;

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
        parameters.translateY =    parameters.buildingSize.y/2; // to make level with the world
 
		// size
	}
	if (parameters.geometry === undefined)
	{
		parameters.geometry = new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.y, parameters.buildingSize.z);
		parameters.geometryOffset = parameters.buildingSize.z/2 ; // from the road
        parameters.translateY =    parameters.buildingSize.y/2;// to make level with the world
	}
//    if(parameters.height === undefined)
//        {
//                parameters.height = parameters.buildingSize.y/2;
//        }
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
	}
	var _RemoveResident = function(aPerson)
	{

		_residents.pop(_residents.indexOf(aPerson));
	}

	RealAgent.call(this, parameters);

	addResident: _addResident;
	removeResident: _RemoveResident;

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
// RoadIntersectionAgent 
var RoadAgent = function(parameters)
{

	'use strict';

	var _laneCount;
	var _laneWidth;
	var _roadLength;

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

	var _rWidth = _laneCount * _laneWidth;
	var _rHeight = Math.log(_laneCount * _laneWidth);
	var _rLength = 500;
	parameters.geometry = new THREE.BoxGeometry(_rWidth, _rHeight / 10, _rLength);
	parameters.geometryOffset = _rLength / 2;
	// console.log(_rWidth + "+" + _rHeight + "+" + _rLength);
	// parameters.direction = new THREE.Vector3(0,0,0);
	parameters.material = materialsForAgents[2];

	RealAgent.call(this, parameters);

	var _growLength = function(value)
	{

		_rLength = _rLength + value;
		parameters.geometryOffset = value / 2;
		parameters.geometry = new THREE.BoxGeometry(_rWidth, _rHeight / 10, _rLength);
		_m(parameters);
		// _object = getObject();
		// _object.updateGeometry(parameters);
	};
	var _m = this.updateMesh;
	this.growLength = _growLength;
};

RoadAgent.prototype = new RealAgent();
RoadAgent.prototype.constructor = RoadAgent;
