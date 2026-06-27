// Level 1: Shooter Game
const level1 = {
  state: {
    lastShot: 0,
    shootDelay: 250,
    lastSpawn: 0,
    spawnDelay: 900,
    enemies: [],
  },

  init() {
    gameState.player.x = Math.round(canvas.width / 2);
    gameState.player.y = canvas.height - 80;
    gameState.score = 0;
    gameState.missed = 0;
    gameState.bullets = [];
    gameState.keys = { left: false, right: false, shoot: false, jump: false };
    this.state.enemies = [];
    this.state.lastSpawn = Date.now();
    statusEl.textContent = 'Level 1 — Shooter: earn 300 points to advance.';
    instructionsEl.textContent = 'Use A/D to move. Hold SPACE to fire.';
    this.spawnEnemy();
  },

  spawnEnemy() {
    const char = letters[Math.floor(Math.random() * letters.length)];
    const x = Math.random() * (canvas.width - 80) + 40;
    const speed = 80 + Math.random() * 50;
    this.state.enemies.push({ x, y: -64, w: 64, h: 64, char, speed });
  },

  shoot() {
    const now = Date.now();
    if (now - this.state.lastShot < this.state.shootDelay) return;
    this.state.lastShot = now;
    gameState.bullets.push({
      x: gameState.player.x,
      y: gameState.player.y - gameState.player.h / 2,
      w: 18,
      h: 32,
    });
  },

  update(dt) {
    if (gameState.keys.left) gameState.player.x -= 360 * dt;
    if (gameState.keys.right) gameState.player.x += 360 * dt;
    gameState.player.x = clamp(gameState.player.x, gameState.player.w / 2, canvas.width - gameState.player.w / 2);

    if (gameState.keys.shoot) this.shoot();

    gameState.bullets.forEach(b => { b.y -= 420 * dt; });
    gameState.bullets = gameState.bullets.filter(b => b.y + b.h > 0);

    this.state.enemies.forEach(e => { e.y += e.speed * dt; });

    const now = Date.now();
    if (now - this.state.lastSpawn > this.state.spawnDelay) {
      this.spawnEnemy();
      this.state.lastSpawn = now;
    }

    for (let i = this.state.enemies.length - 1; i >= 0; i--) {
      const enemy = this.state.enemies[i];
      if (enemy.y > canvas.height) {
        this.state.enemies.splice(i, 1);
        gameState.missed++;
        if (gameState.missed >= 5) {
          endGame('Too many letters got through!');
          return;
        }
        continue;
      }

      for (let j = gameState.bullets.length - 1; j >= 0; j--) {
        const bullet = gameState.bullets[j];
        if (intersects(enemy, bullet)) {
          this.state.enemies.splice(i, 1);
          gameState.bullets.splice(j, 1);
          gameState.score += 10;
          scoreEl.textContent = `Score: ${gameState.score}`;
          break;
        }
      }
    }

    // level-up check
    if (gameState.score >= 300) {
      transitionToLevel2();
    }
  },

  draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw player
    if (assets.player.complete) {
      ctx.drawImage(assets.player, gameState.player.x - gameState.player.w / 2, gameState.player.y - gameState.player.h / 2, gameState.player.w, gameState.player.h);
    }

    // draw bullets
    gameState.bullets.forEach(bullet => {
      if (assets.attack.complete) {
        ctx.drawImage(assets.attack, bullet.x - bullet.w / 2, bullet.y - bullet.h / 2, bullet.w, bullet.h);
      } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(bullet.x - bullet.w / 2, bullet.y, bullet.w, bullet.h);
      }
    });

    // draw enemies
    this.state.enemies.forEach(enemy => {
      const enemyImage = assets.letters[enemy.char];
      if (enemyImage && enemyImage.complete) {
        ctx.drawImage(enemyImage, enemy.x - enemy.w / 2, enemy.y - enemy.h / 2, enemy.w, enemy.h);
      }
    });

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Missed: ${gameState.missed} / 5`, 22, 24);
  }
};
