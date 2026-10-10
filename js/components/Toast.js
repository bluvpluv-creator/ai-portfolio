/**
 * 알림 토스트 컴포넌트 (js/components/Toast.js)
 */
export class Toast {
    constructor() {
        this.toastEl = document.getElementById('toastNotification');
        this.toastMsgEl = document.getElementById('toastMessage');
        this.timer = null;
    }

    show(message, duration = 3000) {
        if (!this.toastEl || !this.toastMsgEl) return;
        this.toastMsgEl.textContent = message;
        this.toastEl.classList.remove('hidden');
        this.toastEl.classList.add('show');

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.toastEl.classList.remove('show');
            setTimeout(() => this.toastEl.classList.add('hidden'), 300);
        }, duration);
    }
}
