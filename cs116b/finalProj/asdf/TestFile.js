// Test file to create new features
var CreateTerrain = function(parameters) // x,y location , world seed, size of plot
{
    if(parameters === undefined)
        {
            parameters = {};
        }
    if(parameters.x === undefined)
        {
            parameters.x = 0;
        }
    if(parameters.y === undefined)
        {
            parameters.y = 0;
        }
     if(parameters.seed === undefined)
        {
            parameters.seed =  Math.random();
        }
     if(parameters.size === undefined)
        {
            parameters.size =  {x:1000,y:1000};
        }
     if(parameters.resolution === undefined)
        {
            parameters.size =  {x:1000,y:1000};
        }
    
    var subsub = 64;
    var subX =subsub,subY=subsub;
    var boxHeight=100,boxX =  100,boxY =  100;
    // note all of this is because its rotated for easier data insertion
    var geometry = new THREE.BoxGeometry( boxHeight, boxY, boxX,1,subY, subX );  
//    var geometry = new THREE.TerrainGeometry(100,100,100,100,100,100);
    var material = new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x009900, shininess: 30, shading: THREE.FlatShading , wireframe:false} );//new THREE.MeshBasicMaterial( {color: 0x00ff00,wireframe:true} );
     
   customTerra = new THREE.Mesh( geometry, material ); 
 
    customTerra.rotateZ(degreeToRadian(90));
     var centerPosition = {x:0,y:0}; 
    
    var data = generateHeight2(subX,subY,{x:0,y:0},120);
    for(var i =0;i<customTerra.geometry.vertices.length;i++)
    {customTerra.geometry.vertices[i]=new THREE.Vector3(data[i]*100,customTerra.geometry.vertices[i].y,customTerra.geometry.vertices[i].z);}
    
scene.add( customTerra );
 
    
}



function generateHeight(xVerticeCount,yVerticeCount, position, seed ) {

    var seed1 = seed|| Math.random *100;
    var size = xVerticeCount * yVerticeCount, data = new Uint8Array( size );
   // perlin = new ImprovedNoise(), quality = 1, z = seed1;

    for ( var j = 0; j < 4; j ++ ) {

        for ( var i = 0; i < size; i ++ ) {

            var x = i % width, y = ~~ ( i / width ); // the ~~ basically truncates the decimal value
            data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

        }

        quality *= 5;

    }

    return data;

}


function generateHeight2(xVerticeCount,yVerticeCount, position, seed ) {

    var seed1 = seed|| Math.random *100;
    var data = new Uint8Array( xVerticeCount * yVerticeCount );
  
    for(var i=0;i<=yVerticeCount;i++)
        {
            for(var j=0;j<=xVerticeCount;j++)
            {
                data[i*yVerticeCount+j] = 
                    getExtensionValue(j+position.x,i+position.y,seed,100)+
                    getExtensionValue(j+position.x,i+position.y,seed,50)+               
                    getExtensionValue(j+position.x,i+position.y,seed,10);
            }
        } 
    return data;

}


 
function getExtensionValue (x,y,seed,step){
    if(x===0)
        {
            x=seed*17+y;
        }
        if(y===0)
        {
            y=seed*19+x;
        }
    if(x===0)
        {x=1;}
    if(y===0)
        {y=1;}
    
    var ax = x-x%step ;
    var bx = x+x%step ;
    var tx = ax/bx;

    var ay = y-y%step ;
    var by = y+y%step ;
    var ty = ay/by;
    
    var a,b,c,d;
    a = generateRnd1(ax,by,seed); // top left
    b = generateRnd1(bx,by,seed); // top right
    c = generateRnd1(ax,ay,seed); // bot left
    d = generateRnd1(bx,ay,seed); // bot right
    
    var top = interpolateNumbers(a,b,tx);
    var bot = interpolateNumbers(c,d,tx);
    
    return interpolateNumbers(top,bot,ty);
    
}

function generateRnd1(x,y,seed)
{
    var a =  (x*(y+1));
    var b =  (y*(x+1)); 
    return    (((a<b)?a*(seed+b)+b:b*(seed+a)+a)/seed)%1 ; //[0,1]
}

// utility function to interpolate between two numbers
function interpolateNumbers (a, b, t) {
    'use strict';
    return a + (b - a) * t;
  // is the same as: num1 * (1-t) + num2 * t;
} 

// utility function to interpolate between two points
function interpolatePoints(a, b, t) {
    'use strict';
    return  {x:interpolateNumbers(a.x, b.x, t),y: interpolateNumbers(a.y, b.y, t)};
}
// Calculates the interpolated point for a quadratic bezier curve
function quadraticBezier(pt1, pt2, pt3, t) {
    'use strict';
    var tempA,tempB; 
    tempA = interpolatePoints(pt1, pt2, t);
    tempB =interpolatePoints(pt2, pt3, t);
    return   interpolatePoints(tempA, tempB, t) ;
}


//// Simplex noise
////in two dimensions:
//general_skew = (sqrt(3)-1)/2;
//general_unskew = (3 - sqrt(3))/6;


/**
 * edited by Oliver Seet : reduces number of faces on sides
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 */

