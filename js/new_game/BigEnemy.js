const { keys } = require('./key_press_handle');
// canvas settings
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const Rectangle = require('./Rectangle');

class BigEnemy extends Rectangle {
    constructor(x, y, life, imageSrc) {
        super(x, y, 500, 300);
        const width = 300;
        const height = 200;
        this.width = width;
        this.height = height;

        this.startLife = life;
        this.life = life;
        this.speed = 2;

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

        this.image.replace = (newImage) => {
            const img =new Image();
            img.src = newImage;
            img.onload = () => {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);
            };
        }
    }

    /** @param {Rectangle} spaceshipToChaseAfter */
    performStep(spaceshipToChaseAfter) {
        const me = this.center;
        const him = spaceshipToChaseAfter.center;
        if (Math.abs(me.x - him.x) > this.speed) {
            this.x -= Math.sign(me.x - him.x) * this.speed;
        }
        if (Math.abs(me.y - him.y) > this.speed) {
            this.y -= Math.sign(me.y - him.y) * this.speed;
        }
    }
}
const enemyVerticalAdvance = Number(localStorage.enemySpaceshipVSpeed);

module.exports = BigEnemy;