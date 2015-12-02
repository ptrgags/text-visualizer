import processing.serial.*;

//Number of data points
float NUM_POINTS = 2000;
//Step size for the parameter
float T_STEP = TAU/NUM_POINTS;
//Minimum frequency
int FREQ_MIN = 0;
//Maximum frequency
int FREQ_MAX = 100;
//Step size for incrementing phase
float PHASE_STEP = PI/12;
//Minimum phase shift
float PHASE_MIN = 0;
//Maximum phase shift
float PHASE_MAX = TAU / PHASE_STEP;
//Amplitude of the curve
PVector AMPLITUDE = new PVector(200, 200);
//Use serial input data
int MODE_SERIAL = 0;
//Use keyboard input data
int MODE_KEYBOARD = 1;
//Minimum value for analog input
int ANALOG_MIN = 0;
//maximum value for analog input
int ANALOG_MAX = 256;
//Newline character
int NEWLINE = 10;
//Length of serial message in bytes including initial newline
int MESSAGE_LENGTH = 4;
//Bit mask for a button pressed event
int MASK_PRESSED = 0x04;

//Stores points for animation
ArrayList<PVector> points;
//stores center of the screen
PVector center;
//Stores the horizontal and vertical angular frequencies
PVector angularFrequency;
//Stores the horizontal and vertical phase shift
PVector phaseShift;
//Serial port
Serial port;
//Input mode
int inputMode;

void setup() {
    size(640, 480);
    reset();
    
    println(Serial.list());
    if (Serial.list().length != 0) {
        inputMode = MODE_SERIAL;
        port = new Serial(this, Serial.list()[0], 9600);
        port.bufferUntil(NEWLINE);
    }
    else
        inputMode = MODE_KEYBOARD;
}

void draw() {
    background(0);
    stroke(0xFFFF0000);
    drawPoints();
    text("ω: " + vectorString(angularFrequency), 0, 10);
    text("δ: " + vectorString(phaseShift), 0, 25);
}

void keyPressed() {
    if (inputMode == MODE_KEYBOARD) {
        boolean redraw = true;
        switch (key) {
            //Horizontal angular frequency up
            case 'D':
            case 'd':
                angularFrequency.x++;
                angularFrequency.x = constrain(angularFrequency.x, FREQ_MIN, FREQ_MAX);
                break;
            //Horizontal angular frequency down
            case 'A':
            case 'a':
                angularFrequency.x--;
                angularFrequency.x = constrain(angularFrequency.x, FREQ_MIN, FREQ_MAX);
                break;
            //Vertical angular frequency up
            case 'W':
            case 'w':
                angularFrequency.y++;
                angularFrequency.y = constrain(angularFrequency.y, FREQ_MIN, FREQ_MAX);
                break;
            //Vertical angular frequency down
            case 'S':
            case 's':
                angularFrequency.y--;
                angularFrequency.y = constrain(angularFrequency.y, FREQ_MIN, FREQ_MAX);
                break;
            //Horizontal Phase shift up
            case 'E':
            case 'e':
                phaseShift.x += PHASE_STEP;
                phaseShift.x = constrain(phaseShift.x, PHASE_MIN, PHASE_MAX);
                break;
            //Horizontal Phase shift down
            case 'Q':
            case 'q':
                phaseShift.x -= PHASE_STEP;
                phaseShift.x = constrain(phaseShift.x, PHASE_MIN, PHASE_MAX);
                break;
            case ' ':
                reset();
                break;
            default:
                redraw = false;
                break;
        }
        calculatePoints();
    }
}

void serialEvent(Serial port) {
    while(port.available() >= MESSAGE_LENGTH) {
        //Read the first byte
        int first = port.read();
        //If the first byte is a newline, read the message, else ignore the byte
        if (first == NEWLINE) {
            int xFreqRaw = port.read();
            int yFreqRaw = port.read();
            int phaseRaw = port.read();
            angularFrequency.x = map(xFreqRaw, ANALOG_MIN, ANALOG_MAX, 2, 25);
            angularFrequency.y = map(yFreqRaw, ANALOG_MIN, ANALOG_MAX, 1, 11);
            phaseShift.x = PHASE_STEP * map(phaseRaw, ANALOG_MIN, ANALOG_MAX, PHASE_MIN, PHASE_MAX);
            if (frameCount % 100 == 0)            
                calculatePoints();
        }
    }
}

void reset() {
    center = new PVector(width / 2, height / 2);
    angularFrequency = new PVector(2, 1);
    phaseShift = new PVector(0, 0);
    calculatePoints();
}

void calculatePoints() {
    try{
    points = new ArrayList<PVector>();
    for (float t = 0; t < TAU; t += T_STEP) {
        PVector angle = PVector.mult(angularFrequency, t);
        angle.add(phaseShift);
        PVector position = vectorSine(angle);
        position = scaleComponents(position, AMPLITUDE);
        position = PVector.add(position, center);
        points.add(position);
    }
    }
    catch(Exception e) {
        e.printStackTrace();
    }
}

//Takes the sine of each component of a vector and returns a new vector
PVector vectorSine(PVector angle) {
    return new PVector(sin(angle.x), sin(angle.y));
}

//Do an entry-wise scaling of a vector
PVector scaleComponents(PVector vector, PVector scale) {
    return new PVector(vector.x * scale.x, vector.y * scale.y);
}

//Get a string representation of the vector
String vectorString(PVector vector) {
    return "(" + vector.x + ", " + vector.y + ")";
}

//Draw Lissajous curve onto the screen
void drawPoints() {
    try{
    int n = points.size();
    for (int i = 1; i < n; i++) {
        PVector point1 = points.get(i - 1);
        PVector point2 = points.get(i);
        line(point1.x, point1.y, point2.x, point2.y);
    }
    PVector last = points.get(n - 1);
    PVector first = points.get(0);
    line(last.x, last.y, first.x, first.y);
    }
    catch(Exception e) {
        //e.printStackTrace();
    }
}

//Convert two serial bytes to a 16-bit integer
int toInt16(int firstHalf, int secondHalf) {
    return firstHalf << 8 | secondHalf;
}
