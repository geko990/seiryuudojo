import { CONFIG } from '../config.js';

export default class Settings {
    async render() {
        const div = document.createElement('div');
        div.className = 'settings-container';
        div.innerHTML = `
            <h2>Impostazioni</h2>

            <div class="card settings-card">
                <h3>📲 Installa l'App</h3>
                <p style="font-size: 0.9em; color: #555; margin-bottom: 15px;">
                    Salva l'app sul tuo telefono per un accesso rapido:
                </p>
                
                <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
                    <ol style="font-size: 0.9em; color: #444; margin: 0; padding-left: 20px; line-height: 1.8;">
                        <li>Apri il <strong>menu del browser</strong> (⋮ o icona Condividi)</li>
                        <li>Cerca <strong>"Aggiungi a Home"</strong> o <strong>"Installa app"</strong></li>
                        <li>Conferma e l'icona apparirà nella tua Home!</li>
                    </ol>
                </div>
            </div>

            <!-- Notifications Section -->
            <div class="card settings-card" style="margin-top: 20px;">
                <h3>🔔 Notifiche & Badge</h3>
                
                <!-- Permission Status -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #444;">Permessi Notifiche:</span>
                    <span id="notif-status" style="font-weight: bold; font-size: 0.9em;">...</span>
                </div>

                <!-- Activate Button -->
                <button id="activate-notif-btn" style="width: 100%; padding: 10px; background: var(--accent-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; display: none; margin-bottom: 15px;">
                    Attiva Notifiche
                </button>

                <p id="notif-hint" style="font-size: 0.8em; color: #666; margin-bottom: 15px; display: none;">
                    *Serve anche per il badge sull'icona app (iOS).
                </p>

                <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">

                <!-- Badge Toggle -->
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span style="color: #444;">Mostra Badge sull'Icona</span>
                    <label class="switch">
                        <input type="checkbox" id="badge-toggle">
                        <span class="slider round"></span>
                    </label>
                </div>
                <p style="font-size: 0.75em; color: #888; margin-top: 5px;">
                    Mostra il numero di notifiche non lette sull'icona della Home.
                </p>
            </div>

            <div class="card settings-card" style="margin-top: 20px;">
                <h3>Info App</h3>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <span>Versione:</span>
                    <strong id="version-number" style="cursor: pointer; text-decoration: underline; color: var(--accent-color);">${CONFIG.APP_VERSION}</strong>
                    <span style="font-size: 0.8em; color: #888;">(Alpha)</span>
                </div>
                <button id="update-app-btn" style="width: 100%; padding: 12px; background: var(--accent-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 15px;">
                    Aggiorna App
                </button>
                <p style="font-size: 0.75em; color: #888; text-align: center; margin-bottom: 15px;">
                    Clicca sulla versione per pulire la cache.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
                <p style="font-weight: 600;">${CONFIG.APP_NAME}</p>
                <p style="font-size: 0.85em; color: #666;">Build: ${CONFIG.BUILD_DATE}</p>
            </div>
        `;

        // Setup event listeners
        setTimeout(() => {
            const versionNumber = div.querySelector('#version-number');
            const updateBtn = div.querySelector('#update-app-btn');

            // Notifications Logic
            const notifStatus = div.querySelector('#notif-status');
            const activateBtn = div.querySelector('#activate-notif-btn');
            const notifHint = div.querySelector('#notif-hint');
            const badgeToggle = div.querySelector('#badge-toggle');

            // 1. Check Permissions
            const updatePermissionUI = () => {
                const permission = 'Notification' in window ? Notification.permission : 'unsupported';

                if (permission === 'granted') {
                    notifStatus.textContent = '✅ Attive';
                    notifStatus.style.color = 'green';
                    activateBtn.style.display = 'none';
                    notifHint.style.display = 'none';
                } else if (permission === 'denied') {
                    notifStatus.textContent = '❌ Bloccate';
                    notifStatus.style.color = 'red';
                    activateBtn.style.display = 'block';
                    activateBtn.textContent = 'Sblocca nelle Impostazioni Browser';
                    activateBtn.disabled = true;
                    activateBtn.style.backgroundColor = '#ccc';
                    notifHint.style.display = 'block';
                } else {
                    notifStatus.textContent = '⚠️ Non Attive';
                    notifStatus.style.color = 'orange';
                    activateBtn.style.display = 'block';
                    notifHint.style.display = 'block';
                }
            };

            updatePermissionUI();

            // 2. Activate Button Handler
            if (activateBtn) {
                activateBtn.addEventListener('click', () => {
                    if ('Notification' in window) {
                        Notification.requestPermission().then(updatePermissionUI);
                    }
                });
            }

            // 3. Badge Toggle Handler
            if (badgeToggle) {
                // Load saved state (default true)
                const savedState = localStorage.getItem('seiryuu_badge_enabled');
                badgeToggle.checked = savedState !== 'false'; // Default true if null

                badgeToggle.addEventListener('change', (e) => {
                    const isEnabled = e.target.checked;
                    localStorage.setItem('seiryuu_badge_enabled', isEnabled);

                    // Update Badge Immediately
                    if (!isEnabled) {
                        if ('setAppBadge' in navigator) navigator.clearAppBadge();
                    } else {
                        // If turning on, try to set badge if we have count (hacky, easiest is reload or wait for next fetch)
                        // Trigger a fetch if possible? Or just wait.
                        // Ideally we access the bell instance, but here we are in Settings.
                        // Let's just clear for now if disabled.
                    }
                });
            }

            // VERSION CLICK - Clear Cache (no confirmation)
            if (versionNumber) {
                versionNumber.addEventListener('click', async () => {
                    try {
                        if ('serviceWorker' in navigator) {
                            const registrations = await navigator.serviceWorker.getRegistrations();
                            for (let reg of registrations) await reg.unregister();
                            const keys = await caches.keys();
                            for (let key of keys) await caches.delete(key);
                        }
                        window.location.reload(true);
                    } catch (e) {
                        console.error('Cache clear failed:', e);
                        window.location.reload(true);
                    }
                });
            }

            // UPDATE BUTTON - Simple reload
            if (updateBtn) {
                updateBtn.addEventListener('click', () => {
                    window.location.reload(true);
                });
            }
        }, 0);

        return div;
    }
}
