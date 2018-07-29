const {
    flame, 
    flames, 
    canvas, 
    ctx, 
    spaceship, 
    mainSpaceship, 
    enemySpaceships, 
    explosions, 
    flightSound
} = require('./game_set');

module.exports.initDOM = async () => {
    // canvas size
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    ctxBackgroundGIF.width = canvas.width;
    ctxBackgroundGIF.height = canvas.height;
    ctx.font = "50px Arial";
    
    // load images
    await Promise.all(flames.map((flame, i) => {
        flame.src = "Images/Flame GIF/" + (i + 1) + ".png";
        return new Promise(resolve => flame.onload = () => resolve());
    }));
    
    // await new Promise(res => setTimeout(res, 4000));
    document.getElementById('ctxBackgroundGIF').hidden = false;
    document.getElementById('ctx').hidden = false;
    document.getElementById('loader').hidden = true;
};