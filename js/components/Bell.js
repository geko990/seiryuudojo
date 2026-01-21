export default class Bell {
    constructor(selector) {
        this.selector = selector;
        this.notifications = [
            "Benvenuto nella nuova App!",
            "Ricordati di portare il Bokken venerdì.",
            "Prossimi esami: 20 Maggio"
        ];
    }

    render() {
        const container = document.querySelector(this.selector);
        if (!container) return;

        // Bronze bell SVG icon
        container.innerHTML = `
           <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-color)" stroke="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
           ${this.notifications.length > 0 ? '<span class="notify-badge"></span>' : ''}
        `;

        container.addEventListener('click', () => {
            const listHtml = this.notifications.length
                ? `<ul style="text-align:left; padding-left:20px;">${this.notifications.map(n => `<li style="margin-bottom:10px;">${n}</li>`).join('')}</ul>`
                : '<p>Nessuna nuova notifica.</p>';

            window.seiryuuApp.showModal(`
                <h2>Notifiche</h2>
                ${listHtml}
            `);
        });
    }
}
