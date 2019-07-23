const sounds = require('./sounds');
module.exports.initDOM = require('./init_dom').initDOM;

const { Spaceship, SpaceshipDirection } = require('./Spaceship');
const Explosion = require('./Explosion');
const BigEnemy = require('./BigEnemy');

require('./touch_and_move_handle');
const { keys, events } = require('./key_press_handle');
let {
    flame,
    flames,
    ctx,
    canvas, 
    spaceship,
    mainSpaceship,
    enemySpaceships,
    flightSound
} = require('./game_set');

//-----------
const Shoot = require('./Shoot');
const ammoHandler = require('./ammo');
const gameOverHandler = require('./gameOver');
const { uuid } = require('./util');
const http = require('./http');
//-----------

/** @type {Explosion[]} */
let explosions = []; // Array of active explosions

// Current tick of interval
let tick = 0;
let points = 0;
let startTime;
/*------ the game starts at initDOM() --------*/

let GameInterval, keepAliveInterval;
module.exports.startGame = () => {
    // Start Loop of game
    GameInterval = setInterval(MainLoop, 40);
    startTime = Date.now();
    const uid = localStorage.uid = localStorage.uid || uuid();
    http.startGame(uid);
    keepAliveInterval = setInterval(() => {
        http.keepAlive(uid);
    }, 10000);
};

let noShootLimit = false;
events.noShootLimit = () => noShootLimit = !noShootLimit;

let ghost = false;
events.ghost = () => {
    ghost = !ghost;
    mainSpaceship.image.changeOpacity(ghost ? 0.5 : 1);
};

events.ammo = () => {
    ammoHandler.ammo += 30;
}

// -------------- Shooting --------------
/** @type {Shoot[]} */
let shots = [];
let lastShootTime = Date.now();

events.onShoot = () => {
    if(Date.now() - lastShootTime < 50) {
        return
    }
    lastShootTime = Date.now();

    if (noShootLimit || ammoHandler.ammo >= 1) {
        shots.push(new Shoot(mainSpaceship.right, mainSpaceship.center.y, 80, ctx.canvas.width));
        noShootLimit || (ammoHandler.ammo -= 1);

        sounds.shoot();
    }
};

setInterval(() => {
    const arrOfClashed = [];
    enemySpaceships.forEach((ai, i) => {
        const shot = shots.find(shot => shot.touches(ai));
        if (shot) {
            // clash
            shot.stop();

            const kill = () => {
                const explosion = new Explosion(ai.x, ai.y);
                explosions.push(explosion);
                
                sounds.explosion();
    
                increasePoints();
                arrOfClashed[i] = true;
            };

            if(ai instanceof BigEnemy) {
                ai.image.replace('Images/Coca-Cola-Hot.png');
                setTimeout(() => {
                    ai.image.replace('Images/Coca-Cola.png');
                }, 500);
                
                ai.life--;
                if(ai.life === 0) {
                   kill();
                   ammoHandler.ammo += Math.round(ai.startLife * 1.5);
                   bigBoss = false;
                }
            } else {
               kill();
            }

        }
    })
    enemySpaceships = enemySpaceships.filter((ai, i) => !arrOfClashed[i]);
    shots = shots.filter(shot => shot.active);
}, 40);

// -------------- End Shooting --------------

const increasePoints = () => {
    let counter = 100;
    ammoHandler.ammo += 0.35;

    const again = () => {
        setTimeout(() => {
            counter -= 4;
            points += 4;
            if (counter) again();
        }, 40);
    }
    again();
};
const gameOver = () => !ghost && enemySpaceships.some(ai => ai.touches(mainSpaceship));

