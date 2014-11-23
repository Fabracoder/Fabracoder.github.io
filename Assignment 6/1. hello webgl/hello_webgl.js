
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
  gl.clearColor(1.0, 0.0, 0.0, 0.0); // black

  // clear the color buffer
  gl.clear(gl.COLOR_BUFFER_BIT);
}
