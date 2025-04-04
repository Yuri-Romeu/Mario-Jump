const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
let point = document.getElementById('score');
let number = 0;
const scoreEnd = document.querySelector('.scoreEnd');
const endGame = document.querySelector('.end-game');
let time = 1.5;
let gameRunning = true;

// Função de pulo
const jump = () => {
     if (gameRunning) {
          mario.classList.add('jump');
          setTimeout(() => {
               mario.classList.remove('jump');
          }, 500);
     }
};

// Atualiza pontuação
const score = setInterval(() => {
     if (gameRunning) {
          point.innerHTML = number;
          number++;
     }
}, 850);

// Loop principal do jogo
const loop = setInterval(() => {
     const pipePosition = pipe.offsetLeft;
     const cloudPosition = cloud.offsetLeft;
     const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

     if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
          // Parar a animação dos elementos
          pipe.style.animation = 'none';
          pipe.style.left = `${pipePosition}px`;

          cloud.style.animation = 'none';
          cloud.style.left = `${cloudPosition}px`;

          mario.style.animation = 'none';
          mario.style.bottom = `${marioPosition}px`;

          // Trocar imagem do Mario para "Game Over"
          mario.src = './images/game-over.png';
          mario.style.width = '75px';
          mario.style.marginLeft = '50px';

          // Exibir mensagem de fim de jogo
          endGame.style.display = 'block';
          scoreEnd.innerHTML = `Sua pontuação: ${number - 1}`;

          // Parar loops
          clearInterval(score);
          clearInterval(loop);
          clearInterval(speedIncrease);
          gameRunning = false;
     }
}, 10);

// Reinicia o jogo
function reset() {
     location.reload();
}

document.addEventListener('keydown', jump);
