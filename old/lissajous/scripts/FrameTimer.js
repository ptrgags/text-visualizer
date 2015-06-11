/**
 * Class FrameTimer
 * A simple elapsed frame counter
 */
var FrameTimer = function () {
    /* The current frame */
    this.frame = 0;

    /**
     * Increment the frame
     */
    this.increment = function () {
        this.frame++;
    }
}