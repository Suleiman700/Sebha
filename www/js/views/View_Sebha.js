
import LocalStorage from "../classes/localStorage.js";
import { CFG_LocalStorageKeys } from "../config/CFG_LocalStorage.js";
import View_Settings from "./View_Settings.js";

export default class View_Sebha {
    constructor(_app) {
        this.app = _app;
        this.bannerConfig = {
            id: 'ca-app-pub-8260802524538941/2840842332',
            position: 'bottom',
            isTesting: true
        };
    }

    async html(_app) {
        const div = document.createElement('div');
        div.className = 'view-sebha';

        div.innerHTML = `
            <style>
                .view-sebha {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                    background-color: #f5f5f5;
                    position: fixed;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                }

                .header {
                    height: 10vh;
                    background-color: ${this.app.getThemeColor()};
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .header h1 {
                    font-size: calc(16px + 2vmin);
                    margin: 0;
                }

                .content {
                    height: 80vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0 20px;
                }

                .footer {
                    height: 10vh;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                }

                .ad-banner {
                    width: 100%;
                    height: 50px;
                    background-color: transparent;
                }

                .counter {
                    font-size: calc(24px + 4vmin);
                    color: #333;
                    font-weight: bold;
                    margin-bottom: 4vh;
                }

                .counter-button {
                    width: min(350px, 80vw);
                    height: min(350px, 80vw);
                    border-radius: 50%;
                    background-color: ${this.app.getThemeColor()};
                    border: none;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                    cursor: pointer;
                    color: white;
                    font-size: calc(12px + 2vmin);
                    margin-bottom: 4vh;
                }

                .counter-button:active {
                    transform: scale(0.95);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .settings-button,.reset-button {
                    padding: 10px 20px;
                    background-color: #ff5252;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: calc(12px + 1vmin);
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .reset-button:hover {
                    background-color: #ff1744;
                }
            </style>

            <header class="header">
                <h1>المسبحة الالكترونية</h1>
            </header>

            <main class="content">
                <div class="counter">0</div>
                <button class="counter-button">
                    <span>انقر هنا</span>
                </button>
                <button class="reset-button">إعادة تعيين</button>
                <button class="settings-button" style="margin-top: 30px;">الإعدادات</button>
            </main>

            <footer class="footer">
                <div class="ad-banner"></div>
            </footer>
        `;

        // Add event listeners
        const counterButton = div.querySelector('.counter-button');
        const resetButton = div.querySelector('.reset-button');
        const settingsButton = div.querySelector('.settings-button');
        const counterDisplay = div.querySelector('.counter');
        let count = 0;

        counterButton.addEventListener('click', () => {
            count++;
            counterDisplay.textContent = count;

            // Store counts in LocalStorage
            LocalStorage.setItem(CFG_LocalStorageKeys.APP.SEBHA_COUNTS, count)

            // Vibrate if available
            if (LocalStorage.getItem(CFG_LocalStorageKeys.SETTINGS.VIBRATION) == true) {
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        });

        resetButton.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من إعادة تعيين عداد التسبيح؟')) {
                count = 0;
                counterDisplay.textContent = count;

                // Reset counts in LocalStorage
                LocalStorage.setItem(CFG_LocalStorageKeys.APP.SEBHA_COUNTS, 0)
            }
        });

        settingsButton.addEventListener('click', () => {
            this.app.currentScreen = View_Settings;
            this.app.render();
        });


        document.addEventListener('deviceready', function () {
            // Create banner
            admob.banner.prepare();
        
            // Show the banner
            admob.banner.show({
                id: 'ca-app-pub-8260802524538941/3512958964',
                autoShow: true,
            });
        });

        // Get counts from LocalStorage
        const sebhaCounts_LocalStorage = LocalStorage.getItem(CFG_LocalStorageKeys.APP.SEBHA_COUNTS)??0;
        counterDisplay.textContent = sebhaCounts_LocalStorage;
        count = sebhaCounts_LocalStorage;

        return div;
    }
}