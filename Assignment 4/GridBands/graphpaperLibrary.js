var firstPoint = undefined,
    secondPoint = undefined; 
var color = "";
var menuOption = 0;
var activeShape = -1; 
// Initializes the top canvas for color selection
function initializeMenu() {
    var pos = 0;
    conMenu.fillStyle = "red";
    conMenu.fillRect(pos, 0, 50, 50);
    
    pos += 60;
    
    conMenu.fillStyle = "blue";
    conMenu.fillRect(pos, 0, 50, 50);
    
    pos += 60;
    
    conMenu.fillStyle = "green";
    conMenu.fillRect(pos, 0, 50, 50);
    
    pos += 60;
    
    conMenu.fillStyle = "yellow";
    conMenu.fillRect(pos, 0,  50, 50);
    
    pos += 60; 
    
    conMenu.fillStyle = "white";
    conMenu.fillRect(pos, 0,  50, 50);
    showMessage1("Undo", pos, 15  , 30, 30, conMenu);
    
    pos += 60; 
    
    conMenu.fillStyle = "white";
    conMenu.fillRect(pos, 0,  50, 50);
    showMessage1("Reset", pos, 15  , 30, 30, conMenu);
    
    pos += 60; 
    
}

setDefaultShapeColor(12, 111, 111, 0.2);

// Selecting the color from the top canvas
function select(event) {
    menuOption = 0;
    var x = event.clientX - canvas.offsetLeft,
        y = event.clientY - canvas.offsetTop; 
    val = Math.floor(x / 60);
    
    menuOption = val;
    switch (val) {
    case 0:
        setDefaultShapeColor(255, 1, 1);
     
        break;
    case 1:
        setDefaultShapeColor(1, 1, 255);
        break;

    case 2:
        setDefaultShapeColor(1, 255, 1);
        break;
        
    case 3:
        setDefaultShapeColor(255, 255, 1);
        break;
            
    case 4:
        setDefaultShapeColor(1, 1, 1);
        RectangleArray.pop();    
        refreshCanvas();
        break;

    case 5:
        setDefaultShapeColor(1, 1, 1);
        RectangleArray = [];    
        refreshCanvas();
        break;
            
    default:
        setDefaultShapeColor();
            
    }
    console.log(context.fillStyle );

}

initializeMenu();
updateCanvasSize();
// Your graphpaper function,  modified to produce darker lines at intervals
function drawGraphPaper(units, color) { 
  units = units || 20;  
  color = color || "rgba(10,10,255,0.01)";  
  context.save();
  context.strokeStyle = color;
  context.beginPath();

  for (var i = 0.5; i <= canvas.width; i += units) {
    context.moveTo(i, 0.5);
    context.lineTo(i, canvas.height);
  }

  for (i = 0.5; i <= canvas.height; i += units) {
    context.moveTo(0.5, i);
    context.lineTo(canvas.width, i);
  }
  
  context.stroke();
  context.restore();
    
  if(units<canvas.width) {
      drawGraphPaper(units*5,color);
      drawGraphPaper(units*10,color);
      drawGraphPaper(units*10,color);      
  } 
}  

drawGraphPaper(5,"rgba(10,10,255,0.05)");
 
