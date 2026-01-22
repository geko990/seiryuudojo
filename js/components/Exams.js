export default class Exams {
    constructor() {
        this.examPrograms = {
            '6° Kyu': {
                requisiti: '20 ore di allenamento, 2 mesi dall\'iscrizione',
                preparatori: [
                    'Seiza, Rei, Saluto iniziale/finale',
                    'Kokyū (forme base di respirazione)',
                    'Kokyū awase (armonizzazione del respiro)',
                    'Ikkyō undō (esercizio di ikkyō)',
                    'Aikitaisō (ginnastica propedeutica)',
                    'Ukemi (mae e ushiro)',
                    'Ashisabaki (movimenti dei piedi)'
                ],
                tachiwaza: [
                    'Katatetori aihanmi ikkyō (omote/ura)',
                    'Katatetori aihanmi shihōnage (omote/ura)',
                    'Katatetori aihanmi uchikaitensankyō (omote/ura)'
                ],
                suwariwaza: [
                    'Ryōtetori kokyūhō'
                ]
            },
            '5° Kyu': {
                requisiti: '20 ore di allenamento, 2 mesi dal 6° Kyu',
                preparatori: [
                    'Shihō giri (taglio in 4 direzioni)',
                    'Gyaku ukemi',
                    'Shikko e ushiroshikko'
                ],
                tachiwaza: [
                    'Katatetori ikkyō (omote/ura)',
                    'Katatetori shihōnage (omote/ura)',
                    'Katatetori udekimenage (irimi/tenkan)',
                    'Katatetori iriminage',
                    'Katatetori tenchinage',
                    'Shōmenuchi ikkyō (omote/ura)',
                    'Shōmenuchi nikyō (omote/ura)',
                    'Shōmenuchi kotegaeshi'
                ],
                suwariwaza: [
                    'Katatori ikkyō (omote/ura)',
                    'Shōmenuchi ikkyō (omote/ura)',
                    'Ryōtetori kokyūhō'
                ]
            },
            '4° Kyu': {
                requisiti: '60 ore di allenamento, 3 mesi dal 5° Kyu',
                preparatori: [
                    'Happō giri (taglio in 8 direzioni)',
                    'Taisabaki avanzato'
                ],
                tachiwaza: [
                    'Shōmenuchi nikyō (omote/ura)',
                    'Shōmenuchi sankyō (omote/ura)',
                    'Yokomenuchi shihōnage (omote/ura)',
                    'Yokomenuchi iriminage',
                    'Katatetori gyakuhanmi kotegaeshi'
                ],
                suwariwaza: [
                    'Shōmenuchi nikyō (omote/ura)',
                    'Katatori nikyō (omote/ura)'
                ]
            },
            '3° Kyu': {
                requisiti: '80 ore di allenamento, 4 mesi dal 4° Kyu',
                preparatori: [
                    'Katatetori gyakuhanmi (4 direzioni)',
                    'Hitori keiko (pratica solitaria)'
                ],
                tachiwaza: [
                    'Ryōtetori nikyō (omote/ura)',
                    'Ryōtetori sankyō (omote/ura)',
                    'Shōmenuchi nikyō (omote/ura)',
                    'Shōmenuchi sankyō (omote/ura)',
                    'Ushirowaza: ryōtedori, ryōkatadori'
                ],
                suwariwaza: [
                    'Shōmenuchi sankyō (omote/ura)',
                    'Katatori sankyō (omote/ura)'
                ],
                jo: [
                    'Shōmenuchi, Yokomenuchi, Yokotsuki',
                    'Dōuchi, Ashiuchi'
                ]
            },
            '2° Kyu': {
                requisiti: '100 ore di allenamento, 4 mesi dal 3° Kyu',
                tachiwaza: [
                    'Katatetori aihanmi ikkyō-sankyō',
                    'Yokomenuchi gokkyō',
                    'Ushirowaza complete',
                    'Tantōtori (difesa da coltello)'
                ],
                suwariwaza: [
                    'Shōmenuchi yonkyō (omote/ura)',
                    'Yokomenuchi variazioni'
                ],
                hanmihantachiwaza: [
                    'Katatetori ikkyō-sankyō',
                    'Shōmenuchi iriminage, kotegaeshi'
                ]
            },
            '1° Kyu': {
                requisiti: '120 ore di allenamento, 5 mesi dal 2° Kyu',
                preparatori: [
                    'Kokyū sōren (esercizi mattutini)',
                    'Tori fune, Furutama',
                    'Ikkyō kaiten (4 forme)'
                ],
                tachiwaza: [
                    'Tutte le tecniche precedenti',
                    'Jiyūwaza (tecniche libere)',
                    'Variazioni e combinazioni'
                ],
                bukiwaza: [
                    'Ken: suburi, awase',
                    'Jo: kata 1-5'
                ]
            },
            '1° Dan': {
                requisiti: '1 anno dal 1° Kyu, età minima 15 anni',
                tachiwaza: [
                    'Padronanza di tutte le tecniche kyu',
                    'Jiyūwaza avanzato',
                    'Randori (attacchi multipli)'
                ],
                suwariwaza: [
                    'Tutte le variazioni',
                    'Kokyūhō avanzato'
                ],
                bukiwaza: [
                    'Ken: kumi-tachi 1-3',
                    'Jo: kata 1-10, kumi-jo'
                ]
            }
        };
    }

    async render() {
        const div = document.createElement('div');
        div.className = 'exams-container';
        div.innerHTML = `
            <h2 style="padding-left: 10px; margin-bottom: 20px;">Programma Esami</h2>
            <div class="exams-list">
                ${Object.keys(this.examPrograms).map(grade => `
                    <button class="exam-btn card" data-exam="${grade}">
                        <span class="exam-grade">${grade}</span>
                        <span class="exam-arrow">›</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add click handlers
        setTimeout(() => {
            div.querySelectorAll('.exam-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const grade = btn.dataset.exam;
                    this.showExamDetail(grade);
                });
            });
        }, 0);

        return div;
    }

    showExamDetail(grade) {
        const program = this.examPrograms[grade];
        if (!program) return;

        let content = `<h2 style="margin-bottom: 15px; color: var(--accent-color);">${grade}</h2>`;

        if (program.requisiti) {
            content += `<p style="font-size: 0.85em; color: #666; margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 8px;">
                <strong>Requisiti:</strong> ${program.requisiti}
            </p>`;
        }

        const sections = [
            { key: 'preparatori', title: '🏋️ Esercizi Preparatori' },
            { key: 'tachiwaza', title: '🥋 Tachiwaza (in piedi)' },
            { key: 'suwariwaza', title: '🧎 Suwariwaza (in ginocchio)' },
            { key: 'hanmihantachiwaza', title: '⚔️ Hanmi-hantachiwaza' },
            { key: 'jo', title: '🪵 Jo (bastone)' },
            { key: 'bukiwaza', title: '⚔️ Bukiwaza (armi)' }
        ];

        sections.forEach(section => {
            if (program[section.key] && program[section.key].length > 0) {
                content += `
                    <div style="margin-bottom: 15px;">
                        <h4 style="font-size: 0.95em; margin-bottom: 8px; color: #333;">${section.title}</h4>
                        <ul style="font-size: 0.85em; color: #555; padding-left: 20px; line-height: 1.6;">
                            ${program[section.key].map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });

        if (window.seiryuuApp && window.seiryuuApp.showModal) {
            window.seiryuuApp.showModal(content);
        }
    }
}
