
import View_Sebha from "./View_Sebha.js";

export default class View_Splash {
    constructor(_app) {
        this.app = _app;
    }

    async html(_app) {
        const div = document.createElement('div');

        div.innerHTML = `
            <style>
                 * {
                  padding: 0;
                  margin: 0;
                  box-sizing: border-box;
                }
                 h2 {
                  font-size: 40px;
                  line-height: 46px;
                  display: inline-block;
                }
                 .text-center {
                  text-align: center;
                }
                 .text-uppercase {
                  text-transform: uppercase;
                }
                 body {
                  overflow: hidden;
                  position: relative;
                  font-family: "Raleway", sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  background: #0f182a;
                }
                 .bg-1 {
                  width: 100vw;
                  height: 100vh;
                  opacity: 0;
                  animation: page-up 1s ease 0s none;
                  position: absolute;
                  top: 0;
                  left: 0;
                  display: block;
                  background: linear-gradient(to right, rgba(218, 28, 96, 1) 0%, rgba(243, 102, 31, 0.9) 100%);
                }
                 @keyframes page-up {
                  0% {
                   transform: translateY(0%);
                   opacity: 1;
                 }
                  100% {
                   transform: translateY(-100%);
                   opacity: 1;
                 }
                }
                 .loading-data {
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                 .loading-text .char {
                  opacity: 0;
                  animation: loading-text 2s infinite ease-in-out;
                  display: inline-block;
                  color: #fff;
                }
                 .loading-text .char:nth-child(1) {
                  animation-delay: 0.9s;
                }
                 .loading-text .char:nth-child(2) {
                  animation-delay: 1s;
                }
                 .loading-text .char:nth-child(3) {
                  animation-delay: 1.1s;
                }
                 .loading-text .char:nth-child(4) {
                  animation-delay: 1.2s;
                }
                 .loading-text .char:nth-child(5) {
                  animation-delay: 1.3s;
                }
                 .loading-text .char:nth-child(6) {
                  animation-delay: 1.4s;
                }
                 .loading-text .char:nth-child(7) {
                  animation-delay: 1.5s;
                }
                 @keyframes loading-text {
                  0% {
                   transform: translateY(0%);
                   opacity: 1;
                 }
                  20% {
                   transform: translateY(-60%);
                   opacity: 1;
                 }
                  40% {
                   transform: translateY(-100%);
                   opacity: 0;
                 }
                  60% {
                   opacity: 0;
                 }
                  80% {
                   opacity: 0;
                 }
                  100% {
                   opacity: 1;
                 }
                }
 
            </style>
            <div class="bg-1"></div>
            <section class="loading-data">
                <h2 class="loading-text text-center text-uppercase">
                    <span class="char">التحميل</span>
                    <span class="char">جاري</span>
                </h2>
            </section>
        `;

        setTimeout(() => {
            this.app.currentScreen = View_Sebha;
            this.app.render();
        }, 2000)

        return div;
    }
}