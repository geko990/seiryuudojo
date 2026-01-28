// Google Sheet ID for notifications (same as events)
const SHEET_ID = '18U1uqsKe8NrK8Zin1mAEB0SovnvBYTFdDBEq5X7QXCg';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Eventi`;

export default class Bell {
    constructor(selector) {
        this.selector = selector;
        this.notifications = [];
        this.readIds = this.getReadIds();
    }

    updateAppBadge(count) {
        if ('setAppBadge' in navigator) {
            try {
                if (count > 0) {
                    navigator.setAppBadge(count);
                } else {
                    navigator.clearAppBadge();
                }
            } catch (e) {
                console.warn('Error setting app badge:', e);
            }
        }
    }

    getReadIds() {
        try {
            return JSON.parse(localStorage.getItem('seiryuu_read_notifications') || '[]');
        } catch {
            return [];
        }
    }

    saveReadIds() {
        localStorage.setItem('seiryuu_read_notifications', JSON.stringify(this.readIds));
    }

    markAsRead(postId) {
        if (!this.readIds.includes(postId)) {
            this.readIds.push(postId);
            this.saveReadIds();

            // Update visual badge and PWA badge
            const unreadCount = this.getUnreadNotifications().length;
            this.renderBellWithCount(unreadCount);
            this.updateAppBadge(unreadCount);
        }
    }

    async fetchNotifications() {
        try {
            const response = await fetch(SHEET_URL);
            const text = await response.text();

            const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
            if (jsonString && jsonString[1]) {
                const data = JSON.parse(jsonString[1]);
                const rows = data.table.rows;

                // Get last 10 posts as potential notifications
                const posts = rows.map((row, index) => {
                    const cells = row.c;
                    const visibleCell = cells[4];
                    const visible = visibleCell ? visibleCell.v : true;
                    if (visible === false || visible === 'FALSE' || visible === 'false') return null;

                    // Create a unique ID based on title + date
                    const title = cells[1] ? cells[1].v : '';
                    const dateRaw = cells[0] ? cells[0].v : '';
                    const id = `${title}_${dateRaw}`.replace(/\s/g, '_');

                    return {
                        id: id,
                        title: title,
                        category: cells[2] ? (cells[2].v || 'news') : 'news',
                        content: cells[3] ? cells[3].v : '',
                        index: index
                    };
                }).filter(p => p !== null);

                // Take last 10
                this.notifications = posts.slice(0, 10);
            }
        } catch (error) {
            console.warn('Failed to fetch notifications:', error);
            this.notifications = [];
        }
    }

    getUnreadNotifications() {
        return this.notifications.filter(n => !this.readIds.includes(n.id));
    }

    async render() {
        const container = document.querySelector(this.selector);
        if (!container) return;

        // Always show the bell first (so it's never missing)
        let unreadCount = 0;

        // Render bell immediately (and store reference to update later)
        this.renderBellWithCount = (count) => {
            container.innerHTML = `
               <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-color)" stroke="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
               ${count > 0 ? `<span class="notify-badge" style="position: absolute; top: -5px; right: -5px; background: #f44336; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 10px; min-width: 14px; text-align: center;">${count}</span>` : ''}
            `;
        };

        // Show bell immediately (no badge yet)
        this.renderBellWithCount(0);

        // Try to fetch notifications in background
        try {
            await this.fetchNotifications();
            unreadCount = this.getUnreadNotifications().length;
            // Re-render with badge if there are unread
            this.renderBellWithCount(unreadCount);
            this.updateAppBadge(unreadCount);
        } catch (error) {
            console.warn('Bell: Failed to fetch notifications', error);
            // Bell is already rendered, just leave it without badge
        }


        // Store reference for click handlers
        const self = this;

        container.addEventListener('click', () => {
            const unread = self.getUnreadNotifications();

            let listHtml = '';
            if (unread.length > 0) {
                listHtml = unread.map(n => `
                    <div class="notification-item" data-id="${n.id}" style="display: flex; justify-content: space-between; align-items: flex-start; padding: 12px; margin-bottom: 10px; background: #f9f9f9; border-radius: 8px; cursor: pointer; border-left: 3px solid var(--accent-color);">
                        <div style="flex: 1;" onclick="window.seiryuuApp.openNotificationPost('${n.id}')">
                            <strong style="color: #333; font-size: 0.95em;">${n.title}</strong>
                            <p style="color: #666; font-size: 0.8em; margin-top: 4px;">${n.content ? n.content.substring(0, 60) + '...' : ''}</p>
                        </div>
                        <button onclick="event.stopPropagation(); window.seiryuuApp.markNotificationRead('${n.id}')" style="background: none; border: none; color: #999; font-size: 18px; cursor: pointer; padding: 0 5px; margin-left: 10px;">✕</button>
                    </div>
                `).join('');
            } else {
                listHtml = '<p style="text-align: center; color: #888;">Nessuna nuova notifica. 🎉</p>';
            }

            window.seiryuuApp.showModal(`
                <h2 style="margin-bottom: 15px;">Notifiche</h2>
                ${listHtml}
                ${unread.length > 0 ? `<button onclick="window.seiryuuApp.markAllNotificationsRead()" style="width: 100%; margin-top: 10px; padding: 10px; background: #eee; border: none; border-radius: 8px; color: #666; cursor: pointer;">Segna tutte come lette</button>` : ''}
            `);

            // Also expose markAllNotificationsRead globally if needed
            window.seiryuuApp.markAllNotificationsRead = () => {
                unread.forEach(n => self.markAsRead(n.id));
                // Reload modal or close it
                window.seiryuuApp.closeModal();
            };
        });
    }
}
