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
