/**
 * Class Dimensions
 * A class for calculating the dimensions of
 * a canvas object
 */
var Dimensions = function (canvas) {
    /** width of canvas */
    this.w = 0;
    /** height of canvas */
    this.h = 0;
    /** Center x coordinate */
    this.cx = 0;
    /** Center y coordinate */
    this.cy = 0;

    /** 
     * Set the dimensions based on a canvas 
     * @param canvas the canvas to work with
     */
    this.setDimensions = function (canvas) {
        this.w = canvas.width;
        this.h = canvas.height;
        this.calculateCenter();
    }

    /**
     * Calculate the coordinates of the center point
     */
    this.calculateCenter = function () {
        this.cx = this.w / 2;
        this.cy = this.h / 2;
    }

    //Initialize dimensions
    if (canvas)
        this.setDimensions(canvas);
}