// sets the color for both fill and stroke
function setDefaultShapeColor(r, g, b, a) {
  r = r || 127;
  g = g || 127;
  b = b || 127;
  a = a || 0.2;  
  context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  context.strokeStyle = "rgb(" + r + ", " + g + ", " + b + ")";  
  color = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

 //draws rectangle
function drawRectShape(x, y, width, height) {
  context.strokeRect(x, y, width, height);
  context.fillRect(x, y, width, height);
} 
 
// draws a message box
function drawUIBox(x, y, width, height) {  
  context.save();
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.shadowColor = "black";
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 15;
  context.strokeRect(x, y, width, height);
  context.fillRect(x, y, width, height);
  context.restore();
}
function showMessage1(string, x, y, width, height, cnxt) {

    cnxt = cnxt || context;
    xVal = x || 10;
    yVal = y || canvas.height-25;
    w = width || 100;
    h = height || 20; 
    
    var box = {
        x: xVal ,
        y: yVal,
        width: w,
        height: h}; // changed to always be at the bottom of the canvas instead of absole location
  
  cnxt.save();
  
  // draw the box exterior
  if (!showMessage.boxDrawn) {
//    drawUIBox(box.x, box.y, box.width, box.height);
    showMessage.boxDrawn = true; // prevent redraw of the box
  }
  
  // draw the box contents
  cnxt.fillStyle = "white";
  cnxt.fillRect(box.x, box.y, box.width, box.height);
  cnxt.fillStyle = "black";
  cnxt.font = "14px Times New Roman";
  cnxt.fillText(string, box.x + 7, box.y+ 15);
  cnxt.restore();
}

  
function showMessage(string) {

  var box = {x: 10, y: canvas.height-25, width: 180, height: 20};

  context.save();

  // draw the box exterior
  if (!showMessage.boxDrawn) {
    drawUIBox(box.x, box.y, box.width, box.height);
    showMessage.boxDrawn = true; // prevent redraw of the box
  }

  // draw the box contents
  context.fillStyle = "white";
  context.fillRect(box.x, box.y, box.width, box.height);
  context.fillStyle = "black";
  context.font = "14px Arial";
  context.fillText(string, box.x + 7, box.y+ 15);
  context.restore();
}

// Instructions displayed when run
showMessage("Selection menu on top ");
 
function showCoordinates(x, y) {
  var coordinateString =  "  Color: "+context.fillStyle +"   Mouse location: (" + x + ", " + y + ")" ;
  showMessage(coordinateString);
}
  
var RectangleArray = [];// stores history of rectangles
var curX = 0, curY = 0, dX = 0, dY = 0; // curX,Y is current x and y. dX is where it last clicked down
 
function mouseAt(event) { 
    
  var x = event.clientX - canvas.offsetLeft,
      y = event.clientY - canvas.offsetTop;
  
  showCoordinates(x, y);
};


var isDown = false; // is true when mouse button is down

function mouseMove(event) { 
  var x = event.clientX - canvas.offsetLeft,
      y = event.clientY - canvas.offsetTop; 
  refreshCanvas();  // clears the screen and redraws the grid and the rectangles
    
  showCoordinates(x, y);
    if(isDown== true) // if the mouse is down, draw the relevant rubberbanding rectangle
    {
    context.fillStyle=color;      
    var x = event.clientX - canvas.offsetLeft,
      y = event.clientY - canvas.offsetTop; 

      var rect = {x:dX,
                  y:dY,
                width: x -  dX,
                height: y - dY,
                }; 
      drawRectShape(rect.x, rect.y, rect.width, rect.height); 
    }
 };
 
function mouseDown(event) {
   
  dX = event.clientX - canvas.offsetLeft, // saves mouse down location
  dY = event.clientY - canvas.offsetTop;
  // check if it is in a rectagle
 
    
  isDown = true;        
  showCoordinates(dX, dY);
};

function mouseUp(event) {
  isDown= false;
    
  var x = event.clientX - canvas.offsetLeft,
      y = event.clientY - canvas.offsetTop;  
    
  console.log(context.fillStyle);  
  context.fillStyle=color;
    
  var rect = { x:dX, // create the rectangle with type and color
               y:dY,
               width: x -  dX,
               height: y - dY,
               type: 1,
//               ctx: context;
               color: context.fillStyle }; 
      drawRectShape(rect.x, rect.y, rect.width, rect.height);
      RectangleArray.push(rect); // saves it to the list of rectangles refresh draws
      showCoordinates(x, y);
      console.log(  " " + context.fillStyle);
};

function updateCanvasSize()
{
    var temp = window.innerWidth - 60;
    if( temp < 60 * 6)
    {
        temp = 60 * 6;
    }
  context.canvas.width  = temp;
  context.canvas.height = window.innerHeight -120;  
  refreshCanvas();
}

function refreshCanvas() // redraws the screen with everything that is 'permenant'
{ 
 context.clearRect(0, 0, canvas.width, canvas.height);
    if(isDown)
    {
        drawGraphPaper(5,"rgba(10,10,255,0.05)"); // provides higher accuracy while rubberbanding
    }
    else
        drawGraphPaper(5,"rgba(10,10,255,0.03)");

    if(RectangleArray)
    for(var i =0; i< RectangleArray.length;i++)
    {
        if(RectangleArray[i].type == 1)
        {
            context.fillStyle = RectangleArray[i].color;
            context.strokeStyle = RectangleArray[i].color;
            
            drawRectShape(RectangleArray[i].x, RectangleArray[i].y, RectangleArray[i].width, RectangleArray[i].height);  
        }
    } 
}

// mouse event handler
canvas.addEventListener("click", mouseAt);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);

// mouse event handler for the color selection on the menu canvas
canMenu.addEventListener("click", select);

