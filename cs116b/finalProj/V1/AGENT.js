var AGENT = {
        REVISION: '0.1'
    };


AGENT.Clock = new THREE.Clock(true);

AGENT.AgentPList = []; // list of all parameters

AGENT.Materials = []; // list of materials

// example usage 
// parameters = AGENT.updateParams(parameters,{name:'John Doe'});
AGENT.updateParams = function (a,b)
{ 
    // copies contents of params into parameters
    if(a=== undefined)
        {a= {};}
    if( b!==undefined )
    for (var attrname in b)
        { a[attrname] = b[attrname]; } 
    return a;
}
   AGENT.getRND_V3_101 = function (){
        return new THREE.Vector3((Math.random()-0.5)*2,0,(Math.random()-0.5)*2);
    };
    AGENT.getRND_V3_010 = function (){
        return new THREE.Vector3( 0,Math.random()*2*Math.PI,0);
    };

(function()
{ 
    'use strict';
    window.AGENT.Materials.push(new THREE.MeshBasicMaterial( { }));
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

}());



//////////////
AGENT.SimpleAgent = {};

 AGENT.SimpleAgent.update = function(parameters)
 {
     return parameters;
 };

 AGENT.SimpleAgent.initialize =  function(parameters)
    {
            parameters = parameters || {};
            parameters.uuid =parameters.uuid || Math.random();
            parameters.name = parameters.name || 'SimpleAgent : '+parameters.uuid;
            parameters.type = parameters.type || 'SimpleAgent';
            parameters.PListID = parameters.PListID || null;
            parameters.agentUpdate = parameters.agentUpdate ||  AGENT.SimpleAgent.update;
            if(parameters.PListID===null)
                {
                    parameters.PListID = AGENT.AgentPList.length; 
                    AGENT.AgentPList.push(parameters); 
                }
            return parameters;
    };


AGENT.RealAgent  =  {};
   AGENT.RealAgent.initialize =  function(parameters)
    {
        parameters = AGENT.SimpleAgent.initialize(parameters);
       
        parameters.agentUpdate =  AGENT.RealAgent.update; 
       
        parameters = parameters || {name:'RealAgent'+parameters.uuid,type:'RealAgent'};
    
        parameters.geometry = parameters.geometry || new THREE.SphereGeometry( 10, 32, 32 ); 
        parameters.geometry.computeBoundingBox();
        parameters.material = parameters.material || new THREE.MeshBasicMaterial( {color: 0xafff00} );
        
        parameters.innerMesh = parameters.innerMesh || new THREE.Mesh( parameters.geometry, parameters.material );
  
        AGENT.RealAgent.resetInnerMeshOffset(parameters);
    
        parameters.outerObject = parameters.outerObject || new THREE.Object3D();   
        if(parameters.outerObject.children.indexOf(parameters.innerMesh)==-1)
            {
                parameters.outerObject.add(parameters.innerMesh);
            }

        parameters.birthdate =parameters.birthdate || AGENT.Clock.getElapsedTime(); 
        parameters.direction = parameters.direction || AGENT.getRND_V3_101(); // I think I used the wrong RND xyz , should it be 010?
 
        return parameters;
    };

   AGENT.RealAgent.resetInnerMeshOffset = function (parameters){
        parameters.innerMesh.geometry.computeBoundingBox();
        var dist= new THREE.Vector3() ;
        dist.subVectors((parameters.innerMesh.geometry.boundingBox.max),(parameters.innerMesh.geometry.boundingBox.min));
        parameters.innerMesh.translateY(dist.y/2); // even to floor
        parameters.innerMesh.translateZ(-dist.z/2);// brings orgin to front 
        return parameters;
    };

   AGENT.RealAgent.moveObject = function (parameters) {
        if(parameters.outerObject ===undefined)
            { 
                THREE.warn("OBJ_missing");
            } 
        if(parameters.move !== undefined)
            { 
                        parameters.outerObject.translateX(parameters.move.x);
                        parameters.outerObject.translateY(parameters.move.y);
                        parameters.outerObject.translateZ(parameters.move.z);   
            }
        if(parameters.moveX !==undefined)
        {
            parameters.outerObject.translateX(parameters.moveX);
            parameters.moveX = undefined;
        }
        if(parameters.moveY !==undefined)
        {
            parameters.outerObject.translateY(parameters.moveY);
            parameters.moveY = undefined;
        }
        if(parameters.moveZ !==undefined)
        {
            parameters.outerObject.translateZ(parameters.moveZ);
            parameters.moveZ = undefined;
        }        
        if(parameters.spinX !==undefined)
        {
            parameters.outerObject.rotateX(parameters.spinX);
            parameters.spinX = undefined;
        }                
        if(parameters.spinY !==undefined)
        {
            parameters.outerObject.rotateY(parameters.spinY);
            parameters.spinY = undefined;
        }                
        if(parameters.spinZ !==undefined)
        {
            parameters.outerObject.rotateZ(parameters.spinZ);
            parameters.spinZ = undefined;
        }                
        if(parameters.spin !==undefined)
        {
            if(spin.axis!==undefined && spin.rotation!==undefined)
                { 
                    parameters.outerObject.rotate(spin.axis,spin.rotation);
                    parameters.spin = undefined;
                }
        }
        return parameters;
    };

   AGENT.RealAgent.update = function (parameters){return parameters};

    AGENT.setVisable = function (parameters)
    {
        parameters = parameters ||{};   
        if(parameters.visable===undefined)
            {
                parameters.visable = true;
            }
 
        try {
        	parameters.scene = parameters.scene || scene || window.scene || undefined ;
        	}
        catch(err){return;}
        
        if(parameters.scene !== undefined)
        {   
            if(parameters.scene.type == 'Scene')            
                {
                    if(parameters.visable )
                        {
                            if(scene.children.indexOf(parameters.outerObject)==-1)
                                {
                                    scene.add(parameters.outerObject);
                                    return 'Obj Added:'+parameters.uuid;
                                } 
                        }
                    else
                    {
                        scene.remove(parameters.outerObject);
                        return 'Obj Removed:'+parameters.uuid;
                    }
                }
        }
    };
    