//
// Methods
//
function MainLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    tick++;
    if(tick % (bigBoss ? 100 : 500) === 0) {
        ammoHandler.ammo++;
    }

    mainSpaceship.performStep();

    performEnemySteps();

    checkForEnemyClash();
    randomEnemies();

    drawSpacecraft();

    ctx.font = "50px Charcoal";
    ctx.fillStyle = "White";
    ctx.fillText(tick + " Km", 20, 60);
    ctx.fillText(points + " Points", 20, 120);

    if (mainSpaceship.visible && gameOver()) {
        var explosion = new Explosion(mainSpaceship.x, mainSpaceship.y - Math.floor(mainSpaceship.height / 2));
        explosions.push(explosion);

        sounds.explosion();

        mainSpaceship.visible = false;
        setTimeout(endOfGame, 40 * 18);

        events.onShoot = () => {}
    }
    drawExplosions();

    ctx.fillStyle = "White";
    shots.forEach(shot => {
        shot.advance();
        ctx.fillRect(shot.x, shot.y, shot.width / 4, shot.height);
    });

    ctx.drawImage(ammoHandler.ammoCanvas, 20, canvas.height - 20 - ammoHandler.ammoCanvas.height);
}
function performEnemySteps() {
    var arr = [];
    enemySpaceships.forEach(enemy => enemy.performStep(mainSpaceship));
    enemySpaceships = enemySpaceships.filter(enemy => enemy.x + enemy.width > 0);
}
var enemyImage = new Image(spaceship.width, spaceship.height * 2);
const enemyImages = Array(6).fill().map((it, i) => `Images/Enemies/enemy${i+1}.png`);
Promise.all(enemyImages.map(url => fetch(url)));

let bigBoss = false
function randomEnemies() {
    if(!bigBoss && tick % 2000 === 0) {
        bigBoss = true;
        enemyImage.src = 'Images/Coca-Cola.png';
        enemySpaceships.push(new BigEnemy(ctx.canvas.width, Math.floor(Math.random() * (ctx.canvas.height - 500)), tick / 200, enemyImage.src));
    } else if(!bigBoss) {
        if (Math.random() < 0.01 + 0.00001 * tick) {
            enemyImage.src = enemyImages[Math.trunc(tick / 1000) % 6];
            enemySpaceships.push(new Spaceship(enemyImage.width, enemyImage.height, ctx.canvas.width, Math.floor(Math.random() * (ctx.canvas.height - spaceship.height)), Math.floor(Math.random() * 6 + 4), enemyImage.src, SpaceshipDirection.RightToLeft));
        }
    }
}

var backgroundCanvas = document.createElement("canvas");
var backgroundCanvas2D = backgroundCanvas.getContext("2d");
backgroundCanvas.style.visibility = false;
window.addEventListener('load', function () { // on page load
    backgroundCanvas.width = window.innerWidth - 20;
    backgroundCanvas.height = window.innerHeight - 20;
}, false);

function drawSpacecraft() {
    if (mainSpaceship.visible) {
        backgroundCanvas2D.drawImage(mainSpaceship.image, mainSpaceship.x, mainSpaceship.y);
        
        if (keys.D) {
            backgroundCanvas2D.drawImage(flames[tick % 36], mainSpaceship.x - flame.width / 2, mainSpaceship.y, flame.width, flame.height);

            flightSound.volume = 0.5;
        }
        else
            flightSound.volume = 0;
    }

    enemySpaceships.forEach(ai => backgroundCanvas2D.drawImage(ai.image, ai.x, ai.y));

    ctx.drawImage(backgroundCanvas, 0, 0);
    backgroundCanvas2D.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
}
function drawExplosions() {
    explosions.forEach(explosion => {
        ctx.drawImage(explosion.next(), explosion.x, explosion.y, Explosion.width, Explosion.height);

        ctx.fillStyle = "Red";
        explosion.lastY = (explosion.lastY + 3) || 10;
        ctx.font = (30 - explosion.lastY / 5) + "px cursive";
        ctx.fillText('+100 points', explosion.x, explosion.y - explosion.lastY);
    });
    explosions = explosions.filter(explosion => explosion.hasNext());
}

function checkForEnemyClash() {
    const arrOfClashed = [];
    for (var i = 0; i < enemySpaceships.length; i++) {
        for (var j = i + 1; j < enemySpaceships.length; j++) {
            if (enemySpaceships[i].touches(enemySpaceships[j])) {
                // clash
                const explosion = new Explosion((enemySpaceships[i].x + enemySpaceships[j].x) / 2, (enemySpaceships[i].y + enemySpaceships[j].y) / 2);
                explosions.push(explosion);
                sounds.explosion();

                increasePoints();
                (arrOfClashed[i] instanceof BigEnemy) || (arrOfClashed[i] = true);
                (arrOfClashed[j] instanceof BigEnemy) || (arrOfClashed[j] = true);
            }
        }
    }
    enemySpaceships = enemySpaceships.filter((ai, i) => !arrOfClashed[i]);
}

function endOfGame() {
    clearInterval(GameInterval);
    clearInterval(keepAliveInterval);
    backgroundSound.pause();
    flightSound.pause();

    gameOverHandler.handleGameOver(ctx, tick, points, (Date.now() - startTime) / 1000 | 0);
}