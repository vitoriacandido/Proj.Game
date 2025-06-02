const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

const jumpSound = document.getElementById('jump-sound');
const gameoverSound = document.getElementById('gameover-sound');

let score = 0;
let gameOver = false;

const jump = () => {
  if (gameOver) return;

  mario.classList.add('jump');
  jumpSound.currentTime = 0;
  jumpSound.play();

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'img/game-over.png'; // Corrigido o caminho
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    gameoverSound.play();
    gameOver = true;
    restartBtn.style.display = 'block';

    clearInterval(loop);
  } else if (!gameOver) {
    score++;
    scoreDisplay.textContent = score;
  }
}, 100);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

function restartGame() {
  window.location.reload();
}
