/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
//Code by Oliver Kenneth Seet
// daggath@gmail.com
// 408-849-5645
var AGENT =
	{
		REVISION : '0.1'
	};
AGENT.Clock = new THREE.Clock(true);
AGENT.AgentPList =
	[]; // list of all parameters
AGENT.AgentRList =
	[]; // list of all reals

AGENT.Materials =
	[]; // list of materials

AGENT.degreeToRadian =function(value)
{
    return (value/360)*2*Math.PI;
}
// example usage
// parameters = AGENT.updateParams(parameters,{name:'John Doe'});
AGENT.updateParams = function (a, b)
{
    'use strict';
    var attrname;
	// copies contents of params into parameters
	if (a === undefined)
	{
		a =
			{};
	}
	if (b !== undefined)
    {
        for ( attrname in b)
		{
			a[attrname] = b[attrname];
		}
    }
	return a;
};

AGENT.updateActiveBuildings = function()
{
    'use strict';
	var i;
    if(AGENT.activeMeshes === undefined)
        {
            AGENT.activeMeshes = []; 
        }
    else
        {AGENT.activeMeshes.length = 0;}

	for (i = 0; i < AGENT.AgentPList.length; i=i+1)
	{
		if (AGENT.AgentPList[i].visable && AGENT.AgentPList[i].type ==='BuildingAgent')
		{
			AGENT.activeMeshes.push(AGENT.AgentPList[i].outerObject);
		}
	}

};

AGENT.updateActivePersons = function()
{
    'use strict';
	var i;
    if(AGENT.activePersons === undefined)
        {
            AGENT.activePersons = []; 
        }
    else
        {AGENT.activePersons.length = 0;}

	for (i = 0; i < AGENT.AgentPList.length; i=i+1)
	{
		if (AGENT.AgentPList[i].visable && AGENT.AgentPList[i].type ==='PersonAgent')
		{
			AGENT.activePersons.push(AGENT.AgentPList[i].outerObject);
		}
	}

};

AGENT.getRND_V3_101 = function()
{
 'use strict';
	return new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2);
};
AGENT.getRND_V3_010 = function()
{
 'use strict';
	return new THREE.Vector3(0, Math.random() * 2 * Math.PI, 0);
};
AGENT.setVisable = function(parameters)
{
 'use strict';
	parameters = parameters ||
		{};
    //parameters.visable.writable= true;
	if (parameters.visable === undefined)
	{
		parameters.visable = true;
	}
    
	try
	{  
		parameters.scene = parameters.scene || scene || window.scene || undefined;
	} catch (err)
	{ 
		return;
	}

	if (parameters.scene !== undefined)
	{
		if (parameters.scene.type === 'Scene')
		{
			if (parameters.outerObject !== undefined)
			{
                AGENT.updateActivePersons();
                AGENT.updateActiveBuildings();  
				if (parameters.visable)
				{
					if (scene.children.indexOf(parameters.outerObject) === -1)
					{
						scene.add(parameters.outerObject); 
						return 'Obj Added:' + parameters.uuid;
					}
				}
				else
				{
					scene.remove(parameters.outerObject);  
					return 'Obj Removed:' + parameters.uuid;
				}
			}
		}
	}
    
};
(function()
{

	'use strict';
	window.AGENT.Materials.push(new THREE.MeshBasicMaterial(
		{}));
	window.AGENT.Materials.push(new THREE.MeshBasicMaterial(
		{
			color : "yellow"
		}));
	window.AGENT.Materials.push(new THREE.MeshPhongMaterial(
		{
			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/greyc.jpg")
		}));

	window.AGENT.Materials.push(new THREE.MeshPhongMaterial(
		{
			// light
			specular : '#010101',
			// intermediate
			color : '#883311',
			// dark
			// emissive: '#505063',
			shininess : 50
		}));
	window.AGENT.Materials.push(new THREE.MeshPhongMaterial(
		{
			specular : 0x333333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.jpg"),
			specularMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_specular_2048.jpg"),
			normalMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea_normal_2048.jpg"),
			normalScale : new THREE.Vector2(0.85, 0.85)

		}));
	window.AGENT.Materials.push(new THREE.MeshPhongMaterial(
		{
			specular : 0xaa3333,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048.png"),
			specularMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048_BW.png"),
			normalMap : THREE.ImageUtils.loadTexture("Resources/final_textures/ea2048_N.png"),
			normalScale : new THREE.Vector2(0.85, 0.85)

		}));
    
    var t = THREE.ImageUtils.loadTexture( 'Resources/final_textures/road2.png' );
     t.wrapS = THREE.RepeatWrapping;
	window.AGENT.Materials.push(new THREE.MeshPhongMaterial(
		{
			specular : 0x331111,
			shininess : 15,
			map : THREE.ImageUtils.loadTexture(t) 

		}));    
    
    window.AGENT.Materials.push( new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0.13}));
    AGENT.updateActiveBuildings();

}());

