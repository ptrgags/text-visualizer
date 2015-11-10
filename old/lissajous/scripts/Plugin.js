/**
 * Abstract Class Plugin
 * Defines the basic plugin interface
 */
var Plugin = function () {
    this.sha1 = "";
    this.title = "Test Animation";

    /** 
     * initialize the plugin
     * @param data the data to give the plugin
     */
    this.init = function (data) {
        this.dimensions = data.dimensions;
        this.timer = data.timer;
        this.context = data.context;
    }

    /**
     * calculate the animation params based on
     * the saved md5 hash
     */
    this.calculateAnimation = function () { };

    /**
     * update the animation based on the current frame
     */
    this.update = function () { };

    /**
     * render the animation on the screen
     */
    this.render = function () { };

    /**
     * reset the animation
     */
    this.reset = function () { };

    /**
     * get the integer equivalent of a hex digit
     * in the MD5 string
     */
    this.intAt = function (index) {
        return parseInt(this.sha1.charAt(index), 16);
    };
}