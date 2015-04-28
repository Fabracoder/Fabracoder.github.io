//http://toddmotto.com/mastering-the-module-pattern/

//  Immediately-Invoked-Function-Expressions
//      This function declares itself then calls itself immediately
//      Also by being a function it creates its own scope
(function()
{

	// code
})();

// creates a namespace for the private scope
// module is a global variable
var module = (function()
{

	// code
})();


// example of private and public
var module = (function()
{

	var privateMethod = function()
	{ 
        // a private method
	};
    
    
    
   // locally scoped Object
  var myObject = {};

  // declared with `var`, must be "private"
  var privateMethod = function () {};

  myObject.someMethod = function () {
    // decared without var, it is a global variable
  };
  
    
 
    return
    {
        myObject,
        
        publicMethodOne: function () 
        {
            // I can call `privateMethod()`
        },
        publicMethodtwo: function () 
        {

        },  
        publicMethodThree: function () 
        {

        }
    };
})();




var Module = (function () {

  var privateMethod = function () {
    // private
  };

  var someMethod = function () {
    // public
  };

  var anotherMethod = function () {
    // public
  };
  
  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod
  };

})();

var ModuleTwo = (function (Module) {
    
    Module.extension = function () {
        // another method!
    };
    
    return Module;
    
})(Module || {});


//--------------------
    
//Module || {} into my second ModuleTwo, this is incase Module is undefined - we don't want to cause errors now do we ;). What this does is instantiate a new Object, and bind our extension method to it, and return it.