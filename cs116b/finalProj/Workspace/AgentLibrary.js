/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
// localStorage  should be used to save, also export to txt
var AgentClock = new THREE.Clock(true);
var agentList =[]; // list of all agents
var realAgentList=[]; // list of all agents with mesh

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
			_id = Math.random();
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
	var _direction; // direction mesh is facing
	var _position; // location of mesh
	var _scale; // scaling of mesh
	var _birthdate; // date created

	// Initializing variables _name, _id if provided
	// This function calls itself after declaring itself
	// also provides a local private scope
	(function()
	{

		if (parameters !== undefined)
		{

			if (parameters.geometry === undefined)
			{
				parameters.geometry = new THREE.SphereGeometry(10, 32, 32);
			}
			if (parameters.material === undefined)
			{
				parameters.material = new THREE.MeshBasicMaterial(
					{
						color : 'white'
					});
			}

			_mesh = new THREE.Mesh(parameters.geometry, parameters.material);

			// scale, rotate, translate

			if (parameters.position !== undefined)
			{
				_mesh.translateX = parameters.position.x;
				_mesh.translateY = parameters.position.y;
				_mesh.translateZ = parameters.position.z;
			}
			// else
			// {
			// _position = new THREE.Vector3(0, 0, 0);
			// //not needed as it defaults to 0,0,0 anyway
			// }
			if (parameters.direction !== undefined)
			{
				_mesh.lookAt(parameters.direction);
				// _direction = direction;
			}
			else
			{
				_mesh.lookAt(new THREE.Vector3(0, 0, 1));
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
			_mesh = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), new THREE.MeshBasicMaterial(
				{
					color : 'white'
				}));
			_mesh.lookAt(new THREE.Vector3(0, 0, 1));
			_birthdate = AgentClock.getElapsedTime();
		}
	})();

	var _getPosition = function()
	{

		return _mesh.position;
	};
	var _getMesh = function()
	{

		return _mesh;
	};
	var _setMesh = function(newMesh)
	{

		_mesh = newMesh;
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
				scene.remove(_mesh);
			}
			else
			{
				window.scene.remove(_mesh);
			}
			return "Object removed";
		}
		else
		{
			if (scene !== undefined)
			{
				scene.add(_mesh);
			}
			else
			{
				window.scene.add(_mesh);
			}
			return "Object added";
		}

	};

    var _updateAgent = function(parameters){
    if(parameters===undefined)
        {
            return "undefined Param:|updateAgent";
        }
        
    };
    
    
    
	this.getPosition = _getPosition;
	this.getMesh = _getMesh;
	this.setMesh = _setMesh;
	this.getBirthdate = _getBirthdate;
	this.setBirthdate = _setBirthdate;
	this.setVisable = _setVisable;
    this.updateAgent = _updateAgent;

	realAgentList.push(this);
};
RealAgent.prototype = new SimpleAgent();
RealAgent.prototype.constructor = RealAgent;

// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
var personAgent = function(parameters)
{

	'use strict';

	var _wanderlust;
	var _minWander;
	var _maxWander;
	var _money;

	(function()
	{

		if (parameters === undefined)
		{
			parameters =
				{
					name : 'PersonAgent',
					maxWander : _maxWander = 60, // time in seconds, 1 minute
					// default max;
					minWander : _minWander = 5
				// time in seconds, 1 minute default max;
				};
		}

		if (parameters.wanderlust === undefined)
		{
			parameters.wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
		}
		if (parameters.money === undefined) // money is used to calculate how
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
		}
		// _resetRandomWander();
		{
			_wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
		}

		// _wanderlust = parameters.wanderlust; //above line does this already

		if (parameters.money === undefined)
		{
			parameters.money = 10000;
		}
		_money = parameters.money;
	}());

	var _resetRandomWander = function()
	{

		_wanderlust = (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
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

    var _startWander = function(){
        
    };
    this.startWander = _startWander();

	this.setWanderParams = _setWanderParams(parameters);
    

};
personAgent.prototype = new RealAgent();
personAgent.prototype.constructor = personAgent;

// parameters {name,id,geometry,material,birthday,direction,position,scale,mesh,
// buildingSize}
var BuildingAgent = function(parameters)
{

	'use strict';

	//
	// portals is a private variable to indicate where roads and other buildings
	// should connect to this building
	// : list of objects which contain
	// {location:THREE.Vector3 , direction:THREE.Vector3,size:THREE.Vector3 }
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
		parameters.geometry = new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.x, parameters.buildingSize.x);
	}

	var _generatePortals = function()
	{

		// TODO: figure out where the doors are
		// front of Building should always have a door
	};

	var _addResident = function(aPerson)
	{

	}

	RealAgent.call(this, parameters);

};
BuildingAgent.prototype = new RealAgent();
BuildingAgent.prototype.constructor = BuildingAgent;

// roads grow
// initially as a dirt path ( 1 lane )
// whose opacity slowly becomes 1 over a period of 5 seconds
// (represents construction time)
// then becomes other colors/textures as it increases in capacity and size
// roads grow from building to building, // in the future it wont be limited to
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
	if (parameters.roadSize === undefined)
	{
		// x = length
		// y = width of lanes
		// z = type // color ?
		// height is determined by log of width
		parameters.roadSize = new THREE.Vector3(50, 10, 0);
		// default 50 feet long, 10 width, type 0

	}
	if (parameters.laneCount === undefined)
	{
		parameters.roadSize = 1; // default 1 lane = 9 feet
	}
	// if position and direction don't exist they default to 0,0,0 and 0,0,1;

	RealAgent.call(this, parameters);

};

RoadAgent.prototype = new RealAgent();
RoadAgent.prototype.constructor = RoadAgent;
