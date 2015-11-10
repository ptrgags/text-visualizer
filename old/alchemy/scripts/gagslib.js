//Get element by id
function getById(id) {
	return document.getElementById(id);
}

//Open link in a new window
function popup(url, title, width, height) {
	window.open(url, title, "width=" + width + ", height=" + height);
}