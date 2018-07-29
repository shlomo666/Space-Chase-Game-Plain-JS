(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



// Create key flag set
const keys = {
    D: false,
    A: false,
    S: false,
    W: false
};

module.exports.keys = keys;
module.exports.events = {
    onShoot: () => { },
    noShootLimit: () => { }, 
    ghost: () => {alert('3')}, 
    ammo: () => {}
};

const cheats = [
    ['noshootlimit', () => exports.events.noShootLimit()], 
    ['ammo', () => exports.events.ammo()], 
    ['ghost', () => exports.events.ghost()]
];

const mainNode = {};
cheats.forEach(([str, todoFunction]) => {
    let node = mainNode;
    str.split('').forEach(ch => {
        node[ch] = node[ch] || {};
        node = node[ch];
    });
    node.action = todoFunction;
});
let lastNode = mainNode;

document.onkeydown = function (event) {
    if (event.keyCode == 68) //d
        keys.D = true;
    if (event.keyCode == 83) //s
        keys.S = true;
    if (event.keyCode == 65) //a
        keys.A = true;
    if (event.keyCode == 87) //w
        keys.W = true;

    if (event.key === 'k') {
        exports.events.onShoot();
    }

    lastNode = lastNode[event.key] || mainNode;
    if (lastNode.action) {
        lastNode.action();
        lastNode = mainNode;
    }

    if (event.keyCode == 27)
        window.location = "index.html";
}
document.onkeyup = function (event) {
    if (event.keyCode == 68) //d
        keys.D = false;
    if (event.keyCode == 83) //s
        keys.S = false;
    if (event.keyCode == 65) //a
        keys.A = false;
    if (event.keyCode == 87) //w
        keys.W = false;
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { keys } = __webpack_require__(0);
// canvas settings
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const Rectengle = __webpack_require__(1);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const { Spaceship, SpaceshipDirection, canvas, ctx } = __webpack_require__(2);

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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Rectangle = __webpack_require__(1);

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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

let ammo = 3;
const rows = 4, 
width = 30, 
height = 10, 
indent = 2; 
const spaceX = width + indent;
const spaceY = height + indent;

const ammoCanvas = document.createElement('canvas');
ammoCanvas.height = rows * 12;
const ctx = ammoCanvas.getContext('2d');
const ammoImg = new Image();
ammoImg.src = './Images/bullet.png';

const drawBullets = () => {
    const columns = Math.floor(ammo / rows);
    const rest = Math.floor(ammo % rows);

    ammoCanvas.width = Math.floor(columns + 1) * spaceX;
    ctx.clearRect(0, 0, ammoCanvas.width, ammoCanvas.height);
    
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            ctx.drawImage(ammoImg, c * spaceX, r * spaceY, width, height);
        }
    }

    for(let r = 0; r < rest; r++) {
        ctx.drawImage(ammoImg, columns * spaceX, r * spaceY, width, height);
    }
}
ammoImg.onload = drawBullets;

module.exports = {
    set ammo(n) {
        ammo = n;
        drawBullets();
    }, 
    get ammo() {
        return ammo;
    }, 
    ammoCanvas
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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
} = __webpack_require__(3);

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const { Spaceship, SpaceshipDirection } = __webpack_require__(2);
const { keys } = __webpack_require__(0);
const {
    flame, 
    canvas, 
    ctx, 
    spaceship, 
    mainSpaceship, 
    enemySpaceships, 
    explosions, 
    flightSound
} = __webpack_require__(3);

