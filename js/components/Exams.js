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
                requisiti: '75 ore, 3 mesi dal 4° Kyu',
                tachiwaza: {
                    'Katatetori': [
                        'Uchikaitennage',
                        'Sankyo (omote ed ura)',
                        'Yonkyo (omote ed ura)'
                    ],
                    'Katateryotetori': [
                        'Ikkyo (omote ed ura)',
                        'Nikyo',
                        'Kotegaeshi'
                    ],
                    'Ryotetori': [
                        'Kotegaeshi',
                        'Kokyunage'
                    ],
                    'Shomenuchi': [
                        'Yonkyo (omote ed ura)',
                        'Gokyo'
                    ],
                    'Yokomenuchi': [
                        'Ikkyo (omote ed ura)',
                        'Uchikaitensankyo',
                        'Tenchinage'
                    ],
                    'Chudantsuki': [
                        'Sankyo (omote ed ura)',
                        'Hijikimeosae',
                        'Sotokaitennage'
                    ]
                },
                ushirowaza: {
                    'Ryotetori': [
                        'Nikyo (omote ed ura)',
                        'Ikkyo (omote ed ura)',
                        'Sankyo (omote ed ura)',
                        'Hijikimeosae',
                        'Kotegaeshi',
                        'Shihonage',
                        'Iriminage'
                    ]
                },
                suwariwaza: {
                    'Shomenuchi': [
                        'Kotegaeshi',
                        'Sankyo (omote ed ura)'
                    ],
                    'Katatori': [
                        'Nikyo (omote ed ura)',
                        'Sankyo (omote ed ura)'
                    ]
                }
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

        // Load state
        const checkedItems = JSON.parse(localStorage.getItem('seiryuu_exam_checks') || '{}');
        const pinnedItems = JSON.parse(localStorage.getItem('seiryuu_exam_pins') || '{}');

        let content = `
            <style>
                .exam-section-title { font-size: 0.95em; margin-bottom: 8px; color: #333; font-weight: bold; margin-top: 15px; }
                .attack-group { margin-bottom: 8px; border: 1px solid #eee; border-radius: 6px; overflow: hidden; }
                .attack-header { 
                    padding: 10px 12px; 
                    background: #f9f9f9; 
                    cursor: pointer; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                    font-weight: 500;
                    color: #444;
                    user-select: none;
                }
                .attack-header:hover { background: #f0f0f0; }
                .attack-header.active { background: #eef2ff; color: var(--accent-color); }
                .attack-arrow { transition: transform 0.2s; font-size: 0.8em; }
                .attack-header.active .attack-arrow { transform: rotate(90deg); }
                
                .tech-list { display: none; padding: 5px 0; background: #fff; }
                .tech-list.open { display: block; }
                
                .tech-item { 
                    display: flex; 
                    align-items: flex-start; 
                    padding: 8px 12px; 
                    border-bottom: 1px solid #f5f5f5;
                }
                .tech-item:last-child { border-bottom: none; }
                
                .tech-checkbox-wrapper { margin-right: 12px; padding-top: 2px; }
                .tech-checkbox { 
                    width: 18px; 
                    height: 18px; 
                    cursor: pointer; 
                    accent-color: var(--accent-color);
                }
                
                .tech-content { flex: 1; font-size: 0.9em; color: #555; line-height: 1.4; }
                
                .tech-pin-btn { 
                    padding: 0 4px; 
                    cursor: pointer; 
                    opacity: 0.3; 
                    transition: opacity 0.2s;
                    font-size: 1.1em;
                }
                .tech-pin-btn.pinned { opacity: 1; text-shadow: 0 0 2px gold; }
                .tech-pin-btn:hover { opacity: 0.8; }

                .pinned-section {
                    background: #fff9e6;
                    border: 1px solid #ffeeba;
                    border-radius: 8px;
                    padding: 10px;
                    margin-bottom: 20px;
                }
                .pinned-title {
                    font-size: 0.9em;
                    color: #856404;
                    font-weight: bold;
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
            </style>
            <h2 style="margin-bottom: 15px; color: var(--accent-color);">${grade}</h2>
        `;

        if (program.requisiti) {
            content += `<p style="font-size: 0.85em; color: #666; margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 8px;">
                <strong>Requisiti:</strong> ${program.requisiti}
            </p>`;
        }

        // Pinned Section Logic
        const myPins = [];
        // We need to iterate everything to find pins for this grade
        // Or we assume the persist key structure is generic enough.
        // Let's iterate the sections to find pinned items for *this* exam view.

        const sections = [
            { key: 'preparatori', title: '🏋️ Esercizi Preparatori' },
            { key: 'tachiwaza', title: '🥋 Tachiwaza (in piedi)' },
            { key: 'suwariwaza', title: '🧎 Suwariwaza (in ginocchio)' },
            { key: 'hanmihantachiwaza', title: '⚔️ Hanmi-hantachiwaza' },
            { key: 'ushirowaza', title: '👻 Ushirowaza (prese da dietro)' },
            { key: 'jo', title: '🪵 Jo (bastone)' },
            { key: 'bukiwaza', title: '⚔️ Bukiwaza (armi)' }
        ];

        // Prepare data for rendering (grouping if needed)
        const renderData = {};

        sections.forEach(section => {
            const rawData = program[section.key];
            if (!rawData) return;

            const grouped = this.groupTechniques(rawData);
            renderData[section.key] = grouped;

            // Check for pins
            Object.entries(grouped).forEach(([attack, techniques]) => {
                techniques.forEach((tech, idx) => {
                    const uniqueId = `${grade}|${section.key}|${attack}|${tech}`;
                    if (pinnedItems[uniqueId]) {
                        myPins.push({ attack, tech, id: uniqueId });
                    }
                });
            });
        });

        // Render Pinned Section
        if (myPins.length > 0) {
            content += `
                <div class="pinned-section">
                    <div class="pinned-title">📌 Da Perfezionare</div>
                    <ul style="margin: 0; padding-left: 20px; font-size: 0.9em; color: #555;">
                        ${myPins.map(p => `<li><strong>${p.attack}</strong>: ${p.tech}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Render Sections
        sections.forEach(section => {
            const data = renderData[section.key];
            if (!data || Object.keys(data).length === 0) return;

            content += `<div class="exam-section-title">${section.title}</div>`;

            Object.entries(data).forEach(([attack, techniques]) => {
                const attackId = `att-${Math.random().toString(36).substr(2, 9)}`;

                content += `
                    <div class="attack-group">
                        <div class="attack-header" onclick="this.nextElementSibling.classList.toggle('open'); this.classList.toggle('active');">
                            <span>${attack}</span>
                            <span class="attack-arrow">▶</span>
                        </div>
                        <div class="tech-list" id="${attackId}">
                            ${techniques.map((tech, idx) => {
                    const uniqueId = `${grade}|${section.key}|${attack}|${tech}`;
                    const isChecked = checkedItems[uniqueId] ? 'checked' : '';
                    const isPinned = pinnedItems[uniqueId] ? 'pinned' : '';

                    return `
                                    <div class="tech-item">
                                        <div class="tech-checkbox-wrapper">
                                            <input type="checkbox" class="tech-checkbox" 
                                                ${isChecked} 
                                                onchange="window.seiryuuApp.toggleExamCheck('${uniqueId}', this.checked)">
                                        </div>
                                        <div class="tech-content">${tech}</div>
                                        <div class="tech-pin-btn ${isPinned}" 
                                            onclick="window.seiryuuApp.toggleExamPin('${uniqueId}', this)">
                                            📌
                                        </div>
                                    </div>
                                `;
                }).join('')}
                        </div>
                    </div>
                `;
            });
        });

        // Inject global handlers if not present
        if (!window.seiryuuApp.toggleExamCheck) {
            window.seiryuuApp.toggleExamCheck = (id, checked) => {
                const items = JSON.parse(localStorage.getItem('seiryuu_exam_checks') || '{}');
                if (checked) items[id] = true;
                else delete items[id];
                localStorage.setItem('seiryuu_exam_checks', JSON.stringify(items));
            };
            window.seiryuuApp.toggleExamPin = (id, el) => {
                const items = JSON.parse(localStorage.getItem('seiryuu_exam_pins') || '{}');
                if (items[id]) {
                    delete items[id];
                    el.classList.remove('pinned');
                } else {
                    items[id] = true;
                    el.classList.add('pinned');
                }
                localStorage.setItem('seiryuu_exam_pins', JSON.stringify(items));
            };
        }

        if (window.seiryuuApp && window.seiryuuApp.showModal) {
            window.seiryuuApp.showModal(content);
        }
    }

    groupTechniques(data) {
        if (!Array.isArray(data)) return data; // Already grouped object

        const grouped = {};
        data.forEach(item => {
            // Heuristic to extract Attack name
            const words = item.split(' ');
            let attack = words[0];
            let technique = words.slice(1).join(' ');

            const twoWordAttacks = ['Ushiro', 'Hanmi', 'Katadori', 'Tantōtori', 'Jiyūwaza', 'Ken:', 'Jo:'];
            const startCheck = twoWordAttacks.find(p => item.startsWith(p));

            if (startCheck) {
                // If specific composite, might take more.
                // 'Ushiro ryōtedori ...' -> Attack: Ushiro ryōtedori
                if (words.length > 1 && !item.includes(':')) {
                    attack = words[0] + ' ' + words[1];
                    technique = words.slice(2).join(' ');
                } else if (item.includes(':')) {
                    // 'Katatetori: ikkyō...'
                    const parts = item.split(':');
                    attack = parts[0].trim();
                    technique = parts[1] ? parts[1].trim() : '';
                }
            } else {
                // Standard case 'Katatetori ...'
                // Check if colon exists (e.g. 1st Kyu lines)
                if (item.includes(':')) {
                    const parts = item.split(':');
                    attack = parts[0].trim();
                    technique = parts[1] ? parts[1].trim() : '';
                }
            }

            if (!grouped[attack]) grouped[attack] = [];

            // If the original item already had the attack formatted, we might want to strip it?
            // "Katatetori aihanmi ikkyho" -> Attack: Katatetori, Tech: aihanmi ikkyo
            // Yes, this looks correct.

            grouped[attack].push(technique || 'Variazioni');
        });
        return grouped;
    }
}
