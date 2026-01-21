export default class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.contentArea = document.querySelector('#main-content');
    }

    addRoute(name, component) {
        this.routes[name] = component;
    }

    async navigate(name) {
        if (!this.routes[name]) return;

        this.currentRoute = name;
        this.contentArea.innerHTML = ''; // Clear current content

        // Render the component
        const content = await this.routes[name].render();
        this.contentArea.appendChild(content);

        // Run any post-render scripts if available
        if (this.routes[name].afterRender) {
            this.routes[name].afterRender();
        }
    }
}