var isTouchDown = false;
var isMouseDown = false;
window.addEventListener('load', function () { // on page load
    document.body.addEventListener('touchstart', function (e) {
        isTouchDown = true;
        touch = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };

        var mainSpaceshipMovementBounds = {
            top: mainSpaceship.y - Spaceship.MainVerticalAdvance,
            bottom: mainSpaceship.y + mainSpaceship.height + Spaceship.MainVerticalAdvance,
            left: mainSpaceship.x - mainSpaceship.speed,
            right: mainSpaceship.x + mainSpaceship.width + mainSpaceship.speed
        };
        if (touch.x > mainSpaceshipMovementBounds.right) {
            keys.D = true;
            keys.A = false;
        }
        else if (touch.x < mainSpaceshipMovementBounds.left) {
            keys.D = false;
            keys.A = true;
        } else { // in Bounds
            keys.D = false;
            keys.A = false;
        }
        if (touch.y > mainSpaceshipMovementBounds.bottom) {
            keys.S = true;
            keys.W = false;
        }
        else if (touch.y < mainSpaceshipMovementBounds.top) {
            keys.S = false;
            keys.W = true;
        } else { // in Bounds
            keys.S = false;
            keys.W = false;
        }
    }, false);

    document.body.addEventListener('touchmove', function (e) {
        if (!isTouchDown)
            return;

        var mainSpaceshipMovementBounds = {
            top: mainSpaceship.y - Spaceship.MainVerticalAdvance,
            bottom: mainSpaceship.y + mainSpaceship.height + Spaceship.MainVerticalAdvance,
            left: mainSpaceship.x - mainSpaceship.speed,
            right: mainSpaceship.x + mainSpaceship.width + mainSpaceship.speed
        };
        if (touch.x > mainSpaceshipMovementBounds.right) {
            keys.D = true;
            keys.A = false;
        }
        else if (touch.x < mainSpaceshipMovementBounds.left) {
            keys.D = false;
            keys.A = true;
        } else { // in Bounds
            keys.D = false;
            keys.A = false;
        }
        if (touch.y > mainSpaceshipMovementBounds.bottom) {
            keys.S = true;
            keys.W = false;
        }
        else if (touch.y < mainSpaceshipMovementBounds.top) {
            keys.S = false;
            keys.W = true;
        } else { // in Bounds
            keys.S = false;
            keys.W = false;
        }
        e.preventDefault();
    }, false);

    document.body.addEventListener('touchend', function (e) {
        isTouchDown = false;
        keys.A = keys.D = keys.S = keys.W = false;
    }, false);
    document.body.addEventListener('mousedown', function (e) {
        isMouseDown = true;

        var mainSpaceshipMovementBounds = {
            top: mainSpaceship.y - Spaceship.MainVerticalAdvance,
            bottom: mainSpaceship.y + mainSpaceship.height + Spaceship.MainVerticalAdvance,
            left: mainSpaceship.x - mainSpaceship.speed,
            right: mainSpaceship.x + mainSpaceship.width + mainSpaceship.speed
        };
        if (e.x > mainSpaceshipMovementBounds.right) {
            keys.D = true;
            keys.A = false;
        }
        else if (e.x < mainSpaceshipMovementBounds.left) {
            keys.D = false;
            keys.A = true;
        } else { // in Bounds
            keys.D = false;
            keys.A = false;
        }
        if (e.y > mainSpaceshipMovementBounds.bottom) {
            keys.S = true;
            keys.W = false;
        }
        else if (e.y < mainSpaceshipMovementBounds.top) {
            keys.S = false;
            keys.W = true;
        } else { // in Bounds
            keys.S = false;
            keys.W = false;
        }
    }, false);

    document.body.addEventListener('mousemove', function (e) {
        if (!isMouseDown)
            return;

        var mainSpaceshipMovementBounds = {
            top: mainSpaceship.y - Spaceship.MainVerticalAdvance * 3,
            bottom: mainSpaceship.y + mainSpaceship.height + Spaceship.MainVerticalAdvance * 3,
            left: mainSpaceship.x - mainSpaceship.speed * 3,
            right: mainSpaceship.x + mainSpaceship.width + mainSpaceship.speed * 3
        };
        if (e.x > mainSpaceshipMovementBounds.right) {
            keys.D = true;
            keys.A = false;
        }
        else if (e.x < mainSpaceshipMovementBounds.left) {
            keys.D = false;
            keys.A = true;
        } else { // in Bounds
            keys.D = false;
            keys.A = false;
        }
        if (e.y > mainSpaceshipMovementBounds.bottom) {
            keys.S = true;
            keys.W = false;
        }
        else if (e.y < mainSpaceshipMovementBounds.top) {
            keys.S = false;
            keys.W = true;
        } else { // in Bounds
            keys.S = false;
            keys.W = false;
        }
    }, false);

    document.body.addEventListener('mouseup', function (e) {
        keys.A = keys.D = keys.S = keys.W = false;
        isMouseDown = false;
    }, false);

}, false);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const sounds = __webpack_require__(10);
module.exports.initDOM = __webpack_require__(7).initDOM;

const { Spaceship, SpaceshipDirection } = __webpack_require__(2);
const Explosion = __webpack_require__(4);
const BigEnemy = __webpack_require__(11);

__webpack_require__(8);
const { keys, events } = __webpack_require__(0);
let {
    flame,
    flames,
    ctx,
    canvas, 
    spaceship,
    mainSpaceship,
    enemySpaceships,
    flightSound
} = __webpack_require__(3);

//-----------
const Shoot = __webpack_require__(5);
const ammoHandler = __webpack_require__(6);
//-----------

/** @type {Explosion[]} */
let explosions = []; // Array of active explosions

// Current tick of interval
let tick = 0;
let points = 0;
/*------ the game starts at initDOM() --------*/

let GameInterval;
module.exports.startGame = () => {
    // Start Loop of game
    GameInterval = setInterval(MainLoop, 40);
};

let noShootLimit = false;
events.noShootLimit = () => noShootLimit = !noShootLimit;

let ghots = false;
events.ghost = () => {
    ghots = !ghots;
    mainSpaceship.image.changeOpacity(ghots ? 0.5 : 1);
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
const gameOver = () => !ghots && enemySpaceships.some(ai => ai.touches(mainSpaceship));

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
    backgroundSound.pause();
    flightSound.pause();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "100px Arial";
    ctx.fillStyle = "Red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", ctx.canvas.width / 2, ctx.canvas.height / 2 - 100);
    const totalPoints = tick + points;
    ctx.fillText("Total points: " + totalPoints.toString(), ctx.canvas.width / 2, ctx.canvas.height / 2 + 100);

    var maxPoints = Number(localStorage.bestGamePoints);
    if (maxPoints < totalPoints) {
        var now = new Date();
        localStorage.bestGameDate = now.toLocaleString();
        localStorage.bestGamePoints = totalPoints;
    }
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports.shoot = () => {
    const p = new Audio("Sounds/laser shoot sound.mp3");
    p.volume = 0.1;
    p.play();
}

module.exports.explosion = () => {
    const p = new Audio("Sounds/Explosion Sound Effect.mp3");
    p.play();
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const { keys } = __webpack_require__(0);
// canvas settings
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const Rectangle = __webpack_require__(1);

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

/***/ })
/******/ ]);
});