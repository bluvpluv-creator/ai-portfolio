/**
 * 상단 네비게이션 바 컴포넌트 (js/components/Navbar.js)
 */
export class Navbar {
    render() {
        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = `
            <div class="nav-container">
                <a href="#profileSection" class="nav-brand">
                    <span class="brand-avatar-mini">✨</span>
                    <div class="brand-text">
                        <span class="brand-name">김민서</span>
                        <span class="brand-tag">Language & AI</span>
                    </div>
                </a>
                
                <ul class="nav-menu">
                    <li><a href="#profileSection" class="nav-link active">자기소개</a></li>
                    <li><a href="#magic8ballSection" class="nav-link">🎱 매직 8볼</a></li>
                    <li><a href="#poopGameSection" class="nav-link">💩 똥 피하기</a></li>
                    <li><a href="#bobMenuSection" class="nav-link">🍚 밥메추 추천</a></li>
                    <li><a href="#contactSection" class="nav-link">✉️ 연락처</a></li>
                </ul>

                <a href="https://github.com/bluvpluv-creator?tab=overview&from=2026-10-01&to=2026-10-10" target="_blank" rel="noopener noreferrer" class="btn-github-nav">
                    <span>GitHub</span> ↗
                </a>
            </div>
        `;
        return nav;
    }
}
