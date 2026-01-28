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
        this.setupAutoUpdate();
    }

    // Auto-update check: if user doesn't interact for 10 seconds on first load, force update
    setupAutoUpdate() {
        // Only run once per session (avoid refresh loops)
        if (sessionStorage.getItem('seiryuu_update_checked')) {
            return;
        }

        let updateTimer = setTimeout(() => {
            this.checkForUpdates();
        }, 10000); // 10 seconds

        // Cancel timer on any user interaction
        const cancelUpdate = () => {
            if (updateTimer) {
                clearTimeout(updateTimer);
                updateTimer = null;
                // Mark as checked so it doesn't restart
                sessionStorage.setItem('seiryuu_update_checked', 'true');
                // Remove listeners
                document.removeEventListener('touchstart', cancelUpdate);
                document.removeEventListener('click', cancelUpdate);
                document.removeEventListener('scroll', cancelUpdate);
            }
        };

        document.addEventListener('touchstart', cancelUpdate, { once: true });
        document.addEventListener('click', cancelUpdate, { once: true });
        document.addEventListener('scroll', cancelUpdate, { once: true });
    }

    async checkForUpdates() {
        sessionStorage.setItem('seiryuu_update_checked', 'true');

        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    await registration.update();
                    // If there's a waiting worker, activate it and refresh
                    if (registration.waiting) {
                        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                        window.location.reload();
                    }
                }
            } catch (err) {
                console.log('Update check failed:', err);
            }
        }
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

        // Setup "Il Dojo" Popup with clickable address
        document.getElementById('dojo-btn').addEventListener('click', () => {
            const dojoAddress = 'Viale degli antichi platani, 1, Caserta';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dojoAddress)}`;

            this.showModal(`
                <h2>Il Dojo</h2>
                <p><strong>Sensei:</strong> Danilo Manodoro (VI Dan)</p>
                <p><strong>Indirizzo:</strong> 
                    <a href="${mapsUrl}" target="_blank" rel="noopener" style="color: #2196F3; text-decoration: underline;">
                        ${dojoAddress}
                    </a>
                </p>
                
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

        // Notification helper functions
        this.openNotificationPost = (postId) => {
            this.closeModal();
            // Find the post by ID in window._seiryuuPosts
            if (window._seiryuuPosts) {
                const index = window._seiryuuPosts.findIndex(p => p.id === postId);
                if (index !== -1) {
                    setTimeout(() => this.showPostDetail(index), 200);
                }
            }
        };

        this.markNotificationRead = (postId) => {
            const bell = this.bell;
            if (bell) {
                bell.markAsRead(postId);
                bell.render(); // Re-render to update badge
            }
            this.closeModal();
        };

        this.markAllNotificationsRead = () => {
            const bell = this.bell;
            if (bell) {
                bell.getUnreadNotifications().forEach(n => bell.markAsRead(n.id));
                bell.render();
            }
            this.closeModal();
        };

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

    showPinnedTechniques() {
        const pinnedItems = JSON.parse(localStorage.getItem('seiryuu_exam_pins') || '{}');
        // We also need the checks to mark them as done
        const keys = Object.keys(pinnedItems);

        if (keys.length === 0) {
            this.showModal(`
                <h2>Tecniche da ripetere</h2>
                <p>Non hai nessuna tecnica pinnata.</p>
                <p style="font-size:0.9em; color:#666;">Vai nella sezione <strong>Esami</strong> e clicca su 📌 per aggiungere tecniche qui.</p>
            `);
            return;
        }

        // Helper to parse ID: grade|section|key|tech (old) or grade|section|attack|tech (new)
        // Actually, let's just use the ID components.
        // We stored: `${grade}|${section.key}|${attack}|${tech}` or similar.

        let listHtml = keys.map(id => {
            const parts = id.split('|');
            // Grade is usually parts[0], but let's just show the full tech string if possible
            // Better: parse it nicely.
            const techName = parts[parts.length - 1]; // Tech is always last
            const grade = parts[0];
            const type = parts[1] === 'tachiwaza' ? 'Tachiwaza' :
                parts[1] === 'suwariwaza' ? 'Suwariwaza' :
                    parts[1] === 'hanmihantachiwaza' ? 'Hanmi-hantachi' : parts[1];

            return `
                <div class="pinned-item-card" id="pin-card-${id.replace(/[^a-zA-Z0-9]/g, '')}" style="display:flex; align-items:center; justify-content:space-between; padding:12px; border-bottom:1px solid #eee;">
                    <div>
                        <div style="font-weight:bold; color:#333;">${techName}</div>
                        <div style="font-size:0.8em; color:#666;">${grade} - ${type}</div>
                    </div>
                    <div onclick="window.seiryuuApp.togglePinToDone('${id}')" style="cursor:pointer; padding:5px; border:1px solid #ccc; border-radius:4px; background:#fff;">
                        ✅ Fatto
                    </div>
                </div>
            `;
        }).join('');

        this.showModal(`
            <h2>Tecniche da ripetere</h2>
            <p style="font-size:0.9em; color:#666; margin-bottom:15px;">Clicca su "Fatto" per rimuovere dai pin e segnare come studiata.</p>
            <div style="max-height: 60vh; overflow-y: auto;">
                ${listHtml}
            </div>
        `);
    }

    togglePinToDone(id) {
        // 1. Remove from Pins
        const pins = JSON.parse(localStorage.getItem('seiryuu_exam_pins') || '{}');
        if (pins[id]) {
            delete pins[id];
            localStorage.setItem('seiryuu_exam_pins', JSON.stringify(pins));
        }

        // 2. Add to Checks (Mark as Done)
        const checks = JSON.parse(localStorage.getItem('seiryuu_exam_checks') || '{}');
        checks[id] = true;
        localStorage.setItem('seiryuu_exam_checks', JSON.stringify(checks));

        // 3. UI Update (remove element)
        const safeId = id.replace(/[^a-zA-Z0-9]/g, '');
        const el = document.getElementById(`pin-card-${safeId}`);
        if (el) {
            el.style.opacity = '0';
            setTimeout(() => {
                el.remove();
                // If list empty, show message? 
                if (document.querySelectorAll('.pinned-item-card').length === 0) {
                    this.showModal(`
                        <h2>Tecniche da ripetere</h2>
                        <p>Hai completato tutte le tecniche pinnate! 🎉</p>
                    `);
                }
            }, 300);
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
