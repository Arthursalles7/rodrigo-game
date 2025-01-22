// Seleção dos elementos principais do jogo
const rodrigo = document.querySelector('.rodrigo'); // Elemento do personagem "Rodrigo"
const tubu = document.querySelector('.tubu'); // Elemento do obstáculo "Tubu"
const startScreen = document.getElementById('start-screen'); // Tela inicial do jogo
const gameBoard = document.getElementById('game-board'); // Tela do jogo em si
const startButton = document.getElementById('start-button'); // Botão para iniciar o jogo
const gameOverScreen = document.getElementById('game-over-screen'); // Tela de "Game Over"
const restartButton = document.getElementById('restart-button'); // Botão para reiniciar o jogo
const rodrigoMorto = document.getElementById('rodrigo-morto'); // Imagem do personagem após a derrota
const mortoGameover = document.getElementById('morto-gameover'); // Imagem de "Game Over" com personagem
const scoreDisplay = document.getElementById('score'); // Exibição da pontuação

// Variáveis para controle de estado do jogo
let score = 0; // Pontuação do jogador
let passedTubu = false; // Controle para verificar se o personagem passou pelo obstáculo

// Inicia o jogo ao clicar no botão de início
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none'; // Esconde a tela inicial
    gameBoard.classList.remove('hidden'); // Mostra a tela do jogo
    gameOverScreen.classList.add('hidden'); // Esconde a tela de "Game Over"
    resetGame(); // Reinicia o estado do jogo
});

// Reinicia o jogo ao clicar no botão de reinício
restartButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden'); // Esconde a tela de "Game Over"
    gameBoard.classList.remove('hidden'); // Mostra a tela do jogo
    resetGame(); // Reinicia o estado do jogo
});

// Função para fazer o personagem "pular"
const jump = () => {
    if (!rodrigo.classList.contains('jump')) { // Verifica se o personagem já está pulando
        rodrigo.classList.add('jump'); // Adiciona a classe de pulo
        setTimeout(() => {
            rodrigo.classList.remove('jump'); // Remove a classe após o tempo do pulo
        }, 500); // Duração do pulo em milissegundos
    }
};

// Detecta quando o jogador pressiona a tecla para pular
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') { // Teclas permitidas: Espaço ou seta para cima
        jump(); // Executa o pulo
    }
});

// Intervalo para verificar colisão constantemente
const checkCollision = setInterval(() => {
    const rodrigoBottom = parseInt(window.getComputedStyle(rodrigo).getPropertyValue('bottom')); // Posição do personagem
    const tubuLeft = parseInt(window.getComputedStyle(tubu).getPropertyValue('left')); // Posição do obstáculo
    const tubuHeight = parseInt(window.getComputedStyle(tubu).getPropertyValue('height')); // Altura do obstáculo
    const collisionAreaStart = 0; // Início da área de colisão
    const collisionAreaEnd = 60; // Fim da área de colisão

    // Verifica se há colisão entre o personagem e o obstáculo
    if (tubuLeft > collisionAreaStart && tubuLeft < collisionAreaEnd && rodrigoBottom <= tubuHeight) {
        gameOver(); // Finaliza o jogo em caso de colisão
    }

    // Reseta o estado do obstáculo se ele já saiu completamente da tela
    if (tubuLeft <= -100) {
        passedTubu = false;
    }
}, 10); // Verificação a cada 10ms

// Função para finalizar o jogo
function gameOver() {
    rodrigoMorto.style.display = 'block'; // Mostra a imagem do personagem derrotado
    mortoGameover.style.display = 'block'; // Mostra a imagem de "Game Over"
    tubu.style.animation = 'none'; // Para a animação do obstáculo
    gameBoard.classList.add('hidden'); // Esconde a tela do jogo
    gameOverScreen.classList.remove('hidden'); // Mostra a tela de "Game Over"
}

// Função para reiniciar o estado do jogo
function resetGame() {
    score = 0; // Reseta a pontuação
    scoreDisplay.textContent = `Pontos: ${score}`; // Atualiza a exibição da pontuação
    passedTubu = false; // Reseta a variável de controle de passagem pelo obstáculo
    rodrigo.style.bottom = '0px'; // Posiciona o personagem no chão
    rodrigo.src = 'imagens/rodrigo.png'; // Volta a imagem original do personagem
    rodrigoMorto.style.display = 'none'; // Esconde a imagem do personagem derrotado
    mortoGameover.style.display = 'none'; // Esconde a imagem de "Game Over"
    tubu.style.animation = 'none'; // Remove a animação do obstáculo
    tubu.style.left = '100%'; // Reposiciona o obstáculo fora da tela

    // Reinicia a animação do obstáculo após um pequeno atraso
    setTimeout(() => {
        tubu.style.animation = 'tubu-animation 2s infinite linear';
    }, 50);

    gameBoard.classList.remove('hidden'); // Mostra a tela do jogo
    gameOverScreen.classList.add('hidden'); // Esconde a tela de "Game Over"
}


//deixando tudo comentado para não esquecer depois.