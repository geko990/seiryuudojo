import Router from './router.js';
import Home from './components/Home.js';
import Exams from './components/Exams.js';
import Study from './components/Study.js'; // Will repurpose as Search/Study
import Glossary from './components/Glossary.js';
import Settings from './components/Settings.js';
import Bell from './components/Bell.js';

class App {
    constructor() {
        this.router = new Router();
        this.bell = new Bell('#notification-bell');
        this.init();
    }

    init() {
        // Define routes
        this.router.addRoute('home', new Home());
        this.router.addRoute('exams', new Exams());
        this.router.addRoute('search', new Study()); // Reusing study for Search for now
        this.router.addRoute('glossary', new Glossary());
        this.router.addRoute('settings', new Settings());

        // Setup navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.target; // Use currentTarget to ensure we get the button
                if (target) {
                    console.log('Navigating to:', target);
                    this.router.navigate(target);
                    this.updateNav(target);
                } else {
                    console.error('Navigation target missing for button:', btn);
                }
            });
        });

        // Initialize Bell
        this.bell.render();

        // Setup "Il Dojo" Popup
        document.getElementById('dojo-btn').addEventListener('click', () => {
            this.showModal(`
                <h2>Il Dojo</h2>
                <p><strong>Sensei:</strong> Danilo Manodoro (VI Dan)</p>
                <p><strong>Indirizzo:</strong> Viale degli antichi platani, 1, Caserta</p>
                
                <h3 style="margin-top: 20px; color: var(--accent-color);">Orari</h3>
                <div style="font-size: 0.95em; line-height: 1.8;">
                    <p><strong>Martedì:</strong><br>
                    19:00 - 20:00 (tutti)<br>
                    20:00 - 21:00 (da IV Kyu)</p>
                    
                    <p><strong>Mercoledì:</strong><br>
                    19:30 - 20:30 (gradi Kyu)</p>
                    
                    <p><strong>Giovedì:</strong><br>
                    19:00 - 20:00 (tutti)<br>
                    20:00 - 21:00 (tutti)</p>
                </div>
            `);
        });

        // Setup Modal Close (Click Outside)
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Load default route
        this.router.navigate('home');

        // Sticky Header Logic (Smart)
        window.addEventListener('scroll', () => {
            const header = document.getElementById('top-header');
            const heroTitle = document.querySelector('.kanji-title'); // Track the main title

            if (heroTitle) {
                const rect = heroTitle.getBoundingClientRect();
                // When the bottom of the hero title goes off screen (negative top or close to 0), show sticky
                if (rect.bottom < 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            } else {
                // Fallback if no hero (e.g. other pages)
                if (window.scrollY > 150) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }

    updateNav(target) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.target === target) {
                btn.classList.add('active');
            }
        });
    }

    async showEtiquette() {
        try {
            const response = await fetch('data/etiquette.json');
            const rules = await response.json();
            const html = `
                <h2>Etichetta del Dojo</h2>
                <div style="text-align: left;">
                    ${rules.map(r => `
                        <div style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                            <h3 style="color:var(--accent-color)">${r.title}</h3>
                            <p>${r.rule}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            this.showModal(html);
        } catch (e) {
            console.error(e);
        }
    }

    filterWeapons() {
        // Navigate to Search and filter by Weapons
        this.router.navigate('search');
        this.updateNav('search');
        // Small timeout to let component render
        setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = "bokken"; // Simple filter for now
                searchInput.dispatchEvent(new Event('input'));
            }
        }, 100);
    }

    showFoundations() {
        this.showModal(`
            <h2>Fondamenti</h2>
            <h3>Tai Sabaki</h3>
            <p>Irimi, Tenkan, Tenshin...</p>
            <h3>Ashi Sabaki</h3>
            <p>Tsugi-ashi, Ayumi-ashi...</p>
        `);
    }

    async showEtiquette() {
        try {
            const response = await fetch('data/etiquette.json');
            const rules = await response.json();
            const html = `
                <h2>Etichetta del Dojo</h2>
                <div style="text-align: left;">
                    ${rules.map(r => `
                        <div style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                            <h3 style="color:var(--accent-color)">${r.title}</h3>
                            <p>${r.rule}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            this.showModal(html);
        } catch (e) {
            console.error(e);
        }
    }

    filterWeapons() {
        // Navigate to Search and filter by Weapons
        this.router.navigate('search');
        this.updateNav('search');
        // Small timeout to let component render
        setTimeout(() => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = "bukiwaza";
                searchInput.dispatchEvent(new Event('input'));
            }
        }, 100);
    }

    showFoundations() {
        this.showModal(`
            <h2>Fondamenti</h2>
            <h3>Tai Sabaki</h3>
            <p>Irimi, Tenkan, Tenshin...</p>
            <h3>Ashi Sabaki</h3>
            <p>Tsugi-ashi, Ayumi-ashi...</p>
        `);
    }

    showModal(contentHTML) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        content.innerHTML = contentHTML;
        overlay.classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('modal-overlay').classList.add('hidden');
    }
}

// Start the app
window.seiryuuApp = new App();
