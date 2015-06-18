DELAY_FRAMES = 30
MAX_FRAMES = 45
INNER_RADIUS = 4/5
OUTER_RADIUS = 4/5

canvas = null
dimensions = {}
frame = 0
animationPhase = 0
delayFrame = 0

init ->
	reset()
	setInterval update, 33
	window.addEventListener "resize", reset, false

update ->
	if (frame < MAX_FRAMES)
		frame++
	else if (delayFrame < DELAY_FRAMES)
		delayFrame++
	else
		delayFrame = 0
		frame = 0

		#Cycle to the next phase
		animationPhase++
		animationPhase %= PHASES.length
	render()

reset ->
	canvas = getById "canvas"
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	#Distance from center to the closest side
	pageRadius = Math.min(canvas.width, canvas.height) / 2

	dimensions = 
		x: canvas.width / 2
		y: canvas.height / 2
		outer: pageRadius * OUTER_RADIUS
		inner: pageRadius * INNER_RADIUS

	frame = 0
	animationPhase = 0
	delayFrame = 0


