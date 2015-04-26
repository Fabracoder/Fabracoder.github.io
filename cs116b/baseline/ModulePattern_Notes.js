//  Immediately-Invoked-Function-Expressions
//      This function declares itself then calls itself immediately
//      Also by being a function it creates its own scope
(function () {
  // code
})();

// creates a namespace for the private scope
// module is a global variable
var module = (function () {
  // code
})();



var module = (function () {
  var privateMethod = function () {
    // do something
  };
})();