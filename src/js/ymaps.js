import { initForm } from "./form";

function initMap() {

	ymaps.ready(() => {

		var myMap = new ymaps.Map("map", {
			center: [59.938, 30.3],
			zoom: 12.4
		});

		initForm();


		myMap.events.add('click', (e) => {
			let coords = e.get('coords');
			let myPlacemark = new ymaps.Placemark(coords);
			myMap.geoObjects.add(myPlacemark);
		});

		// var placemark = new ymaps.Placemark(myMap.getCenter(), {
		//   // Зададим содержимое заголовка балуна.
		//   // balloonContentHeader: '<a href = "#">Рога и копыта</a><br>' +
		//   //   '<span class="description">Сеть кинотеатров</span>',
		//   // Зададим содержимое основной части балуна.
		//   balloonContentBody: '<div class="review">'+
		//   '<div class="review__inner">'+
		//     '<div class="review__previous"></div>'+
		//     '<div class="review__form">'+
		//     '<h1 class="review__header">Отзыв:</h1>'+
		//     '<div class="review__inputs">'+
		//       '<input type="text" placeholder="Укажите ваше имя" class="review__input">'+
		//       '<input type="text" placeholder="Укажите место" class="review__input">'+
		//       '<input type="text" placeholder="Оставьте отзыв" class="review__text">'+
		//     '</div>'+
		//     '<button class="btn">Добавить</button>'+
		//     '</div>'+
		//   '</div>'+
		//   '</div>',
		//   // Зададим содержимое нижней части балуна.
		//   // balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
		//   // Зададим содержимое всплывающей подсказки.
		//   // hintContent: 'Рога и копыта'
		// });
		// // Добавим метку на карту.
		// myMap.geoObjects.add(placemark);
		// // Откроем балун на метке.
		// // placemark.balloon.open();


	})
}

export {
	initMap
}