var canvas;
var dimensions = {};
var frame = 0;
var maxFrames = 45;
var animationPhase = 0;
var animationPhaseMax = 9;
var delayFrame = 0;
var delayFrames = 30;
var points = [];


function init() {
    reset();

    setInterval(update, 33);
    window.addEventListener("resize", reset, false);
}

function update() {
    if (frame < maxFrames)
        frame++;
    else if (delayFrame < delayFrames)
        delayFrame++;
    else {
        delayFrame = 0;
        frame = 0;
        if (animationPhase < animationPhaseMax)
            animationPhase++;
        else
            animationPhase = 0;
    }
    render();
}

function reset() {
    canvas = getById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dimensions.CENTER_X = canvas.width / 2;
    dimensions.CENTER_Y = canvas.height / 2;
    dimensions.OUTER_RADIUS = Math.min(canvas.width, canvas.height) * 2 / 5;
    dimensions.INNER_RADIUS = dimensions.OUTER_RADIUS * 8 / 10;


    //Transition 1:
    //outerShapeOn = true
    //outerShape = SHAPE_SQUARE
    //outerAnchor = ANCHOR_RIGHT
    //innerShapeOn = false
    //innerShape = SHAPE_NONE
    //outerAnchor = ANCHOR_NONE
    //pattern = PATTERN_NONE
    
    points = [
        new PolarPoint(dimensions.OUTER_RADIUS, 0, 0),
        new PolarPoint(dimensions.OUTER_RADIUS, 0, Math.PI / 2),
        new PolarPoint(dimensions.OUTER_RADIUS, 0, Math.PI),
        new PolarPoint(dimensions.OUTER_RADIUS, 0, 3 * Math.PI / 2)
    ];

    points2 = [
        new PolarPoint(dimensions.OUTER_RADIUS, 0, Math.PI / 6),
        new PolarPoint(dimensions.OUTER_RADIUS, Math.PI / 2, 5 * Math.PI / 6),
        new PolarPoint(dimensions.OUTER_RADIUS, Math.PI, 5 * Math.PI / 6),
        new PolarPoint(dimensions.OUTER_RADIUS, 3 * Math.PI / 2, 3 * Math.PI / 2)
    ];
    points2b = [
        new PolarPoint(dimensions.INNER_RADIUS, 0, Math.PI / 2),
        new PolarPoint(dimensions.INNER_RADIUS, 0, 7 * Math.PI / 6),
        new PolarPoint(dimensions.INNER_RADIUS, 0, 11 * Math.PI / 6)
    ];

    points3 = [
        new PolarPoint(dimensions.OUTER_RADIUS, Math.PI / 6, Math.PI / 2),
        new PolarPoint(dimensions.OUTER_RADIUS, 5 * Math.PI / 6, 7 * Math.PI / 6),
        new PolarPoint(dimensions.OUTER_RADIUS, 3 * Math.PI / 2, 11 * Math.PI / 6)
    ];
    points3b = [
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, 2 * Math.PI / 3),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, Math.PI),
        new PolarPoint(dimensions.INNER_RADIUS, 7 * Math.PI / 6, 4 * Math.PI / 3),
        new PolarPoint(dimensions.INNER_RADIUS, 7 * Math.PI / 6, 5 * Math.PI / 3),
        new PolarPoint(dimensions.INNER_RADIUS, -Math.PI / 6, 0),
        new PolarPoint(dimensions.INNER_RADIUS, -Math.PI / 6, Math.PI / 3)
    ];

    points4 = [
        new PolarPoint(dimensions.OUTER_RADIUS, Math.PI / 2, Math.PI / 2),
        new PolarPoint(dimensions.OUTER_RADIUS, 7 * Math.PI / 6, Math.PI / 2),
        new PolarPoint(dimensions.OUTER_RADIUS, -Math.PI / 6, Math.PI / 2)
    ];
    points4b = [
        new PolarPoint(dimensions.INNER_RADIUS, 2 * Math.PI / 3, Math.PI / 2),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI, Math.PI / 2),
        new PolarPoint(dimensions.INNER_RADIUS, 4 * Math.PI / 3, Math.PI / 2),
        new PolarPoint(dimensions.INNER_RADIUS, -Math.PI / 3, Math.PI / 2),
        new PolarPoint(dimensions.INNER_RADIUS, 0, Math.PI / 2),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 3, Math.PI / 2)
    ];

    points5 = [
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, 2 * Math.PI / 3),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, Math.PI),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, 4 * Math.PI / 3),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, -Math.PI / 3),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, 0),
        new PolarPoint(dimensions.INNER_RADIUS, Math.PI / 2, Math.PI / 3)
    ];

    points6 = [
        new PolarPoint(dimensions.OUTER_RADIUS, 0, Math.PI / 6),
        new PolarPoint(dimensions.OUTER_RADIUS, 0, 5 * Math.PI / 6),
        new PolarPoint(dimensions.OUTER_RADIUS, 0, -Math.PI / 2)
    ];
    points6b = points4b;

    points7 = [
        new PolarPoint(dimensions.OUTER_RADIUS, Math.PI / 6, Math.PI),
        new PolarPoint(dimensions.OUTER_RADIUS, 5 * Math.PI / 6, Math.PI),
        new PolarPoint(dimensions.OUTER_RADIUS, 3 * Math.PI / 2, Math.PI)
    ];

    frame = 0;
    animationPhase = 0;
    delayFrame = 0;
}

