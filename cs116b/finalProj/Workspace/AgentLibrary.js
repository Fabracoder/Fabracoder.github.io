/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
var AgentClock = new THREE.Clock(true);

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
	(function(parameters)
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
			// _position = new THREE.Vector3(0, 0, 0); not needed
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
			scene.remove(_mesh);
		}
		else
		{
			scene.add(_mesh);
		}

	};
	// var _getVisable = function(scene){
	// //TODO: not sure how to implement
	// };
	this.getPosition = _getPosition;
	this.getMesh = _getMesh;
	this.setMesh = _setMesh;
	this.getBirthdate = _getBirthdate;
	this.setBirthdate = _setBirthdate;
	this.setVisable = _setVisable;
};
RealAgent.prototype = new SimpleAgent();
RealAgent.prototype.constructor = RealAgent;

// (name, id, geometry, position, direction, birthdate, wanderlust,money,)
var personAgent = function(parameters)
{

	'use strict';
	(function()
	{ 
		if (parameters === undefined)
		{
            parameters =
			{
				 name : 'PersonAgent'
			}; 
		}
		if (parameters.wanderlust === undefined)
		{
            parameters.name = 'PersonAgent';
			parameters.wanderlust = Math.random();
		}
	}());
    
	RealAgent.call(this, parameters);
    
     
	var _wanderlust;

    
    
};
personAgent.prototype = new RealAgent();
personAgent.prototype.constructor = personAgent;

var buildingAgent = function(name, id, position)
{

	'use strict';
};
buildingAgent.prototype = new RealAgent();
buildingAgent.prototype.constructor = buildingAgent;
