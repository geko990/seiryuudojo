import { CONFIG } from '../config.js';

export default class Settings {
    async render() {
        const div = document.createElement('div');
        div.className = 'settings-container';
        div.innerHTML = `
            <h2>Impostazioni</h2>

            <div class="card settings-card">
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

            // VERSION CLICK - Clear Cache
            if (versionNumber) {
                versionNumber.addEventListener('click', async () => {
                    if (confirm('Vuoi cancellare la cache e forzare il ricaricamento?')) {
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
