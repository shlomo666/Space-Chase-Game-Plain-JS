const { Spaceship, SpaceshipDirection } = require('./Spaceship');
const { keys } = require('./key_press_handle');
const {
    flame, 
    canvas, 
    ctx, 
    spaceship, 
    mainSpaceship, 
    enemySpaceships, 
    explosions, 
    flightSound
} = require('./game_set');

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