
import App from "./App.js";
import "./modifiers.js"
import View_Splash from "./views/View_Splash.js";
import View_Sebha from "./views/View_Sebha.js";
import View_Settings from "./views/View_Settings.js";

const AppIns = new App();
// AppIns.currentScreen = View_Splash;
AppIns.currentScreen = View_Sebha;
AppIns.render();