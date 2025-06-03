const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const coin = document.querySelector('.coin');
const scoreDisplay = document.getElementById('score');
const livesContainer = document.getElementById('lives');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreSpan = document.getElementById('final-score');
const jumpSound = document.getElementById('jump-sound');
const gameoverSound = document.getElementById('gameover-sound');

let score = 0;       // pontos gerais (passar pipe)
let lives = 3;       // vidas
let coins = 0;       // moedas coletadas
let gameOver = false;
let collisionCooldown = false;

// Atualiza corações na tela
function updateLives() {
  livesContainer.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement('img');
    heart.src = 'img/heart.png';
    heart.alt = 'Vida';
    livesContainer.appendChild(heart);
  }
}

// Mario pula
function jump() {
  if (gameOver) return;
  if (!mario.classList.contains('jump')) {
    mario.classList.add('jump');
    jumpSound.currentTime = 0;
    jumpSound.play();

    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
}

// Detecta colisão entre elementos
function isCollision(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

// Atualiza pontuação na tela
function updateScore() {
  scoreDisplay.textContent = `Pontos: ${score} | Moedas: ${coins}`;
}

// Loop do jogo
const gameLoop = setInterval(() => {
  if (gameOver) return;

  const pipePosition = pipe.offsetLeft;
  const marioBottom = +window.getComputedStyle(mario).bottom.replace('px', '');
  const coinPosition = coin.offsetLeft;

  // Colisão Mario x Pipe (perde vida)
  if (
    pipePosition <= 120 &&
    pipePosition > 0 &&
    marioBottom < 80 &&
    !collisionCooldown
  ) {
    lives--;
    updateLives();
    collisionCooldown = true;
    setTimeout(() => (collisionCooldown = false), 1000);

    if (lives <= 0) {
      gameOver = true;
      pipe.style.animation = 'none';
      mario.style.animation = 'none';

      finalScoreSpan.textContent = `${score} pontos e ${coins} moedas coletadas!`;
      gameOverScreen.classList.remove('hidden');
      gameoverSound.play();
    }
  }

  // Coleta moeda (Mario x Coin)
  if (isCollision(mario, coin)) {
    coins++;
    updateScore();

    // Move moeda para nova posição horizontal aleatória
    const minX = 300;
    const maxX = 900;
    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    coin.style.left = randomX + 'px';
  }

  // Incrementa pontos ao passar pipe (somente se não tiver game over)
  if (pipePosition < 0 && !gameOver) {
    score++;
    updateScore();
  }
}, 20);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

function restartGame() {
  location.reload();
}

updateLives();
updateScore();