AGENT.PersonAgent  = function(parameters) { AGENT.PersonAgent.initialize();};
AGENT.PersonAgent.initialize = function(parameters )
{
        parameters = AGENT.RealAgent.initialize(parameters);
    
        parameters =parameters || {name:'PersonAgent'+parameters.uuid ,type:'PersonAgent'};
        parameters.agentUpdate =  AGENT.PersonAgent.update;
 
    
		parameters.isWandering = parameters.isWandering || true;
        //parameters for generating new wanderLust values 
		parameters.minWander = parameters.minWander || 100;
		parameters.maxWander = parameters.maxWander || 60 * 10;
        // maximum time wandering 
		parameters.wanderLust = parameters.wanderLust || (Math.random() * (parameters.maxWander - parameters.minWander)) + parameters.minWander;
        // amount of time wandering so far
		parameters.restless = parameters.restless || 0;
        // Time person last rested
		parameters.rest = parameters.rest || AgentLib.AgentClock.getElapsedTime();
        // Direction person wants to move
		parameters.direction = parameters.direction || AgentLib.getRND_V3_101();
        parameters.direction.normalize();
        // Direction person will move ( change of direction )
		parameters.directionTime = parameters.directionTime ||
			{
				count : 0,
				newDirection : AgentLib.getRND_V3_101(),
                delta :0.4
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
this.resetDirection= function(Vector3)
	{
        parameters.direction = Vector3 ||  AGENT.getRND_V3_101(); 
        return parameters;
	}

    return parameters;
 
};
AGENT.PersonAgent.update = function (parameters)
   {
       if(parameters === undefined)
           {
               return;
           }
       if(parameters.isWandering)
           {
               if(parameters.move == undefined)
               {parameters.move = parameters.direction;}
               AGENT.RealAgent.moveObject(parameters);
               return parameters.move;
           }
       
       return parameters
   };

AGENT.BuildingAgent  = function(parameters) { };
AGENT.XRoadAgent =   function(parameters) { };
AGENT.RoadAgent =  function(parameters) { };
/////////////////

//AGENT.getRND_V3_010
//AGENT.getRND_V3_101 = function (){ return new THREE.Vector3((Math.random()-0.5)*2,0,(Math.random()-0.5)*2);     };
//AGENT.getRND_V3_010 = function (){ return new THREE.Vector3( 0,Math.random()*2*Math.PI,0); };
