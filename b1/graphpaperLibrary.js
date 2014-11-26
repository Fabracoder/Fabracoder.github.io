 var doubleClickThreshold = 100;  //ms
 var lastClick = 0; 
 var isDoubleClick = false;
 var isMultiPoint = false; 
 var currentShape = 0; // the index of the selected shape
 var isTouch = false;
 var ShapeArray = [];// stores shapes to be draw

 var curX = 0, curY = 0, dX = 0, dY = 0; // curX,Y is current x and y. dX is where it last clicked down

 
var color = ""; 
var menuMode = 1; // this var sets the current secondary menu options for the menu selection
var activeShape = 0; // 0 = rectangle, 1 = square, 2 circle, 3 = polygon, 4 = beizer
var activeMode = 0; //Edit modes : create, delete, drag, rotate, scale
  
function Point(x,y)
{
    this.x = x;
    this.y = y;
}

function ShapeR(Point_list,type)
{
    this.tempArray = [];
    this.PointList = Point_list;
    this.typeName = name;
    this.rotate = Math.PI*2;
    this.fcolor = context.fillStyle;
    this.scolor = context.fillStyle;
    this.draw  = function () {console.log("Warning: UninitializedShape:"+type)};
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
}


function getPointInside(name){
    var rect = function (x,y){
        
        x = this.PointList[0].x;
        y = this.PointList[0].y;
        width = this.PointList[1].x;
        height = this.PointList[1].y;
        rotate = this.rotate;
        context.save();
            context.fillStyle = this.fcolor;
            context.strokeStyle = this.scolor;
        var cX = x + width;
        var cY = y + height;
        // get center (x+width)/2    (y+height)/2    
        // translate
        // rotate
        // translate back.
        //
        //
            context.beginPath(); 
//            context.translate(x+tempX,y+tempY);  
//            context.rotate(rotate+tempRot); 
//             if(this.PointList.length>2)
//                context.translate(this.PointList[2].x-tempX,this.PointList[2].y-tempY);          
         context.translate(cX+tempX,cY+tempY);  
            context.rotate(rotate);
         context.translate(-cX+tempX,-cY+tempY);  
            context.moveTo(x,y);
            context.lineTo(x+ width,y);
            context.lineTo(x+ width, y+height);
            context.lineTo(x,y+height);
            context.lineTo(x,y);  
             temp = context.isPointInPath(x,y)
        context.restore();
  
      return  temp;
    };
    
    return rect;
}

