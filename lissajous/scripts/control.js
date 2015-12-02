//Variables
var canvas;     //The canvas
var data = {};  //Data to pass to the animation
var animation;  //The animation

/**
 * Initialize application
 */
function init() {
    //Grab the canvas
    canvas = dom.getById("canvas");

    //Set the cavnas dimensions
    dom.fullscreenCanvas(canvas);

    //Initialize the data
    data.context = canvas.getContext("2d");
    data.timer = new FrameTimer();
    data.dimensions = new Dimensions(canvas);

    //Create the animation
    animation = new TestAnimation();
    animation.init(data);
    dom.getById("title").innerHTML = animation.title;

    //Update the program 30 times per second
    setInterval(update, 33);

    //have the enter button trigger 
    document.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 13)
            submit();
    }, false);
}

/**
 * Adjust animation when window
 * is resized
 */
function resize() {
    dom.fullscreenCanvas(canvas);

    //Update the dimensions
    data.dimensions.setDimensions(canvas);

    //reset the animation
    animation.reset();
}

/**
 * Update the animation with a user-entered
 * string
 */
function submit() {
    var inputField = dom.getById("inputField");
    animation.sha1 = sha1(inputField.value ? inputField.value : "null");
    animation.reset();
    animation.calculateAnimation();
}

/**
 * update the animation with a random string
 */
function submitRandom() {
    //Clear input field
    var inputField = dom.getById("inputField");
    inputField.value = "";

    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var str = "";
    for (var i = 0; i < 32; i++)
        str += digits[Math.floor(Math.random() * 16)];
    animation.sha1 = str;
    animation.reset();
    animation.calculateAnimation();
}

/**
 * change the animation style
 */
function changeAnimation() {
    //Do nothing for now
}

/**
 * Update the application every frame
 */
function update() {
    //Increment frame counter
    data.timer.increment();
    
    //Update the animation
    animation.update();

    //Render changes to the screen
    render();
}

/**
 * render the current frame on the screen
 */
function render() {
    //Save drawing state of the canvas
    data.context.save();

    //Clear the canvas to draw the current frame
    gfx.clearCanvas(canvas);

    //Render the current frame of the animation
    animation.render();

    //Restore drawing state of the canvas
    data.context.restore();
}