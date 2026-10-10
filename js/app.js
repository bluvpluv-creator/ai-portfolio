/**
 * 메인 어플리케이션 엔트리 포인트 (js/app.js)
 */
import { Navbar } from './components/Navbar.js';
import { ProfileComponent } from './components/Profile.js';
import { Magic8BallComponent } from './components/Magic8Ball.js';
import { PoopGameComponent } from './components/PoopGame.js';
import { BobMenuComponent } from './components/BobMenu.js';
import { ContactSectionComponent } from './components/ContactSection.js';
import { Toast } from './components/Toast.js';

class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.toast = new Toast();
        window.toastApp = this.toast;

        this.init();
    }

    init() {
        if (!this.appContainer) return;

        // 1. Navbar
        const navbarNode = new Navbar().render();
        document.body.prepend(navbarNode);

        // 2. Main Content Layout
        const main = document.createElement('main');
        main.className = 'container main-content';

        // Add Components
        main.appendChild(new ProfileComponent().render());
        main.appendChild(new Magic8BallComponent().render());
        main.appendChild(new PoopGameComponent().render());
        main.appendChild(new BobMenuComponent().render());
        main.appendChild(new ContactSectionComponent().render());

        this.appContainer.appendChild(main);

        // Footer
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="container footer-content">
                <p>© 2026 Minseo Kim. Built with passion & AI.</p>
                <div class="footer-links">
                    <a href="https://github.com/bluvpluv-creator?tab=overview&from=2026-10-01&to=2026-10-10" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                    <span>•</span>
                    <a href="#bobMenuSection">밥메추 추천</a>
                </div>
            </div>
        `;
        document.body.appendChild(footer);

        this.initNavigationHighlighting();
    }

    initNavigationHighlighting() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
