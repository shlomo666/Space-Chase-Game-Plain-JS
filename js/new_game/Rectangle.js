class Rectangle {
    /** @param {number} x */
    /** @param {number} y */
    /** @param {number} width */
    /** @param {number} height */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get right() {
        return this.x + this.width;
    }

    get bottom() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }

    get top() {
        return this.y;
    }

    get center() {
        return {
            x: Math.floor(this.x + this.width / 2), 
            y: Math.floor(this.y + this.height / 2)
        }
    }
    /** @param {Rectangle} rect */
    touches(rect) {
        const isX = (this.right > rect.left && this.left < rect.right) || (this.right < rect.left && this.left > rect.right);
        const isY = (this.top > rect.bottom && this.bottom < rect.top) || (this.top < rect.bottom && this.bottom > rect.top);
        return isX && isY;
    }
}

module.exports = Rectangle;