// //////////////////////////////////////
// SimpleAgent
// ////////////
AGENT.SimpleAgent =
	{};

AGENT.SimpleAgent.update = function(parameters)
{
 'use strict';
	return parameters;
};

AGENT.SimpleAgent.initialize = function(parameters)
{
 'use strict';
	parameters = parameters ||
		{};
	parameters.uuid = parameters.uuid || Math.random();
	parameters.name = parameters.name || 'SimpleAgent : ' + parameters.uuid;
	parameters.type = parameters.type || 'SimpleAgent';
	parameters.PListID = parameters.PListID || null;
	parameters.agentUpdate = parameters.agentUpdate || AGENT.SimpleAgent.update;
	if (parameters.PListID === null)
	{
		parameters.PListID = AGENT.AgentPList.length;
		AGENT.AgentPList.push(parameters);
	}
	return parameters;
};

// /////////
// RealAgent
// /////////
AGENT.RealAgent =
	{};
AGENT.RealAgent.initialize = function(parameters)
{
 'use strict';
	parameters = AGENT.SimpleAgent.initialize(parameters);

	parameters.agentUpdate = parameters.agentUpdate || AGENT.RealAgent.update;
	parameters.RListID = parameters.RListID || null;

    AGENT.updateParams(parameters,{ name : 'RealAgent' + parameters.uuid, type : 'RealAgent' });
    
    parameters.rays = parameters.rays || AGENT.RealAgent.rays;
	parameters.geometry = parameters.geometry || new THREE.SphereGeometry(5, 32, 32);
	parameters.geometry.computeBoundingBox();
	// random color
	parameters.material = parameters.material || new THREE.MeshLambertMaterial(
		{
			color : new THREE.Color(Math.random() * 167772156)
		});

	parameters.innerMesh = parameters.innerMesh || new THREE.Mesh(parameters.geometry, parameters.material);
	parameters.innerMesh.owner = parameters;
	AGENT.RealAgent.resetInnerMeshOffset(parameters);

	parameters.outerObject = parameters.outerObject || new THREE.Object3D();
	parameters.outerObject.owner = parameters;
	if (parameters.outerObject.children.indexOf(parameters.innerMesh) === -1)
	{
		parameters.outerObject.add(parameters.innerMesh);
	}
    parameters.visable = parameters.visable || true;
	parameters.birthdate = parameters.birthdate || AGENT.Clock.getElapsedTime();
	parameters.direction = parameters.direction || AGENT.getRND_V3_101();
	parameters.move = parameters.move || parameters.position;
	AGENT.RealAgent.moveObject(parameters);
	// if (parameters.RListID === null)
	// {
	// AGENT.AgentRList.push(parameters);
	// }
	return parameters;
};

AGENT.RealAgent.resetInnerMeshOffset = function(parameters)
{
 'use strict';
	parameters.innerMesh.geometry.computeBoundingBox();
	var dist = new THREE.Vector3();
    
    //resets it to 0,0,0
    parameters.innerMesh.translateX(-parameters.innerMesh.position.x);
    parameters.innerMesh.translateY(-parameters.innerMesh.position.y);
    parameters.innerMesh.translateZ(-parameters.innerMesh.position.z);
    
 
    if(parameters.resetOrigin===undefined)
    {
        dist.subVectors((parameters.innerMesh.geometry.boundingBox.max), (parameters.innerMesh.geometry.boundingBox.min));
        parameters.innerMesh.translateY(dist.y / 2); // even to floor
        parameters.innerMesh.translateZ(-dist.z / 2);// brings orgin to front
    }
    
    return parameters;
};

