 var canvas = document.getElementById('myCanvas');
 var context = canvas.getContext('2d');

context.translate(10,10);
function Point(x,y,size,scolor,fcolor){
    this.x = x-13;
    this.y = y-13;
    this.size = size;
    this.scolor = scolor;
    this.fcolor = fcolor;
    this.draw = function() { 
        context.save();
            context.fillStyle = fcolor;
            context.strokeStyle = scolor;        
            
            this.createPath();
        
            context.fill();
            context.stroke();
        context.restore();
    };
    this.hit = function(xLoc,yLoc){
        context.save();
            temp = this.createPath(xLoc,yLoc);
        context.strokeStyle ="blue";
        context.fillStyle = "green";
        context.stroke();
        context.fill();
                    
        console.log("in p"+temp);

        context.restore();
        return temp;
    };
    this.createPath = function(x,y) {       
            context.beginPath();
            context.moveTo(this.x,this.y); 
            context.lineTo(this.x+this.size,this.y);
            context.lineTo(this.x+this.size,this.y+this.size);
            context.lineTo(this.x,this.y+this.size); 
            context.lineTo(this.x,this.y);
        return context.isPointInPath(x,y);
  //          context.closePath();    
        
//            context.arc(this.x,this.y,this.size,0,2*Math.PI);  
    }; 
};

var xxx = new Point(120.5,220.5,10,"rgb(10,32,30)","rgba(50,32,30,0.3)");
xxx.draw();

function mouseClick(event) {
    xx = event.x;
    yy = event.y;
 
    node = checkPoints(xx,yy);
        console.log("ss"+node);
    
    if(node>=0)
    {
        console.log("inNode");
        // do stuff with the node
    }
    else{

        //create node
        pointArray.push(new Point(xx,yy,10,"rgb(10,32,30)","rgba(50,32,30,0.3)"));
        refreshCanvas();
    }
    
}
function refreshCanvas()
{
    context.fillStyle = "white";
    context.fillRect(0,0,canvas.width,canvas.height);
    for(i=0;i<pointArray.length;i++)
    {
        pointArray[i].draw();
    }
     
}

function checkPoints(x,y)
{
     for(i=0;i<pointArray.length;i++)
    {
        if(pointArray[i].hit())
        {
            return i;
        }
    }    
    return -1;
}

function recurseBeizer(anArray,size){
    
}

var pointArray = []; 

canvas.addEventListener("mousedown", mouseClick);
canvas.onmousemove = function (e)
{
    var mouseX  = e.x;
    var mouseY  = e.y;

    for(i=0;i<pointArray.length;i++)
    {   
        if (context.isPointInPath(mouseX, mouseY)) {
            canvas.style.cursor = 'pointer';
            return;
        }
        else{
            canvas.style.cursor = 'default';
        }
    }
}