THREE.TerrainGeometry = function ( width, height, depth, widthSegments, heightSegments, depthSegments ) {

	THREE.Geometry.call( this );

	this.type = 'BoxGeometry';

	this.parameters = {
		width: width,
		height: height,
		depth: depth,
		widthSegments: widthSegments,
		heightSegments: heightSegments,
		depthSegments: depthSegments
	};

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;
	this.depthSegments = depthSegments || 1;

	var scope = this;

	var width_half = width / 2;
	var height_half = height / 2;
	var depth_half = depth / 2;

	buildPlane( 'z', 'y', - 1, - 1, depth, height, width_half, 0 ); // px  
	build_Face( 'z', 'y',   1, - 1, depth, height, - width_half, 1 ); // nx 
	build_Face( 'x', 'z',   1,   1, width, depth, height_half, 2 ); // py
	build_Face( 'x', 'z',   1, - 1, width, depth, - height_half, 3 ); // ny
	build_Face( 'x', 'y',   1, - 1, width, height, depth_half, 4 ); // pz
	build_Face( 'x', 'y', - 1, - 1, width, height, - depth_half, 5 ); // nz

	function buildPlane( u, v, udir, vdir, width, height, depth, materialIndex ) {

		var w, ix, iy,
		gridX = scope.widthSegments,
		gridY = scope.heightSegments,
		width_half = width / 2,
		height_half = height / 2,
		offset = scope.vertices.length;

		if ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {

			w = 'z';

		} else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {

			w = 'y';
			gridY = scope.depthSegments;

		} else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {

			w = 'x';
			gridX = scope.depthSegments;

		}

		var gridX1 = gridX + 1,
		gridY1 = gridY + 1,
		segment_width = width / gridX,
		segment_height = height / gridY,
		normal = new THREE.Vector3();

		normal[ w ] = depth > 0 ? 1 : - 1;

		for ( iy = 0; iy < gridY1; iy ++ ) {

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var vector = new THREE.Vector3();
				vector[ u ] = ( ix * segment_width - width_half ) * udir;
				vector[ v ] = ( iy * segment_height - height_half ) * vdir;
				vector[ w ] = depth;

				scope.vertices.push( vector );

			}

		}

		for ( iy = 0; iy < gridY; iy ++ ) {

			for ( ix = 0; ix < gridX; ix ++ ) {

				var a = ix + gridX1 * iy;
				var b = ix + gridX1 * ( iy + 1 );
				var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = ( ix + 1 ) + gridX1 * iy;

				var uva = new THREE.Vector2( ix / gridX, 1 - iy / gridY );
				var uvb = new THREE.Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY );
				var uvc = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - ( iy + 1 ) / gridY );
				var uvd = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY );

				var face = new THREE.Face3( a + offset, b + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

				face = new THREE.Face3( b + offset, c + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

			}

		}

	}
 
	function build_Face( u, v, udir, vdir, width, height, depth, materialIndex ) {

		var w, ix, iy,
		gridX = 1,
		gridY = 1,
		width_half = width / 2,
		height_half = height / 2,
		offset = scope.vertices.length;

		if ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {

			w = 'z';

		} else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {

			w = 'y';
			gridY = scope.depthSegments;

		} else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {

			w = 'x';
			gridX = scope.depthSegments;

		}

		var gridX1 = gridX + 1,
		gridY1 = gridY + 1,
		segment_width = width / gridX,
		segment_height = height / gridY,
		normal = new THREE.Vector3();

		normal[ w ] = depth > 0 ? 1 : - 1;

		for ( iy = 0; iy < gridY1; iy ++ ) {

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var vector = new THREE.Vector3();
				vector[ u ] = ( ix * segment_width - width_half ) * udir;
				vector[ v ] = ( iy * segment_height - height_half ) * vdir;
				vector[ w ] = depth;

				scope.vertices.push( vector );

			}

		}

		for ( iy = 0; iy < gridY; iy ++ ) {

			for ( ix = 0; ix < gridX; ix ++ ) {

				var a = ix + gridX1 * iy;
				var b = ix + gridX1 * ( iy + 1 );
				var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = ( ix + 1 ) + gridX1 * iy;

				var uva = new THREE.Vector2( ix / gridX, 1 - iy / gridY );
				var uvb = new THREE.Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY );
				var uvc = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - ( iy + 1 ) / gridY );
				var uvd = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY );

				var face = new THREE.Face3( a + offset, b + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

				face = new THREE.Face3( b + offset, c + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

			}

		} 
	}
 
	this.mergeVertices();

};

THREE.TerrainGeometry.prototype = Object.create( THREE.Geometry.prototype );
THREE.TerrainGeometry.prototype.constructor = THREE.TerrainGeometry;

 

 

//
//
/*
for (var x = 0; x < amountOfParticles; x++) {
					positions[ x * 3 + 0 ] = Math.random() * 1000;
					positions[ x * 3 + 1 ] = Math.random() * 1000;
					positions[ x * 3 + 2 ] = Math.random() * 1000;
					alphas[x] = 1.0;
				}
var distanceFunction = function(a, b){
					return Math.pow(a[0] - b[0], 2) +  Math.pow(a[1] - b[1], 2) +  Math.pow(a[2] - b[2], 2);
				};				

kdtree = new THREE.TypedArrayUtils.Kdtree( positions, distanceFunction, 3 );

//*/