AGENT.RealAgent.setObjPosition = function(parameters)
{
 'use strict';
	if (parameters === undefined)
	{
		return;
	}

};
AGENT.RealAgent.moveObject = function(parameters)
{
 'use strict';
	if (parameters.outerObject === undefined)
	{
		THREE.warn("OBJ_missing");
	}
	if (parameters.move !== undefined)
	{
		parameters.outerObject.translateX(parameters.move.x);
		parameters.outerObject.translateY(parameters.move.y);
		parameters.outerObject.translateZ(parameters.move.z);
	}
	if (parameters.moveX !== undefined)
	{
		parameters.outerObject.translateX(parameters.moveX);
		parameters.moveX = undefined;
	}
	if (parameters.moveY !== undefined)
	{
		parameters.outerObject.translateY(parameters.moveY);
		parameters.moveY = undefined;
	}
	if (parameters.moveZ !== undefined)
	{
		parameters.outerObject.translateZ(parameters.moveZ);
		parameters.moveZ = undefined;
	}
	if (parameters.spinX !== undefined)
	{
		parameters.outerObject.rotateX(parameters.spinX);
		parameters.spinX = undefined;
	}
	if (parameters.spinY !== undefined)
	{
		parameters.outerObject.rotateY(parameters.spinY);
		parameters.spinY = undefined;
	}
	if (parameters.spinZ !== undefined)
	{
		parameters.outerObject.rotateZ(parameters.spinZ);
		parameters.spinZ = undefined;
	}
	if (parameters.spin !== undefined)
	{
		if (parameters.spin.axis !== undefined && parameters.spin.rotation !== undefined)
		{
			parameters.outerObject.rotate(parameters.spin.axis, parameters.spin.rotation);
			parameters.spin = undefined;
		}
	}
	return parameters;
};

AGENT.RealAgent.update = function(parameters)
{
 'use strict';
	return parameters;
};

AGENT.RealAgent.rays =
	[
			new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 0, -1), new THREE.Vector3(0, 0, -1),
			new THREE.Vector3(-1, 0, -1), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 0, 1)
	];
AGENT.RealAgent.rayCaster = new THREE.Raycaster();
AGENT.RealAgent.rayCaster.far = 8;
 
AGENT.RealAgent.collisionRaw = function(parameters,yOffset)
{	'use strict';
//    parameters.rays;
//    parameters.raydistances;
 
	var i, collisions;
    if (parameters === undefined)
	{
		return;
	}
	if (parameters.outerObject === undefined)
	{
		return;
	}
	if (parameters.rays === undefined)
	{
		return;
	}
    if(parameters.rayDistances ===undefined)
        {
            return;
        }
     if(parameters.rays.length!==parameters.rayDistances.length)
         {
             THREE.warn("RayArray and RayDistanceArray do not match length");
             return;
         }
    yOffset = yOffset || 0;
    // Maximum distance from the origin before we consider collision 
    //    AGENT.RealAgent.rayCaster.far = parameters.collisionDistance  || 32;
	// Get the obstacles array from our world
	// scene.children

	// For each ray
	parameters.collisionList = []; 
	// We reset the raycaster to this direction at a height of 1
    
    for(i=0;i<parameters.rays.length;i=i+1)
    {
        AGENT.RealAgent.rayCaster.far = parameters.rayDistances[i] || 32;
        AGENT.RealAgent.rayCaster.set(((new THREE.Vector3(0, yOffset, 0)).add(parameters.outerObject.position)), parameters.rays[i]);

	// Test if we intersect with any obstacle mesh 
    // AGENT.activeMeshes should contain all the buildings and be updated every frame
	collisions = AGENT.RealAgent.rayCaster.intersectObjects(AGENT.activeMeshes, true);
	parameters.collisionList.push(collisions);// double array.
 }
	// example : parameters.collisionList[0].length
	// example : parameters.collisionList[0][0].distance

	return collisions;
};
 
// ///////////
// PersonAgent
// ///////////
 
