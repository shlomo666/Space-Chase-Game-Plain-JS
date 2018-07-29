const { Spaceship, SpaceshipDirection, canvas, ctx } = require('./Spaceship');

var spaceship = {
    width: Number(localStorage.spaceshipsWidth),
    height: Math.trunc(Number(localStorage.spaceshipsWidth) / 2.5)
};

// Create main spaceship
var mainSpaceship = new Spaceship(spaceship.width, spaceship.height, Math.floor(ctx.canvas.width / 2 - spaceship.width / 2), Math.floor(ctx.canvas.height / 2 - spaceship.height / 2), Number(localStorage.mainSpaceshipHSpeed), "Images/mainSpaceship.png", SpaceshipDirection.LeftToRight);
mainSpaceship.visible = true;

// Crate enemy spaceships
/** @type {Spaceship[]} */
let enemySpaceships = [];

// Load flame's custom GIF
const flame = {
    height: mainSpaceship.height, 
    width: mainSpaceship.width / 2
}
const flames = Array(36).fill().map(() => new Image()); // Array loading at initDOM

// Set Audio
flightSound.volume = 0;

module.exports = {
    flame, 
    canvas, 
    ctx, 
    spaceship, 
    mainSpaceship, 
    enemySpaceships, 
    flames, 
    flightSound, 
};