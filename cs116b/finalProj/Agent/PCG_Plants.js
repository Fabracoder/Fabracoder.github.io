//PCG Plantlife
//  ~<> = remove contents of <> from last object.
// .awfe.<> = contents of <> saved in awfe
//  s = sphere (default with radius of 1)
//  s<5,1,1,1> = radius 5 , x scale 1, y scale 1, z scale 1
//  y = cylinder ( default as cylinder of diameter 1,height 1)
//  t<4,2,5> = radius,height,sides(?)
//  b = box ( default as cube length 1)
//  b<2,4,3> = width 2, height 4, 3 depth
// The following is operated on the next obj created. ( from list above )
//  [x,y,z] = set rotate object by x,y,z
//  (x,y,z) = set translate object by x,y,z
//  {x,y,z} = set scale object by x,y,z
//  +       = rotate by set amount (in the positive )
//  -       = rotate by set amount (in the negative direction)
//  !       = scale object by amount set
//  #       = translate object by set amount 
//  %       = translate object by set amount (reverse)
//

var generatePlant = function (inputString)
{
    
    this.className = "generatePlant";
    {// initialize
        if(inputString!=undefined)
        {
            this.lSystem=inputString;
        }
        if(this.lSystem == undefined && inputString == undefined)
        {
            this.lSystem = "s=s";
        }
    }//

}

// example usage
// var aFern = new generateFern("y=![+++++y][-------y]-![++++y][------y]-![+++y][-----y]-!y");
// var aFern = new generateFern("121");
function generateFern(inputString,objArray)
{
    generatePlant.call(this,inputString); //inheirt from generatePlant
    this.className = "generateFern";
    
    if(lSystem == "y=y")
    {
        lSystem = "y=![+++++y][-------y]-![++++y][------y]-![+++y][-----y]-!y";
    }
     
}
generateFern.prototype = Object.create(generatePlant.prototype);
generateFern.prototype.constructor = generateFern;
 
//// Define the Person constructor
//var aParent = function(firstName) {
//  this.firstName = firstName;
//};
//
//// Add a couple of methods to Person.prototype
//aParent.prototype.walk = function(){
//  console.log("I am walking!");
//};
//
//aParent.prototype.sayHello = function(){
//  console.log("Hello, I'm " + this.firstName);
//};
//
//// Define the Student constructor
//function aChild(firstName, subject) {
//  // Call the parent constructor, making sure (using Function#call)
//  // that "this" is set correctly during the call
//  aParent.call(this, firstName);
//
//  // Initialize our Student-specific properties
//  this.subject = subject;
//};
//
//// Create a Student.prototype object that inherits from Person.prototype.
//// Note: A common error here is to use "new Person()" to create the
//// Student.prototype. That's incorrect for several reasons, not least 
//// that we don't have anything to give Person for the "firstName" 
//// argument. The correct place to call Person is above, where we call 
//// it from Student.
//aChild.prototype = Object.create(aParent.prototype); // See note below
//
//// Set the "constructor" property to refer to Student
//aChild.prototype.constructor = aChild;
//
//// Replace the "sayHello" method
//aChild.prototype.sayHello = function(){
//  console.log("Hello, I'm " + this.firstName + ". I'm studying "
//              + this.subject + ".");
//};
//
//// Add a "sayGoodBye" method
//Student.prototype.sayGoodBye = function(){
//  console.log("Goodbye!");
//};
//
//// Example usage:
//var student1 = new Student("Janet", "Applied Physics");
//student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
//student1.walk();       // "I am walking!"
//student1.sayGoodBye(); // "Goodbye!"
//
