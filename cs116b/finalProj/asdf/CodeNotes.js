//notes in code
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
