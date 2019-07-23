const md5 = require('md5');

exports.startGame = (uid) => {
    fetch('/scores/game', {
        method: 'POST', 
        body: JSON.stringify({ uid }), 
        headers: {
            'content-type': 'application/json'
        }
    });
};

exports.endGame = async (name, uid, totalPoints, now, gameInSeconds) => {
    await fetch('/scores/gameover', {
        method: 'POST',
        body: JSON.stringify({
            name,
            uid,
            result: {
                score: totalPoints,
                date: now,
                "game-in-seconds": gameInSeconds
            },
            signature: md5(uid + name + gameInSeconds + totalPoints + now.toISOString()).toString()
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