const rodrigo = document.querySelector('.rodrigo');
const tubu = document.querySelector('.tubu');
const startScreen = document.getElementById('start-screen');
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const gameOverScreen = document.getElementById('game-over-screen');
const restartButton = document.getElementById('restart-button');
const rodrigoMorto = document.getElementById('rodrigo-morto');
const mortoGameover = document.getElementById('morto-gameover');
const scoreDisplay = document.getElementById('score');

let score = 0;
let passedTubu = false;

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameBoard.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    resetGame();
});

restartButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    resetGame();
});

const jump = () => {
    if (!rodrigo.classList.contains('jump')) {
        rodrigo.classList.add('jump');
        setTimeout(() => {
            rodrigo.classList.remove('jump');
        }, 500);
    }
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

const checkCollision = setInterval(() => {
    const rodrigoBottom = parseInt(window.getComputedStyle(rodrigo).getPropertyValue('bottom'));
    const tubuLeft = parseInt(window.getComputedStyle(tubu).getPropertyValue('left'));
    const tubuHeight = parseInt(window.getComputedStyle(tubu).getPropertyValue('height'));
    const collisionAreaStart = 0;
    const collisionAreaEnd = 60;

    if (tubuLeft > collisionAreaStart && tubuLeft < collisionAreaEnd && rodrigoBottom <= tubuHeight) {
        gameOver();
    }

    if (tubuLeft <= -100) {
        passedTubu = false;
    }
}, 10);

function gameOver() {
    rodrigoMorto.style.display = 'block';
    mortoGameover.style.display = 'block';
    tubu.style.animation = 'none';
    gameBoard.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Pontos: ${score}`;
    passedTubu = false;
    rodrigo.style.bottom = '0px';
    rodrigo.src = 'assets/imagens/rodrigo.png';
    rodrigoMorto.style.display = 'none';
    mortoGameover.style.display = 'none';
    tubu.style.animation = 'none';
    tubu.style.left = '100%';

    setTimeout(() => {
        tubu.style.animation = 'tubu-animation 2s infinite linear';
    }, 50);

    gameBoard.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
}