//Generate an array of angle coordinates
//for a shape of any radius. units are in turns
//Returns an array of length `sides` with
//the coordinates
var regularShape = function(sides) {
	var shape = [];
	for (var i = 0; i < sides; i++)
		shape.push(i / sides);
	return shape;
}

//Create a point with duplicate vertices
//Angle must be in turns
var nullShape = function(vertices, angle) {
	var shape = [];
	for (var i = 0; i < vertices; i++)
		shape.push(angle);
	return shape;
}

//Return a shape-like arc
var arcShape = function(startAngle, endAngle) {
	return [startAngle, endAngle];
}

//return a circle shape
var circleShape = function(startAngle) {
	return arcShape(startAngle, startAngle + 1);
}

//Rotate a shape's coordinates.
//angle must be positive.
var rotateShape = function(shape, angle) {
	var outShape = [];
	for (var i in shape) {
		var point = (shape[i] + angle) % shape.length;
		outShape.push(point);
	}
	return outShape;
}

//Cycle a shape's coordinates a number
//of places. places must be positive
var cycleVertices = function(shape, places) {
	var outShape = [];
	for (var i in shape) {
		var point = shape[(i + places) % shape.length];
		outShape.push(point);
	}
	return outShape;
}

//Duplicate points in a shape a number
//of times. ex. [1, 2, 3], 2 -> [1, 1, 2, 2, 3, 3]
var duplicatePoints = function(shape, times) {
	var outShape = [];
	for (var i in shape) {
		for (var j = 0; j < times; j++)
			outShape.push(shape[i]);
	}
	return outShape;
}

//repeat the points in a shape a number of 
//times. ex. [1, 2, 3], 2 -> [1, 2, 3, 1, 2, 3]
var repeatePoints = function(shape, times)
{
	var outShape = [];
	for (var i = 0; i < times; i++) {
		for (var j in shape)
			outShape.push(shape[j]);
	}
	return outShape;
}

//TODO: Might need to change this
//Map the turns and radius to polar coordinates
var convertToPolar = function(shape, radius) {
	var points = [];
	for (i in shape) {
		var turns = shape[i];
		points.push([radius, turns * 2.0 * Math.PI]);
	}
	return points;
}

//TODO: Not sure if we need this
//Convert polar coordinates to rectangular
var toRect = function(polar) {
	r = polar[0];
	theta = polar[1];
	return [r * Math.cos(theta), r * -Math.sin(theta)];
}
