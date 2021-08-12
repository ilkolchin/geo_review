function initMap() {
    ymaps.ready(() =>{
        let myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 10
        })
    })
}

export {
    initMap
}