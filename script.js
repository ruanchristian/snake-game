const box = document.getElementById("tabuleiro");
const h1 = document.querySelector("h1");

const pSize = 29, dimension = 17, velocidade=1;

let ctx = box.getContext("2d");
let snakeX = 10, snakeY = 15, cauda = 1;
let velocityX = 0, velocityY = 0;
let appleX = 15, appleY = 5;
let trail = [];

function start() {
    draw();
    snakeX += velocityX;
    snakeY += velocityY;

    validarMovimentos();

    // Cria a cobra
    ctx.fillStyle = "blue";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x*pSize, trail[i].y*pSize, pSize-1, pSize-1);

        if (cauda > 2 && trail[i].x === snakeX && trail[i].y === snakeY) {
            new Audio("assets/sounds/gameover.wav").play();
            velocityX = velocityY = 0;
            cauda = 1;
        }
    }
    trail.push({x:snakeX, y:snakeY});
    while (trail.length > cauda) {
        trail.shift();
    }

    if (appleX === snakeX && appleY === snakeY) {
        ++cauda;
        appleX = Math.floor(Math.random() * dimension);
        appleY = Math.floor(Math.random() * dimension);
    }
}

function validarMovimentos() {
    if (snakeX < 0) snakeX = dimension - 1;
    if (snakeX > dimension - 1) snakeX=0;
    if (snakeY < 0) snakeY = dimension - 1;
    if (snakeY > dimension - 1) snakeY=0;
}

function update(keyEvent) {
    switch (keyEvent.keyCode) {
        case 37: // Esquerda
            velocityX = -velocidade;
            velocityY = 0;
            break;
        case 38: // Cima
            velocityX = 0;
            velocityY = -velocidade;
            break;
        case 39: // Direita
            velocityX = velocidade;
            velocityY = 0;
            break;
        case 40: // Baixo
            velocityX = 0;
            velocityY = velocidade;
            break;
         default:
            console.table(trail);
            break;   
    }
}

function draw() {
    // Cria o tabuleiro com a largura e altura do canvas setadas no HTML.
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, box.width, box.height);

    // Cria a maçã nas posições X e Y definidas.
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*pSize, appleY*pSize, pSize, pSize);
}

window.onload = () => {
    document.addEventListener("keydown", update);
    setInterval(start, 90);

    // Mudar cor do texto central a cada 300 millisegundos
    setInterval(() => {
        h1.style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
    }, 300);
}