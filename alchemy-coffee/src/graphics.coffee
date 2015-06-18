#clear the canvas
clearCanvas = (canvas) ->
	context = canvas.getContext "2d"
	context.clearRect(0, 0, canvas.width, canvas.height)

#Draw a line from point p1 to p2
#Points are in rectangular coordinates
drawLine = (context, p1, p2) ->
	context.beginPath()
	context.moveTo point1...
	context.moveTo point2...
	context.stroke()
