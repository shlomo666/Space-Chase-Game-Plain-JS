const http = require('./http');

/** @param {CanvasRenderingContext2D} ctx */
/** @param {Number} tick */
/** @param {Number} points */
/** @param {Number} gameInSeconds */
exports.handleGameOver = async (ctx, tick, points, gameInSeconds) => {
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
        await http.endGame(name, uid, totalPoints, now, gameInSeconds);
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