AGENT.PersonAgent = function(parameters)
{
'use strict';
	AGENT.PersonAgent.initialize();
};
AGENT.PersonAgent.initialize = function(parameters)
{
'use strict';
	parameters = parameters ||
		{ 
			geometry : new THREE.SphereGeometry(3, 32, 32),
			type : 'PersonAgent'
		};

	parameters = AGENT.RealAgent.initialize(parameters);
    
	parameters = AGENT.updateParams(parameters,
		{
            type : 'PersonAgent',
			name : 'PersonAgent:' + parameters.uuid
		});
	parameters.agentUpdate = AGENT.PersonAgent.update;

	parameters.isWandering = parameters.isWandering || true;
	// parameters for generating new wanderLust values
	parameters.minWander = parameters.minWander || 100;
	parameters.maxWander = parameters.maxWander || 60 * 10;
	// maximum time wandering
	parameters.wanderLust = parameters.wanderLust || (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
	// amount of time wandering so far
	parameters.wanderTime = parameters.wanderTime || 0;
	// Time person last rested
	parameters.rest = parameters.rest || AGENT.Clock.getElapsedTime();
	// Direction person wants to move
	parameters.direction = parameters.direction || AGENT.getRND_V3_101();
	parameters.direction.normalize();
	// length of time to ignore collisions
	parameters.spawnCountdown = parameters.spawnCountdown || 5;

	// Direction person will move ( change of direction )
	parameters.directionTime = parameters.directionTime ||
		{
			count : Math.random() * 20,
			newDirection : AGENT.getRND_V3_101(),
			delta : 0.4
		};
	parameters.speed = parameters.speed || 1;
	parameters.insideBuilding = parameters.insideBuilding || null;
	// Size of building wanted to be built (50,10,50) is minimum
	parameters.size = parameters.size ||
		{
			x : 50,
			y : 10,
			z : 50
		};
	this.resetDirection = function(Vector3)
	{

		parameters.direction = Vector3 || AGENT.getRND_V3_101();
		return parameters;
	};
    parameters.innerMesh.geometry.computeBoundingSphere();
    parameters.boundingSphere = parameters.innerMesh.geometry.boundingSphere;
	return parameters;

};
AGENT.PersonAgent.update = function(parameters)
{
'use strict';
	var temp;
    var _enterBuilding  = function(parameters,aBuilding)
    {
        parameters.insideBuilding = aBuilding;
        aBuilding.residents.push(parameters);
        parameters.isWandering = false; 
        parameters.wanderTime = 0;
        parameters.rest = AGENT.Clock.getElapsedTime();
        parameters.visable = false;
        AGENT.setVisable(parameters);
        if(debugModeOn)console.log("Building Entered:"+aBuilding.name);
    };
	if (parameters === undefined)
	{
		return;
	}
	if (parameters.isWandering)
	{
		if (parameters.move === undefined)
		{
			parameters.move = parameters.direction;
		}

		// Check if you can move in that direction
		// If it is a building, and you collide, enter building
		// If it is a street, and you collide, change direction vector
		// to match the street direction
 
            parameters.rays = [parameters.direction];
            parameters.rayDistances = [parameters.boundingSphere.radius+6];
            AGENT.RealAgent.collisionRaw(parameters);

        while (parameters.collisionList[0].length > 0)
        { 
            // Person enters building
            if (parameters.collisionList[0][0].object.owner.type === 'BuildingAgent' && Math.random()<1) 
            {
                // enter building
                _enterBuilding(parameters,parameters.collisionList[0][0].object.owner);
                parameters.collisionList[0].length=0;//exit loop
            }//TODO: add function for interaction with road or xroad
            else
            {    
                //get new direction
                parameters.direction = AGENT.getRND_V3_101();
                //test new direction
                parameters.rays = [parameters.direction];
                parameters.rayDistances = [parameters.boundingSphere.radius+5];
                AGENT.RealAgent.collisionRaw(parameters);
            }
        } 
        
        if(parameters.isWandering) // in case entered building
        {
            parameters.move = parameters.direction;
		    AGENT.RealAgent.moveObject(parameters);

            if (parameters.wanderLust - parameters.wanderTime < 0)
            {
                parameters.isWandering = false;
            }

              parameters.wanderTime=parameters.wanderTime+1;

            parameters.directionTime.count=parameters.directionTime.count-1;

            if (parameters.directionTime.count < 0)
            {
                parameters.directionTime.newDirection = AGENT.getRND_V3_101();
                parameters.directionTime.count = 100 * Math.random();
                parameters.directionTime.delta = Math.random() * 0.6; 
            }
            else
            {
                parameters.direction = parameters.direction.add(parameters.directionTime.newDirection.multiplyScalar(parameters.directionTime.delta));
                parameters.direction = parameters.direction.normalize();
                parameters.directionTime.count -= 1;
            }
         }
	}
	else
	{
        if(parameters.insideBuilding ===undefined)
            {parameters.insideBuilding = null;}
		if (parameters.insideBuilding === null)
		{
                parameters.wanderTime = 0;
                parameters.insideBuilding = AGENT.BuildingAgent.tryMakeBuilding(parameters);
                if(! parameters.insideBuilding )
                    {
                        parameters.isWandering = true;
                    }
                else
                    {
                        if(debugModeOn)console.log("BUILDING CREATED "+parameters.insideBuilding.outerObject.position);
                    }
		} 
		// generate random size
		// check if I can build here
		// if yes , build
		// else
		// generate random size
		// check if I can build here
		// 
	}


	return parameters;
};

// /////////////
// BuildingAgent
// /////////////

AGENT.BuildingAgent = function(parameters)
{
'use strict';
	return AGENT.BuildingAgent.initialize();
};

AGENT.BuildingAgent.initialize = function(parameters)
{
'use strict';
	parameters = parameters ||
		{
			type : "BuildingAgent",
			material : AGENT.Materials[2]
		};
	parameters.buildingSize = parameters.buildingSize || new THREE.Vector3(50, 10, 50); // minimum size
	parameters.geometry = parameters.geometry || new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.y, parameters.buildingSize.z);
	parameters.portals =
		[];
	parameters.residents =
		[];
	parameters.maxResidents = parameters.maxResidents || 2;
	parameters.agentUpdate = AGENT.BuildingAgent.update;
	// parameters = AGENT.updateParams(parameters,
	// {
	// type : 'BuildingAgent',
	// material : AGENT.Materials[4]//new THREE.MeshBasicMaterial({color :
	// 0x2f1a70})
	// });
	parameters.move = parameters.move || parameters.position;
	
    AGENT.RealAgent.initialize(parameters);
	parameters = AGENT.updateParams(parameters,
		{
			name : 'BuildingAgent:' + parameters.uuid,
            type : 'BuildingAgent'  
		}); 
    
    // make front door Xroad
    
    var temp =Math.random();
    if(temp>0.75)
        {
                temp= AGENT.XRoadAgent.initialize({position:new THREE.Vector3(0,0,20).add(parameters.outerObject.position)});
                AGENT.setVisable(temp);
        }
    else if(temp>0.50)
        {
                temp= AGENT.XRoadAgent.initialize({position:new THREE.Vector3(0,0, - (parameters.buildingSize.z +20) ).add(parameters.outerObject.position)});
                AGENT.setVisable(temp);
        }
    else if(temp>0.25)
        {
                temp= AGENT.XRoadAgent.initialize(
                    {position:new THREE.Vector3(parameters.buildingSize.x/2 +20,0,-parameters.buildingSize.z/2).add(parameters.outerObject.position)});
                AGENT.setVisable(temp);
        }
    else  
        {
                temp= AGENT.XRoadAgent.initialize(
                    {position:new THREE.Vector3(-parameters.buildingSize.x/2 -20,0,-parameters.buildingSize.z/2).add(parameters.outerObject.position)});
                AGENT.setVisable(temp);
        }
    
    
    
    
	return parameters;
};

