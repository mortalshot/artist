// Подключение функционала 
import { isMobile, menuClose, bodyLock, bodyUnlock, fullVHfix } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import { initSliders } from "./sliders.js";
import { initGalleries } from "./gallery.js";

import { gsap } from 'gsap';

// подстраиваем размер первого экрана под шапку
const header = document.querySelector('header.header');
const main = document.querySelector('main.page');

window.addEventListener('load', firstscreenResize)
window.addEventListener('resize', firstscreenResize);
header.classList.add('header_white');

// Подстраиваем контент под фиксированный хедер
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

// Работа с рубриками
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

         const collectionControlls = document.querySelector('.collection-controlls');

         let elementTL = gsap.timeline()

         if (link) {
            link.addEventListener('click', function (e) {
               if (element.closest('.collection__slider').classList.contains('collection__slider_row')) {
                  e.preventDefault();
               }

               if (!element.classList.contains('_active')) {
                  element.classList.add('_active');

                  const bgColor = element.querySelector('.bg-color');
                  const textColor = element.querySelector('.text-color');
                  changeColor(bgColor.innerHTML, textColor.innerHTML);


                  if (window.innerWidth > 767.98) {
                     elementTL.to(image, { scale: 1.2 });
                  } else {
                     elementTL.to(image, { scale: 1.2, yPercent: -25 });
                  }
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

                  elementTL.to(collectionControlls, { opacity: 0, display: 'none' }, "-=0.5");
               }
            })
         }

         function removeAnimation() {
            element.classList.remove('_active');

            elementTL.to(image, { scale: 1, yPercent: 0 });
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
            elementTL.to(collectionControlls, { opacity: 1, display: 'flex' }, "-=0.5");

            changeColor('#fff', '#000');
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
export function changeColor(bgColor, textColor) {
   bgColor ? bgColor : bgColor = document.getElementById('bg-color').innerHTML;
   textColor ? textColor : textColor = document.getElementById('text-color').innerHTML;

   if (bgColor && textColor) {
      document.body.style.cssText = `--bg-color: ${bgColor}; --text-color: ${textColor}`;
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

// Переходим к слайдеру в рубрике коллекции
function collectionSwiperClick() {
   const collectionSwiper = document.querySelector('.collection__slider');
   const collectionImage = document.querySelector('.collection-item__image');
   const collectionStep = document.querySelector('.collection__step');
   const collectionYear = document.querySelector('.collection__year');
   const collectionItemText = document.querySelector('.collection-item__text');
   const collectionControlls = document.querySelector('.collection-controlls');

   if (collectionSwiper) {
      collectionImage.addEventListener('click', function () {
         if (collectionSwiper.classList.contains('_disabled')) {
            let collectionSwiperTL = gsap.timeline();
            changeColor('#fff', '#000');

            if (window.innerWidth > 767.98) {
               collectionSwiperTL.fromTo(collectionSwiper, { xPercent: -50 }, { xPercent: -100, duration: 1 });
            } else {
               collectionSwiperTL.to(collectionSwiper, { xPercent: 0, duration: 1 });
               collectionSwiperTL.to(collectionStep, { height: 0 }, '-=1');
            }
            if (collectionStep) {
               collectionSwiperTL.to(collectionStep, { opacity: 0, pointerEvents: 'false' }, "-=1");
            }
            if (collectionYear) {
               collectionSwiperTL.to(collectionYear, { opacity: 0, pointerEvents: 'false' }, "-=1");
            }
            if (collectionItemText) {
               collectionSwiperTL.to(collectionItemText, { opacity: 1 }, "-=1");
            }

            collectionSwiperTL.to(collectionControlls, { opacity: 1, display: 'flex' }, "-=0.5");
         }
      })
   }
}
collectionSwiperClick();

// Проверяем на safari
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('safari') != -1) {
   if (userAgent.indexOf('chrome') > -1) {
      //browser is chrome
   } else if ((userAgent.indexOf('opera') > -1) || (userAgent.indexOf('opr') > -1)) {
      //browser is opera 
   } else {
      document.body.classList.add('safari');
   }
}

// Работа с кнопкой "scroll-top"
function moveUpListener() {
   const moveUp = document.querySelector('.scroll-top__button');
   if (moveUp) {
      document.addEventListener("scroll", function (e) {
         const scrollTop = window.scrollY;

         if (scrollTop >= 600) {
            moveUp.classList.add('_active');
         } else {
            moveUp.classList.remove('_active');
         }
      })

      moveUp.addEventListener('click', function () {
         window.scrollTo({
            top: "#swup",
            behavior: "smooth"
         });
      })
   }
}
moveUpListener();

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
   // инициализируем галерею
   initGalleries();
   // Переходим к слайдеру в рубрике коллекции
   collectionSwiperClick();
   // Изменяем вид коллекции
   collectionViewChange();
   // Работа с кнопкой "scroll-top"
   moveUpListener();
});