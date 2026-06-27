// Level 2: Platformer with Boss Battle
const level2 = {
  state: {
    platforms: [],
    door: null,
    boss: null,
    lastShot: 0,
    shootDelay: 250,
  },

  init() {
    gameState.player.x = 80;
    gameState.player.y = canvas.height - 160;
    gameState.player.vx = 0;
    gameState.player.vy = 0;
    gameState.player.canJump = false;
    gameState.bullets = [];
    gameState.keys = { left: false, right: false, shoot: false, jump: false };

    // Setup platforms
    this.state.platforms = [
      { x: 40, y: canvas.height - 120, w: canvas.width - 80, h: 24 },
      { x: 120, y: canvas.height - 240, w: 180, h: 20 },
      { x: 380, y: canvas.height - 340, w: 160, h: 20 },
      { x: 640, y: canvas.height - 300, w: 120, h: 20 },
    ];

    // Door at the end
    this.state.door = { x: canvas.width - 140, y: canvas.height - 160 - 64, w: 64, h: 96 };
    this.state.boss = null;
    this.state.lastShot = 0;

    statusEl.textContent = 'Level 2 — Platformer: reach the door to face the boss.';
    instructionsEl.textContent = 'Use WASD to move; SPACE to shoot.';
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

  spawnBoss() {
    this.state.boss = { x: canvas.width - 240, y: canvas.height - 300, w: 180, h: 180, hp: 50 };
    statusEl.textContent = 'Boss battle! Shoot the boss.';
    instructionsEl.textContent = 'Use A/D to dodge; W to jump; SPACE to shoot.';
  },

  update(dt) {
    // movement
    if (gameState.keys.left) gameState.player.vx = -360;
    else if (gameState.keys.right) gameState.player.vx = 360;
    else gameState.player.vx = 0;

    // gravity
    gameState.player.vy += 1400 * dt;
    gameState.player.x += gameState.player.vx * dt;
    gameState.player.y += gameState.player.vy * dt;

    // bounds
    gameState.player.x = clamp(gameState.player.x, gameState.player.w / 2, canvas.width - gameState.player.w / 2);
    if (gameState.player.y > canvas.height + 200) {
      endGame('You fell off!');
      return;
    }

    // platform collisions
    gameState.player.canJump = false;
    for (let i = 0; i < this.state.platforms.length; i++) {
      const p = this.state.platforms[i];
      const playerBox = {
        x: gameState.player.x - gameState.player.w / 2,
        y: gameState.player.y - gameState.player.h / 2,
        w: gameState.player.w,
        h: gameState.player.h,
      };
      const platBox = { x: p.x, y: p.y, w: p.w, h: p.h };
      if (intersects(playerBox, platBox)) {
        if (gameState.player.vy >= 0 && (gameState.player.y - gameState.player.h / 2) < p.y + p.h) {
          gameState.player.y = p.y - gameState.player.h / 2;
          gameState.player.vy = 0;
          gameState.player.canJump = true;
        }
      }
    }

    // jump
    if (gameState.keys.jump && gameState.player.canJump) {
      gameState.player.vy = -560;
      gameState.player.canJump = false;
    }

    // shooting
    if (gameState.keys.shoot) this.shoot();
    gameState.bullets.forEach(b => { b.y -= 420 * dt; });
    gameState.bullets = gameState.bullets.filter(b => b.y + b.h > 0 && b.y < canvas.height);

    // door collision
    const playerBox = {
      x: gameState.player.x - gameState.player.w / 2,
      y: gameState.player.y - gameState.player.h / 2,
      w: gameState.player.w,
      h: gameState.player.h,
    };
    if (this.state.door && intersects(playerBox, this.state.door)) {
      if (!this.state.boss) {
        this.spawnBoss();
      }
    }

    // boss logic
    if (this.state.boss) {
      // move boss sinusoidally
      this.state.boss.x += Math.sin(Date.now() / 600) * 40 * dt * 60;

      // bullets vs boss
      for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        const b = gameState.bullets[i];
        const bossBox = {
          x: this.state.boss.x - this.state.boss.w / 2,
          y: this.state.boss.y - this.state.boss.h / 2,
          w: this.state.boss.w,
          h: this.state.boss.h,
        };
        const bulletBox = { x: b.x - b.w / 2, y: b.y - b.h / 2, w: b.w, h: b.h };
        if (intersects(bossBox, bulletBox)) {
          gameState.bullets.splice(i, 1);
          this.state.boss.hp -= 5;
          gameState.score += 5;
          scoreEl.textContent = `Score: ${gameState.score}`;
          if (this.state.boss.hp <= 0) {
            endGame('You defeated the boss! You beat level 2.');
          }
          break;
        }
      }
    }
  },

  draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // platforms
    ctx.fillStyle = '#444';
    this.state.platforms.forEach(p => {
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    // door
    if (this.state.door) {
      ctx.fillStyle = '#6a1b9a';
      ctx.fillRect(this.state.door.x, this.state.door.y, this.state.door.w, this.state.door.h);
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.fillText('DOOR', this.state.door.x + 8, this.state.door.y + 22);
    }

    // bullets
    gameState.bullets.forEach(b => {
      if (assets.attack.complete) {
        ctx.drawImage(assets.attack, b.x - b.w / 2, b.y - b.h / 2, b.w, b.h);
      } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(b.x - b.w / 2, b.y, b.w, b.h);
      }
    });

    // player
    if (assets.player.complete) {
      ctx.drawImage(assets.player, gameState.player.x - gameState.player.w / 2, gameState.player.y - gameState.player.h / 2, gameState.player.w, gameState.player.h);
    }

    // boss
    if (this.state.boss) {
      ctx.fillStyle = '#b71c1c';
      ctx.fillRect(this.state.boss.x - this.state.boss.w / 2, this.state.boss.y - this.state.boss.h / 2, this.state.boss.w, this.state.boss.h);
      ctx.fillStyle = '#fff';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`HP: ${this.state.boss.hp}`, this.state.boss.x, this.state.boss.y - this.state.boss.h / 2 - 12);
    }

    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${gameState.score}`, 22, 24);
  }
};
