import { changeColor } from "./script.js";
/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
export function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	const collectionSwiper = document.querySelector('.collection__slider');
	if (collectionSwiper) {
		const collectionImage = document.querySelector('.collection-item__image');
		const collectionWrapper = document.querySelector('.collection');

		// Создаем слайдер
		const collectionSliderParams = {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 60,
			autoHeight: false,
			speed: 800,
			watchOverflow: true,

			navigation: {
				prevEl: '.collection__slider .swiper__arrow_left',
				nextEl: '.collection__slider .swiper__arrow_right',
			},
		}
		let collectionSlider = new Swiper('.collection__slider', collectionSliderParams);

		// Работа с состояниями слайдера, когда выбран проект
		const projects = document.querySelectorAll('.collection-item');
		if (projects.length > 1) {
			projects.forEach(element => {
				const back = element.querySelector('.collection-item__back');
				const link = element.querySelector('.collection-item__link');

				link.addEventListener('click', function () {
					collectionSlider.disable();
				})
				back.addEventListener('click', function () {
					collectionSlider.enable();
				})
				document.addEventListener("keydown", function () {
					collectionSlider.enable();
				})
			});
		}

		// Выключаем слайдер, когда заходим на страницу рубрики
		const collectionStep = document.querySelector('.collection__step');
		if (collectionStep) {
			collectionSlider.disable();
			collectionSwiper.classList.add('_disabled');

			const slideActive = collectionSwiper.querySelector('.swiper-slide-active');
			if (slideActive) {
				slideActive.querySelector('.collection-item__text').style.opacity = 0;
			}
		}
		// Включаем слайдер, когда кликнули на него
		collectionImage.addEventListener('click', function () {
			if (collectionSwiper.classList.contains('_disabled')) {
				collectionSlider.enable();
				collectionSwiper.classList.remove('_disabled');
			}
		})

		// Изменяем вид коллекции
		const collectionControls = document.querySelectorAll('.collection-controlls__item');
		if (collectionControls.length > 0) {
			const collection = document.querySelector('.collection');
			collectionControls.forEach(element => {
				element.addEventListener('click', function () {
					collectionWrapper.classList.add('_loading');

					// добавляем класс активному элементу
					collectionControls.forEach(element => {
						element.classList.remove('_active');
					});
					element.classList.add('_active');

					setTimeout(() => {
						collectionWrapper.classList.remove('_loading');
						const body = document.body;

						// меняем вид вывода
						if (element.classList.contains('collection-controlls__item_columns')) {
							collectionSlider.disable();
							collectionSlider.destroy(false, true);

							collectionSwiper.classList.add('collection__slider_column');
							collectionSwiper.classList.remove('collection__slider_row');
							collection.removeAttribute('data-fullscreen');
						} else if (element.classList.contains('collection-controlls__item_rows')) {
							collectionSlider = new Swiper('.collection__slider', collectionSliderParams);

							collectionSwiper.classList.remove('collection__slider_column');
							collectionSwiper.classList.add('collection__slider_row');
							collection.dataset.fullscreen = "";

							if (window.innerWidth > 767.98) {
								collectionSwiper.style.transform = "translate(-100%, 0%)";
							}
						}
					}, 500);
				})
			});
		}

	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});