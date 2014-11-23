var scaleing = 20;
var canvas = document.getElementById('myCanvas2');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = canvas.width/scaleing/2;
var layers = 5;
var colorStep = 51; // amount shade shifts by
var r = 255;
var g = 255;
var b = 255; 
var color = 'rgb(' + r +', ' + g + ',' + b +')';
var debug = 0; 
var i,j,k;

 // draws the hexagon in black
setColor(0, 0, 0);
fillRegularPolygon(context, centerX, centerY, radius * 2 * layers, 6, -Math.PI/2, color);
 // draws the center circle in white
setColor(255, 255, 255);
fillCircle(context,radius, setColor(200,30,0), centerX,centerY);
context.save();
 var side;
 var count;  


