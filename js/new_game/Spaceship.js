const { keys } = require('./key_press_handle');
// canvas settings
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const Rectengle = require('./Rectangle');

class Spaceship extends Rectengle {
    constructor(width, height, x, y, speed, imageSrc, spaceshipDirection) {
        super(x, y, width, height);
        this.speed = speed;
        this.spaceshipDirection = spaceshipDirection;
        this.visible = false;

        this.image = document.createElement("canvas");
        this.image.width = width;
        this.image.height = height;

        const ctx = this.image.getContext("2d");

        const localImage = new Image();
        localImage.src = imageSrc;
        localImage.onload = () => {
            ctx.drawImage(localImage, 0, 0, width, height);
        };
        
        this.image.changeOpacity = (opacity) => {
            ctx.globalAlpha = opacity;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(localImage, 0, 0, width, height);
        }
    }
    performStep(spaceshipToChaseAfter) {
        if (spaceshipToChaseAfter instanceof Spaceship) // enemy step
        {
            this.x += this.speed * this.spaceshipDirection;
            if (Math.abs(this.y - spaceshipToChaseAfter.y) >= Spaceship.EnemyVerticalAdvance)
                this.y -= Math.sign(this.y - spaceshipToChaseAfter.y) * Spaceship.EnemyVerticalAdvance;
        }
        else {
            // main spaceship
            var bitH = this.speed * this.spaceshipDirection;
            var bitV = Spaceship.MainVerticalAdvance;
            // mainSpaceship.y
            this.y += keys.S ? bitV : 0;
            if (this.y + this.height > ctx.canvas.height)
                this.y = ctx.canvas.height - this.height;
            this.y += keys.W ? -bitV : 0;
            if (this.y < 0)
                this.y = 0;
            // mainSpaceship.x
            this.x += keys.D ? bitH : 0;
            if (this.x + this.width > ctx.canvas.width)
                this.x = ctx.canvas.width - this.width;
            this.x += keys.A ? -bitH : 0;
            if (this.x < 0)
                this.x = 0;
        }
    }
}
Spaceship.EnemyVerticalAdvance = Number(localStorage.enemySpaceshipVSpeed);
Spaceship.MainVerticalAdvance = Number(localStorage.mainSpaceshipVSpeed);
var SpaceshipDirection = {
    RightToLeft: -1,
    LeftToRight: 1
}; Object.freeze(SpaceshipDirection);

module.exports.Spaceship = Spaceship;
module.exports.SpaceshipDirection = SpaceshipDirection;
module.exports.canvas = canvas;
module.exports.ctx = ctx;