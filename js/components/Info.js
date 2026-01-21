export default class Info {
    async render() {
        const div = document.createElement('div');
        div.className = 'info-container';
        div.innerHTML = `
            <div class="card schedule-card">
                <h2>Orari Lezioni</h2>
                <ul class="schedule-list" style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        <strong>Lunedì</strong><br>
                        19:00 - 20:30: Aikido (Tutti i livelli)
                    </li>
                    <li style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        <strong>Mercoledì</strong><br>
                        19:00 - 20:30: Aikido (Tutti i livelli)
                    </li>
                    <li style="margin-bottom: 15px;">
                        <strong>Venerdì</strong><br>
                        19:00 - 20:00: Armi (Bokken/Jo)<br>
                        20:00 - 21:00: Aikido Avanzati
                    </li>
                </ul>
            </div>

            <div class="card location-card">
                <h2>Dove Siamo</h2>
                <p>Seiryuu Dojo</p>
                <p>Via delle Arti Marziali, 10</p>
                <p>Roma, RM</p>
            </div>
        `;
        return div;
    }
}
