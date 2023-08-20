/**
 * @name ActivateDevTools
 * @version 1.0.0
 * @description Reveals Developer tabs in Discord's settings.
 * @author Spinny2005
 */

class ActivateDevTools {
    constructor() { }

    load() { }
    unload() { }

    initialize() { }
    onMessage() { }
    observer(e) { }
    onSwitch() { }

    getName() { return "ActivateDevTools"; }
    getDescription() { return "Reveals Developer tabs in Discord's settings."; }
    getVersion() { return "1.0"; }
    getAuthor() { return "Spinny2005"; }

    getSettingsPanel() {
        return "<b>Activate DevTools Tabs:</b> Click Start";
    }

    start() {
        console.log(`${this.getName()} start()`);

        const codeSnippet = `
            webpackChunkdiscord_app.push([["wp_isdev_patch"], {}, r => cache=Object.values(r.c)]);
            var UserStore = cache.find(m => m?.exports?.default?.getCurrentUser).exports.default;
            var actions = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
            var user = UserStore.getCurrentUser();
            actions.find(n => n.name === "ExperimentStore").actionHandler.CONNECTION_OPEN({
                type: "CONNECTION_OPEN", user: {flags: user.flags |= 1}, experiments: [],
            });
            actions.find(n => n.name === "DeveloperExperimentStore").actionHandler.CONNECTION_OPEN();
            webpackChunkdiscord_app.pop();
            user.flags &= ~1;
            "done";
        `;

        const script = document.createElement('script');
        script.textContent = codeSnippet;
        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    stop() {
        console.log(`${this.getName()} stop()`);
    }
}


module.exports = ActivateDevTools;