export default class Exams {
    async render() {
        const div = document.createElement('div');
        div.className = 'exams-container';
        div.innerHTML = `
            <h2>Programma Esami</h2>
            <div class="exams-grid">
                <button class="card exam-card" data-exam="6 Kyu">6° Kyu</button>
                <button class="card exam-card" data-exam="5 Kyu">5° Kyu</button>
                <button class="card exam-card" data-exam="4 Kyu">4° Kyu</button>
                <button class="card exam-card" data-exam="3 Kyu">3° Kyu</button>
                <button class="card exam-card" data-exam="2 Kyu">2° Kyu</button>
                <button class="card exam-card" data-exam="1 Kyu">1° Kyu</button>
                <button class="card exam-card" data-exam="1 Dan">1° Dan</button>
            </div>
        `;

        // Add listeners for exam filtering/navigation logic later
        // For now, this is static structure
        return div;
    }
}