AGENT.BuildingAgent.testSide = function(parameters,direction,extraDistance,buildingDistance) 
{// used for Xroad placement testing and for building growth
    
    var i=0,result;
    parameters.rays = [];
    parameters.rayDistances = [];
    for(i=0;i<buildingDistance/10;i=i+1)
        {
            parameters.rays.push(new THREE.Vector3(0,0,-i*5).add(direction));
            parameters.rays.push(new THREE.Vector3(0,0,i*5).add(direction));
            parameters.rayDistances.push(extraDistance);
            parameters.rayDistances.push(extraDistance);
        }
    

    AGENT.RealAgent.collisionRaw(parameters,2);
    result = true;
    for(i=0;i<parameters.collisionList.length;i=i+1)
    {
        if(parameters.collisionList[i].length !== 0    )
        { result = false;}
    }
   
    return result;
};


AGENT.BuildingAgent.update = function(parameters)
{
    'use strict';
	var temp = Math.random(), leng, pers,babies;
	if (parameters.residents.length > parameters.maxResidents)
	{
        if(debugModeOn)console.log("BuildingGrowing:"+parameters.name);
		if (temp > 0.5)
		{
            // add a floor
			parameters.buildingSize.add(new THREE.Vector3(0, 10, 0));
		}
		else
		{
			if (temp < 0.05)
			{
                if(AGENT.BuildingAgent.testSide(parameters,AGENT.RealAgent.rays[2],parameters.buildingSize.x+11,parameters.buildingSize.x))
                    {parameters.buildingSize.add(new THREE.Vector3(10, 0, 0));}
			}// grow
			else
			{
                if(AGENT.BuildingAgent.testSide(parameters,AGENT.RealAgent.rays[0],parameters.buildingSize.z+11,parameters.buildingSize.z))
				    {parameters.buildingSize.add(new THREE.Vector3(0, 0, 10));}
			}// grow
		}
		parameters.innerMesh.geometry = new THREE.BoxGeometry(parameters.buildingSize.x, parameters.buildingSize.y, parameters.buildingSize.z, 5, 5, 5); 
        AGENT.RealAgent.resetInnerMeshOffset(parameters);
        
		leng = parameters.residents.length * temp; // random number of people
													// will leave
		for (temp = 0; temp < leng; temp=temp+1)
		{
			pers = parameters.residents.shift();
			pers.visable = true;
			AGENT.setVisable(pers);
			pers.isWandering = true;
			pers.insideBuilding = null;
			pers.spawnCountdown = 5;
			// set location of pers to a connected XRoad if it exists
		}
		parameters.maxResidents = parameters.maxResidents * 2;
	}
    
    babies = (Math.floor(parameters.residents.length/2));
    if(babies===0)
                {
                    babies = 0.85;
                }
    parameters.birthrateCounter = parameters.birthrateCounter ||200/babies;
    
    if(parameters.birthrateCounter < 0)
        {
            parameters.birthrateCounter  = 100/babies;

                // change this to limit the number of active people
    if(AGENT.activePersons.length<100)//limiter for population
        {
            temp = AGENT.PersonAgent.initialize(
                {
                    position:new THREE.Vector3().add(parameters.outerObject.position),
                    maxWander: Math.random()*2000*babies, 
                    minWander: 800*babies
                }); 
            AGENT.setVisable(temp);  
            if(debugModeOn)console.log("babyBorn: "+ babies+": :"+parameters.name);
        }
            else
                {
                    if(debugModeOn)console.log("NotBorn: "+ babies+": :"+parameters.name);
                }
    
        }
        
        parameters.birthrateCounter = parameters.birthrateCounter - 1; 
    
  

};

