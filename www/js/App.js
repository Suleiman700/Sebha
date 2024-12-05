
import LocalStorage from "./classes/localStorage.js";
import { CFG_LocalStorageKeys } from "./config/CFG_LocalStorage.js";

export default class App {
    currentScreen = null; // View class
    colors = {
        defaultThemeColor: '#4CAF50',
        themeColor: '#4CAF50', // Default - updates in construct
    };

    constructor() {
        // Get theme color
        const themeColor = LocalStorage.getItem(CFG_LocalStorageKeys.COLORS.THEME_COLOR);
        if (themeColor) {
            this.colors.themeColor = themeColor;
        }
    }

    async render() {
        const view = await new this.currentScreen(this).html();
        document.querySelector('#app').innerHTML = '';
        document.querySelector('#app').appendChild(view);
    }

    /**
     * Set the theme color
     * @param {string} _color
     */
    setThemeColor(_color) {
        if (!_color) return;
        this.colors.themeColor = _color;
        LocalStorage.setItem(CFG_LocalStorageKeys.COLORS.THEME_COLOR, _color);
    }

    /**
     * Gets the theme color
     * @returns {string} - E.g. #fefefe
     */
    getThemeColor() {
        return this.colors.themeColor??this.colors.defaultThemeColor;
    }
}