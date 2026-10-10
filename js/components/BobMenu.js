/**
 * 밥메추 (오늘의 밥 메뉴 추천) 프로그램 컴포넌트 (js/components/BobMenu.js)
 */
import { bobMenuCategories } from '../data/bobMenuData.js';

export class BobMenuComponent {
    constructor() {
        this.selectedCategory = 'random';
        this.currentCandidates = [];
        this.finalSelection = null;
        this.isPicking = false;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'bobMenuSection';
        section.className = 'section bobmenu-section';

        section.innerHTML = `
            <div class="section-header">
                <span class="section-tag">PROGRAM 03</span>
                <h2 class="section-title">🍚 오늘 뭐 먹지? (밥메추 프로그램)</h2>
                <p class="section-desc">
                    오늘 한 끼 메뉴가 고민되시나요? 카테고리를 고르고 AI 밥메추가 추천하는 3가지 메뉴 중 최종 하나를 뽑아보세요!
                </p>
            </div>

            <div class="card-glass bobmenu-card">
                <!-- Step 1: Category Selector Pills -->
                <div class="bobmenu-step">
                    <h3 class="step-title">1️⃣ 원하시는 음식 카테고리를 선택하세요</h3>
                    <div class="category-pills-bar" id="bobCategoryBar">
                        <button class="pill active" data-cat="random">🎲 전체 랜덤</button>
                        <button class="pill" data-cat="korean">🇰🇷 한식</button>
                        <button class="pill" data-cat="chinese">🇨🇳 중식</button>
                        <button class="pill" data-cat="japanese">🇯🇵 일식</button>
                        <button class="pill" data-cat="western">🍕 양식</button>
                    </div>
                </div>

                <!-- Step 2: 3 Candidate Menu Cards -->
                <div class="bobmenu-step">
                    <h3 class="step-title">2️⃣ 추천 메뉴 3가지 후보</h3>
                    <div id="candidatesGrid" class="candidates-grid">
                        <!-- Dynamically rendered 3 candidate cards -->
                    </div>
                </div>

                <!-- Step 3: Pick 1 out of 3 Action Button & Final Result -->
                <div class="bobmenu-step step-pick-action">
                    <button id="btnPickOne" class="btn btn-primary btn-pick-one">
                        <span>🎯 세개중에 하나 골라주기!</span>
                    </button>

                    <!-- Final Result Display Card -->
                    <div id="finalResultCard" class="final-result-box hidden">
                        <div class="result-badge">🏆 오늘 당신이 먹어야 할 최종 메뉴</div>
                        <div class="result-dish-name" id="finalDishName">🎉 메뉴 이름</div>
                        <p class="result-dish-desc" id="finalDishDesc">메뉴 설명</p>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => this.bindEvents(section), 0);
        return section;
    }

    bindEvents(container) {
        const categoryBar = container.querySelector('#bobCategoryBar');
        const grid = container.querySelector('#candidatesGrid');
        const btnPick = container.querySelector('#btnPickOne');
        const finalResultCard = container.querySelector('#finalResultCard');
        const finalDishName = container.querySelector('#finalDishName');
        const finalDishDesc = container.querySelector('#finalDishDesc');

        // Function to generate 3 random candidates
        const generateCandidates = (catKey) => {
            let pool = [];
            if (catKey === 'random') {
                Object.values(bobMenuCategories).forEach(cat => {
                    pool.push(...cat.menus);
                });
            } else if (bobMenuCategories[catKey]) {
                pool = [...bobMenuCategories[catKey].menus];
            }

            // Shuffle and pick 3 unique items
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            this.currentCandidates = shuffled.slice(0, 3);
            this.renderCandidates(grid);

            // Hide previous result
            finalResultCard.classList.add('hidden');
            this.finalSelection = null;
        };

        categoryBar.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill')) {
                categoryBar.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedCategory = e.target.dataset.cat;
                generateCandidates(this.selectedCategory);
            }
        });

        // "세개중에 하나 골라주기!" Button Action
        btnPick.addEventListener('click', () => {
            if (this.isPicking) return;
            if (this.currentCandidates.length < 3) return;

            this.isPicking = true;
            btnPick.disabled = true;
            btnPick.innerHTML = "<span>🎲 메뉴 추첨 중...</span>";

            // Card highlight roulette animation
            const cards = grid.querySelectorAll('.candidate-card');
            let highlightIndex = 0;
            let counter = 0;

            const interval = setInterval(() => {
                cards.forEach(c => c.classList.remove('roulette-highlight'));
                cards[highlightIndex].classList.add('roulette-highlight');

                highlightIndex = (highlightIndex + 1) % cards.length;
                counter++;

                if (counter > 15) {
                    clearInterval(interval);

                    // Final winner selection
                    const winnerIndex = Math.floor(Math.random() * 3);
                    const winner = this.currentCandidates[winnerIndex];
                    this.finalSelection = winner;

                    cards.forEach(c => c.classList.remove('roulette-highlight'));
                    cards[winnerIndex].classList.add('winner-card');

                    finalDishName.innerHTML = `${winner.icon} ${winner.name}`;
                    finalDishDesc.textContent = `"${winner.desc}"`;
                    finalResultCard.classList.remove('hidden');

                    btnPick.disabled = false;
                    btnPick.innerHTML = "<span>🎯 세개중에 하나 다시 골라주기!</span>";
                    this.isPicking = false;

                    if (window.toastApp) {
                        window.toastApp.show(`✨ 오늘의 추천 메뉴: ${winner.name}! 맛있게 드세요! 😋`);
                    }
                }
            }, 100);
        });

        // Initial generation
        generateCandidates('random');
    }

    renderCandidates(gridEl) {
        gridEl.innerHTML = this.currentCandidates.map((item, idx) => `
            <div class="card-glass candidate-card animate-fade-in" data-index="${idx}">
                <div class="candidate-badge">후보 0${idx + 1}</div>
                <div class="candidate-icon">${item.icon}</div>
                <h4 class="candidate-title">${item.name}</h4>
                <p class="candidate-desc">${item.desc}</p>
            </div>
        `).join('');
    }
}
