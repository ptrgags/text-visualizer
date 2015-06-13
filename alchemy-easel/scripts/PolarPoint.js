var PolarPoint = function (r, theta, thetaMax, clockwise) {
    this.r = r;
    this.theta = theta;
    this.thetaMax = thetaMax;
    this.thetaMin = theta;
    this.clockwise = clockwise;
    this.x = null;
    this.y = null;

    this.toRect = function () {
        this.x = this.r * Math.cos(this.theta);
        this.y = this.r * Math.sin(this.theta);
    }

    this.toRect();
}