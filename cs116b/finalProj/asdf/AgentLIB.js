
// version 0.8r Agent Library refactored
/*jslint white: true */
/*jslint nomen: true */
/*jslint vars: true */
// disable jslint issue that I dont care about
// localStorage  should be used to save, also export to txt
//TODO: I should refactor the code so that it uses the parameter object instead of local values 
var AgentClock = new THREE.Clock(true);

//    var agentList = []; // list of all agents
//    var realAgentList = []; // list of all agents with mesh
//    var materialsForAgents = []; // list of materials
//    var activeAgents = []; // list for update to be called on.
var agentList = {all:[];materials:[],active:[]};

if (scene === undefined)
{
	var scene = new THREE.Scene();
}

(function (){};)