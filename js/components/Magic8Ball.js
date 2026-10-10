/**
 * 매직 8볼 컴포넌트 (js/components/Magic8Ball.js)
 */
import { magic8ballAnswers } from '../data/magic8ballData.js';

export class Magic8BallComponent {
    constructor() {
        this.isShaking = false;
        this.lastAnswer = null;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'magic8ballSection';
        section.className = 'section magic-section';

        section.innerHTML = `
            <div class="section-header">
                <span class="section-tag">PROGRAM 01</span>
                <h2 class="section-title">🎱 신비한 매직 8볼 (Magic 8-Ball)</h2>
                <p class="section-desc">
                    어릴 적 좋아했던 소설 『윔피키드(Wimpy Kid)』에 나왔던 갖고 싶었던 장난감, 매직 8볼을 직접 코딩으로 구현했습니다!
                </p>
            </div>

            <div class="card-glass magic-card">
                <!-- Magic 8-Ball Visual Container -->
                <div class="ball-container">
                    <div id="magicBall" class="magic-ball">
                        <div class="ball-shine"></div>
                        <div class="ball-outer-circle">
                            <span class="ball-number">8</span>
                        </div>
                        <div id="ballWindow" class="ball-window hidden">
                            <div class="triangle">
                                <div id="windowAnswerText" class="answer-inside-triangle">
                                    질문을 적고<br>흔들어보세요!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input & Action Controls -->
                <div class="magic-controls">
                    <label for="magicQuestionInput" class="magic-label">매직 8볼에게 질문하기!</label>
                    <div class="input-wrapper">
                        <input type="text" id="magicQuestionInput" class="magic-input" placeholder="예: 오늘 맛있는 점심을 먹게 될까요?" />
                    </div>

                    <button id="btnShakeBall" class="btn btn-primary btn-shake">
                        <span>🎱 매직 8볼 흔들기</span>
                    </button>
                </div>

                <!-- Answer Display Box -->
                <div id="magicAnswerResultBox" class="magic-result-box hidden">
                    <div class="result-badge" id="resultCategoryBadge">긍정형 조언</div>
                    <div class="result-quote" id="resultQuoteText">"답변이 이곳에 표시됩니다."</div>
                </div>
            </div>
        `;

        setTimeout(() => this.bindEvents(section), 0);
        return section;
    }

    bindEvents(container) {
        const btnShake = container.querySelector('#btnShakeBall');
        const inputQuestion = container.querySelector('#magicQuestionInput');
        const ball = container.querySelector('#magicBall');
        const ballWindow = container.querySelector('#ballWindow');
        const windowAnswerText = container.querySelector('#windowAnswerText');
        const resultBox = container.querySelector('#magicAnswerResultBox');
        const resultCategoryBadge = container.querySelector('#resultCategoryBadge');
        const resultQuoteText = container.querySelector('#resultQuoteText');

        const shakeAction = () => {
            if (this.isShaking) return;
            const question = inputQuestion.value.trim();

            if (!question) {
                if (window.toastApp) {
                    window.toastApp.show("💭 질문을 먼저 입력해주세요!");
                }
                inputQuestion.focus();
                return;
            }

            this.isShaking = true;
            btnShake.disabled = true;

            // Hide previous answer
            ballWindow.classList.add('hidden');
            resultBox.classList.add('hidden');

            // Add shaking class for 3D shake animation
            ball.classList.add('shaking-animation');

            // Pick random answer from 30 entries
            const randomIndex = Math.floor(Math.random() * magic8ballAnswers.length);
            const answer = magic8ballAnswers[randomIndex];
            this.lastAnswer = answer;

            setTimeout(() => {
                ball.classList.remove('shaking-animation');
                
                // Show triangle answer in the window
                windowAnswerText.innerHTML = `${answer.icon}<br>${answer.category}`;
                ballWindow.classList.remove('hidden');

                // Fill result detail card
                resultCategoryBadge.innerHTML = `${answer.icon} ${answer.category}`;
                resultQuoteText.textContent = `"${answer.text}"`;
                resultBox.classList.remove('hidden');

                this.isShaking = false;
                btnShake.disabled = false;
            }, 1200);
        };

        btnShake.addEventListener('click', shakeAction);
        inputQuestion.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') shakeAction();
        });
    }
}
