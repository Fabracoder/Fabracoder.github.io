// version 0.8 Agent Library
/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
// localStorage  should be used to save, also export to txt
var AgentClock = new THREE.Clock(true);
var agentList =
	[]; // list of all agents
var realAgentList =
	[]; // list of all agents with mesh
var materialsForAgents =
	[]; // list of materials
var activeAgents =
	[]; // list for update to be called on.

// initialize materials for agents
(function()
{

	materialsForAgents.push(new THREE.MeshBasicMaterial(
		{
			color : 'yellow'
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
	var _name, _id;

	// Initializing variables _name, _id if provided
	// This function calls itself after declaring itself
	(function()
	{

		if (parameters === undefined)
		{
			_name = "Agent";
			_id = THREE.Math.generateUUID();
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
				_id = parameters.id;
			}
			else
			{
				// probably a better way of picking an unique
				_id = Math.random();
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

		return _id;
	};
	var _setID = function(newID)
	{

		_id = newID;
	};

	this.getName = _getName;
	this.setName = _setName;
	this.getID = _getID;
	this.setID = _setID;

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

	var _wrapper = new THREE.Object3D();

	// _wrapper.add(this.getMesh());
	// this.setMesh(_wrapper);

	// Initializing variables _name, _id if provided
	// This function calls itself after declaring itself
	// also provides a local private scope
	(function()
	{

		var _height = 4;
		_object = new THREE.Object3D(); // higher scoped private obj
		if (parameters !== undefined)
		{
			if (parameters.geometry === undefined) // set default
			{
				parameters.geometry = new THREE.SphereGeometry(_height, 32, 32);
			}
			if (parameters.material === undefined) // set default
			{
				parameters.material = materialsForAgents[0];
			}

			_mesh = new THREE.Mesh(parameters.geometry, parameters.material);
			_mesh.translateY(_height / 2);
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

				console.log(_object.position);
				console.log(parameters.position);

				_object.translateX(parameters.position.x);
				_object.translateY(parameters.position.y);
				_object.translateZ(parameters.position.z);

				console.log(_object.position);

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
		if (parameters.translate !== undefined)
		{
			_object.translateX = parameters.translate.x;
			_object.translateY = parameters.translate.y;
			_object.translateZ = parameters.translate.z;
			return;
		}
		if (parameters.translateX !== undefined)
		{
			_object.translateX = parameters.translateX;
		}
		if (parameters.translateY !== undefined)
		{
			_object.translateY = parameters.translateY;
		}
		if (parameters.translateZ !== undefined)
		{
			_object.translateZ = parameters.translateZ;
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
		_classSpecificUpdate(parameters);
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

	realAgentList.push(this);
};
RealAgent.prototype = new SimpleAgent();
RealAgent.prototype.constructor = RealAgent;

// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
var PersonAgent = function(parameters)
{

	'use strict';

	var _wanderlust;
	var _minWander;
	var _maxWander;
	var _money;
	var _restless = Math.random() * 60; // time it wants to wander in seconds
	var _rest = clock.getElapsedTime(); // time last rested
	var _isWandering = false;
	(function()
	{

		if (parameters === undefined)
		{
			parameters =
				{
					name : 'PersonAgent',
					maxWander : _maxWander = 60, // time in seconds, 1
					// minute
					// default max;
					minWander : _minWander = 5,
					// time in seconds, 1 minute default max;

					geometry : new THREE.SphereGeometry(5, 32, 32),
					position : new THREE.Vector3(0, 50, 0)
				};

		}

		if (parameters.wanderlust === undefined)
		{
			parameters.wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
		}
		if (parameters.money === undefined) // money is used to calculate
		// how
		// much building/land to settledown
		// into
		{
			parameters.money = Math.random() * 1000000 + 10;
		}
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

	var _updateAgent = function(parameters)
	{

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

	this.startWander = _startWander;
	this.setWanderParams = _setWanderParams;

	updateAgent: _updateAgent;

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
		// size
	}
	if (parameters.geometry === undefined)
	{
		parameters.geometry = new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.y, parameters.buildingSize.z);
		parameters.geometryOffset = parameters.buildingSize.z / 2;
	}

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

	addResident : _addResident;
	removeResident : _RemoveResident;

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
