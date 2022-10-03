// Подключение функционала 
import { isMobile, menuClose, bodyLock, bodyUnlock, fullVHfix } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { initSliders } from "./sliders.js";

import { gsap } from 'gsap';

// подстраиваем размер первого экрана под шапку
const header = document.querySelector('header.header');
const main = document.querySelector('main.page');

window.addEventListener('load', firstscreenResize)
window.addEventListener('resize', firstscreenResize);
header.classList.add('header_white');

function firstscreenResize() {
   const header = document.querySelector('header.header');
   let headerOffsetHeight = header.offsetHeight;
   const main = document.querySelector('main.page');
   headerOffsetHeight = header.offsetHeight
   main.style.paddingTop = headerOffsetHeight + 'px';

   const fullscreen = main.querySelector('[data-fullscreen]:first-child');
   if (fullscreen) {
      fullscreen.style.marginTop = -headerOffsetHeight + 'px';
      fullscreen.style.paddingTop = headerOffsetHeight + 16 + 'px';
   }
}

// collection-item
export function projectsListener() {
   const projects = document.querySelectorAll('.collection-item');
   if (projects.length > 0) {
      projects.forEach(element => {
         const back = element.querySelector('.collection-item__back');
         const link = element.querySelector('.collection-item__link');
         const image = element.querySelector('.collection-item__image img');
         const body = element.querySelector('.collection-item__body');
         const text = element.querySelector('.collection-item__text');
         const request = element.querySelector('.collection-item__request');

         let elementTL = gsap.timeline()

         link.addEventListener('click', function () {
            if (!element.classList.contains('_active')) {
               element.classList.add('_active');

               const bgColor = element.querySelector('.bg-color');
               const textColor = element.querySelector('.text-color');
               document.body.style.cssText = `--bg-color: ${bgColor.innerHTML}; --text-color: ${textColor.innerHTML}`;

               elementTL.to(image, { scale: 1.2 });
               if (text) {
                  elementTL.to(text, { opacity: 0 }, "-=0.5");
               }
               if (body) {
                  elementTL.to(body, { translateY: 0 }, "-=0.5");
               }
               elementTL.to(back, { opacity: 0.2, pointerEvents: "all" }, "-=0.5");
               if (request) {
                  elementTL.to(request, { opacity: 1, pointerEvents: "all" }, "-=0.5");
               }
            }
         })

         function removeAnimation() {
            element.classList.remove('_active');

            elementTL.to(image, { scale: 1 });
            if (body) {
               elementTL.to(body, { translateY: "100%" }, "-=0.5");
            }
            if (text) {
               elementTL.to(text, { opacity: 1 }, "-=0.2");
            }
            elementTL.to(back, { opacity: 0, pointerEvents: "none" }, "-=1");
            if (request) {
               elementTL.to(request, { opacity: 0, pointerEvents: "none" }, "-=0.8");
            }

            changeColor();
         }

         // Закрываем меню мне клике на Escape
         document.addEventListener("keydown", removeAnimation)

         // Закрываем меню мне клике на collection-item__back
         back.addEventListener('click', removeAnimation);
      });
   }
}
projectsListener();

// Меняем базовые цвета
function changeColor() {
   const bgColor = document.getElementById('bg-color');
   const textColor = document.getElementById('text-color');
   if (bgColor && textColor) {
      document.body.style.cssText = `--bg-color: ${bgColor.innerHTML}; --text-color: ${textColor.innerHTML}`;
   }
}
changeColor();

// Анимация фокусного состояния инпута
let input = document.querySelectorAll('.form__input');
if (input.length > 0) {
   input.forEach(item => {
      const itemParent = item.closest('.form__item-inner');
      if (item.value.length > 0) {
         itemParent.classList.add('_focus');
      } else {
         itemParent.classList.remove('_focus');
      }

      item.addEventListener("focus", function () {
         const itemParent = item.closest('.form__item-inner');
         itemParent.classList.add('_focus');
      });
      item.addEventListener("blur", function () {
         const itemParent = item.closest('.form__item-inner');
         if (!item.value.length > 0) {
            itemParent.classList.remove('_focus');
         }
      });
   });
}

const collectionSwiper = document.querySelector('.collection__slider');
const collectionStep = document.querySelector('.collection__step');
const collectionYear = document.querySelector('.collection__year');
const collectionItemText = document.querySelector('.collection-item__text');

if (collectionSwiper) {
   collectionSwiper.addEventListener('click', function () {
      let collectionSwiperTL = gsap.timeline()

      document.body.style.cssText = `--bg-color: #fff; --text-color: #000`;

      collectionSwiperTL.to(collectionSwiper, { translateX: "-100%", duration: 1 });
      if (collectionStep) {
         collectionSwiperTL.to(collectionStep, { opacity: 0, pointerEvents: 'false' }, "-=1");
      }
      if (collectionYear) {
         collectionSwiperTL.to(collectionYear, { opacity: 0, pointerEvents: 'false' }, "-=1");
      }
      if (collectionSwiper.classList.contains('_disabled') && collectionItemText) {
         collectionSwiperTL.to(collectionItemText, { opacity: 1 }, "-=1");
      }
   })
}

// swup
import "../libs/swup.min.js";
import "../libs/SwupScrollPlugin.min.js";
import "../libs/SwupHeadPlugin.min.js";

const options = {
   animationSelector: '[class*="transition-fade"]',
   animateHistoryBrowsing: true,
   plugins: [
      new SwupScrollPlugin({
         animateScroll: false
      }),
      // new SwupHeadPlugin()
   ]
};

const swup = new Swup(options);
let scrollValues = {};

swup.on('clickLink', function () {
   menuClose();
   scrollValues[window.location.href] = window.scrollY;
   // ScrollTrigger.update();
   // ScrollTrigger.refresh();
});

swup.on('contentReplaced', function () {
   // добавляем отступ для main
   firstscreenResize();
   // инициализируем слайдер
   initSliders();
   // меняем цвета
   changeColor();
   // обработка клика по проектам в рубрике
   projectsListener();
});