function getShapeDraw(name)
{
    var rect =  function (tempX,tempY,tempRot) {   
        tempRot = (typeof tempRot === 'undefined') ? 0 : tempRot;
        tempX = (typeof tempX === 'undefined') ? 0 : tempX;
        tempY = (typeof tempY === 'undefined') ? 0 : tempY;
        
        x = this.PointList[0].x;
        y = this.PointList[0].y;
        width = this.PointList[1].x;
        height = this.PointList[1].y;
        rotate = this.rotate;
        context.save();
            context.fillStyle = this.fcolor;
            context.strokeStyle = this.scolor;
        var cX = x + width;
        var cY = y + height;
        // get center (x+width)/2    (y+height)/2    
        // translate
        // rotate
        // translate back.
        //
        //
            context.beginPath(); 
//            context.translate(x+tempX,y+tempY);  
//            context.rotate(rotate+tempRot); 
//             if(this.PointList.length>2)
//                context.translate(this.PointList[2].x-tempX,this.PointList[2].y-tempY);          
         context.translate(cX+tempX,cY+tempY);  
            context.rotate(rotate);
         context.translate(-cX+tempX,-cY+tempY);  
            context.moveTo(x,y);
            context.lineTo(x+ width,y);
            context.lineTo(x+ width, y+height);
            context.lineTo(x,y+height);
            context.lineTo(x,y);  
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
    
    switch(activeShape) {
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


// Initializes the top canvas for color selection
function initializeMenu() {
 
    var pos = 0;
    /*
     color : OOH! click on set color and it switches the main canvas to a color selector 
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
            case 1: //drawmodes
                {
                    switch(val)
                    {
                            case 0:
                                showMessage1("Rectangle",10,10,300,20);
                            break;
                     
                            case 1:
                                showMessage1("Square",10,10,300,20);
                            break;
                     
                            case 2:  
                                showMessage1("Circle",10,10,300,20);
                            break;
                     
                            case 3:  
                                showMessage1("Polygon",10,10,300,20);
                            break;
                     
                            case 4:  
                                showMessage1("Bezier Curves",10,10,300,20);
                            break;
                            
                    }
               
                }
            case 2: //edit modes
                {
                    activeMode=val;
                    console.log("active mode: "+activeMode)
                    switch(val)
                    {
                            case 0:
                                showMessage1("Create Shape Mode: Click and drag to create",10,10,300,20);
                            break;
                     
                            case 1:
                                showMessage1("Delete Shape Mode: Double click to delete",10,10,300,20);
                            break;
                     
                            case 2: // drag
                                showMessage1("Drag Shape Mode: Click and drag to move",10,10,300,20);
                            break;
                     
                            case 3: // rotate
                                showMessage1("Rotate Shape Mode: Click and drag to rotate",10,10,300,20);
                            break;
                     
                            case 4: //scale
                                showMessage1("Scale Shape Mode: Click and drag to scale",10,10,300,20);
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
 
function isInShape(x,y) {
    for(i=0;i<ShapeArray.length;i++)
    {
      
        if(ShapeArray[i].hasPointInside(x,y))
        {  console.log(ShapeArray.length+"isInShape reached "+i+" "+ShapeArray[i].hasPointInside(x,y)); 
            return i;
        }
    }
}

// message stuff
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
        h = (typeof height === 'undefined') ? 0 : height;

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

    function showText(string) {
        context.save(); 
              cnxt.fillStyle = "black";
              cnxt.font = "14px Times New Roman";
              cnxt.fillText(string, 100, 45);            
        context.restore();
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
    showMessage1("Select Modes above for tools",1,1,180,30,context);

    function showCoordinates(x, y) {
        if(isTouch)
        {
            var coordinateString =  "  Color: "+context.fillStyle +"   Touch location: (" + x + ", " + y + ")" ;
            showMessage(coordinateString);
        }
        else
        {
            var coordinateString =  "  Color: "+context.fillStyle +"   Mouse location: (" + x + ", " + y + ")" ;
            showMessage(coordinateString);
        }
      
    }
  
}
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
    if(event.changedTouches!=undefined)
    {    

        isTouch = true;
        asdf = event.changedTouches[0]; 
       {   
        x = asdf.clientX - canvas.offsetLeft;
        y = asdf.clientY - canvas.offsetTop;
       } 
//        delete asdf;
    }
    else
        isTouch = false;
    
    showCoordinates(x, y);

    
    switch(activeMode)//Edit modes : create, delete, drag, rotate, scale
    {   
        case 0:
            { 
                if(isDown== true) // if the mouse is down, draw the relevant rubberbanding rectangle
                {
                    context.fillStyle=color;      
                    var rect = {x:dX,
                                y:dY,
                                width: x -  dX,
                                height: y - dY,
                                }; 
                    drawRectShape(rect.x, rect.y, rect.width, rect.height); 
 
                }
                break;
            }
        case 2:
            {
                if(currentShape>=0)
                if(ShapeArray[currentShape].tempArray.length>0)
                { 
                    ShapeArray[currentShape].PointList[2].x = x - ShapeArray[currentShape].tempArray[0].x ;
                    ShapeArray[currentShape].PointList[2].y = y - ShapeArray[currentShape].tempArray[0].y ;
                }
                break;
            }

            case 3: // rotate
            { 
                if(currentShape>-1)
                { 
                    if(isDown)
                        if(ShapeArray[currentShape].tempArray.length > 1)
                        {
                            // point, rot
                            xx = ShapeArray[currentShape].tempArray[0].x;
                            yy = ShapeArray[currentShape].tempArray[0].y;
                             
// center
// xDiff = clickat.x -center.x; 
// yDiff = clickat.y -center.y;
/// rotateOffsetAnge = Math.atan2(yDiff,xDiff)-rotateShape.angle                            
                            
                            
                            x1 = xx - x;
                            y1 = yy - y;
                            
                            amd =-(Math.atan2(-y1, -x1))
                             
//                              (Math.atan2(y1, x1)); 
                            
                             ShapeArray[currentShape].rotate = amd%(Math.PI*2);
                            
                            showMessage1(""+ amd,10,10,230,30,context);
console.log(amd+ " : "+ x1+ "  " + y1);
                            ShapeArray[currentShape].draw(0,0,1)
                            refreshCanvas();
                        }
                } 
                break;
            }            
    }
    
 };
 
function mouseDown(event) {
   
  dX = event.clientX - canvas.offsetLeft, // saves mouse down location
  dY = event.clientY - canvas.offsetTop;
    if(event.changedTouches!=undefined)
    {    

        isTouch = true;
        asdf = event.changedTouches[0]; 
       {   
        dX = asdf.clientX - canvas.offsetLeft;
        dY = asdf.clientY - canvas.offsetTop;
       } 
        delete asdf;
    }
    else
        isTouch = false;
    
    tom = new Date().getTime();
    if(  tom-lastClick < doubleClickThreshold)
    {isDoubleClick = true;}
    else{isDoubleClick = false;}
    delete tom;
        console.log("mouseDown "+isDown+ " "+ activeMode );        
    switch(activeMode)//Edit modes : create, delete, drag, rotate, scale
    {
            case 0:
                { 
                    break;
                }
            case 1: // delete
                {   
                    if(isDoubleClick)
                    {
                        currentShape = isInShape(dX,dY) ;
                        if(currentShape>-1)
                        {
                            drawRectShape(ShapeArray[currentShape].PointList[0].x,ShapeArray[currentShape].PointList[0].y,ShapeArray[currentShape].PointList[1].x,ShapeArray[currentShape].PointList[1].y);
                            ShapeArray.splice(currentShape,1);
                            currentShape =-1;
                    //        refreshCanvas();
                        }

                    }
                    break;
                }
            case 2: // drag
                {
                    currentShape = isInShape(dX,dY) ;
                    if(currentShape>-1)
                    { 
                        ShapeArray[currentShape].tempArray.push ( new Point(dX,dY));
                        ShapeArray[currentShape].PointList.push ( new Point(0,0)); 
                    }              
                    break;
                }
            case 3: // rotate
            {
                currentShape = isInShape(dX,dY) ;
                    if(currentShape>-1)
                    { 
                        ShapeArray[currentShape].tempArray.push ( new Point(dX,dY));
                        ShapeArray[currentShape].tempArray.push ( new Point(0,0)); // stores rot 
                        ShapeArray[currentShape].PointList.push(
                            new Point(ShapeArray[currentShape].PointList[0].x-dX,ShapeArray[currentShape].PointList[0].y-dY));
                    } 
                break;
            }
    } 
    
  isDown = true;        
  showCoordinates(dX, dY);
    

}   

function mouseUp(event) {
  isDown= false;
  var x = event.clientX - canvas.offsetLeft,
      y = event.clientY - canvas.offsetTop;  
  
  var thisClick = new Date().getTime();    
      
     if(event.changedTouches!=undefined)
    {    

        isTouch = true;
        asdf = event.changedTouches[0]; 
       {   
        x = asdf.clientX - canvas.offsetLeft;
        y = asdf.clientY - canvas.offsetTop;
       } 
        delete asdf;
    }
    else
        isTouch = false;
    
   switch(activeMode) //Edit modes : create, delete, drag, rotate, scale
    {
            case 0:
                {
                    context.fillStyle=color; 
                    temp = [];
                    temp.push(new Point(dX,dY));
                    temp.push(new Point(x-dX,y-dY));
                    
                    var shape  = new ShapeR(temp,0);// createShape(x,y,activeShape);
                    shape.initialize();
//            shape.rotate = Math.PI/3;        
                    shape.draw();
                    
                    ShapeArray.push(shape);
                    showCoordinates(x, y);
//                     console.log(  " " + context.fillStyle);
                    break;
                }
            
            case 2:
                {
                    if(currentShape>-1){
                    ShapeArray[currentShape].PointList[0].x =
                        ShapeArray[currentShape].PointList[0].x + ShapeArray[currentShape].PointList[2].x;
                    ShapeArray[currentShape].PointList[0].y =
                        ShapeArray[currentShape].PointList[0].y + ShapeArray[currentShape].PointList[2].y;
                    ShapeArray[currentShape].tempArray.pop();
                    ShapeArray[currentShape].PointList[2] = new Point(0,0);
                    }
                    break;
                }

            case 3:
            {
                if(currentShape>-1)
                { 
                    ShapeArray[currentShape].tempArray.pop(); 
                    ShapeArray[currentShape].tempArray.pop();                     
                    ShapeArray[currentShape].PointList.splice(3);
                }
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
     
    lastClick = thisClick;
 
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

    if(ShapeArray)
    for(var i =0; i< ShapeArray.length;i++)
    {
        ShapeArray[i].draw();
    } 
}   

// mouse event handler
canvas.addEventListener("click", mouseAt);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("touchstart",mouseDown);
canvas.addEventListener("touchmove",mouseMove);
canvas.addEventListener("touchend",mouseUp);

//canvas.addEventListener("touchstart",tStart);
//canvas.addEventListener("touchmove",tMove);
//canvas.addEventListener("touchend",tEnd);


// mouse event handler for the color selection on the menu canvas
canMenu.addEventListener("click", select);

