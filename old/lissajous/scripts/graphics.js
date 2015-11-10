/**
 * graphics library module
 */
var gfx = (function () {

    /**
     * Clear a canvas
     */
    function clearCanvas(canvas) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    /** 
     * draw a rectangle centered about a point
     * @param context the canvas context to draw on
     * @param cx the center x coordinate
     * @param cy the center y coordinate
     * @param w the width of the rectangle
     * @param h the height of the rectangle
     */
    function drawCenteredRect(context, cx, cy, w, h) {
        context.beginPath();
        context.rect(cx - w / 2, cy - h / 2, w, h);
        context.stroke();
    }

    return {
        clearCanvas: clearCanvas,
        drawCenteredRect: drawCenteredRect
    };
})();
