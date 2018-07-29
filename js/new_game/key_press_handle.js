

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