export default class Exams {
    constructor() {
        // COMPLETE exam programs from Aikikai d'Italia - Hiroshi Tada Sensei
        this.examPrograms = {
            '6° Kyu': {
                requisiti: '20 ore, 2 mesi dall\'iscrizione',
                preparatori: [
                    'Seiza, Rei (saluto)',
                    'Kokyū (forme base di respirazione)',
                    'Kokyū awase (armonizzazione del respiro)',
                    'Ikkyō undō (esercizio di ikkyō)',
                    'Aikitaisō (ginnastica propedeutica)',
                    'Mae ukemi (caduta avanti)',
                    'Ushiro ukemi (caduta indietro)',
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
                requisiti: '20 ore, 2 mesi dal 6° Kyu',
                preparatori: [
                    'Shihō giri (taglio in 4 direzioni)',
                    'Gyaku ukemi (caduta inversa)',
                    'Shikko (camminata in ginocchio)',
                    'Ushiroshikko'
                ],
                tachiwaza: [
                    'Katatetori aihanmi ikkyō (omote/ura)',
                    'Katatetori aihanmi shihōnage (omote/ura)',
                    'Katatetori aihanmi uchikaitensankyō (omote/ura)',
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
                requisiti: '60 ore, 3 mesi dal 5° Kyu',
                preparatori: [
                    'Happō giri (taglio in 8 direzioni)',
                    'Taisabaki avanzato',
                    'Kaiten ukemi (caduta rotolata)'
                ],
                tachiwaza: [
                    'Katatetori aihanmi ikkyō (omote/ura)',
                    'Katatetori aihanmi shihōnage (omote/ura)',
                    'Katatetori aihanmi uchikaitensankyō (omote/ura)',
                    'Katatetori udekimenage (irimi/tenkan)',
                    'Katatetori iriminage',
                    'Katatetori tenchinage',
                    'Shōmenuchi ikkyō (omote/ura)',
                    'Shōmenuchi nikyō (omote/ura)',
                    'Shōmenuchi sankyō (omote/ura)',
                    'Shōmenuchi kotegaeshi',
                    'Yokomenuchi shihōnage (omote/ura)',
                    'Yokomenuchi iriminage',
                    'Katatetori gyakuhanmi kotegaeshi'
                ],
                suwariwaza: [
                    'Katatori ikkyō (omote/ura)',
                    'Shōmenuchi ikkyō (omote/ura)',
                    'Shōmenuchi nikyō (omote/ura)',
                    'Katatori nikyō (omote/ura)',
                    'Ryōtetori kokyūhō'
                ]
            },
            '3° Kyu': {
                requisiti: '80 ore, 4 mesi dal 4° Kyu',
                preparatori: [
                    'Katatetori gyakuhanmi (4 direzioni)',
                    'Hitori keiko (pratica solitaria)',
                    'Tobu ukemi (caduta volante)'
                ],
                tachiwaza: [
                    'Katatetori aihanmi ikkyō (omote/ura)',
                    'Katatetori aihanmi shihōnage (omote/ura)',
                    'Katatetori aihanmi uchikaitensankyō (omote/ura)',
                    'Katatetori udekimenage (irimi/tenkan)',
                    'Katatetori iriminage',
                    'Katatetori tenchinage',
                    'Shōmenuchi ikkyō (omote/ura)',
                    'Shōmenuchi nikyō (omote/ura)',
                    'Shōmenuchi sankyō (omote/ura)',
                    'Shōmenuchi kotegaeshi',
                    'Shōmenuchi iriminage',
                    'Yokomenuchi shihōnage (omote/ura)',
                    'Yokomenuchi iriminage',
                    'Yokomenuchi kotegaeshi',
                    'Katatetori gyakuhanmi kotegaeshi',
                    'Ryōtetori nikyō (omote/ura)',
                    'Ryōtetori sankyō (omote/ura)',
                    'Ushiro ryōtedori ikkyō (omote/ura)',
                    'Ushiro ryōkatadori ikkyō (omote/ura)'
                ],
                suwariwaza: [
                    'Katatori ikkyō (omote/ura)',
                    'Katatori nikyō (omote/ura)',
                    'Katatori sankyō (omote/ura)',
                    'Shōmenuchi ikkyō (omote/ura)',
                    'Shōmenuchi nikyō (omote/ura)',
                    'Shōmenuchi sankyō (omote/ura)',
                    'Ryōtetori kokyūhō'
                ],
                jo: [
                    'Shōmenuchi',
                    'Yokomenuchi',
                    'Yokotsuki',
                    'Dōuchi',
                    'Ashiuchi'
                ]
            },
            '2° Kyu': {
                requisiti: '100 ore, 4 mesi dal 3° Kyu',
                tachiwaza: [
                    'Katatetori aihanmi ikkyō-sankyō (omote/ura)',
                    'Katatetori aihanmi shihōnage (omote/ura)',
                    'Katatetori udekimenage (irimi/tenkan)',
                    'Katatetori iriminage, tenchinage',
                    'Shōmenuchi ikkyō-sankyō (omote/ura)',
                    'Shōmenuchi kotegaeshi, iriminage',
                    'Yokomenuchi shihōnage (omote/ura)',
                    'Yokomenuchi iriminage, kotegaeshi',
                    'Yokomenuchi gokkyō',
                    'Ryōtetori nikyō, sankyō (omote/ura)',
                    'Ushiro ryōtedori ikkyō-sankyō',
                    'Ushiro ryōkatadori ikkyō-sankyō',
                    'Ushiro kubishime ikkyō-sankyō',
                    'Tantōtori: shōmenuchi, yokomenuchi, tsuki'
                ],
                suwariwaza: [
                    'Katatori ikkyō-sankyō (omote/ura)',
                    'Shōmenuchi ikkyō-sankyō (omote/ura)',
                    'Shōmenuchi yonkyō (omote/ura)',
                    'Yokomenuchi ikkyō-nikyō',
                    'Ryōtetori kokyūhō'
                ],
                hanmihantachiwaza: [
                    'Katatetori ikkyō-sankyō (omote/ura)',
                    'Katatetori shihōnage',
                    'Shōmenuchi iriminage',
                    'Shōmenuchi kotegaeshi'
                ]
            },
            '1° Kyu': {
                requisiti: '120 ore, 5 mesi dal 2° Kyu',
                preparatori: [
                    'Kokyū sōren (esercizi mattutini)',
                    'Tori fune',
                    'Furutama',
                    'Ikkyō kaiten (4 forme)'
                ],
                tachiwaza: [
                    'Katatetori: ikkyō-yonkyō, shihōnage, iriminage, kotegaeshi, udekimenage, tenchinage',
                    'Shōmenuchi: ikkyō-yonkyō, shihōnage, iriminage, kotegaeshi',
                    'Yokomenuchi: ikkyō-sankyō, gokkyō, shihōnage, iriminage, kotegaeshi',
                    'Ryōtetori: ikkyō-sankyō, shihōnage, iriminage, kotegaeshi, tenchinage',
                    'Katadori menuchi: ikkyō-sankyō, shihōnage, iriminage',
                    'Ushiro ryōtedori: ikkyō-sankyō, shihōnage, kotegaeshi',
                    'Ushiro ryōkatadori: ikkyō-sankyō, shihōnage',
                    'Ushiro kubishime: ikkyō-sankyō',
                    'Tantōtori: tutte le variazioni',
                    'Jiyūwaza (tecniche libere)'
                ],
                suwariwaza: [
                    'Katatori, shōmenuchi, yokomenuchi: ikkyō-yonkyō',
                    'Ryōtetori kokyūhō avanzato'
                ],
                hanmihantachiwaza: [
                    'Tutte le variazioni katatetori e shōmenuchi'
                ],
                bukiwaza: [
                    'Ken: suburi 1-7, awase',
                    'Jo: suburi, kata 1-5'
                ]
            },
            '1° Dan': {
                requisiti: '1 anno dal 1° Kyu, età minima 15 anni',
                tachiwaza: [
                    'Padronanza completa di tutte le tecniche kyu',
                    'Katatetori, ryōtetori, morōtedori: tutte le tecniche',
                    'Shōmenuchi, yokomenuchi: tutte le tecniche',
                    'Katadori menuchi: tutte le tecniche',
                    'Ushiro ryōtedori, ryōkatadori, kubishime: tutte le tecniche',
                    'Jiyūwaza (tecniche libere): fluidità e controllo',
                    'Randori (attacchi multipli): 2-3 uke'
                ],
                suwariwaza: [
                    'Tutte le variazioni precedenti con controllo avanzato',
                    'Kokyūhō: variazioni avanzate con kime'
                ],
                hanmihantachiwaza: [
                    'Tutte le tecniche con padronanza'
                ],
                bukiwaza: [
                    'Ken: suburi 1-7, kumi-tachi 1-3',
                    'Jo: kata 1-10, kumi-jo 1-3',
                    'Ken-tai-jo: forme base'
                ]
            }
        };
    }

    async render() {
        const div = document.createElement('div');
        div.className = 'exams-container';

        const kyuGrades = ['6° Kyu', '5° Kyu', '4° Kyu', '3° Kyu', '2° Kyu', '1° Kyu'];
        const danGrades = ['1° Dan'];

        div.innerHTML = `
            <h2 style="padding-left: 10px; margin-bottom: 15px;">Programma Esami</h2>
            <div class="exams-grid-kyu">
                ${kyuGrades.map(grade => `
                    <button class="exam-btn-grid card" data-exam="${grade}">
                        <span class="exam-grade-text">${grade}</span>
                    </button>
                `).join('')}
            </div>
            <div class="exams-dan">
                ${danGrades.map(grade => `
                    <button class="exam-btn-full card" data-exam="${grade}">
                        <span class="exam-grade-text">${grade}</span>
                        <span class="exam-subtitle">Shodan - Cintura Nera</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add click handlers
        setTimeout(() => {
            div.querySelectorAll('.exam-btn-grid, .exam-btn-full').forEach(btn => {
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
