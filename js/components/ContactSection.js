/**
 * 하단 연락처 컴포넌트 (js/components/ContactSection.js)
 * bluvpluv@gmail.com으로 실시간 이메일 전송 기능 구현
 */
import { profileData } from '../data/profileData.js';

export class ContactSectionComponent {
    render() {
        const section = document.createElement('section');
        section.id = 'contactSection';
        section.className = 'section contact-section';

        section.innerHTML = `
            <div class="card-glass contact-card">
                <div class="contact-header">
                    <h2 class="contact-title">함께 멋진 AI 서비스를 만들어볼까요? 🚀</h2>
                    <p class="contact-subtitle">
                        새로운 프로젝트 제안, 채용 문의, 또는 스터디 및 기술 담소는 언제나 환영합니다.<br>
                        아래 폼에 입력하시면 <strong>bluvpluv@gmail.com</strong>으로 메시지가 직접 전송됩니다!
                    </p>
                </div>

                <div class="contact-actions-bar">
                    <button id="btnCopyEmail" class="btn btn-secondary btn-lg">
                        <span>✉️ 이메일 주소 복사</span>
                    </button>

                    <button id="btnGmailDirect" class="btn btn-secondary btn-lg">
                        <span>🌐 Gmail 웹으로 직접 작성</span>
                    </button>

                    <a href="${profileData.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
                        <span>💻 GitHub 방문하기</span>
                    </a>
                </div>

                <!-- Live Email Contact Form -->
                <form id="contactMessageForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="senderName" class="form-label">보내시는 분 성함 / 회사명</label>
                            <input type="text" id="senderName" required placeholder="홍길동" class="form-input" />
                        </div>
                        <div class="form-group">
                            <label for="senderEmail" class="form-label">답장받으실 이메일 주소</label>
                            <input type="email" id="senderEmail" required placeholder="example@domain.com" class="form-input" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="messageContent" class="form-label">메시지 내용</label>
                        <textarea id="messageContent" rows="5" required placeholder="안녕하세요 김민서 님, 프로젝트 관련 문의드립니다..." class="form-textarea"></textarea>
                    </div>

                    <button type="submit" id="btnSubmitMessage" class="btn btn-primary btn-submit" style="padding: 16px; font-size: 1.05rem;">
                        <span>🚀 bluvpluv@gmail.com으로 이메일 보내기</span>
                    </button>
                </form>

                <!-- Status Feedback Box -->
                <div id="emailSentResult" class="magic-result-box hidden" style="margin: 20px auto 0 auto; max-width: 650px;">
                    <div class="result-badge">✨ 이메일 전송 완료</div>
                    <div id="emailSentDetails" class="result-quote" style="font-size: 1.05rem; color: #a5b4fc;">
                        <!-- Status text -->
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => this.bindEvents(section), 0);
        return section;
    }

    bindEvents(container) {
        const btnCopy = container.querySelector('#btnCopyEmail');
        const btnGmailDirect = container.querySelector('#btnGmailDirect');
        const form = container.querySelector('#contactMessageForm');
        const btnSubmit = container.querySelector('#btnSubmitMessage');
        const resultBox = container.querySelector('#emailSentResult');
        const resultDetails = container.querySelector('#emailSentDetails');

        // Copy Email Address Button
        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(profileData.email).then(() => {
                if (window.toastApp) {
                    window.toastApp.show(`✨ 이메일 주소(${profileData.email})가 복사되었습니다!`);
                }
            }).catch(() => {
                if (window.toastApp) {
                    window.toastApp.show(`이메일 주소: ${profileData.email}`);
                }
            });
        });

        // Direct Gmail Compose Window Button
        btnGmailDirect.addEventListener('click', () => {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}&su=${encodeURIComponent("[포트폴리오] 문의드립니다")}`;
            window.open(gmailUrl, '_blank');
        });

        // Email Form Submit Handler
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = container.querySelector('#senderName').value.trim();
            const email = container.querySelector('#senderEmail').value.trim();
            const content = container.querySelector('#messageContent').value.trim();

            if (!name || !email || !content) {
                if (window.toastApp) window.toastApp.show("⚠️ 모든 필드를 입력해 주세요.");
                return;
            }

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = "<span>✉️ 이메일 전송 처리 중...</span>";

            try {
                // Formspree / Web Mail API Dispatch
                const response = await fetch("https://formspree.io/f/xbldwypv", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: content,
                        _replyto: email,
                        _subject: `[포트폴리오 문의] ${name} 님의 메시지`
                    })
                });

                if (response.ok) {
                    resultDetails.innerHTML = `
                        <p style="color: #34d399; font-weight: 800;">🎉 이메일이 김민서(bluvpluv@gmail.com) 님께 성공적으로 전달되었습니다!</p>
                        <p style="font-size: 0.9rem; margin-top: 6px; color: #cbd5e1;">성함: ${name} (${email})</p>
                        <p style="font-size: 0.85rem; margin-top: 4px; color: #94a3b8;">작성해주신 답장 이메일로 빠르게 답변 드리겠습니다. 감사합니다!</p>
                    `;
                    resultBox.classList.remove('hidden');

                    if (window.toastApp) {
                        window.toastApp.show(`✨ bluvpluv@gmail.com으로 이메일이 전송되었습니다!`);
                    }
                    form.reset();
                } else {
                    throw new Error("API dispatch fallback triggered");
                }
            } catch (err) {
                // Fallback Gmail compose & Mailto launcher if network is restricted
                const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}&su=${encodeURIComponent(`[포트폴리오 문의] ${name} 님의 메시지`)}&body=${encodeURIComponent(`보내시는 분: ${name}\n이메일: ${email}\n\n내용:\n${content}`)}`;
                window.open(gmailComposeUrl, '_blank');

                resultDetails.innerHTML = `
                    <p style="color: #60a5fa; font-weight: 800;">✉️ Gmail 창이 실행되었습니다!</p>
                    <p style="font-size: 0.9rem; margin-top: 6px; color: #cbd5e1;">bluvpluv@gmail.com 수신자로 메시지가 자동 입력되었습니다.</p>
                `;
                resultBox.classList.remove('hidden');

                if (window.toastApp) {
                    window.toastApp.show("📧 Gmail 전송 창이 열렸습니다!");
                }
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "<span>🚀 bluvpluv@gmail.com으로 이메일 보내기</span>";
            }
        });
    }
}
