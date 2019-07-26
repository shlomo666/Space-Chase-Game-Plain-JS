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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
/***/ (function(module, exports, __webpack_require__) {

const { keys } = __webpack_require__(0);
// canvas settings
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const Rectengle = __webpack_require__(3);

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { Spaceship, SpaceshipDirection, canvas, ctx } = __webpack_require__(1);

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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const md5 = __webpack_require__(18);

exports.startGame = (uid) => {
    fetch('/scores/game', {
        method: 'POST', 
        body: JSON.stringify({ uid }), 
        headers: {
            'content-type': 'application/json'
        }
    });
};

exports.endGame = async (name, uid, totalPoints, now) => {
    await fetch('/scores/gameover', {
        method: 'POST',
        body: JSON.stringify({
            name,
            uid,
            result: {
                score: totalPoints,
                date: now
            },
            signature: md5(uid + name + totalPoints + now.toISOString()).toString()
        }), 
        headers: {
            'content-type': 'application/json'
        }
    });
};

exports.getBest = () => {
    return fetch('/scores/best').then(res => res.json());
};

exports.keepAlive = (uid) => {
    fetch('/scores/game', {
        method: 'PUT', 
        body: JSON.stringify({ uid }), 
        headers: {
            'content-type': 'application/json'
        }
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const { keys } = __webpack_require__(0);
// canvas settings
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
const Rectangle = __webpack_require__(3);

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

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Rectangle = __webpack_require__(3);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const http = __webpack_require__(4);

/** @param {CanvasRenderingContext2D} ctx */
/** @param {Number} tick */
/** @param {Number} points */
exports.handleGameOver = async (ctx, tick, points) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "100px Arial";
    ctx.fillStyle = "Red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", ctx.canvas.width / 2, ctx.canvas.height / 2 - 200);
    const totalPoints = tick + points;
    ctx.fillText("Total points: " + totalPoints.toString(), ctx.canvas.width / 2, ctx.canvas.height / 2 - 70);

    var maxPoints = Number(localStorage.bestGamePoints);
    var now = new Date();
    if (maxPoints < totalPoints) {
        localStorage.bestGameDate = now.toLocaleString();
        localStorage.bestGamePoints = totalPoints;
    }

    const uid = localStorage.uid;
    const name = exports.getNameFromUser();
    if (uid && name) {
        await http.endGame(name, uid, totalPoints, now);
    }
    const best = await http.getBest();
    ctx.font = "30px Arial";
    ctx.fillText('Best Scores', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    ctx.font = "15px Arial";
    const table = [['Name', 'Score', 'Date']].concat(best.map(p => [p.name, exports.formatScore(p.best.score), new Date(p.best.date).toLocaleString()]));
    const nameColSize = Math.max(...table.map(row => ctx.measureText(row[0]).width)) | 0;
    const scoreColSize = Math.max(...table.map(row => ctx.measureText(row[1]).width)) | 0;
    const dateColSize = Math.max(...table.map(row => ctx.measureText(row[2]).width)) | 0;
    const start = (ctx.canvas.width - (nameColSize + scoreColSize + dateColSize)) / 2 | 0;
    table.forEach(([name, score, date], idx) => {
        const firstColPosition = start + ctx.measureText(name).width / 2 | 0;
        const secondColPosition = 40 + start + nameColSize + ctx.measureText(score).width / 2 | 0;
        const thirdColPosition = 80 + start + nameColSize + scoreColSize + ctx.measureText(date).width / 2 | 0;
        const y = ctx.canvas.height / 2 + 100 + 20 * idx;
        ctx.fillText(name, firstColPosition, y);
        ctx.fillText(score, secondColPosition, y);
        ctx.fillText(date, thirdColPosition, y);
    });
};

exports.getNameFromUser = () => {
    return prompt("What's your name?");
};

const numberFormatter = new Intl.NumberFormat();
const action = {
    1: s => s, 
    2: s => s, 
    3: s => s, 
    4: s => s.slice(0, 1) + 'K', 
    5: s => s.slice(0, 2) + 'K', 
    6: s => s.slice(0, 3) + 'K', 
    7: s => s.slice(0, 1) + 'M', 
    8: s => s.slice(0, 2) + 'M', 
    9: s => s.slice(0, 3) + 'M', 
    10: s => s.slice(0, 1) + 'B', 
    11: s => s.slice(0, 2) + 'B', 
    12: s => s.slice(0, 3) + 'B', 
};
exports.formatScore = (n) => {
    const s = numberFormatter.format(n);
    return action[n.toString().length](s);
};

/***/ }),
/* 11 */
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
} = __webpack_require__(2);

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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const { Spaceship, SpaceshipDirection } = __webpack_require__(1);
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
} = __webpack_require__(2);

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
/* 14 */
/***/ (function(module, exports) {

exports.uuid = () => Math.random(36).toString().slice(2);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const sounds = __webpack_require__(12);
module.exports.initDOM = __webpack_require__(11).initDOM;

const { Spaceship, SpaceshipDirection } = __webpack_require__(1);
const Explosion = __webpack_require__(7);
const BigEnemy = __webpack_require__(6);

__webpack_require__(13);
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
} = __webpack_require__(2);

//-----------
const Shoot = __webpack_require__(8);
const ammoHandler = __webpack_require__(9);
const gameOverHandler = __webpack_require__(10);
const { uuid } = __webpack_require__(14);
const http = __webpack_require__(4);
//-----------

/** @type {Explosion[]} */
let explosions = []; // Array of active explosions

// Current tick of interval
let tick = 0;
let points = 0;
/*------ the game starts at initDOM() --------*/

let GameInterval, keepAliveInterval;
module.exports.startGame = () => {
    // Start Loop of game
    GameInterval = setInterval(MainLoop, 40);
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

    gameOverHandler.handleGameOver(ctx, tick, points);
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(16),
      utf8 = __webpack_require__(5).utf8,
      isBuffer = __webpack_require__(17),
      bin = __webpack_require__(5).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ })
/******/ ]);
});