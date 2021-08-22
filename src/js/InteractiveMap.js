export default class InteractiveMap {
  constructor(mapId, onClick) {
    this.mapId = mapId;
    this.onClick = onClick;
  }

  async init() {
    await this.loadYMaps();
    this.initMap();
  }

  loadYMaps() {
    return new Promise((resolve) => ymaps.ready(resolve));
  }

  initMap() {
    this.map = new ymaps.Map(this.mapId, {
      center: [59.938, 30.3],
      zoom: 11
    });
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));

    this.clusterer = new ymaps.Clusterer({
      groupByCoordinates: true,
      clusterDisableClickZoom: true,
      clusterOpenBaloonOnClick: false,
      hasBalloon: false
    })
    this.clusterer.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    })

    this.map.geoObjects.add(this.clusterer);
  }

  openBalloon(coords, content) {
    this.map.balloon.open(coords, content);
  }

  setBalloonContent(content) {
    this.map.balloon.setData(content);
  }

  closeBalloon() {
    this.map.balloon.close();
  }

  createPlacemark(coords) {
    const placemark = new ymaps.Placemark(coords);
    placemark.events.add('click', (e) => {
      const coords = e.get('target').geometry.getCoordinates();
      this.onClick(coords);
    });
    this.clusterer.add(placemark);
  }
}