function rotatePoints(points, percent) {
    for (var i in points) {
        points[i].theta = -(points[i].thetaMin + (points[i].thetaMax - points[i].thetaMin) * (Math.min(percent, 1)));
        points[i].toRect();
    }
}

function render() {
    var context = canvas.getContext("2d");
    clearCanvas(canvas);

    context.lineWidth = 4;
    context.lineJoin = "round";
    context.strokeStyle = "#BBFFFF";
    context.fillStyle = "#FFFFFF";
    context.font = "30px Arial";
    context.shadowBlur = 20;
    context.shadowColor = "#FFFFFF";

    switch (animationPhase) {
        case 0:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, getPercent());
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, getPercent());
            break;
        case 1:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points, getPercent());
            break;
        case 2:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points2, getPercent());
            break;
        case 3:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points2, 1);
            drawShape(context, points2b, getPercent());
            break;
        case 4:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points3, getPercent());
            drawShape(context, points3b, getPercent());
            break;
        case 5:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points4, getPercent());
            drawShape(context, points4b, getPercent());
            break;
        case 6:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points5, getPercent());
            drawDiagonals(context, points5, getPercent());
            break;
        case 7:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points6b, getPercent());
            drawDiagonals(context, points6b, getPercent());
            drawShape(context, points6, getPercent());
            drawRadials(context, points6, getPercent());
            break;
        case 8:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, 1);
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, 1);
            drawShape(context, points7, getPercent());
            drawRadials(context, points7, getPercent());
            break;
        case 9:
            drawCircle(context, dimensions.OUTER_RADIUS, 0, getInversePercent());
            drawCircle(context, dimensions.INNER_RADIUS, Math.PI, getInversePercent());
            break;
    }
}

function getPercent() {
    return frame / maxFrames;
}

function getInversePercent() {
    return 1 - getPercent();
}

function drawCircle(context, radius, startAngle, percent) {
    context.beginPath();
    context.arc(dimensions.CENTER_X, dimensions.CENTER_Y, radius, startAngle, startAngle - (2 * Math.PI * percent), true);
    context.stroke();
}

function drawShape(context, points, percent) {
    rotatePoints(points, percent);
    context.beginPath();
    context.moveTo(dimensions.CENTER_X + points[0].x, dimensions.CENTER_Y + points[0].y);
    for (var i = 1; i < points.length; i++)
        context.lineTo(dimensions.CENTER_X + points[i].x, dimensions.CENTER_Y + points[i].y);
    context.closePath();
    context.stroke();
}

function drawRadials(context, points, percent) {
    rotatePoints(points, percent);
    for (var i in points) {
        context.beginPath();
        context.moveTo(dimensions.CENTER_X, dimensions.CENTER_Y);
        context.lineTo(dimensions.CENTER_X + points[i].x, dimensions.CENTER_Y + points[i].y);
        context.stroke();
    }
}

function drawDiagonals(context, points, percent) {
    rotatePoints(points, percent);
    for (var i = 0; i < points.length; i++) {
        for (var j = i + 1; j < points.length; j++) {
            context.beginPath();
            context.moveTo(dimensions.CENTER_X + points[i].x, dimensions.CENTER_Y + points[i].y);
            context.lineTo(dimensions.CENTER_X + points[j].x, dimensions.CENTER_Y + points[j].y);
            context.stroke();
        }
    }
}