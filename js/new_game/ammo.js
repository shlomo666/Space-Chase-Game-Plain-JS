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