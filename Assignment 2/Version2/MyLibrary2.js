function drawColorWheel(sides, layers, radius, xLoc, yLoc) {
//        pathCircle(context,33,200,111);
 //      fill(255,255,255);
    drawRegularPolygon('black', sides, xLoc, yLoc, radius);
//        drawColorCircles(sides,layers,radius,xLoc,yLoc);
}

function fill(r, g, b)
{
    context.fillStyle = getColor(r, g, b);
    context.fill();
}

function getColor(r, g, b)
{ 
    return 'rgb(' + r + ', ' + g + ',' + b + ')';
} 
function drawRegularPolygon(color,sides,xLoc,yLoc,radius)
{
    pathRegularPolygon(color,sides,radius,-2*Math.PI,xLoc,yLoc);   
}

function drawColorCircles(sides,layers,radius,xLoc,yLoc)
{
    var circleRadius = radius / layers;
    var i,j;
    pathCircle(context,circleRadius,xLoc,yLoc);
    fill(255,255,255);
    for(i=0;i<layers;i++)
    {
//          drawLayer(i,sides,circleRadius,xLoc,yLoc);
    }
//    fill(r,g,b);
//    fill(20,20,20); 
}

function drawLayer(layer,sides,radius,xLoc,yLoc);
{
    var i,j;
    if(sides%2==1)
    {
        if(layer ==0)
        {
            pathCircle(context,radius,xLoc,yLoc);
            fill(255,255,255);
        }
        else{
            for(i=0;i<sides;i++){
                
                context.save();
                    for(j=1;j<layer;j++)
                    {
                    addPolarDirection(radius*layer,sides,i); 
                    pathCircle(context,radius,xLoc,yLoc);
                    fill(100,200,100);
                    }
                context.restore();
                
            }
        }
    }
}
function addPolarDirection(distance, sides, sideNumber) { 
    context.translate(Math.sin((2 * Math.PI / sides) * sideNumber) * distance, Math.cos((2 * Math.PI / sides) * sideNumber) * distance);
}
function pathCircle(color, radius, currentX, currentY) { 
    context.beginPath();
    context.arc(currentX, currentY, radius, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
    assert(debug,"Circle");
}

function pathRegularPolygon(color, sides , radius, startAngle, currentX, currentY) {

    if (sides < 3) {
        return;
    }

    var i, a = -(Math.PI * 2) / sides;
    context.save(); 
    context.beginPath(); 
    context.rotate(startAngle);
    context.moveTo(currentX, currentY); 
    for (i = 0; i <= sides; i = i + 1) {
        context.lineTo(radius * Math.cos(a * i)+currentX, radius * Math.sin(a * i)+currentY);  
    }
    context.closePath();  
    context.restore();
    context.fillStyle = color;
    context.fill();

    assert(debug,"RegularPolygon");
}