import { CONFIG } from '../config.js';

export default class Settings {
    async render() {
        const div = document.createElement('div');
        div.className = 'settings-container';
        div.innerHTML = `
            <h2>Impostazioni</h2>
            
            <div class="card settings-card">
                <h3>Admin Mode</h3>
                <label class="switch">
                    <input type="checkbox" id="admin-toggle">
                    <span class="slider round"></span>
                </label>
                <p id="admin-status" style="margin-top: 10px; font-size: 0.9em;">
                    Sola lettura
                </p>
                <div id="admin-actions" class="hidden" style="margin-top: 20px;">
                    <button id="edit-dojo-btn" class="action-btn" style="margin-bottom: 10px; width: 100%;">Modifica "Il Dojo"</button>
                    <button id="export-btn" class="action-btn" style="width: 100%;">Esporta Dati (JSON)</button>
                </div>
            </div>

            <div class="card settings-card">
                <h3>Info App</h3>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <span>Versione:</span>
                    <strong id="version-number" style="cursor: pointer; text-decoration: underline; color: var(--accent-color);">${CONFIG.APP_VERSION}</strong>
                    <span style="font-size: 0.8em; color: #888;">(Alpha)</span>
                </div>
                <button id="update-app-btn" style="width: 100%; padding: 12px; background: var(--accent-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 10px;">
                    Aggiorna App
                </button>
                <p style="font-size: 0.75em; color: #888; text-align: center;">
                    Clicca sulla versione per forzare la pulizia della cache.
                </p>
                <p>${CONFIG.APP_NAME}</p>
                <p style="font-size: 0.8em; color: #666;">Build: ${CONFIG.BUILD_DATE}</p>
            </div>
        `;

        // Setup event listeners after a short delay to ensure DOM is ready
        setTimeout(() => {
            const toggle = div.querySelector('#admin-toggle');
            const status = div.querySelector('#admin-status');
            const actions = div.querySelector('#admin-actions');
            const versionNumber = div.querySelector('#version-number');
            const updateBtn = div.querySelector('#update-app-btn');
            const editDojoBtn = div.querySelector('#edit-dojo-btn');

            // VERSION CLICK LOGIC (Clear Cache)
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

            // UPDATE BUTTON
            if (updateBtn) {
                updateBtn.addEventListener('click', () => {
                    window.location.reload(true);
                });
            }

            // EDIT DOJO BUTTON (Admin Only)
            if (editDojoBtn) {
                editDojoBtn.addEventListener('click', () => {
                    const currentInfo = localStorage.getItem('seiryuu_dojo_info') ||
                        'Sensei: Maestro X\nIndirizzo: Via delle Arti Marziali, 10, Caserta';

                    const modalHTML = '<h3>Modifica Info Dojo</h3>' +
                        '<textarea id="dojo-info-edit" style="width: 100%; height: 150px; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">' +
                        currentInfo + '</textarea>' +
                        '<button id="save-dojo-btn" style="width: 100%; margin-top: 15px; padding: 12px; background: var(--accent-color); color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">Salva</button>';

                    window.seiryuuApp.showModal(modalHTML);

                    // Add save handler after modal is shown
                    setTimeout(() => {
                        const saveBtn = document.getElementById('save-dojo-btn');
                        if (saveBtn) {
                            saveBtn.addEventListener('click', () => {
                                const newInfo = document.getElementById('dojo-info-edit').value;
                                localStorage.setItem('seiryuu_dojo_info', newInfo);
                                window.seiryuuApp.closeModal();
                                alert('Info Dojo salvate!');
                            });
                        }
                    }, 100);
                });
            }

            // ADMIN TOGGLE
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        status.textContent = "Modalita Modifica Attiva";
                        actions.classList.remove('hidden');
                        localStorage.setItem('isAdmin', 'true');
                    } else {
                        status.textContent = "Sola lettura";
                        actions.classList.add('hidden');
                        localStorage.removeItem('isAdmin');
                    }
                });

                // Check previous state
                if (localStorage.getItem('isAdmin')) {
                    toggle.checked = true;
                    status.textContent = "Modalita Modifica Attiva";
                    actions.classList.remove('hidden');
                }
            }
        }, 0);

        return div;
    }
}
