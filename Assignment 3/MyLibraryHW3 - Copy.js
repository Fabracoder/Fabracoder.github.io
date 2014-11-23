// Some original code provided by professor

function Color(r, g, b) {
    this.value = "rgb(" + r + ", " + g + ", " + b + ")";
}

function PointC(x,y,color)
{
    'use strict';
    this.x = x;
    this.y = y;
    this.color = color; 
        this.draw = function (name) {
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, Math.PI * 2);
 
        color = color || this.color;
        if(color) {
         context.fillStyle = color;   
        }
        context.fill();
        // look for a name parameter, or from the object
        name = name || this.name;   // otherwise it's undefined
        if (name) {
            context.font = "14px Arial";
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillText(name, this.x + 5, this.y);
        } else {
            //// writes out the location of the point next to it 
//            context.font = "14px Arial";
//            context.fillStyle = "rgb(0, 0, 0)";
//            context.fillText(x+":"+y, this.x + 5, this.y);
        }
    };

}

function Point(x, y, name) {
    'use strict';
    this.x = x;
    this.y = y;
    this.name = name;
    
    this.draw = function (name) {
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, Math.PI * 2);
        context.fillStyle = "rgb(250, 0, 0)";
        
//        if(color) {
//         context.fillStyle = color;   
//        }
        context.fill();
        // look for a name parameter, or from the object
        name = name || this.name;   // otherwise it's undefined
        if (name) {
            context.font = "14px Arial";
            context.fillStyle = "rgb(0, 0, 0)";
            context.fillText(name, this.x + 5, this.y);
        }  
    };
}
 
// utility function to interpolate between two numbers
function interpolateNumbers (num1, num2, t) {
    'use strict';
    return num1 + (num2 - num1) * t;
  // is the same as: num1 * (1-t) + num2 * t;
} 

// utility function to interpolate between two points
function interpolatePoints(point1, point2, t) {
    'use strict';
    return new Point(interpolateNumbers(point1.x, point2.x, t), interpolateNumbers(point1.y, point2.y, t));
}
// Calculates the interpolated point for a quadratic bezier curve
function quadraticBezier(pt1,pt2,pt3,t){
    var tempA,tempB;
    tempA = interpolatePoints(pt1,pt2,t);
    tempB =interpolatePoints(pt2,pt3,t);
    return   interpolatePoints(tempA,tempB,t) ;
}

// Calculates the interpolated point for a cubic bezier curve
function cubicBezier(p1, p2, p3, p4, t) {
    'use strict';
    var tempX = (1 - t) * interpolateQuadratic(p1, p2, p3, t).x + t * (interpolateQuadratic(p2, p3, p4, t).x);
    var tempY = (1 - t) * interpolateQuadratic(p1, p2, p3, t).y + t * (interpolateQuadratic(p2, p3, p4, t).y);
    return new Point(tempX, tempY);
}
// function for a Line object constructor
function Line(p1, p2) {
    'use strict';
    this.p1 = p1;
    this.p2 = p2;
    
    // this method draws solid line
    this.draw = function () {
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.lineTo(this.p2.x, this.p2.y);
        context.lineWidth = 1;
        context.strokeStyle = "rgb(0, 0, 0)";
        context.stroke();
    };
    
    // this method draws dotted line
    this.dotted = function (steps) {
        var ratio =  1.0 / steps, temp = 0;
        
        for (temp = 0; temp <= 1; temp += ratio) {
            interpolatePoints(this.p1, this.p2, temp).draw();
        }
    };
    
    // this method draws a dashed line
    this.dashed = function (steps) {
        var temp = 0, i = 0, ratio =  1.0 / steps;
        
        for (temp = 0; temp < 1; temp = temp + ratio) {
            if (i === 0) {
                context.save();
                context.beginPath();
                context.moveTo(interpolatePoints(this.p1, this.p2, temp).x, interpolatePoints(this.p1, this.p2, temp).y);
                context.lineTo(interpolatePoints(this.p1, this.p2, temp + ratio).x, interpolatePoints(this.p1, this.p2, temp + ratio).y);
                if(steps%2==0)
                {if (temp + ratio <= 1) 
                {
                    context.stroke();
                }
                }else
                {context.stroke();
                }
                context.restore();
                i = 1;
            } else {
                i = 0;
            }
        }
        i = 0;
    };
    
}

// Quadratic curve object constructor
function Quadratic(p1, p2, p3) {
    'use strict';
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.draw = function () {
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.quadraticCurveTo(this.p2.x, this.p2.y, this.p3.x, this.p3.y);
        context.lineWidth = 1;
        context.strokeStyle = "rgb(0, 0, 0)";
        context.stroke();
    };
}
// Calculates the interpolated point for a quadratic bezier curve
function interpolateQuadratic(point1, point2, point3, t) {
    'use strict';
    // B(t) = (1-t)[(1-t)P0 +tP1]+t[(1-t)P1+tP2]
//    
//    var tempX = (1 - t) * ((1 - t) * point1.x + t * point2.x) + t * ((1 - t) * point2.x + t * point3.x);
//  
//    var tempY = (1 - t) * ((1 - t) * point1.y + t * point2.y) + t * ((1 - t) * point2.y + t * point3.y);
//  
//    return new Point(tempX, tempY);
return    quadraticBezier(point1,point2,point3,t);
}

function averageNumbers(num1, num2) {
    'use strict';
    return (num1 + num2) / 2;
}
function averagePoints(point1, point2) {
    'use strict';
    return new Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
}

// assign a method for dotted Quadratic curves
Quadratic.prototype.dotted = function (steps) {
    'use strict';
    var ratio =  1.0 / steps;
    var temp = 0;
    for (temp = 0; temp <= 1; temp += ratio) {
        interpolateQuadratic(this.p1, this.p2, this.p3, temp).draw();
    }
};
  
// Cubic curve object constructor
function Cubic(p1, p2, p3, p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;

    this.draw = function () {
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.bezierCurveTo(this.p2.x, this.p2.y,
                              this.p3.x, this.p3.y,
                              this.p4.x, this.p4.y);
        context.lineWidth = 1;
        context.strokeStyle = "rgb(0, 0, 0)";
        context.stroke();
    };
}

function interpolateCubic(p1, p2, p3, p4, t) {
    'use strict';
//    var tempX = (1 - t) * interpolateQuadratic(p1, p2, p3, t).x + t * (interpolateQuadratic(p2, p3, p4, t).x);
//    var tempY = (1 - t) * interpolateQuadratic(p1, p2, p3, t).y + t * (interpolateQuadratic(p2, p3, p4, t).y);
//    return new Point(tempX, tempY);
    return cubicBezier(p1,p2,p3,p4,t);
}

// assign a method for dotted Cubic curves
Cubic.prototype.dotted = function (steps) {
    'use strict';
    var temp = 0, ratio =  1.0 / steps;
    
    for (temp = 0; temp <= 1; temp += ratio) {
        cubicBezier(this.p1, this.p2, this.p3, this.p4, temp).draw();
    } 
};
