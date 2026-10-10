/**
 * 하단 연락처 컴포넌트 (js/components/ContactSection.js)
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
                        새로운 프로젝트 제안, 채용 문의, 또는 스터디 및 기술 담소는 언제나 환영합니다.
                    </p>
                </div>

                <div class="contact-actions-bar">
                    <button id="btnCopyEmail" class="btn btn-secondary btn-lg">
                        <span>✉️ 이메일 주소 복사</span>
                    </button>

                    <a href="${profileData.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
                        <span>💻 GitHub 방문하기</span>
                    </a>
                </div>

                <!-- Email Message Form -->
                <form id="contactMessageForm" class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="senderName" class="form-label">보내시는 분 성함 / 회사명</label>
                            <input type="text" id="senderName" required placeholder="홍길동" class="form-input" />
                        </div>
                        <div class="form-group">
                            <label for="senderEmail" class="form-label">답장받으실 이메일</label>
                            <input type="email" id="senderEmail" required placeholder="example@domain.com" class="form-input" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="messageContent" class="form-label">메시지 내용</label>
                        <textarea id="messageContent" rows="4" required placeholder="안녕하세요 김민서 님, 프로젝트 관련 문의드립니다..." class="form-textarea"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-submit">
                        <span>🚀 메시지 보내기</span>
                    </button>
                </form>
            </div>
        `;

        setTimeout(() => this.bindEvents(section), 0);
        return section;
    }

    bindEvents(container) {
        const btnCopy = container.querySelector('#btnCopyEmail');
        const form = container.querySelector('#contactMessageForm');

        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(profileData.email).then(() => {
                if (window.toastApp) {
                    window.toastApp.show(`✨ 이메일 주소(${profileData.email})가 복사되었습니다!`);
                }
            }).catch(() => {
                if (window.toastApp) {
                    window.toastApp.show(`이메일: ${profileData.email}`);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = container.querySelector('#senderName').value;
            const email = container.querySelector('#senderEmail').value;
            const content = container.querySelector('#messageContent').value;

            // Simulating Email sending & mailto fallback
            const mailtoUri = `mailto:${profileData.email}?subject=${encodeURIComponent(`[포트폴리오 문의] ${name} 님의 메시지`)}&body=${encodeURIComponent(`성함/회사명: ${name}\n이메일: ${email}\n\n내용:\n${content}`)}`;
            window.location.href = mailtoUri;

            if (window.toastApp) {
                window.toastApp.show("📩 이메일 클라이언트가 실행되었습니다. 감사합니다!");
            }
            form.reset();
        });
    }
}
