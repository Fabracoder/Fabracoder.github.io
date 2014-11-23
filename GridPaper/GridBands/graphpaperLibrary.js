var doubleClickThreshold = 110;  //time in milliseconds
var lastClick = 0; 
var isDoubleClick = false;
var isMultiPoint = false; 
var currentShape = 0;

var RectangleArray = [];// stores history of rectangles
var ShapeArray = [];// stores history of rectangles

var curX = 0, curY = 0, dX = 0, dY = 0; // curX,Y is current x and y. dX is where it last clicked down

var firstPoint = undefined,
    secondPoint = undefined;
var color = ""; 
var menuMode = 1; // this var sets the current secondary menu options for the menu selection
var activeShape = 0; // 0 = rectangle, 1 = square, 2 circle, 3 = polygon, 4 = beizer
var activeMode = 0; //Edit modes : create, delete, drag, rotate, scale
var isDown = false; // is true when mouse button is down


function Point(x,y)
{
    this.x = x;
    this.y = y;
}
 
function ShapeR(Point_list,type)
{
    this.PointList = Point_list;
    this.typeName = type;
    this.rotate = 0;
    this.draw  = function () {console.log("Warning: UninitializedShape: "+type)};
    this.initialize = function()
    {
        this.draw =   getShapeDraw(name)  ;
        this.hasPointInside = getPointInside(name);
        this.moveShape = function(x,y){
                                        //getMoveShape(name);
            this.PointList[0].x = this.PointList[0].x +x;
            this.PointList[0].y = this.PointList[0].y +y;
            
    }; 
}


function getPointInside(name){
    var rect = function (x,y){
            rotate = this.rotate;
            
            context.beginPath(); 
            context.translate(x,y);  
            context.rotate(rotate); 
            if(1<this.PointList.length) { // offset
            context.translate(-this.PointList[2].x,-this.PointList[2].y); 
            }
        
            context.moveTo(0,0);
            context.lineTo( width,0);
            context.lineTo( width,height);
            context.lineTo(0,height);
            context.lineTo(0,0);    
        
      return  context.isPointInPath();
    };
    
    return rect;
}

function getShapeDraw(name)
{
    var rect =  function () {  //x, y, width, height,rotate
        x = this.PointList[0].x;
        y = this.PointList[0].y;
        width = this.PointList[1].x;
        height = this.PointList[1].y;
        
        context.save();
            context.beginPath();

            context.translate(x,y);  
            context.rotate(rotate);

        //    context.moveTo(x,y);
            context.moveTo(0,0);
            context.lineTo( width,0);
            context.lineTo( width,height);
            context.lineTo(0,height);
            context.lineTo(0,0);  
            context.fill();
            context.stroke();
        context.restore();
        } ;
    var square = function () { //x, y, width,rotate
        
        x = this.PointList[0].x;
        y = this.PointList[0].y;
        width = this.PointList[1].x;
        height = this.PointList[1].y; 
            context.save();
                context.beginPath(); 
                context.translate(x,y);  
                context.rotate(rotate); 
                
                context.lineTo(0, 0);
                context.lineTo(width, 0);
                context.lineTo(width, width);
                context.lineTo(0, width);
                context.lineTo(0, 0); 
                context.stroke(); // Draw it
                context.fill();     
            context.restore();
            } ;
    
    var circle = function (x, y, radius,rotate) {

        context.save();
            context.beginPath(); 
                context.translate(x,y);  
                context.rotate(rotate); 
                    context.arc(x,y,radius,0,2*Math.PI);
                    context.close();
                context.stroke(); // Draw it
                context.fill();     
        context.restore();
        };
    
    switch(currentShape) {
            case 0:
                    {
                        return rect;     
                        break;
                    }
            case 1:
                    {
                        return square;     
                        break;
                    }
            case 2:
                    {
                        return circle;
                        break;
                    }
            case 3:
                    {
                        return square;
                        break;
                    }
    }
}


//DrawShape functions
  
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
    function drawRectShape(x, y, width, height,rotate) {
        context.save();
        context.beginPath();

        context.translate(x,y);  
        context.rotate(rotate);

    //    context.moveTo(x,y);
        context.lineTo( width,0);
        context.lineTo( width,height);
        context.lineTo(0,height);
        context.lineTo(0,0); 
        context.fill();
        context.restore();
} 

     //draws square
    function drawSquareShape(x, y, width,rotate) {
        context.save();
            context.beginPath(); 
                context.translate(x,y);  
                context.rotate(rotate); 

                context.lineTo(width, 0);
                context.lineTo(width, width);
                context.lineTo(0, width);
                context.lineTo(0, 0);
            context.stroke(); // Draw it
            context.fill();     
        context.restore();
 } 

     //draws circle
    function drawCircleShape(x, y, radius,rotate) {

        context.save();
            context.beginPath(); 
                context.translate(x,y);  
                context.rotate(rotate); 
                    context.arc(x,y,radius,0,2*Math.PI);
                    context.close();
                context.stroke(); // Draw it
                context.fill();     
        context.restore();
 }
 


// Initializes the top canvas for color selection
function initializeMenu() {
 
    var pos = 0;
    /*
     color : If I have time... click on set color and it switches the main canvas to a color selector ?
    */  
    conMenu.fillStyle = "rgb(255,211,211)";
    conMenu.fillRect(pos, 0,  100, 50);
    showMessage1("Select Color", pos, 15  , 0, 0    , conMenu);
    pos += 120;   
    
    /* 
      Shape draw modes : rectangle, square, circle, polygon, Nbezier 
    */    
    
    conMenu.fillStyle = "rgb(200,200,255)";
    conMenu.fillRect(pos, 0,  100, 50);
    showMessage1("  Draw Modes", pos, 15  , 0,0, conMenu);
    pos += 120;
 
    /* 
      Edit modes : create, delete, drag, rotate, scale
    */    
    
    conMenu.fillStyle = "rgb(200,255,200)";
    conMenu.fillRect(pos, 0,  100, 50);
    showMessage1("   Edit Modes", pos, 15  , 0,0, conMenu);
    pos += 120;
    
    switch (menuMode) { 

        case 0:  //color
                {
                    conMenu.fillStyle = "red";
                    conMenu.fillRect(pos, 0,  50, 50);
 
                    pos += 60;   

                    conMenu.fillStyle = "green";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60;  

                    conMenu.fillStyle = "blue";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60;  

                    conMenu.fillStyle = "yellow";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60;  

                    conMenu.fillStyle = "purple";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60; 
                break;
                }            

        case 1: // Shape draw modes : rectangle, square, circle, polygon, Nbezier 
                {
                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "black";                    
                    conMenu.fillRect(pos+10, 10,  20, 30);
                    conMenu.fillStyle = "grey";                    
                    conMenu.fillRect(pos+15, 15,  30, 20);
                    
                    pos += 60;   

                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                     conMenu.fillStyle = "black";                    
                    conMenu.fillRect(pos+10, 10,  30, 30);
                    pos += 60;  

                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "black";
                    conMenu.beginPath();
                    conMenu.arc(pos+25,25,10,0,2*Math.PI,false);
                    conMenu.fill();    
                    pos += 60;  

                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "black";
                    conMenu.beginPath();
                    conMenu.lineTo(10,10);
                    
                    conMenu.stroke();                        
                    pos += 60;  

                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60; 
                break;
                }            

                case 2:  //Edit modes : create, delete, drag, rotate, scale
                {
                    //create
                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "black";                    
                    conMenu.fillRect(pos+10, 10,  30, 30); 
                    
                    pos += 60;   

                    // delete
                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "black";                    
                    conMenu.fillRect(pos+10, 10,  30, 30); 
                   
                    conMenu.beginPath();
                    conMenu.strokeStyle = "red"; 
                    conMenu.strokeWidth = 14;
                    conMenu.moveTo(pos,0);
                    conMenu.lineTo(pos+50,50);
                    conMenu.stroke();
                    conMenu.moveTo(pos,50);
                    conMenu.lineTo(pos+50,0);
                    conMenu.stroke();
                    pos += 60;  

                    // drag
                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "grey";                    
                    conMenu.fillRect(pos+10, 10,  20, 20);
                    conMenu.fillStyle = "black";                    
                    conMenu.fillRect(pos+20, 20,  20,20);
                    pos += 60;  

                    // rotate
                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    
                    conMenu.save();
                    conMenu.fillStyle = "grey";                    
                    conMenu.fillRect(pos+10, 10,  30, 30);


                      conMenu.translate(pos+25,5);
                      // rotate 45 degrees clockwise
                      conMenu.rotate(Math.PI / 4);
                      conMenu.fillStyle = 'black';
                      conMenu.fillRect(0, 0, 30,30);
    
   
                    conMenu.restore();
//                    conMenu.fillRect(pos+15, 15,  20, 20);
                    pos += 60;  

                    // scale 
                    conMenu.fillStyle = "white";
                    conMenu.fillRect(pos, 0,  50, 50);
                    conMenu.fillStyle = "black";                    
                    conMenu.fillRect(pos+10, 10,  30, 30);
                    conMenu.fillStyle = "grey";                    
                    conMenu.fillRect(pos+15, 15,  20, 20);
                    pos += 60; 
                break;
                }            

            
        default:
                {
                    conMenu.fillStyle = "grey";
                    conMenu.fillRect(pos, 0,  50, 50);
 
                    pos += 60;   

                    conMenu.fillStyle = "grey";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60;  

                    conMenu.fillStyle = "grey";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60;  

                    conMenu.fillStyle = "grey";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60;  

                    conMenu.fillStyle = "grey";
                    conMenu.fillRect(pos, 0,  50, 50);
                    pos += 60; 
                }              
                break;
            

            
        }
     
}

setDefaultShapeColor(12, 111, 111, 0.2);

// Selecting the color from the top canvas
function select(event) { 
    var x = event.clientX - canvas.offsetLeft,
        y = event.clientY - canvas.offsetTop; 
    val = Math.floor(x / 60);
    //menuMode = Math.floor(x  / 60); 
    
       
    if(val<6)
    {
        menuMode = Math.floor(val/2); 
    } 
    else
    {   
        val = val - 6;
     
        switch(menuMode )
        {
            case 0:
            { 
                console.log("ColorMenuClicked"+":"+val);
                switch (val) {

                case 0: //red
                    {
                        setDefaultShapeColor(255, 1, 1); 
                        break;
                    }
                case 1: //green
                    {
                        setDefaultShapeColor(1, 255, 1);
                        break;
                    }
                case 2: //blue
                    {
                        setDefaultShapeColor(1, 1, 255);
                        break;
                    }
                case 3: //yellow
                    { 
                        setDefaultShapeColor(255, 255, 1);
                        break;
                    }

                case 4: //purple
                    {
                        setDefaultShapeColor(255, 1, 255); 
                        break;
                    }

                default:
                    { 
                        setDefaultShapeColor(); 
                    } 
                }
                break;
            }
            case 1: // Shape draw modes : rectangle, square, circle, polygon, Nbezier 
                {
                    currentShape = val;
                     switch(val)
                     {
                             case 0:
                                    console.log("DrawRectangleModeSelected");
                                     
                                    break;
                             case 1:
                                    console.log("DrawSquareModeSelected");
                                    break;
                             case 2:
                                    console.log("DrawCirleModeSelected");
                                    break;
                             case 3:
                                    console.log("DrawPolygonModeSelected");
                                    break;
                             case 4:
                                    console.log("DrawNbezierModeSelected"); 
                                    break;
                     }
                     
                     break; 
                }
            case 2: // Edit modes : create, delete, drag, rotate, scale
                {
                    activeMode=val;
                    console.log("active mode: "+activeMode);
                    switch(activeMode)
                    { 
                            case 0:
                                    refreshCanvas();
                                    showMessage1("Click and drag to draw shapes", 10, 10, 100, 10, context);
                                    break;
                            case 1:
                                    refreshCanvas();
                                    showMessage1("Double click shapes to delete", 10, 10, 100, 10, context);
                                    break;
                            case 2:
                                    refreshCanvas();
                                    showMessage1("Click and drag shapes", 10, 10, 100, 10, context);
                                    break;
                            case 3:
                                    refreshCanvas();
                                    showMessage1("Click and drag shape to rotate", 10, 10, 100, 10, context);
                                    break;
                            case 4:
                                    refreshCanvas();
                                    showMessage1("Click and drag shape to resize", 10, 10, 100, 10, context);
                                    break;
                    }
                     break; 
                }
                
        }
    } 
    initializeMenu();
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
 

// Message box stuff
{ 
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
    h = height || 0; 
    
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
showOnFirstLoad();    
function showCoordinates(x, y) {
  var coordinateString =  "  Color: "+context.fillStyle +"   Mouse location: (" + x + ", " + y + ")" ;
  showMessage(coordinateString);
}
function showOnFirstLoad() {
    showMessage("Selection menu on top "); 
}
}
  

//mouse stuff
{ 
    function mouseAt(event) {  
      var x = event.clientX - canvas.offsetLeft,
          y = event.clientY - canvas.offsetTop; 
      showCoordinates(x, y);
};
    function mouseDown(event) {
 
      // check if it is in a rectagle
        var nowTime = new Date().getTime(); 
        // to check for double click
       if( nowTime - lastClick < doubleClickThreshold )
       { isDoubleClick = true;  
       } else
       { isDoubleClick = false; 
       }

        switch(activeMode)// Edit modes : 0 create, 1 delete, 2 drag, 3 rotate, 4 scale
        {
                case 0: //create
                    {   
                        dX = event.clientX - canvas.offsetLeft, // saves mouse down location
                        dY = event.clientY - canvas.offsetTop;
                        break;
                    }
                case 1: //delete
                    {
                        
                        if(isDoubleClick)
                        { 
                            ShapeArray.remove(getShapeIntercept(dX,dY)); 
                        }
                        break;
                    }
                case 2: //drag
                {
                          
                        { 
                            dX = event.clientX - canvas.offsetLeft, // saves mouse down location
                            dY = event.clientY - canvas.offsetTop;
                            currentShape = (getShapeIntercept(dX,dY)); 
                        }
                    break;
                }
                case 3: //rotate
                {
                    break;
                }
        }


      isDown = true;        
      showCoordinates(dX, dY);
};
    function mouseMove(event) { 
        
      var x = event.clientX - canvas.offsetLeft,
          y = event.clientY - canvas.offsetTop; 
      refreshCanvas();  // clears the screen and redraws the grid and the rectangles

      showCoordinates(x, y);

        switch(activeMode)// Edit modes : 0 create, 1 delete, 2 drag, 3 rotate, 4 scale
        {   
            case 0:
                { 
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
                    break;
                }
            case 1: // delete : no need to do anything
                {  
                    break;
                }
            case 2: // drag :  update location of shape (perment)
                {  
//                    ShapeArray[currentShape]
 
                    ShapeArray[currentShape].dragDraw((dX-x),(dY-y));
                    
                    break;
                }
                
                
        }
      };
    function mouseUp(event) {
      isDown= false;
      var x = event.clientX - canvas.offsetLeft,
          y = event.clientY - canvas.offsetTop;  

      lastClick = new Date().getTime();    

       switch(activeMode)// Edit modes : 0 create, 1 delete, 2 drag, 3 rotate, 4 scale
        {
                case 0:
                    {
                        context.fillStyle=color; 
                        var shape  = createShape(x,y,activeShape);
                        var rect = { x:dX, // create the rectangle with type and color
                                    y:dY,
                                    width: x -  dX,
                                    height: y - dY,
                                    type: 1,
                                    rot: 0, // rotation
                                    color: context.fillStyle }; 
                        drawRectShape(rect.x, rect.y, rect.width, rect.height);
                        RectangleArray.push(rect); // saves it to the list of rectangles refresh draws
                        
                        shape = new ShapeR(list);
                        shape.initialize();
                        ShapeArray.push(shape);
                        showCoordinates(x, y);
    //                    console.log(  " " + context.fillStyle);
                        break;
                    }
                case 1:
                    {
                        break;
                    }
        }    

       if(isMultiPoint)
        { 
           if(thisClick-lastClick > doubleClickThreshold)
           {
               // do double click code;
                // call function for close and save

           }
            else
            {
                // add node to list
                currentMultiPoint.push(new Point(x,y));
            }
        } 


}
}

function getShapeIntercept(x,y)
{
     for(i=0;i<ShapeArray.length;i++)
        {
            if((ShapeArray[i]).isPointInPath(x,y))
            {
                console.log( x+ " "+y+ " Shape Found"+" Number:"+i);
                return i; 
            }
        } 
    return -1;
}

function createShape(x,y,activeShape)
{
    return 0;
}

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
//    if(ShapeArray)
//    for(var i =0; i< ShapeArray.length;i++)
//    {
//        if(ShapeArray[i].type == 1)
//        {
//            context.fillStyle = ShapeArray[i].color;
//            context.strokeStyle = ShapeArray[i].color;
//            ShapeArray[i].drawT();          
////            drawRectShape(ShapeArray[i].x, ShapeArray[i].y, ShapeArray[i].width, ShapeArray[i].height);  
//        }
//    }  
        
//        ShapeArray.forEach(drawShape);
}   

// mouse event handler
canvas.addEventListener("click", mouseAt);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);

// mouse event handler for the color selection on the menu canvas
canMenu.addEventListener("click", select);

