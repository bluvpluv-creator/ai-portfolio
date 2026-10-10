/**
 * 자기소개 프로필 컴포넌트 (js/components/Profile.js)
 */
import { profileData } from '../data/profileData.js';

export class ProfileComponent {
    render() {
        const section = document.createElement('section');
        section.id = 'profileSection';
        section.className = 'section profile-section';

        const interestsHtml = profileData.interests.map(item => `
            <div class="card-glass interest-card">
                <span class="interest-icon">${item.icon}</span>
                <h4 class="interest-title">${item.name}</h4>
                <p class="interest-desc">${item.desc}</p>
            </div>
        `).join('');

        const languagesHtml = profileData.studyingLanguages.map(lang => `
            <div class="lang-item">
                <div class="lang-header">
                    <span class="lang-name">${lang.icon} ${lang.name}</span>
                    <span class="lang-percent">${lang.level}%</span>
                </div>
                <div class="lang-bar-bg">
                    <div class="lang-bar-fill" style="width: ${lang.level}%; background: linear-gradient(90deg, #6366f1, ${lang.color});"></div>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="card-glass hero-card animate-fade-in">
                <div class="hero-top-grid">
                    <div class="avatar-container">
                        <div class="avatar-glow"></div>
                        <img src="${profileData.avatar}" alt="${profileData.name}" class="avatar-img" />
                        <span class="birth-badge">🎂 ${profileData.birthYear}</span>
                    </div>

                    <div class="hero-details">
                        <div class="badge-group">
                            <span class="badge badge-univ">🎓 ${profileData.university}</span>
                            <span class="badge badge-dept">🤖 ${profileData.department} (${profileData.grade})</span>
                        </div>

                        <h1 class="hero-title">
                            안녕하세요, <span class="gradient-text">${profileData.name}</span>입니다!
                        </h1>

                        <p class="hero-summary">
                            "${profileData.bioSummary}"
                        </p>

                        <div class="hero-actions">
                            <a href="${profileData.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                <span>💻 GitHub 방문하기</span>
                            </a>
                            <a href="#magic8ballSection" class="btn btn-secondary">
                                <span>🎮 프로젝트 체험하기</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="hero-bottom-grid">
                    <!-- 관심 분야 -->
                    <div class="hero-sub-block">
                        <h3 class="sub-block-title">💡 관심 있는 분야</h3>
                        <div class="interests-grid">
                            ${interestsHtml}
                        </div>
                    </div>

                    <!-- 공부하고 있는 언어 (배우고 있는 언어) -->
                    <div class="hero-sub-block">
                        <h3 class="sub-block-title">📚 배우고 있는 언어</h3>
                        <div class="languages-list">
                            ${languagesHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return section;
    }
}
