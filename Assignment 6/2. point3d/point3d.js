
function main() {
  
  // get the canvas element
  var canvas = document.getElementById("canvas");
  
  // get the webgl context
  var gl = canvas.getContext("webgl");
  if (!gl) {
    alert("Cannot get a WebGL context.");
    return;
  }
  
  // specify a clear value for color buffer
  // (note that GL colors are 0.0 to 1.0, not 0 to 255)
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // black

  // clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // initialize the shaders
  if (!initShaders(gl, vertexShaderCode, fragmentShaderCode)) {
    alert('Cannot initialize the shaders.');
    return;
  }
  
  gl.drawArrays(gl.POINTS, 0, 1);
}


// Init shaders -----------------------------------------------

var vertexShaderCode = 
    'void main() { \n' +
    '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0); \n' + 
    '  gl_PointSize = 10.0; \n' +
    '} \n';

var fragmentShaderCode = 
    'void main() { \n' +
    '  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); \n' +
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
