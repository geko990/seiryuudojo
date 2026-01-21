// Google Sheet ID for live updates
const SHEET_ID = '18U1uqsKe8NrK8Zin1mAEB0SovnvBYTFdDBEq5X7QXCg';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Eventi`;

// Helper to parse Google Sheets date format
function parseSheetDate(cell) {
    if (!cell || !cell.v) return null;
    const rawDate = cell.v;

    if (typeof rawDate === 'string' && rawDate.startsWith('Date(')) {
        const match = rawDate.match(/Date\((\d+),(\d+),(\d+)\)/);
        if (match) {
            return new Date(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        }
    } else if (cell.f) {
        return cell.f; // Use formatted value
    }
    return rawDate;
}

// Helper to format date for display
function formatDate(date) {
    if (!date) return '';
    if (date instanceof Date) {
        return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
    }
    return date;
}

// Helper to convert newlines to <br>
function nl2br(str) {
    if (!str) return '';
    return str.replace(/\n/g, '<br>');
}

// Helper to make phone numbers clickable
function linkifyPhones(str) {
    if (!str) return '';
    // Match Italian phone patterns: +39, 0039, or starting with 0 or 3
    // Examples: +39 333 1234567, 0823 123456, 333-1234567, 3331234567
    const phoneRegex = /(\+39\s?|0039\s?)?([03]\d{1,3}[\s.-]?\d{2,4}[\s.-]?\d{3,4})/g;
    return str.replace(phoneRegex, (match) => {
        const cleanNumber = match.replace(/[\s.-]/g, '');
        return `<a href="tel:${cleanNumber}" style="color: #2196F3; text-decoration: underline;" onclick="event.stopPropagation();">${match}</a>`;
    });
}

// Combined helper: newlines + phone linking
function formatContent(str) {
    if (!str) return '';
    return linkifyPhones(nl2br(str));
}

export default class Home {
    async render() {
        const div = document.createElement('div');
        div.className = 'home-container';
        div.style.paddingBottom = '100px';

        // Hero Section (Kanji)
        const hero = `
            <div class="hero-section">
                <h1 class="kanji-title">清流道場</h1>
                <div class="romaji-subtitle">Seiryū Dōjō - Caserta</div>
            </div>
        `;

        // Quick Links
        const quickLinks = `
            <div class="home-grid">
                <div class="card home-card" onclick="document.getElementById('posts-feed').scrollIntoView({behavior: 'smooth'})">
                    <h3>Eventi</h3>
                </div>
                <div class="card home-card" onclick="window.seiryuuApp.showModal('<p>Il Dojo segue le regole dell\\'Aikikai d\\'Italia.</p>')">
                    <h3>Etichetta</h3>
                </div>
                <div class="card home-card" onclick="window.seiryuuApp.router.navigate('search'); setTimeout(() => document.getElementById('search-input').value = 'Bokken', 500);">
                    <h3>Armi</h3>
                </div>
                <div class="card home-card" onclick="window.seiryuuApp.showFoundations()">
                    <h3>Fondamenti</h3>
                </div>
            </div>
        `;

        // Feed Section
        const feedHtml = `
            <div class="feed-section" style="margin-top: 30px; padding: 0 15px;">
                <h3 style="color:var(--primary-color); border-bottom: 2px solid var(--accent-color); padding-bottom: 5px; margin-bottom: 15px; display:inline-block;">Ultime Notizie</h3>
                <div id="posts-feed" class="feed-list">
                    <div class="loader">Caricamento notizie...</div>
                </div>
            </div>
        `;

        // Fetch from Google Sheet with fallback
        setTimeout(async () => {
            let posts = [];

            try {
                console.log('Fetching from Google Sheet...');
                const response = await fetch(SHEET_URL);
                const text = await response.text();

                const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
                if (jsonString && jsonString[1]) {
                    const data = JSON.parse(jsonString[1]);
                    const rows = data.table.rows;

                    posts = rows.map(row => {
                        const cells = row.c;

                        // Column E: Visibile
                        const visibleCell = cells[4];
                        const visible = visibleCell ? visibleCell.v : true;
                        if (visible === false || visible === 'FALSE' || visible === 'false') return null;

                        // Parse all columns
                        // A: Data (pubblicazione) - for sorting
                        // B: Titolo
                        // C: Categoria
                        // D: Contenuto
                        // E: Visibile
                        // F: DataEvento (the date to DISPLAY)
                        // G: Luogo
                        // H: OraInizio
                        // I: OraFine
                        // J: Quota
                        // K: Chiusura (footer text, smaller)

                        return {
                            dataPubblicazione: parseSheetDate(cells[0]), // For sorting
                            title: cells[1] ? cells[1].v : '',
                            category: cells[2] ? (cells[2].v || 'news') : 'news',
                            content: cells[3] ? cells[3].v : '',
                            dataEvento: parseSheetDate(cells[5]),  // For display
                            luogo: cells[6] ? cells[6].v : '',
                            oraInizio: cells[7] ? cells[7].v : '',
                            oraFine: cells[8] ? cells[8].v : '',
                            quota: cells[9] ? cells[9].v : '',
                            chiusura: cells[10] ? cells[10].v : ''
                        };
                    }).filter(p => p !== null);

                    console.log('Loaded from Google Sheet:', posts.length, 'posts');
                }
            } catch (sheetError) {
                console.warn('Google Sheet fetch failed, trying local fallback:', sheetError);
                try {
                    const localResponse = await fetch('data/posts.json');
                    posts = await localResponse.json();
                    console.log('Loaded from local fallback:', posts.length, 'posts');
                } catch (localError) {
                    console.error('Both sources failed:', localError);
                }
            }

            // Sort by PUBLICATION date (descending) and take top 15
            const recentPosts = posts
                .sort((a, b) => new Date(b.dataPubblicazione || b.date) - new Date(a.dataPubblicazione || a.date))
                .slice(0, 15);

            const postsContainer = div.querySelector('#posts-feed');
            if (postsContainer) {
                if (recentPosts.length === 0) {
                    postsContainer.innerHTML = '<p>Nessuna notizia recente.</p>';
                    return;
                }

                const categoryColors = {
                    'evento': '#2196F3',
                    'news': '#C6A664',
                    'avviso': '#f44336'
                };

                // Store posts globally for click handlers
                window._seiryuuPosts = recentPosts;

                postsContainer.innerHTML = recentPosts.map((post, index) => {
                    const bgColor = categoryColors[post.category] || '#C6A664';

                    // Show DataEvento if available, otherwise nothing (or publication date is hidden)
                    const displayDate = formatDate(post.dataEvento);

                    // Truncate content for preview (first 100 chars)
                    const preview = post.content ? post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '') : '';

                    return `
                        <div class="card feed-card" data-index="${index}" onclick="window.seiryuuApp.showPostDetail(${index})" style="margin-bottom: 15px; text-align: left; cursor: pointer; transition: transform 0.2s;">
                            <div class="feed-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="font-size: 0.7em; padding: 2px 8px; border-radius: 4px; background: ${bgColor}; color: white; text-transform: uppercase;">${post.category}</span>
                                ${displayDate ? `<span class="feed-date" style="font-size: 0.8em; color: #666;">${displayDate}</span>` : ''}
                            </div>
                            <h4 style="margin: 0 0 5px 0; color: #222;">${post.title}</h4>
                            <p style="font-size: 0.85em; line-height: 1.4; color: #555;">${preview}</p>
                            ${post.luogo ? `<div style="font-size: 0.75em; color: #888; margin-top: 5px;">📍 ${post.luogo}</div>` : ''}
                        </div>
                    `;
                }).join('');

                // Add hover effect
                postsContainer.querySelectorAll('.feed-card').forEach(card => {
                    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
                    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
                });
            }
        }, 100);

        div.innerHTML = hero + quickLinks + feedHtml;
        return div;
    }
}

// Add the showPostDetail function to the global app
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (window.seiryuuApp) {
            window.seiryuuApp.showPostDetail = function (index) {
                const post = window._seiryuuPosts[index];
                if (!post) return;

                const categoryColors = {
                    'evento': '#2196F3',
                    'news': '#C6A664',
                    'avviso': '#f44336'
                };
                const bgColor = categoryColors[post.category] || '#C6A664';
                const displayDate = formatDate(post.dataEvento);

                // Build detail content with line breaks preserved
                let detailHtml = `
                    <div style="margin-bottom: 15px;">
                        <span style="font-size: 0.75em; padding: 3px 10px; border-radius: 4px; background: ${bgColor}; color: white; text-transform: uppercase;">${post.category}</span>
                    </div>
                    <h2 style="margin: 0 0 10px 0; color: #222;">${post.title}</h2>
                `;

                // Event details row
                if (displayDate || post.luogo || post.oraInizio) {
                    detailHtml += `<div style="background: #f5f5f5; padding: 12px; border-radius: 8px; margin-bottom: 15px; font-size: 0.9em;">`;
                    if (displayDate) {
                        detailHtml += `<div style="margin-bottom: 5px;">📅 <strong>${displayDate}</strong></div>`;
                    }
                    if (post.oraInizio) {
                        const timeStr = post.oraFine ? `${post.oraInizio} - ${post.oraFine}` : post.oraInizio;
                        detailHtml += `<div style="margin-bottom: 5px;">🕐 ${timeStr}</div>`;
                    }
                    if (post.luogo) {
                        // Make location clickable to open Google Maps
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.luogo.replace(/\n/g, ', '))}`;
                        detailHtml += `<div style="margin-bottom: 5px;">
                            📍 <a href="${mapsUrl}" target="_blank" rel="noopener" 
                               style="color: #2196F3; text-decoration: underline; cursor: pointer;"
                               onclick="event.stopPropagation();">
                               ${nl2br(post.luogo)}
                            </a>
                        </div>`;
                    }
                    if (post.quota) {
                        detailHtml += `<div>💰 ${post.quota}</div>`;
                    }
                    detailHtml += `</div>`;
                }

                // Content with line breaks and clickable phone numbers
                if (post.content) {
                    detailHtml += `<div style="line-height: 1.6; color: #333;">${formatContent(post.content)}</div>`;
                }

                // Footer/Chiusura section (smaller text)
                if (post.chiusura) {
                    detailHtml += `<div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 0.8em; color: #666; line-height: 1.5;">${formatContent(post.chiusura)}</div>`;
                }

                this.showModal(detailHtml);
            };
        }
    });
}
