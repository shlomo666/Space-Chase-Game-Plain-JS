class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.frame = 0;
    }
    hasNext() {
        return this.frame < Explosion.images.length;
    }
    next() {
        if (this.frame === Explosion.images.length)
            this.frame = 0;
        return Explosion.images[this.frame++];
    }
    fire(ctx) {
        const work = () => {
            ctx.drawImage(this.next(), this.x, this.y, Explosion.width, Explosion.height);

            ctx.fillStyle = "Red";
            this.lastY = (this.lastY + 3) || 10;
            ctx.font = (20 - this.lastY / 5) + "px cursive";
            ctx.fillText('+100 points',  this.x, this.y - this.lastY);

            this.hasNext() && setTimeout(work, 40);
        };
        work();
    }
}
Explosion.images = Array(17).fill().map((it, i) => {
    let explosionImage = new Image();
    explosionImage.src = "Images/Explosion GIF/0b33661e99704533dbe7b4d36add01b2-" + i + ".png";
    explosionImage.width = 110;
    explosionImage.height = 120;
    return explosionImage;
})
Explosion.width = 110;
Explosion.height = 120;

module.exports = Explosion;