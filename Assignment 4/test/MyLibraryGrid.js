class Point (x,y){
    this.x = x;
    this.y = y;
}

function load(){ 
    
    var canvas = document.getElementById('mycanvas'); 
    var size = 1;
    
    if (canvas.getContext){
     var z;
        for( var temp = 1;temp<5;temp++)
        {
            z = size *(10*temp);  
            alert(z);
            drawGrid(canvas,z);
        }
         } else {
    alert('Your browser does not support canvas.');
  }
}

function drawGrid(canvas,size){ 
    var ctx = canvas.getContext('2d');      
    ctx.strokeStyle =  "rgba(0,0,255,0.08)";
    for(var x=0;x<canvas.width;x++ ){
        ctx.beginPath();
        ctx.moveTo(x*size+0.5,0);
        ctx.lineTo(x*size+0.5,canvas.height);
        ctx.stroke();
    }
    for(var x=0;x<canvas.height;x++ ){
        ctx.beginPath();
        ctx.moveTo(0,x*size+0.5);
        ctx.lineTo(canvas.width,x*size+0.5);
        ctx.stroke();
    }       
}

function drawRectangle(Point a,){
    
}