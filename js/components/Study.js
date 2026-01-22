export default class Study {
    constructor() {
        this.data = { techniques: [], attacks: [], terminology: [], equipment: [] };
        this.allItems = [];
    }

    async init() {
        try {
            const response = await fetch('data/aikido_glossary.json');
            this.data = await response.json();
            // Flatten all items into one searchable array
            this.allItems = [
                ...this.data.techniques,
                ...this.data.attacks,
                ...this.data.terminology,
                ...this.data.equipment
            ];
        } catch (error) {
            console.error('Error loading glossary:', error);
        }
    }

    getRandomItems(count = 3) {
        const shuffled = [...this.allItems].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    async render() {
        if (this.allItems.length === 0) await this.init();

        const div = document.createElement('div');
        div.className = 'study-container';
        div.innerHTML = `
            <h2 style="margin-bottom: 15px; padding-left: 5px;">Ricerca</h2>
            <input type="text" id="search-input" class="search-bar" placeholder="Cerca tecniche, termini, attrezzature...">
            <div id="search-results" class="search-results">
                <!-- Results injected here -->
            </div>
        `;

        setTimeout(() => this.attachListeners(div), 0);
        setTimeout(() => this.showRandomSuggestions(div.querySelector('#search-results')), 0);

        return div;
    }

    attachListeners(container) {
        const searchInput = container.querySelector('#search-input');
        const resultsDiv = container.querySelector('#search-results');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length === 0) {
                this.showRandomSuggestions(resultsDiv);
            } else if (query.length >= 2) {
                this.search(query, resultsDiv);
            }
        });
    }

    showRandomSuggestions(container) {
        const randoms = this.getRandomItems(3);
        container.innerHTML = `
            <p class="suggestions-label">Suggerimenti:</p>
            ${randoms.map(item => this.renderCard(item)).join('')}
        `;
        this.attachCardListeners(container);
    }

    search(query, container) {
        const lowerQuery = query.toLowerCase();
        const results = this.allItems.filter(item => {
            const name = (item.name || '').toLowerCase();
            const romaji = (item.romaji || '').toLowerCase();
            const description = (item.description || '').toLowerCase();
            const category = (item.category || '').toLowerCase();
            const type = (item.type || '').toLowerCase();

            return name.includes(lowerQuery) ||
                romaji.includes(lowerQuery) ||
                description.includes(lowerQuery) ||
                category.includes(lowerQuery) ||
                type.includes(lowerQuery);
        });

        if (results.length === 0) {
            container.innerHTML = `<p class="no-results">Nessun risultato per "${query}"</p>`;
        } else {
            container.innerHTML = results.map(item => this.renderCard(item)).join('');
            this.attachCardListeners(container);
        }
    }

    renderCard(item) {
        const icon = this.getIcon(item.category);
        const badge = item.type ? `<span class="item-badge">${item.type}</span>` : '';

        return `
            <div class="card search-result-card" data-id="${item.id}">
                <div class="result-header">
                    <span class="result-icon">${icon}</span>
                    <h3>${item.name}</h3>
                    ${badge}
                </div>
                <p class="result-preview">${item.description ? item.description.substring(0, 80) + '...' : ''}</p>
            </div>
        `;
    }

    getIcon(category) {
        switch (category) {
            case 'tecnica': return '🥋';
            case 'attacco': return '👊';
            case 'terminologia': return '📚';
            case 'arma': return '⚔️';
            case 'abbigliamento': return '👘';
            case 'attrezzatura': return '🔧';
            default: return '📖';
        }
    }

    attachCardListeners(container) {
        container.querySelectorAll('.search-result-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const item = this.allItems.find(i => i.id === id);
                if (item) this.showDetail(item);
            });
        });
    }

    showDetail(item) {
        let content = `
            <h2 style="color: var(--accent-color); margin-bottom: 10px;">
                ${this.getIcon(item.category)} ${item.name}
            </h2>
        `;

        if (item.kanji) {
            content += `<p style="font-size: 1.5em; text-align: center; margin-bottom: 15px; color: #333;">${item.kanji}</p>`;
        }

        if (item.romaji && item.romaji !== item.name) {
            content += `<p style="font-size: 0.9em; color: #666; margin-bottom: 10px;"><em>${item.romaji}</em></p>`;
        }

        content += `<p style="margin-bottom: 15px; line-height: 1.6;">${item.description || ''}</p>`;

        if (item.spiritual) {
            content += `
                <div style="background: #f5f5dc; padding: 12px; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid var(--accent-color);">
                    <strong>🧘 Significato spirituale:</strong><br>
                    <span style="font-style: italic;">${item.spiritual}</span>
                </div>
            `;
        }

        if (item.exam_appearances && item.exam_appearances.length > 0) {
            content += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin-bottom: 8px;">📋 Presente negli esami:</h4>
                    <ul style="font-size: 0.9em; padding-left: 20px; line-height: 1.6;">
                        ${item.exam_appearances.map(ex =>
                `<li><strong>${ex.exam}</strong>: ${ex.attacks.join(', ')}</li>`
            ).join('')}
                    </ul>
                </div>
            `;
        }

        if (item.variants && item.variants.length > 0) {
            content += `
                <div style="margin-bottom: 15px;">
                    <h4 style="margin-bottom: 8px;">🔄 Varianti:</h4>
                    <ul style="font-size: 0.9em; padding-left: 20px;">
                        ${item.variants.map(v => `<li>${v}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (item.usage) {
            content += `
                <p style="font-size: 0.9em; color: #555;">
                    <strong>Utilizzo:</strong> ${item.usage}
                </p>
            `;
        }

        if (window.seiryuuApp && window.seiryuuApp.showModal) {
            window.seiryuuApp.showModal(content);
        }
    }
}
