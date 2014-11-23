flagAlways = null;
setInterval("Draw()",50);
var oldEvent;
var x;
var y;
var color;
// code based off of sample code provided by professor
var gl;
//shape
     
function main() {
  
  // get the canvas element
  var canvas = document.getElementById("canvas");
  
  // get the webgl context
  gl = canvas.getContext("webgl");
  if (!gl) {
    alert("Cannot get a WebGL context.");
    return;
  }
  
  // initialize the shaders
  if (!initShaders(gl, vertexShaderCode, fragmentShaderCode)) {
    alert('Cannot initialize the shaders.');
    return;
  }
  
  // add event listeners to fill attributes and uniforms
  canvas.addEventListener("mousemove", function(e) { mouseMoveEvent(e, gl, canvas); });
  canvas.addEventListener("mousedown", mouseDownEvent);
  canvas.addEventListener("mouseup", mouseUpEvent);
   
  // specify a clear value for color buffer
  // (note that GL colors are 0.0 to 1.0, not 0 to 255)
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // black

  // clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);

 
} 



var points = [];
var tempPoint = [];
var colors = []; 
var isDown = false;


// Event handlers -----------------------------------------------

 
function mouseDownEvent(event)
{
    isDown = true; 
    oldEvent = event;
    addSquare(event,true);
    Draw(); 
}

function mouseUpEvent(event)
{
    isDown = false;
}
function getDistance(p1,p2)
{
    p3x = p1[0] - p2[0] ;
    p3y = p1[1] - p2[1] ; 
    return Math.sqrt(p3x*p3x+p3y*p3y);
}
function addSquare(event,flagAlways)
{ 
    { 
    if((event === undefined || event == null) )
    {event = oldEvent;}
    { 
       x = (event.clientX - canvas.offsetLeft - canvas.width/2) / (canvas.width/2);
       y = (canvas.height/2 - (event.clientY - canvas.offsetTop)) / (canvas.height/2);
    }
 
    // store the click point
      points.push([x, y]);

      // store a color for the point
        asdf =   Math.random()  ;
        color =   [0,asdf,0 ,1]; // : [1.0, (y*2003)%255, 0.0, 1.0];
        colors.push(color);  
    }
    
}
function Draw()
    { 
        if(points.length==0)      
        { 
            return;
        }
        tick++;
          // clear the color buffer
          gl.clear(gl.COLOR_BUFFER_BIT);

          // get the storage locations of attributes
          var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
          if (a_Position < 0) { alert('Cannot get a_Position'); return; }
          var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
          if (a_PointSize < 0) { alert('Cannot get a_PointSize'); return; }

          // get the storage locations of uniforms
          var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
          if (!u_FragColor) { alert('Cannot get u_FragColor'); return; }

          // put values into the attributes
          gl.vertexAttrib1f(a_PointSize, 20.0);
    
              // draw all the points stored in the points array
          var len = points.length;
          for (var i = 0; i < len; i++) {
              dad = 5*Math.random();
              console.log(dad);
            gl.vertexAttrib3f(a_Position, points[i][0], points[i][1], 0 );
              //colorLocation, r, g b, opacity
            gl.uniform4f(u_FragColor, colors[i][0], colors[i][1], colors[i][2], colors[i][3] );
            gl.drawArrays(gl.POINTS, 0, 1);
          }  
    if(tick<70 )
    {     
     tick = tick+1;
    }
    else{
        if(isDown)
        {
            tick=0; 
            addSquare(null,true);
        }
    }

    for( i=0;i<len;i++)
    {
        beneath = 0;
            for( q=0;q<len;q++)
                {
                    if(0<(points[i][0]-points[q][0]) && 0.1 > (points[i][0]-points[q][0]))
                    {
                        if(points[i][1]>points[q][1]) // is below
                        {
                            beneath++;    
                        }

                    }
                }

        if((points[i][1])> (-0.967 + 0.01*beneath)  )
        {
            points[i][1] = points[i][1] - 0.01;
            
            if(colors[i][0]<1)
                {colors[i][0]+=0.01;}
        }
        
        
     }
  }

var tick =0;

function mouseMoveEvent(event, gl, canvas) {
     oldEvent = event;
    if(!isDown) 
    {
        return;
    }

// addSquare(event);
      
        if(!(event === undefined || event == null) )
    { 
       x = (event.clientX - canvas.offsetLeft - canvas.width/2) / (canvas.width/2);
              y = (canvas.height/2 - (event.clientY - canvas.offsetTop)) / (canvas.height/2);
    }
    tempPoint.push([x,y]);
//    console.log(" d "+ getDistance(tempPoint[0],tempPoint[tempPoint.length-1]));
    t = Math.random();
  
    
    console.log("tick:"+tick);  
    if(tick<50 || flagAlways)
    {    
     tick = tick+1;
        if( getDistance(tempPoint[0],tempPoint[tempPoint.length-1])<(0.35 ) || flagAlways)
        {
            return; 
        }
    }
    
    tick = 0;
    
    tempPoint = [];
     addSquare(event);

    
    
}
 
// Init shaders -----------------------------------------------

var vertexShaderCode = 
    'attribute vec4 a_Position; \n' +
    'attribute float a_PointSize; \n' +
    'void main() { \n' +
    '  gl_Position = a_Position; \n' + 
    '  gl_PointSize = a_PointSize ; \n' +
    '} \n';

var fragmentShaderCode = 
    'precision mediump float; \n' +
    'uniform vec4 u_FragColor; \n' +
    'void main() { \n' +
    '  gl_FragColor = u_FragColor; \n' +
    '} \n';


function initShaders(gl, vshader, fshader) {
  
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    alert('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;
  return true;
}

function createProgram(gl, vshader, fshader) {
  
  // Create and compile the shader objects
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) return null;

  // Create a program object
  var program = gl.createProgram();
  if (!program) return null;

  // Attach the shader objects
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // Link the program object
  gl.linkProgram(program);

  // Check the result of linking
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    alert('Failed to link program: ' + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }
  
  return program;
}


function createShader(gl, type, source) {
  
  // Create a shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    alert('Unable to create shader');
    return null;
  }

  // Set the shader source and compile it
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    alert('Failed to compile shader: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
