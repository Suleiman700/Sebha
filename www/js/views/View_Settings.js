import LocalStorage from "../classes/localStorage.js";
import { CFG_LocalStorageKeys } from "../config/CFG_LocalStorage.js";
import View_Sebha from "./View_Sebha.js";
import {CFG_App} from "../config/CFG_App.js";

export default class View_Settings {
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
        div.className = 'view-settings';

        div.innerHTML = `
            <style>
                .view-settings {
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
                    color: black !important; /* Fix color in android being white */
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
                    background-color: #4CAF50;
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

                .back-button {
                    margin-top: 30px;
                    padding: 10px 20px;
                    background-color: #ff5252;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: calc(12px + 1vmin);
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .back-button:hover {
                    background-color: #ff1744;
                }

                .settings-option {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 300px;
                    margin: 10px 0;
                    padding: 10px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;
                }

                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: .4s;
                    border-radius: 34px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }

                input:checked + .slider {
                    background-color: ${this.app.getThemeColor()};
                }

                input:checked + .slider:before {
                    transform: translateX(26px);
                }

                .color-picker-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    max-width: 300px;
                    margin: 10px 0;
                    padding: 10px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .color-picker {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    width: 50px;
                    height: 50px;
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                }

                .color-picker::-webkit-color-swatch {
                    border-radius: 50%;
                    border: 2px solid #ddd;
                }

                .color-picker::-moz-color-swatch {
                    border-radius: 50%;
                    border: 2px solid #ddd;
                }

                .report-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background-color: #f8f9fa;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    color: #333;
                    font-size: 14px;
                    cursor: pointer;
                    margin-top: 20px;
                    width: 100%;
                    max-width: 300px;
                }

                .report-button:hover {
                    background-color: #e9ecef;
                }
            </style>

            <header class="header">
                <h1>الإعدادات</h1>
            </header>

            <main class="content" dir="rtl">
                <div class="settings-option">
                    <span>الاهتزاز</span>
                    <label class="toggle-switch">
                        <input type="checkbox" id="vibrationToggle">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="color-picker-container">
                    <span>لون التطبيق</span>
                    <input type="color" id="themeColorPicker" class="color-picker">
                </div>
                <div class="settings-option">
                    <span>تعديل عداد التسبيح</span>
                    <button id="setCountsBtn" style="
                        padding: 8px 15px;
                        background-color: ${this.app.getThemeColor()};
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;">
                        تعديل
                    </button>
                </div>
                <button class="report-button" id="reportButton" style="display: none;">
                    <span>الإبلاغ عن مشكلة</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                </button>
                <button class="back-button">الرجوع</button>
            </main>

            <footer class="footer">
                <div class="ad-banner"></div>
            </footer>
        `;

        // Add event listeners
        const backButton = div.querySelector('.back-button');
        const vibrationToggle = div.querySelector('#vibrationToggle');
        const themeColorPicker = div.querySelector('#themeColorPicker');
        const setCountsBtn = div.querySelector('#setCountsBtn');
        const reportButton = div.querySelector('#reportButton');

        // Report issue button click handler
        reportButton.addEventListener('click', () => {

            const subject = 'الإبلاغ عن مشكلة في تطبيق السبحة';
            const body = `
نوع الجهاز: ${navigator.platform}
نظام التشغيل: ${navigator.userAgent}

وصف المشكلة:
`;
            const developerEmail = CFG_App.DEVELOPER.EMAIL;
            // window.location.href = `mailto:${developerEmail}?subject=Works on iOS too`;

            const mailtoLink = `mailto:${developerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink);
        });

        // Handle set counts button click
        setCountsBtn.addEventListener('click', () => {
            const savedCounts = LocalStorage.getItem(CFG_LocalStorageKeys.APP.SEBHA_COUNTS);

            Swal.fire({
                title: 'تعديل عداد التسبيح',
                html: `
                    <div style="display: flex; flex-direction: column; gap: 10px; direction: rtl;">
                        <div class="swal2-input-container">
                            <label for="count1">العداد الجديد</label>
                            <input type="number" id="new_counts" class="swal2-input" value="${savedCounts}" min="0" max="10" style="width: 100px; text-align: center;" dir="ltr">
                        </div>
                    </div>
                `,
                confirmButtonText: 'حفظ',
                cancelButtonText: 'إلغاء',
                showCancelButton: true,
                focusConfirm: false,
                preConfirm: function() {
                    return new Promise((resolve, reject) => {
                        // get your inputs using their placeholder or maybe add IDs to them
                        resolve({
                            new_counts: parseInt(document.getElementById('new_counts').value) || 0,
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    LocalStorage.setItem(CFG_LocalStorageKeys.APP.SEBHA_COUNTS, result.value.new_counts || 0);
                    Swal.fire({
                        title: 'تم الحفظ',
                        text: 'تم حفظ عداد التسبيح الجديد',
                        icon: 'success',
                        confirmButtonText: 'حسناً'
                    });
                }
            });
        });

        // Load saved theme color
        const savedThemeColor = LocalStorage.getItem(CFG_LocalStorageKeys.SETTINGS.THEME_COLOR) ?? '#4CAF50';
        themeColorPicker.value = savedThemeColor;
        
        // Apply theme color to elements
        const applyThemeColor = (color) => {
            this.app.setThemeColor(color);
        };

        // Initialize theme color
        applyThemeColor(savedThemeColor);

        // Save and apply theme color when changed
        themeColorPicker.addEventListener('change', (e) => {
            const newColor = e.target.value;
            LocalStorage.setItem(CFG_LocalStorageKeys.SETTINGS.THEME_COLOR, newColor);
            applyThemeColor(newColor);
        });

        // Load vibration setting from localStorage
        vibrationToggle.checked = LocalStorage.getItem(CFG_LocalStorageKeys.SETTINGS.VIBRATION) ?? false;

        // Save vibration setting when toggled
        vibrationToggle.addEventListener('change', () => {
            LocalStorage.setItem(CFG_LocalStorageKeys.SETTINGS.VIBRATION, vibrationToggle.checked);
        });

        backButton.addEventListener('click', () => {
            this.app.currentScreen = View_Sebha;
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

        return div;
    }
}