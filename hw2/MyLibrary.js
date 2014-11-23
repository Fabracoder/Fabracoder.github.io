function fillCircle(context, radius, color, currentX, currentY) {
    "use strict";
    context.beginPath();
    context.arc(currentX, currentY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
    assert(debug,"circle");
}
 
function setCoordinatesSytem(context, centerX, centerY) {
    "use strict";
    context.translate(centerX, centerY);
}
function addPolarDirection(context, distance, sides, sideNumber) {
    "use strict";
    context.translate(Math.sin((2 * Math.PI / sides) * sideNumber) * distance, Math.cos((2 * Math.PI / sides) * sideNumber) * distance);
}

function subPolarDirection(context, distance, sides, sidenumber) {
    "use strict";
    if (sidenumber === 0) {
        sidenumber = sides;
    } else {
        sidenumber = sides - sidenumber;
    }
    context.translate(Math.sin((2 * Math.PI / sides) * sideNumber) * distance, Math.cos((2 * Math.PI / sides) * sideNumber) * distance);
}

function fillRegularPolygon(ctx, currentX, currentY, radius, sides, startAngle, color) {
    "use strict";
    if (sides < 3) {
        return;
    }

    var i, a = -(Math.PI * 2) / sides;
    
    ctx.beginPath();
    ctx.save();
    ctx.translate(currentX, currentY);
    ctx.rotate(startAngle);
    
    for (i = 1; i <= sides; i = i + 1) {
        ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.restore();
    ctx.fillStyle = color;
    ctx.fill();
}

function setColor(r, g, b) {
    "use strict";
    color = 'rgb(' + r + ', ' + g + ',' + b + ')';
}
function assert(debug, text) {
    "use strict";
    if (debug) {
        alert(text);
    }
}


function recurseR(context,iteration,r,g,b)
{
    context.save();
    recurseRD(context,iteration,r,g,b);
    context.restore();
    context.save();
    recurseRW(context,iteration,r,g,b);
    context.restore();
    
}
function recurseRD(context,iteration, r, g, b) {
    if(iteration<0)
    {
        return;
    }

     b+=colorStep;
     setColor(r,g,b);
     addPolarDirection(context,radius*2,6,1);
     fillCircle(context,radius,color, 0,0);
     recurseRD(context,--iteration,r,g,b);
}
function recurseRW(context,iteration, r, g, b) {
    if(iteration<0) {
        return;
    } 
     g+=colorStep;
     setColor(r,g,b);
     addPolarDirection(context,radius*2,6,5);
     fillCircle(context,radius,color, 0,0);
     recurseRW(context,--iteration,r,g,b);
}




function recurseG(context,iteration,r,g,b)
{
  
    context.save();
    recurseGD(context,iteration,r,g,b);
    context.restore();
    context.save();
    recurseGW(context,iteration,r,g,b);
    context.restore();
    
}
function recurseGD(context,iteration, r, g, b) {
    if(iteration<0)
    {
        return;
    }

     b+=colorStep;
     setColor(r,g,b);
     addPolarDirection(context,radius*2,6,1);
     fillCircle(context,radius,color, 0,0);
     recurseGD(context,--iteration,r,g,b);
}
function recurseGW(context,iteration, r, g, b) {
    if(iteration<0) {
        return;
    } 
     r+=colorStep;
     setColor(r,g,b);
     addPolarDirection(context,radius*2,6,3);
     fillCircle(context,radius,color, 0,0);
     recurseGW(context,--iteration,r,g,b);
}


function recurseB(context,iteration,r,g,b)
{
  
    context.save();
    recurseBD(context,iteration,r,g,b);
    context.restore();
    context.save();
    recurseBW(context,iteration,r,g,b);
    context.restore();
    
}
function recurseBD(context,iteration, r, g, b) {
    if(iteration<0)
    {
        return;
    }

     g+=colorStep;
     setColor(r,g,b);
     addPolarDirection(context,radius*2,6,5);
     fillCircle(context,radius,color, 0,0);
     recurseBD(context,--iteration,r,g,b);
}
function recurseBW(context,iteration, r, g, b) {
    if(iteration<0) {
        return;
    } 
     r+=colorStep;
     setColor(r,g,b);
     addPolarDirection(context,radius*2,6,3);
     fillCircle(context,radius,color, 0,0);
     recurseBW(context,--iteration,r,g,b);
}
