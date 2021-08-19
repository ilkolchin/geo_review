function initMap() {
    ymaps.ready(() =>{
        let myMap = new ymaps.Map("map", {
            center: [59.938,30.3],
            zoom: 12.4
        })
    })
}

export {
    initMap
}