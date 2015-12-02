/**
 * DOM library module
 */
var dom = (function () {

    /**
     * Alias method for document.getElementById()
     * @param id the id of an element
     * @return document.getElementById(id);
     */
    function getById(id) {
        return document.getElementById(id);
    }

    /**
     * set the canvas dimensions based on
     * the full size of the window
     */
    function fullscreenCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    return {
        getById: getById,
        fullscreenCanvas: fullscreenCanvas
    };
})();

