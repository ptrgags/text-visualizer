//basic shapes. 
//Units are in turns
var HEXAGON = regularShape(6);
var TRIANGLE = regularShape(3);
var SQUARE = regularShape(4);
var CIRCLE = circleShape(0);

//Special shapes for this animation
var CIRCLE2 = circleShape(1/2);
var TRIANGLE_4 = [1/12, 5/12, 5/12, 9/12]; //Duplicate second point
var TRIANGLE_DOWN = rotateShape(TRIANGLE, 1/12);
var TRIANGLE_UP = rotateShape(TRIANGLE, 1/4);
var TRIANGLE_6 = duplicatePoints(TRIANGLE_UP, 2); //duplicate all points


var PHASES = [
	//Trace out two concentric circles
	[
		['anim', 'arc', 'outer', CIRCLE],
		['anim', 'arc', 'inner', CIRCLE2]
	],
	//Create a diamond at the four cardinal directions
	[
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape', 'outer', nullShape(4, 0), SQUARE]
	],
	//Turn diamond into an equliateral triangle pointing downwards
	[
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape', 'outer', SQUARE, TRIANGLE_4]
	],
	//Add a second triangle
	[	
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['static', 'shape', 'outer', TRIANGLE_DOWN],
		['anim', 'shape', 'inner', nullShape(3, 0), TRIANGLE_UP]
	],
	//Rotate outer triangle, inner triangle
	//morphs into a hexagon
	[	
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape', 'outer', TRIANGLE_DOWN, TRIANGLE_UP],
		['anim', 'shape', 'inner', TRIANGLE_6, HEXAGON]
	],
	//Both exit to the top
	[	
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape', 'outer', TRIANGLE_UP, nullShape(3, 1/4)],
		['anim', 'shape', 'inner', HEXAGON, nullShape(6, 1/4)]
	],
	//Enter a hexagon with diagonals from the top
	[	
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape-diag', 'inner', nullShape(6, 1/4), HEXAGON],
	],
	//Hexagon exits at the top, triangle with radials enters from right
	[	
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape-diag', 'inner', nullShape(6, 1/4), HEXAGON],
		['anim', 'shape-rad', 'outer', nullShape(3, 0), TRIANGLE_DOWN],
	],
	//Triangle exits to the right
	[	
		['static', 'arc', 'outer', CIRCLE],
		['static', 'arc', 'inner', CIRCLE2],
		['anim', 'shape-rad', 'outer', TRIANGLE_DOWN, nullShape(3, 1/2)]
	],
	//Un-trace the circles
	[	
		['anim-rev', 'arc', 'outer', CIRCLE],
		['anim-rev', 'arc', 'inner', CIRCLE2]
	]
];

/*
var PHASES = [
	//Trace out two concentric circles
	[
		['circle', 'outer', [0, 1, 'ccw']],
		['circle', 'inner', [1/2, 3/2, 'ccw']]
	],
	//Create a diamond at the four cardinal directions
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape', 'outer', [
			[0, 0, 'ccw'],
			[0, 1/4, 'ccw'],
			[0, 1/2, 'ccw'],
			[0, 3/4, 'ccw']
		]]
	],
	//Turn diamond into an equilateral triangle pointing downwards
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape', 'outer', [
			[0, 1/12, 'ccw'],
			[1/4, 5/12, 'ccw'],
			[1/2, 5/12, 'cw'],
			[3/4, 3/4, 'ccw']
		]]
	],
	//Add a second triangle the opposite way
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape-static', 'outer', [1/12, 5/12, 3/4]],
		['shape', 'inner', [
			[0, 1/4, 'ccw'], 
			[0, 7/12, 'ccw'],
			[0, 11/12, 'ccw']
		]]
	],
	//Rotate the outer triangle so it points upward.
	//make the inner triangle into a regular hexagon
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape', 'outer', [
			[1/12, 1/4, 'ccw'],
			[5/12, 7/12, 'ccw'],
			[3/4, 11/12, 'ccw']
		]],
		['shape', 'inner', [
			[1/4, 2/6, 'ccw'],
			[1/4, 1/2, 'ccw'],
			[7/12, 2/3, 'ccw'],
			[7/12, 5/6, 'ccw'],
			[11/12, 1, 'ccw'],
			[11/12, 1/6, 'ccw']
		]]
	],
	//All points exit at the top of the circle
    [
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape', 'outer', [
			[1/4, 1/4, 'ccw'],
			[7/12, 1/4, 'cw'],
			[11/12, 1/4, 'ccw']
		]],
		['shape', 'inner', [
			[2/6, 1/4, 'cw'],
			[1/2, 1/4, 'cw'],
			[2/3, 1/4, 'cw'],
			[5/6, 1/4, 'ccw'],
			[1, 1/4, 'ccw'],
			[1/6, 1/4, 'ccw']
		]]
	],
	//Hexagon with diagonals enters from top
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape-diagonals', 'inner', [
			[1/4, 1/3, 'ccw'],
			[1/4, 1/2, 'ccw'],
			[1/4, 2/3, 'ccw'],
			[1/4, 5/6, 'cw'],
			[1/4, 0, 'cw'],
			[1/4, 1/6, 'cw']
		]]
	],
	//Hexagon exits at top
	//Enter triangle from right with radials
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape-diagonals', 'inner', [
			[1/3, 1/4, 'cw'],
			[1/2, 1/4, 'cw'],
			[2/3, 1/4, 'cw'],
			[5/6, 1/4, 'ccw'],
			[0, 1/4, 'ccw'],
			[1/6, 1/4, 'ccw']
		]],
		['shape-radials', 'outer', [
			[0, 1/12, 'ccw'],
			[0, 5/12, 'ccw'],
			[0, 3/4, 'cw']
		]]
	],
	//Triangle exits to the left
	[
		['circle-static', 'outer'],
		['circle-static', 'inner'],
		['shape-radials', 'outer']
	],
	//Un-trace the circles
	[
		['circle', 'outer', [0, 1, 'ccw-inv']],
		['circle', 'outer', [1/2, 3/2, 'ccw-inv']]
	]
];*/
