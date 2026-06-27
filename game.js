// Game Canvas & Assets
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const statusEl = document.getElementById('game-status');
const instructionsEl = document.getElementById('game-instructions');

const letters = ['W', 'R', 'A', 'C', 'K', 'E', 'T'];

const assets = {
  player: new Image(),
  attack: new Image(),
  letters: {},
};
assets.player.src = '/images/player.png';
assets.attack.src = '/images/bullet.png';
letters.forEach(letter => {
  const img = new Image();
  img.src = `/images/${letter}.svg`;
  assets.letters[letter] = img;
});

// Global game state
const gameState = {
  level: 1,
  active: false,
  gameOver: false,
  score: 0,
  missed: 0,
  keys: { left: false, right: false, shoot: false, jump: false },
  player: { x: 0, y: 0, w: 64, h: 64, vx: 0, vy: 0, canJump: false },
  bullets: [],
  lastTime: 0,
};

// Utility functions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function intersects(a, b) {
  return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
}

function resetGame() {
  gameState.active = false;
  gameState.gameOver = false;
  gameState.score = 0;
  gameState.missed = 0;
  gameState.bullets = [];
  gameState.keys = { left: false, right: false, shoot: false, jump: false };
  scoreEl.textContent = 'Score: 0';
  statusEl.textContent = 'Press SPACE to begin';
  instructionsEl.textContent = 'Press SPACE to start the mini game. Move with A/D keys, shoot letters with SPACE.';
  canvas.style.display = 'none';
}

function startGame() {
  gameState.level = 1;
  gameState.active = true;
  gameState.gameOver = false;
  gameState.score = 0;
  gameState.missed = 0;
  gameState.bullets = [];
  scoreEl.textContent = 'Score: 0';
  canvas.style.display = 'block';
  level1.init();
}

function transitionToLevel2() {
  gameState.level = 2;
  level2.init();
}

function endGame(message) {
  gameState.active = false;
  gameState.gameOver = true;
  statusEl.textContent = `${message} Press SPACE to restart.`;
  instructionsEl.textContent = 'Press SPACE to play again.';
}

function update(dt) {
  if (!gameState.active || gameState.gameOver) return;

  if (gameState.level === 1) {
    level1.update(dt);
  } else if (gameState.level === 2) {
    level2.update(dt);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!gameState.active && !gameState.gameOver) return;

  if (gameState.level === 1) {
    level1.draw();
  } else if (gameState.level === 2) {
    level2.draw();
  }
}

function loop(timestamp) {
  if (!gameState.lastTime) gameState.lastTime = timestamp;
  const dt = Math.min((timestamp - gameState.lastTime) / 1000, 0.033);
  gameState.lastTime = timestamp;
  update(dt);
  draw();
  window.requestAnimationFrame(loop);
}

function handleKeyDown(event) {
  if (event.code === 'Space') {
    event.preventDefault();
    if (!gameState.active || gameState.gameOver) {
      startGame();
      return;
    }
    gameState.keys.shoot = true;
  }
  if (event.code === 'KeyA') { event.preventDefault(); gameState.keys.left = true; }
  if (event.code === 'KeyD') { event.preventDefault(); gameState.keys.right = true; }
  if (event.code === 'KeyW') { event.preventDefault(); gameState.keys.jump = true; }
}

function handleKeyUp(event) {
  if (event.code === 'Space') gameState.keys.shoot = false;
  if (event.code === 'KeyA') gameState.keys.left = false;
  if (event.code === 'KeyD') gameState.keys.right = false;
  if (event.code === 'KeyW') gameState.keys.jump = false;
}

window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
  resetGame();
  window.requestAnimationFrame(loop);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
});