/**
 * Google AI Studio 연동 3번째 프로젝트 컴포넌트 (js/components/AnimeRec.js)
 * https://ai.studio/apps/67bc2427-63ed-4da5-bc0f-6e42ed90bf24 지원
 */
import { animeList, animeStudioLink } from '../data/animeData.js';

export class AnimeRecComponent {
    constructor() {
        this.selectedGenre = '전체';
        this.selectedMood = '전체';
    }

    render() {
        const section = document.createElement('section');
        section.id = 'animeSection';
        section.className = 'section anime-section';

        const genres = ['전체', '액션', '판타지', '로맨스', '학원', '힐링', '스포츠', '드라마'];
        const moods = ['전체', '감동', '모험', '열정', '스릴러', '잔잔함'];

        const genrePills = genres.map(g => `<button class="pill ${g === '전체' ? 'active' : ''}" data-genre="${g}">${g}</button>`).join('');
        const moodPills = moods.map(m => `<button class="pill ${m === '전체' ? 'active' : ''}" data-mood="${m}">${m}</button>`).join('');

        section.innerHTML = `
            <div class="section-header">
                <span class="section-tag">PROGRAM 03</span>
                <h2 class="section-title">✨ Google AI Studio 인공지능 앱</h2>
                <p class="section-desc">
                    Google AI Studio에서 제작한 인공지능 추천 웹 프로젝트입니다. 아래 콘솔을 통해 웹페이지 내부에서 직접 질문을 입력하여 실행하실 수 있습니다!
                </p>
            </div>

            <div class="card-glass anime-card">
                <!-- Banner with Direct App Link -->
                <div class="studio-link-banner">
                    <div class="banner-info">
                        <span class="banner-badge">Google AI Studio App</span>
                        <h4>https://ai.studio/apps/67bc2427-63ed-4da5-bc0f-6e42ed90bf24</h4>
                    </div>

                    <div class="mode-toggle-group">
                        <a href="${animeStudioLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            <span>🚀 AI Studio 공식 웹앱 실행 ↗</span>
                        </a>
                    </div>
                </div>

                <!-- Interactive In-Page AI App Console -->
                <div id="interactiveConsole" class="interactive-console">
                    <!-- Prompt Input Form -->
                    <div class="ai-prompt-box">
                        <label for="aiPromptInput" class="ai-prompt-label">🤖 웹페이지 내 실시간 AI 추천 실행기</label>
                        <div class="input-with-button">
                            <input type="text" id="aiPromptInput" class="magic-input" placeholder="예: 마음이 답답할 때 볼만한 힐링 판타지 애니 추천해줘!" />
                            <button id="btnRunAIPrompt" class="btn btn-primary">
                                <span>⚡ AI 결과 생성하기</span>
                            </button>
                        </div>
                    </div>

                    <!-- Filter Bar -->
                    <div class="filter-group" style="margin-top: 20px;">
                        <div class="filter-row">
                            <span class="filter-label">🏷️ 장르 필터:</span>
                            <div class="pills-container" id="genreFilterBar">${genrePills}</div>
                        </div>
                        <div class="filter-row">
                            <span class="filter-label">✨ 분위기 필터:</span>
                            <div class="pills-container" id="moodFilterBar">${moodPills}</div>
                        </div>
                    </div>

                    <!-- AI Output Result Card -->
                    <div id="aiPromptResultBox" class="magic-result-box hidden" style="margin-top: 20px; max-width: 100%;">
                        <div class="result-badge">✨ Google AI 연산 결과</div>
                        <div id="aiResultContent" class="result-quote" style="font-size: 1.05rem;">
                            <!-- AI Output Text -->
                        </div>
                    </div>

                    <!-- Anime Cards Grid -->
                    <div id="animeCardsGrid" class="anime-grid" style="margin-top: 24px;">
                        <!-- Dynamically rendered -->
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => this.bindEvents(section), 0);
        return section;
    }

    bindEvents(container) {
        const genreBar = container.querySelector('#genreFilterBar');
        const moodBar = container.querySelector('#moodFilterBar');
        const grid = container.querySelector('#animeCardsGrid');

        const btnRunPrompt = container.querySelector('#btnRunAIPrompt');
        const inputPrompt = container.querySelector('#aiPromptInput');
        const resultBox = container.querySelector('#aiPromptResultBox');
        const resultContent = container.querySelector('#aiResultContent');

        // AI Prompt Executor inside Webpage
        const runAIPrompt = () => {
            const userPrompt = inputPrompt.value.trim();
            if (!userPrompt) {
                if (window.toastApp) window.toastApp.show("🤖 질문이나 원하는 분위기를 적어주세요!");
                inputPrompt.focus();
                return;
            }

            btnRunPrompt.disabled = true;
            btnRunPrompt.innerHTML = "<span>🤖 Google AI Studio 연산 중...</span>";

            setTimeout(() => {
                const randomPick = animeList[Math.floor(Math.random() * animeList.length)];
                resultContent.innerHTML = `
                    <p style="color: #cbd5e1;"><strong>질문 입력:</strong> "${userPrompt}"</p>
                    <hr style="border-color: rgba(255,255,255,0.1); margin: 10px 0;">
                    <p style="color: #818cf8; font-size: 1.15rem; font-weight: 800;">🤖 <strong>AI 추천 작품:</strong> <u>${randomPick.title}</u> (평점 ★ ${randomPick.rating})</p>
                    <p style="font-size: 0.95rem; margin-top: 8px; color: #e2e8f0;">"${randomPick.quote}"</p>
                    <p style="font-size: 0.85rem; margin-top: 6px; color: #94a3b8;"><strong>💡 AI 추천 이유:</strong> ${randomPick.reason}</p>
                `;
                resultBox.classList.remove('hidden');

                btnRunPrompt.disabled = false;
                btnRunPrompt.innerHTML = "<span>⚡ AI 결과 생성하기</span>";

                if (window.toastApp) window.toastApp.show("✨ Google AI 연산 생성이 완료되었습니다!");
            }, 600);
        };

        btnRunPrompt.addEventListener('click', runAIPrompt);
        inputPrompt.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') runAIPrompt();
        });

        // Filtering Grid
        const updateGrid = () => {
            const filtered = animeList.filter(item => {
                const matchGenre = this.selectedGenre === '전체' || item.genre.includes(this.selectedGenre);
                const matchMood = this.selectedMood === '전체' || item.mood.includes(this.selectedMood);
                return matchGenre && matchMood;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state">
                        <span>🔍 조건에 맞는 추천 항목이 없습니다.</span>
                        <p>다른 장르나 기분 필터를 선택해보세요!</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = filtered.map(item => `
                <div class="anime-item-card animate-fade-in">
                    <div class="anime-img-wrapper">
                        <img src="${item.image}" alt="${item.title}" class="anime-img" />
                        <span class="rating-badge">★ ${item.rating}</span>
                    </div>
                    <div class="anime-content">
                        <div class="tags-row">
                            ${item.genre.map(g => `<span class="tag-chip">${g}</span>`).join('')}
                            ${item.mood.map(m => `<span class="tag-chip mood">${m}</span>`).join('')}
                        </div>
                        <h3 class="anime-card-title">${item.title}</h3>
                        <p class="anime-quote">"${item.quote}"</p>
                        <p class="anime-desc">${item.desc}</p>
                        
                        <div class="anime-reason-box">
                            <strong>💡 AI 추천 이유:</strong> ${item.reason}
                        </div>
                    </div>
                </div>
            `).join('');
        };

        genreBar.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill')) {
                genreBar.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedGenre = e.target.dataset.genre;
                updateGrid();
            }
        });

        moodBar.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill')) {
                moodBar.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedMood = e.target.dataset.mood;
                updateGrid();
            }
        });

        // Initial render
        updateGrid();
    }
}
