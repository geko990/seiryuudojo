export default class Glossary {
    async render() {
        // Placeholder data
        const terms = [
            { term: "Dojo", def: "Luogo dove si pratica la via." },
            { term: "Sensei", def: "Colui che è nato prima. Maestro." },
            { term: "Uke", def: "Colui che riceve la tecnica." },
            { term: "Tori", def: "Colui che esegue la tecnica." }
        ];

        const div = document.createElement('div');
        div.className = 'glossary-container';
        div.innerHTML = `
            <h2>Glossario</h2>
            <input type="text" class="search-bar" placeholder="Cerca termine...">
            <div class="glossary-list">
                ${terms.map(item => `
                    <div class="card glossary-card">
                        <h3>${item.term}</h3>
                        <p>${item.def}</p>
                    </div>
                `).join('')}
            </div>
        `;
        return div;
    }
}
