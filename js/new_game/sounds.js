module.exports.shoot = () => {
    const p = new Audio("Sounds/laser shoot sound.mp3");
    p.volume = 0.1;
    p.play();
}

module.exports.explosion = () => {
    const p = new Audio("Sounds/Explosion Sound Effect.mp3");
    p.play();
}