AGENT.BuildingAgent.tryMakeBuilding = function (parameters)
{'use strict';
    var temp,i,k,diagValue,flag ;
    AGENT.updateActiveBuildings();
        if(parameters)
        {
            parameters.rays = AGENT.RealAgent.rays;

        // (parameters.collisionList[0][0].object.owner.type=="BuildingAgent" )

        // check space,
        // if not buildable, reduce size until you reach minimum size
        // if at minimum and does not fit, then reduce 30 from wanderTime         
            for(i=0;i<100;i=i+1)
            {

                if(parameters.buildingSize===undefined)
                {
                    parameters.buildingSize = 
                     new THREE.Vector3(50+(Math.floor(Math.random()*10))*10,((Math.floor(Math.random()*4))*10)+10 + Math.random()/10,(50+(Math.floor(Math.random()*10))*10));
                }
                else // reduce size
                {
                    if(parameters.buildingSize.x>=60 || parameters.buildingSize.z>=60)
                    {
                        if(Math.random>0.5)
                        {
                            if(parameters.buildingSize.x>=60)
                                {parameters.buildingSize.setX(parameters.buildingSize.x-10);}
                        }
                        else
                        {
                            if(parameters.buildingSize.z>=60)
                                {parameters.buildingSize.setZ(parameters.buildingSize.z-10);}
                        }
                    }
                    else
                        { // can't fit in space, now what?
                            flag = true;
                        } 
                }

                temp = null;
                
                parameters.rays = AGENT.RealAgent.rays;
                diagValue = Math.sqrt((parameters.buildingSize.x/2)*(parameters.buildingSize.x/2)+(parameters.buildingSize.z/2)*(parameters.buildingSize.z/2));
 //(0, 0, 1), (1, 0, 1),  (1, 0, 0), (1, 0, -1), (0, 0, -1),(-1, 0, -1), (-1, 0, 0), (-1, 0, 1)                
                parameters.rayDistances = [parameters.buildingSize.z/2,diagValue,parameters.buildingSize.x/2,diagValue,parameters.buildingSize.z/2,diagValue,parameters.buildingSize.x/2,diagValue]; 
                 AGENT.RealAgent.collisionRaw(parameters, 0.5); 
                 if(parameters.collisionList!==undefined)
                {for(k=0;k<parameters.collisionList.length;k=k+1)
                    {
                        if(parameters.collisionList[k].length>0)
                            {
                                temp = undefined;   // if building doesn't fit then dont build
                                 // set temp   if there is no collision.
                            }
                    }}
                
                if(debugModeOn)console.log(parameters.collisionList);
                if(debugModeOn)console.log(temp);
                if(debugModeOn)console.log("++++++++++++++");
                  
            // console.log(parameters.buildingSize.x + ":"+parameters.buildingSize.y  + ":"+parameters.buildingSize.z + ":");
                
                if(temp!==undefined)
                {
                    temp = AGENT.BuildingAgent.initialize(
                        {
                        move : new THREE.Vector3 (parameters.outerObject.position.x,parameters.outerObject.position.y,parameters.outerObject.position.z),
                        material : AGENT.Materials[2],
                        buildingSize : new THREE.Vector3(parameters.buildingSize.x,parameters.buildingSize.y,parameters.buildingSize.z)
                        });
                    temp.residents.push(parameters);
                    parameters.insideBuilding = temp;
                    AGENT.setVisable(temp);
                    parameters.visable = false;
                    AGENT.setVisable(parameters);
                    return temp;
                } 
                else
                {
                    if(flag)
                        {
                            return temp;
                        }
                }
            }
        }
    return temp;
};
AGENT.XRoadAgent = function(parameters)
{
'use strict';
};

