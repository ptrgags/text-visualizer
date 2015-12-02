/**
 * Class TestAnimation extends Plugin
 * Test animation with an oscillating square
 */
var TestAnimation = function () {
    Plugin.call(this);

    

    var FULL_CYCLE = 2 * Math.PI;       //Radians in a full period of a trig function
    var QUARTER_CYLE = FULL_CYCLE / 4;  //Radians in a quarter period of a trig function

    this.square = {};           //The coordinates for the square
    this.framesIndex = 0;       //index for the number of frames
    this.widthDivisor = 2;      //index for the divisor for the width
    this.heightDivisor = 3;     //index for the divisor for the height
    this.hFrequency = 1;        //horizontal frequency
    this.vFrequency = 0;        //vertical frequency
    this.hFrequencyShift = 0;   //Horizontal frequency shift
    this.vFrequencyShift = 0;   //Vertical frequency shift
    this.color = "#FFFFFF";     //Color of the square
    this.hSign = -1;            //Sign of the horizontal part of the animation
    this.vSign = -1;            //Sign of the vertical part of the animation
    
    this.title = "Test Animation";  //Animation title
    this.points = [];               //Points for tracing

    //@Override
    this.calculateAnimation = function () {
        this.framesIndex = this.intAt(0) % 4;
        this.widthDivisor = this.intAt(1) % 4;
        this.heightDivisor = Math.floor(this.intAt(1) / 4);
        this.hFrequencyShift = this.intAt(4) % 8;
        this.vFrequencyShift = Math.floor(this.intAt(5) / 2);
        this.hFrequency = this.intAt(2) % 4 + this.hFrequencyShift;
        this.vFrequency = Math.floor(this.intAt(2) / 4) + this.vFrequencyShift;
        this.hSign = this.intAt(3) % 2 ? -1 : 1;
        this.vSign = this.intAt(3) / 8 ? -1 : 1;
        this.color = "#" + this.sha1.substring(0, 6);
    }

    //@Override
    this.update = function () {
        var totalFrames = frames(this.framesIndex);
        var percent = this.timer.frame % totalFrames / totalFrames;
        this.square.x = this.dimensions.cx + this.hSign * this.dimensions.w / divisor(this.widthDivisor) * Math.cos(this.hFrequency * FULL_CYCLE * percent - QUARTER_CYLE);
        this.square.y = this.dimensions.cy + this.vSign * this.dimensions.h / divisor(this.heightDivisor) * -Math.sin(this.vFrequency * FULL_CYCLE * percent);
        this.square.h = this.dimensions.h / 10;
        this.square.w = this.square.h;
        if (this.points.length < totalFrames * 4)
            this.points.push([this.square.x, this.square.y]);
    }

    //@Override
    this.render = function () {
        //Alias the context
        var ctx = this.context;

        //Set the new drawing state
        ctx.strokeStyle = this.color;

        //Animate the square
        gfx.drawCenteredRect(ctx, this.square.x, this.square.y, this.square.w, this.square.h);

        for (var i = 0; i < this.points.length - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(this.points[i][0], this.points[i][1]);
            ctx.lineTo(this.points[i + 1][0], this.points[i + 1][1]);
            ctx.stroke();
        }
    }

    //@Override
    this.reset = function () {
        this.points = [];
    }

    /**
     * Get the number of frames from a number i
     * @pre i is in the range 0...4
     * @return number from 45 to 60
     */
    function frames(i) {
        return 45 + Math.pow(5, i);
    }

    /**
     * Get the width/height divisor from a number i
     * @pre i is in the range 0...4
     * @return divisor
     */
    function divisor(i) {
        return Math.pow(2, i+2);
    }
}
TestAnimation.prototype = new Plugin();