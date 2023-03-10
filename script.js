const box = document.getElementById("tabuleiro");
const h1 = document.querySelector("h1");
const backgroundMusic = new Audio("assets/sounds/background.mp3");

const pSize = 19, dimension = 26, velocidade = 1;

let ctx = box.getContext("2d");
let snakeX = 10, snakeY = 15, cauda = 1;
let velocityX = 0, velocityY = 0;
let appleX = 15, appleY = 5;
let trail = [];
let score = document.getElementById("score");

function start() {
    draw();
    snakeX += velocityX;
    snakeY += velocityY;

    validarMovimentos();
    backgroundMusic.play();

    // Cria a cobra
    ctx.fillStyle = "blue";
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * pSize, trail[i].y * pSize, pSize-1, pSize-1);

        if (cauda > 1 && trail[i].x === snakeX && trail[i].y === snakeY) {
            gameOver();
        }
    }
    trail.push({x:snakeX, y:snakeY});
    while (trail.length > cauda) {
        trail.shift();
    }

    if (appleX === snakeX && appleY === snakeY) {
        ++cauda;
        score.innerText = cauda-1;
        appleX = Math.floor(Math.random() * dimension);
        appleY = Math.floor(Math.random() * dimension);
    }
}

function gameOver() {
    new Audio("assets/sounds/gameover.wav").play();
    velocityX = velocityY = 0;
    cauda = 1;
    score.innerText = 0;
}

function validarMovimentos() {
    if (snakeX < 0) snakeX = dimension - 1;
    if (snakeX > dimension - 1) snakeX = 0;
    if (snakeY < 0) snakeY = dimension - 1;
    if (snakeY > dimension - 1) snakeY = 0;
}

function update(keyEvent) {
    switch (keyEvent.keyCode) {
        case 37: // Esquerda
            if (velocityX !== velocidade) {
                velocityX = -velocidade;
                velocityY = 0;
            }
            break;
        case 38: // Cima
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -velocidade;
            }
            break;
        case 39: // Direita
            if (velocityX >= 0) {
                velocityX = velocidade;
                velocityY = 0;
            }
            break;
        case 40: // Baixo
            if (velocityY >= 0) {
                velocityX = 0;
                velocityY = velocidade;
            }
            break;
        default:
            console.table(trail);
            break;
    }
}

function draw() {
    // Cria o tabuleiro com a largura e altura do canvas setadas no HTML.
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, box.width, box.height);

    // Cria a ma???? nas posi????es X e Y definidas.
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * pSize, appleY * pSize, pSize, pSize);
}

window.onload = () => {
    document.addEventListener("keydown", update);
    setInterval(start, 110);

    // Mudar cor do texto central a cada 450 millisegundos
    let aux = 0;
    let rgb = ["#FF0000", "#008000", "#0000FF"];
    setInterval(() => {
        h1.style.color = rgb[aux++ % 3];
    }, 450);
}