AGENT.XRoadAgent.initialize = function(parameters)
{
    'use strict';
//   new CylinderGeometry(20, 20, height, 2);
    
    
    parameters = parameters ||
		{
			type : "XRoadAgent"   
		};
	parameters.buildingSize = parameters.buildingSize || new THREE.Vector3(10, 2, 50); // minimum size
	parameters.geometry = parameters.geometry || new THREE.CylinderGeometry(20, 20, 2,16);
    parameters.material = parameters.material || AGENT.Materials[7];
	parameters.portals = [];  
	parameters.agentUpdate = AGENT.XRoadAgent.update;
    parameters.resetOrigin = true; 
	// parameters = AGENT.updateParams(parameters,
	// {
	// type : 'BuildingAgent',
	// material : AGENT.Materials[4]//new THREE.MeshBasicMaterial({color :
	// 0x2f1a70})
	// });
	parameters.move = parameters.move || parameters.position;
	
    AGENT.RealAgent.initialize(parameters);
	parameters = AGENT.updateParams(parameters,
		{
			name : 'XRoadAgent:' + parameters.uuid,
            type : 'XRoadAgent'  
		}); 
	return parameters;   
      
};

AGENT.XRoadAgent.update = function (parameters)
{ 
    // if has another Xroad in direct gridSight it creates a road in that direction
    // otherwise it is random out of up/down/left/right
    // as road grows it checks to see if it has another Xroad in sight.perpendicular to the road
    //  if so, create a road in that direction

    var list =[]; 
    if(parameters.portals.length >0)
    {
        
    }
    else
    {
            parameters.rays = [AGENT.RealAgent.rays[0],AGENT.RealAgent.rays[2],AGENT.RealAgent.rays[4],AGENT.RealAgent.rays[6]]; 
            parameters.rayDistances = [1000,1000,1000,1000];
            AGENT.RealAgent.collisionRaw(parameters,0);

        // (0, 0, 1),  (1, 0, 0),   (0, 0, -1), (-1, 0, 0) 
        if(parameters.collisionList[0].length>0)    
        {
            list.push('west'); 
        }
        if(parameters.collisionList[1].length>0)    
        {
            list.push('north'); 
        }
        if(parameters.collisionList[2].length>0)    
        {
            list.push('east'); 
        }
        if(parameters.collisionList[3].length>0)    
        {
            list.push ('south'); 
        }
            
        list = list[Math.floor((Math.random()*100)%list.length)];
        switch(list)
            {
                case 'west':
                    list =   AGENT.degreeToRadian(180);
                    break;
                    
                case 'north':

                    list =  AGENT.degreeToRadian(90);
                    
                    break;
                    
                case 'east':
                    list =  AGENT.degreeToRadian(0);
                    break;
                      
                case 'south':
                    list =  AGENT.degreeToRadian(-90);
                    break;

                default:
                  // no link found
                    list = AGENT.degreeToRadian(Math.floor((list%5)*90));
                    break;
                                        
            }
        list = AGENT.RoadAgent.initialize({position : parameters.outerObject.position,spinY :list});
        AGENT.setVisable(list);
        parameters.portals.push(list);
    }

};

