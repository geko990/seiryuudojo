export default class Study {
    constructor() {
        this.data = [];
        this.filteredData = [];
    }

    async init() {
        try {
            const response = await fetch('data/curriculum.json');
            this.data = await response.json();
            this.filteredData = [...this.data];
        } catch (error) {
            console.error('Error loading curriculum:', error);
            this.data = [];
        }
    }

    async render() {
        if (this.data.length === 0) await this.init();

        const div = document.createElement('div');
        div.className = 'study-container';
        div.innerHTML = `
            <div class="card search-card">
                <h2>Studio Tecnico</h2>
                <input type="text" id="search-input" class="search-bar" placeholder="Cerca tecnica, attacco, grado...">
                <div class="filter-chips">
                    <button class="filter-btn" data-filter="all">Tutti</button>
                    <button class="filter-btn" data-filter="6 Kyu">6° Kyu</button>
                    <button class="filter-btn" data-filter="5 Kyu">5° Kyu</button>
                    <button class="filter-btn" data-filter="3 Kyu">3° Kyu</button>
                </div>
            </div>

            <div id="techniques-list" class="techniques-grid">
                <!-- Items injected here -->
            </div>
        `;

        // Add event listeners after render
        setTimeout(() => this.attachListeners(div), 0);

        // Initial render logic
        setTimeout(() => this.renderList(div.querySelector('#techniques-list')), 0);

        return div;
    }

    attachListeners(container) {
        const searchInput = container.querySelector('#search-input');
        const filterBtns = container.querySelectorAll('.filter-btn');

        searchInput.addEventListener('input', (e) => {
            this.filter(e.target.value);
            this.renderList(container.querySelector('#techniques-list'));
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Toggle active state
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Filter logic
                const exam = e.target.dataset.filter;
                this.filter(searchInput.value, exam);
                this.renderList(container.querySelector('#techniques-list'));
            });
        });
    }

    filter(query, examFilter = 'all') {
        const lowerQuery = query.toLowerCase();

        this.filteredData = this.data.filter(item => {
            const matchesSearch =
                item.name.toLowerCase().includes(lowerQuery) ||
                item.attack.toLowerCase().includes(lowerQuery) ||
                item.tags.some(tag => tag.includes(lowerQuery));

            const matchesExam = examFilter === 'all' || item.exam === examFilter;

            return matchesSearch && matchesExam;
        });
    }

    renderList(container) {
        if (!container) return;

        if (this.filteredData.length === 0) {
            container.innerHTML = '<p class="no-results">Nessuna tecnica trovata.</p>';
            return;
        }

        container.innerHTML = this.filteredData.map(item => `
            <div class="card technique-card" data-id="${item.id}">
                <div class="technique-header">
                    <h3>${item.name}</h3>
                    <span class="exam-badge">${item.exam}</span>
                </div>
                <p class="attack-type">Attacco: ${item.attack}</p>
                <div class="tags-container">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');

        // Modal triggers
        container.querySelectorAll('.technique-card').forEach(card => {
            card.addEventListener('click', () => {
                alert(`Tecnica: ${card.querySelector('h3').innerText}\n(Dettagli modal coming soon)`);
                // In a real app, open a modal with item.description and media
            });
        });
    }
}
