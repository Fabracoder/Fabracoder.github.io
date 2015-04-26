function Agent(position, geometry)
{
	this.name = "Agent"; // class name
	this.id; // id number is the number in the index
	this.geometry = setIfUndefined( geometry, new THREE.SphereGeometry(40, 32, 32));
	this.position = setIfUndefined( position, new THREE.Vector3(0, 0, 0));

	this.calculateMesh = function(aObject)
	{
		aObject.mesh = new THREE.Mesh(aObject.geometry);
		return aObject.mesh;
	};

	this.mesh = this.calculateMesh(this);

	// scene.add(this.mesh);
};

function setIfUndefined(thing, val)
{
	if (thing == undefined)
	{
		return val;
	} else
	{
		return thing;
	}
};

//  
function PersonAgent(position)
{ 
    Agent.call(position); // inherits Agent
	this.name = "PersonAgent";
	this.birthday = clock.getElapsedTime();
	this.lastClockCall = clock.getElapsedTime();
	this.restless = Math.random() * 60 * 1; // time it wants to wander :
    this.visable = true;
	// entering a building resets count down
	this.rest = clock.getElapsedTime(); // time last rested

	// the direction the Agent is facing()
	this.direction = new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2).normalize();
	this.size;
	this.onStreet = false; // 
	/*
	 * PersonAgent wanders a random direction which can change by delta for a
	 * given time
	 * 
	 * if PersonAgent encounters a building it will attempt to occupy
	 * 
	 * if building is full then it will leave through a door with a street
	 * 
	 * if no street then 1/2 of the occupants will leave to go build a new home
	 * as a GroupAgent
	 * 
	 * If PersonAgent encounters a street, it will follow the street (set
	 * direction to the way the street is +/-) PersonAgent can wander off street
	 * 
	 * If PersonAgent's restless time is less than 20%, it will go into builder
	 * mode
	 * 
	 * BuilderMode every second, it will have a 20% chance to want to build a
	 * home
	 * 
	 * The size is determined by the amount of restless time left
	 */

	// decides when to build a house
	this.SettleDown = function()
	{
        if(this.restless-(this.lastClockCall-this.birthday)<this.restless*0.2)
        {
            return new THREE.Vector3(1000,100000,1000);
        }
        else{
//            console.log(this.restless-(this.lastClockCall-this.birthday));
        }
		// check if adequate nearby area can be claimed
		// if found then it saves the x,y,z in size as a THREE.Vector3
		// to be used
		return null;
	};
	this.countdownchange = 0;

	// movement
	this.updateMove = function()
	{
        var delta = (clock.getElapsedTime() - this.lastClockCall);
        this.lastClockCall = clock.getElapsedTime();
        
        if(this.visable==false)
        {return }
 
		this.mesh.translateX(this.direction.x * delta * 10 * SimulationSpeed);
		this.mesh.translateZ(this.direction.z * delta * 10 * SimulationSpeed);
		// this.mesh.translateX((Math.random() - 0.5) *2 * delta*30);
		// this.mesh.translateZ((Math.random() - 0.5) *2 * delta*30);

		this.size = this.SettleDown();
		if (this.size == null)
		{
			if (this.countdownchange < 1)
			{
				this.countdownchange = Math.random() * 1000;
				this.directionChange = new THREE.Vector3((Math.random() - 0.5) * 3 * delta, 0, (Math.random() - 0.5) * 3 * delta);

			} else
			{
				this.direction = this.direction.add(this.directionChange);
				this.direction = this.direction.normalize();
				this.countdownchange--;
			}

		} else
		// create building
		{
			// check if nearby road, and build adjacent is so
//            console.log(this);
            console.log(this.mesh.position);
//            console.log(this.size);
            var aBuilding = new BuildingAgent(this.mesh.position, this.size);
            
            agentList.push(aBuilding);
       //     scene.add(aBuilding.mesh);
            this.setVisable(false);
		}

		// console.log(directionChange.x +":" +directionChange.z + " :->: " +
		// this.direction.x + " : " + this.direction.z);

	};
    
    this.setVisable = function(bool){
      if(bool)
      { 
          scene.add(this.mesh);
          this.visable = true;
      }
        else
        {
            scene.remove(this.mesh);
            this.visable = false;
            
        }
    };

};
PersonAgent.prototype = new Agent();
PersonAgent.prototype.constructor = PersonAgent;

// 
// // inherits from parent1
// function child1(size)
// {
// parent1.call(this, size, size);
// // optional : add new properties or override existing ones here
// }
//
// child1.prototype = new parent1();
// child1.prototype.constructor = child1;

function RegionAgent()
{
//    Agent.call();
	this.name = "RegionAgent";
};
RegionAgent.prototype = new Agent();
RegionAgent.prototype.constructor = RegionAgent;

// manages a building, its shape(height), its population, its style, its values?
function BuildingAgent(pos, size)
{
	Agent.call(pos, new THREE.BoxGeometry(size.x, size.y, size.z));
console.log(pos);
console.log(size);
console.log("------");
console.log(this.mesh.position);
console.log(this.geometry);
console.log( this.mesh.material);   
    
    
	this.population = 1;
	this.name = "BuildingAgent";

	this.mesh = this.calculateMesh(this, new THREE.MeshBasicMaterial(
		{
			color : 0xa0ff00
		}));

    this.mesh.position = this.position;
    
	this.getPopulation = function()
	{
		return this.population;
	};
	this.addPopulation = function(value)
	{
		this.population += value;
	};
	this.subPopulation = function(value)
	{
		this.population -= value;
	};
	this.setPopulation = function(value)
	{
		this.population = value;
	};
    
 
    
    scene.add(this.mesh);

};
BuildingAgent.prototype = new Agent();
BuildingAgent.prototype.constructor = BuildingAgent;
