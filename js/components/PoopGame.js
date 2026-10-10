/**
 * 똥 피하기 게임 컴포넌트 (js/components/PoopGame.js)
 */
export class PoopGameComponent {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animId = null;

        // Game State
        this.isPlaying = false;
        this.isGameOver = false;
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('poop_game_highscore') || '0', 10);
        this.startTime = 0;

        // Player (졸라맨)
        this.player = {
            x: 250,
            y: 340,
            width: 30,
            height: 50,
            speed: 7,
            baseWidth: 30,
            baseHeight: 50,
            isFacingRight: true,
            isDead: false
        };

        // Items & Buffs
        this.buffs = {
            umbrella: 0, // Umbrella timer (ms)
            sizeUp: 0,   // Size up timer (ms)
            poopStorm: 0 // Poop storm timer (ms)
        };

        // Entities
        this.poops = [];
        this.items = [];
        this.keys = { left: false, right: false };

        // Last spawn timers
        this.lastPoopSpawn = 0;
        this.lastItemSpawn = 0;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'poopGameSection';
        section.className = 'section game-section';

        section.innerHTML = `
            <div class="section-header">
                <span class="section-tag">PROGRAM 02</span>
                <h2 class="section-title">💩 추억의 똥 피하기 게임</h2>
                <p class="section-desc">
                    초등학생 때 가장 좋아하던 게임이자, 프로그래밍 세계로 저를 끌어당긴 첫 계기가 된 게임입니다!
                </p>
            </div>

            <div class="card-glass game-card">
                <!-- Status Dashboard -->
                <div class="game-dashboard">
                    <div class="stat-badge">
                        <span class="stat-label">SCORE</span>
                        <span id="gameScoreText" class="stat-value">0</span>
                    </div>
                    <div class="stat-badge">
                        <span class="stat-label">HIGH SCORE</span>
                        <span id="gameHighScoreText" class="stat-value">${this.highScore}</span>
                    </div>
                    <div class="buff-indicators" id="buffIndicators">
                        <span id="buffUmbrella" class="buff-tag umbrella hidden">☂️ 우산 방어 중 (5s)</span>
                        <span id="buffSizeUp" class="buff-tag sizeup hidden">🎈 크기 업! (위험)</span>
                        <span id="buffStorm" class="buff-tag storm hidden">🌧️ 똥우박 발동!</span>
                    </div>
                </div>

                <!-- Canvas Viewport -->
                <div class="canvas-wrapper">
                    <canvas id="poopCanvas" width="600" height="400"></canvas>
                    
                    <!-- Overlay Start/Game Over Screen -->
                    <div id="gameOverlayScreen" class="game-overlay">
                        <div class="overlay-content">
                            <h3 id="overlayTitle" class="overlay-title">💩 똥 피하기 게임</h3>
                            <p id="overlaySub" class="overlay-sub">방향키(← →)를 사용해 하늘에서 떨어지는 똥을 피하세요!</p>
                            
                            <div class="item-guide">
                                <div><span class="item-icon">☂️ 우산</span> 5초 무적 방어막 (똥 맞아도 안 죽음)</div>
                                <div><span class="item-icon">🎈 크기업 (꽝)</span> 피격 면적 증가</div>
                                <div><span class="item-icon">🌧️ 똥우박 (꽝)</span> 떨어지는 똥 폭증</div>
                            </div>

                            <button id="btnStartGame" class="btn btn-primary btn-game-start">
                                🎮 게임 시작하기
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Touch Controls -->
                <div class="touch-controls">
                    <button id="btnTouchLeft" class="btn-touch">◀️ 왼쪽</button>
                    <button id="btnTouchRight" class="btn-touch">오른쪽 ▶️</button>
                </div>
            </div>
        `;

        setTimeout(() => this.initCanvas(section), 0);
        return section;
    }

    initCanvas(container) {
        this.canvas = container.querySelector('#poopCanvas');
        this.ctx = this.canvas.getContext('2d');

        const btnStart = container.querySelector('#btnStartGame');
        const overlay = container.querySelector('#gameOverlayScreen');

        const btnLeft = container.querySelector('#btnTouchLeft');
        const btnRight = container.querySelector('#btnTouchRight');

        // Event listeners
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = true;
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.keys.right = false;
        });

        // Touch Listeners
        const bindTouch = (btn, dir) => {
            btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[dir] = true; });
            btn.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[dir] = false; });
            btn.addEventListener('mousedown', () => { this.keys[dir] = true; });
            btn.addEventListener('mouseup', () => { this.keys[dir] = false; });
        };

        bindTouch(btnLeft, 'left');
        bindTouch(btnRight, 'right');

        btnStart.addEventListener('click', () => {
            overlay.classList.add('hidden');
            this.startGame();
        });

        this.drawInitialScreen();
    }

    drawInitialScreen() {
        this.ctx.fillStyle = '#0f172a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    startGame() {
        this.isPlaying = true;
        this.isGameOver = false;
        this.score = 0;
        this.startTime = Date.now();
        this.poops = [];
        this.items = [];
        this.buffs = { umbrella: 0, sizeUp: 0, poopStorm: 0 };

        this.player.isDead = false;
        this.player.x = (this.canvas.width - this.player.width) / 2;
        this.player.y = this.canvas.height - 60;

        this.lastPoopSpawn = Date.now();
        this.lastItemSpawn = Date.now();

        if (this.animId) cancelAnimationFrame(this.animId);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isPlaying) return;

        const now = Date.now();
        const dt = 16;

        // Update score based on survival time
        this.score = Math.floor((now - this.startTime) / 100);
        document.getElementById('gameScoreText').textContent = this.score;

        // Update Buff Timers
        if (this.buffs.umbrella > 0) this.buffs.umbrella -= dt;
        if (this.buffs.sizeUp > 0) this.buffs.sizeUp -= dt;
        if (this.buffs.poopStorm > 0) this.buffs.poopStorm -= dt;

        // Update Player Dimensions according to SizeUp Buff
        if (this.buffs.sizeUp > 0) {
            this.player.width = this.player.baseWidth * 1.6;
            this.player.height = this.player.baseHeight * 1.5;
        } else {
            this.player.width = this.player.baseWidth;
            this.player.height = this.player.baseHeight;
        }

        // Update UI Buff Tags
        document.getElementById('buffUmbrella').classList.toggle('hidden', !(this.buffs.umbrella > 0));
        document.getElementById('buffSizeUp').classList.toggle('hidden', !(this.buffs.sizeUp > 0));
        document.getElementById('buffStorm').classList.toggle('hidden', !(this.buffs.poopStorm > 0));

        // Player Movement
        if (this.keys.left) {
            this.player.x -= this.player.speed;
            this.player.isFacingRight = false;
        }
        if (this.keys.right) {
            this.player.x += this.player.speed;
            this.player.isFacingRight = true;
        }

        // Bound Player
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x + this.player.width > this.canvas.width) {
            this.player.x = this.canvas.width - this.player.width;
        }

        // Spawn Poops
        const spawnInterval = (this.buffs.poopStorm > 0) ? 100 : Math.max(120, 400 - Math.floor(this.score / 5));
        if (now - this.lastPoopSpawn > spawnInterval) {
            const size = Math.random() * 15 + 20;
            this.poops.push({
                x: Math.random() * (this.canvas.width - size),
                y: -size,
                size: size,
                speed: (this.buffs.poopStorm > 0) ? (Math.random() * 5 + 7) : (Math.random() * 3 + 3.5 + (this.score / 140))
            });
            this.lastPoopSpawn = now;
        }

        // Spawn Items FREQUENTLY (Every 2.5 seconds = 2500ms)
        if (now - this.lastItemSpawn > 2500) {
            const types = ['umbrella', 'sizeUp', 'poopStorm'];
            const randType = types[Math.floor(Math.random() * types.length)];
            this.items.push({
                x: Math.random() * (this.canvas.width - 24),
                y: -24,
                size: 24,
                type: randType,
                speed: 3
            });
            this.lastItemSpawn = now;
        }

        // Move & Filter Poops
        for (let i = this.poops.length - 1; i >= 0; i--) {
            const p = this.poops[i];
            p.y += p.speed;

            // Check Collision with Player
            if (this.checkCollision(this.player, p)) {
                if (this.buffs.umbrella > 0) {
                    // Umbrella blocks poop!
                    this.poops.splice(i, 1);
                    continue;
                } else {
                    // Player hit by poop -> Game Over!
                    this.triggerGameOver();
                    return;
                }
            }

            if (p.y > this.canvas.height) {
                this.poops.splice(i, 1);
            }
        }

        // Move & Filter Items
        for (let i = this.items.length - 1; i >= 0; i--) {
            const it = this.items[i];
            it.y += it.speed;

            if (this.checkCollision(this.player, it)) {
                if (it.type === 'umbrella') this.buffs.umbrella = 5000;
                else if (it.type === 'sizeUp') this.buffs.sizeUp = 6000;
                else if (it.type === 'poopStorm') this.buffs.poopStorm = 5000;

                this.items.splice(i, 1);
                continue;
            }

            if (it.y > this.canvas.height) {
                this.items.splice(i, 1);
            }
        }

        // Draw Frame
        this.draw();

        this.animId = requestAnimationFrame(() => this.gameLoop());
    }

    checkCollision(rect, circle) {
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

        const distanceX = circle.x - closestX;
        const distanceY = circle.y - closestY;

        const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
        return distanceSquared < ((circle.size / 2) * (circle.size / 2));
    }

    triggerGameOver() {
        this.isPlaying = false;
        this.isGameOver = true;
        this.player.isDead = true;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('poop_game_highscore', this.highScore.toString());
            document.getElementById('gameHighScoreText').textContent = this.highScore;
        }

        // Draw final dead state frame
        this.draw();

        const overlay = document.getElementById('gameOverlayScreen');
        const overlayTitle = document.getElementById('overlayTitle');
        const overlaySub = document.getElementById('overlaySub');
        const btnStart = document.getElementById('btnStartGame');

        overlayTitle.innerHTML = "<span style='color: #ef4444; font-size: 2.5rem; font-weight: 900;'>💀 사망 💀</span>";
        overlaySub.innerHTML = `똥을 맞았습니다!<br>최종 점수: <strong>${this.score}점</strong> (최고 기록: ${this.highScore}점)`;
        btnStart.innerHTML = "🔄 게임 다시 시작하기";
        overlay.classList.remove('hidden');
    }

    draw() {
        // Clear Canvas
        this.ctx.fillStyle = '#0f172a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Ground
        this.ctx.fillStyle = '#1e293b';
        this.ctx.fillRect(0, this.canvas.height - 10, this.canvas.width, 10);

        // Draw Stickman Player (Normal or Dead with X X eyes & Poop on head)
        this.drawStickman(this.player.x, this.player.y, this.player.width, this.player.height, this.player.isDead);

        // Draw Poops 💩
        this.ctx.font = '24px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        for (const p of this.poops) {
            this.ctx.fillText('💩', p.x, p.y);
        }

        // Draw Items ☂️ 🎈 🌧️
        for (const it of this.items) {
            let icon = '🎁';
            if (it.type === 'umbrella') icon = '☂️';
            else if (it.type === 'sizeUp') icon = '🎈';
            else if (it.type === 'poopStorm') icon = '🌧️';

            this.ctx.fillText(icon, it.x, it.y);
        }
    }

    drawStickman(x, y, w, h, isDead = false) {
        this.ctx.save();
        this.ctx.strokeStyle = isDead ? '#ef4444' : '#ffffff';
        this.ctx.lineWidth = 3;

        const headRadius = w / 3;
        const centerX = x + w / 2;
        const headY = y + headRadius;

        if (isDead) {
            // Draw Poop 💩 right on top of head
            this.ctx.font = `${w * 1.4}px sans-serif`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('💩', centerX, headY - 12);

            // Head (Red border)
            this.ctx.beginPath();
            this.ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
            this.ctx.stroke();

            // X X Eyes for Dead Stickman
            this.ctx.strokeStyle = '#ef4444';
            this.ctx.lineWidth = 2;

            // Left Eye X
            this.ctx.beginPath();
            this.ctx.moveTo(centerX - headRadius / 2 - 3, headY - 4);
            this.ctx.lineTo(centerX - headRadius / 2 + 3, headY + 2);
            this.ctx.moveTo(centerX - headRadius / 2 + 3, headY - 4);
            this.ctx.lineTo(centerX - headRadius / 2 - 3, headY + 2);
            this.ctx.stroke();

            // Right Eye X
            this.ctx.beginPath();
            this.ctx.moveTo(centerX + headRadius / 2 - 3, headY - 4);
            this.ctx.lineTo(centerX + headRadius / 2 + 3, headY + 2);
            this.ctx.moveTo(centerX + headRadius / 2 + 3, headY - 4);
            this.ctx.lineTo(centerX + headRadius / 2 - 3, headY + 2);
            this.ctx.stroke();

            // Sad mouth
            this.ctx.beginPath();
            this.ctx.arc(centerX, headY + headRadius / 2 + 2, 4, Math.PI, 0);
            this.ctx.stroke();

            // Slumped Body
            const bodyTop = headY + headRadius;
            const bodyBottom = y + h * 0.7;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, bodyTop);
            this.ctx.lineTo(centerX + 6, bodyBottom);
            this.ctx.stroke();

            // Drooped Arms
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, bodyTop + 6);
            this.ctx.lineTo(centerX - w / 2, bodyTop + 20);
            this.ctx.moveTo(centerX, bodyTop + 6);
            this.ctx.lineTo(centerX + w / 2, bodyTop + 20);
            this.ctx.stroke();

            // Collapsed Legs
            this.ctx.beginPath();
            this.ctx.moveTo(centerX + 6, bodyBottom);
            this.ctx.lineTo(centerX - w / 2 - 5, y + h);
            this.ctx.moveTo(centerX + 6, bodyBottom);
            this.ctx.lineTo(centerX + w / 2 + 5, y + h);
            this.ctx.stroke();

        } else {
            // Umbrella Shield Graphic
            if (this.buffs.umbrella > 0) {
                this.ctx.font = `${w * 1.5}px sans-serif`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText('☂️', centerX, headY - 15);
            }

            // Head
            this.ctx.beginPath();
            this.ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Body
            const bodyTop = headY + headRadius;
            const bodyBottom = y + h * 0.7;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, bodyTop);
            this.ctx.lineTo(centerX, bodyBottom);
            this.ctx.stroke();

            // Arms
            this.ctx.beginPath();
            this.ctx.moveTo(centerX - w / 2, bodyTop + 10);
            this.ctx.lineTo(centerX + w / 2, bodyTop + 10);
            this.ctx.stroke();

            // Legs
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, bodyBottom);
            this.ctx.lineTo(centerX - w / 2, y + h);
            this.ctx.moveTo(centerX, bodyBottom);
            this.ctx.lineTo(centerX + w / 2, y + h);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }
}
