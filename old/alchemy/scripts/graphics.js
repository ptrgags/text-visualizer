function clearCanvas(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawWedge(context, x, y, r, percentage) {
    context.beginPath();
    context.arc(x, y, r, 0, -(percentage * 2 * Math.PI), true);
    context.lineTo(x, y);
    context.fill();
    context.stroke();
}