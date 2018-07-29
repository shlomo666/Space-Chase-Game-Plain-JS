const Rectangle = require('./Rectangle');

class Shoot extends Rectangle {
    constructor(x, y, step, limit) {
        super(x, y, 80, 2);
        this.step = step;
        this.limit = limit;
        this.stoped = false;
    }

    stop() {
        this.stoped = true;
    }

    advance() {
        this.x += this.step;
    }

    get active() {
        return !this.stoped && (this.step > 0 && this.x < this.limit) || (this.step < 0 && this.x > this.limit);
    }
}

module.exports = Shoot;