AGENT.RoadAgent = function(parameters)
{
'use strict';
};

AGENT.RoadAgent.initialize = function(parameters)
{ 
	parameters = parameters ||
		{
			type : "RoadAgent" 
		};
	parameters.buildingSize = parameters.buildingSize || new THREE.Vector3(10, 0.1, 1); // minimum size
    parameters.spawnCountdown = parameters.spawnCountdown || 50; // to ignore the origin buildings
    parameters.maxSegLength = parameters.maxSegLength || 10000;
	parameters.portals =
		[];
	parameters.residents =
		[];
    parameters.material = parameters.material || AGENT.Materials[6]; 
	parameters.agentUpdate = AGENT.RoadAgent.update;
    parameters.laneCount =  parameters.laneCount || 1;
    parameters.laneWidth = parameters.laneWidth ||10;
    parameters.direction = parameters.direction || AGENT.getRND_V3_010();
    
	parameters.roadWidth = parameters.laneCount *  parameters.laneWidth;
	parameters.roadHeight = Math.log( parameters.laneCount *  parameters.laneWidth);
	parameters.roadLength = 500;
    parameters.buildingSize.z = 1;
	parameters.geometry = parameters.geometry || new THREE.BoxGeometry(parameters.roadWidth, parameters.roadHeight / 10, parameters.roadLength);
    parameters.roadGrowRate = parameters.roadGrowRate || 1; 
	parameters.move = parameters.move || parameters.position;
	
    AGENT.RealAgent.initialize(parameters);
	parameters = AGENT.updateParams(parameters,
		{
			name : 'RoadAgent:' + parameters.uuid,
            type : 'RoadAgent'  
		}); 
    
    if(debugModeOn)console.log("RoadMade:"+parameters.name);
    
	return parameters; 
};
AGENT.RoadAgent.update = function(parameters)
{
    if(parameters.gogoRoad===undefined)
        {parameters.gogoRoad = true;}
    
    if(parameters.roadGrowRate !==undefined && parameters.spawnCountdown<1)
        { 
            //check end for any buildings
            
            if(parameters.spawnCountdown>0)
            {     
                parameters.rays = [parameters.direction];
                parameters.rayDistances = [6]; 
                temp = {outerObject:{position:new THREE.Vector3(parameters.innerMesh.position.x*2,0,parameters.innerMesh.position.z*2).add(parameters.outerObject.position)},rays:parameters.rays,rayDistances:parameters.rayDistances}
                AGENT.RealAgent.collisionRaw(temp);
                if(temp.collisionList[0].length>0)
                    {
                        parameters.gogoRoad = false;
                    }
            }

            if(parameters.maxSegLength<0)
                {
                    parameters.gogoRoad = false;
                }
            else
                {
                    parameters.maxSegLength=parameters.maxSegLength-1;
                }
            
//            scene.updateMatrixWorld();
//            parameters.innerMesh.geometry.computeBoundingBox();
//            var vector = new THREE.Vector3();
//            vector.setFromMatrixPosition( parameters.innerMesh.matrixWorld );
////            var aa = new THREE.Vector3(vector.x,0,0 ).add(vector) ;
//            var eraseMe,bb = new THREE.SphereGeometry(3,32,32);
//            
//            if(Math.random()<0.2)
//            {eraseMe = new THREE.Mesh(bb,AGENT.Materials[0]);
//            eraseMe.translateX(vector.x    );
//            eraseMe.translateY(vector.y);
//            eraseMe.translateZ(vector.z );
//            scene.add(eraseMe);}
 
        
        };
        if(parameters.spawnCountdown>0)
            {
                parameters.spawnCountdown=parameters.spawnCountdown-1;             
            }
        if(parameters.gogoRoad)
            {             
                parameters.buildingSize.add(new THREE.Vector3(0, 0, parameters.roadGrowRate)); 
                parameters.innerMesh.geometry = new THREE.BoxGeometry(parameters.roadWidth, parameters.roadHeight / 10,parameters.buildingSize.z); 
                AGENT.RealAgent.resetInnerMeshOffset(parameters);   
            }
}

