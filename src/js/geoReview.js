import InteractiveMap from "./InteractiveMap";

export default class GeoReview {
  constructor() {
    this.formTemplate = document.querySelector('template').innerHTML;
    this.map = new InteractiveMap('map', this.onClick.bind(this));
    this.map.init().then(this.onInit.bind(this));
  }

  onInit() {
    let keys = Object.keys(localStorage);
    for (const key of keys) {
      const count = JSON.parse(localStorage.getItem(key)).length;
      for (let i = 0; i < count; i++) {
        const coords = key.split(',').map(Number);
        this.map.createPlacemark(coords);
      }
    }
    document.body.addEventListener('click', this.onAddBtnClick.bind(this));
  }

  createForm(coords, reviews) {
    if (!reviews) {
      const root = document.createElement('div');
      root.innerHTML = this.formTemplate;
      const reviewForm = root.querySelector('[data-role=review-form]');
      reviewForm.dataset.coords = JSON.stringify(coords);
      return root;
    } else {
      const root = document.createElement('div');
      root.innerHTML = this.formTemplate;
      const reviewPrev = root.querySelector('.review__prev');
      const reviewForm = root.querySelector('[data-role=review-form]');
      reviewForm.dataset.coords = JSON.stringify(coords);


      for (const item of reviews) {
        const div = document.createElement('div');
        div.classList.add('review-item');
        div.innerHTML = `
    <div>
      <b>${item.name}</b> [${item.place}]
    </div>
    <div>${item.text}</div>
    `;
        reviewPrev.appendChild(div);
      }
      return root;
    }
  }

  onClick(coords) {
    const list = localStorage.getItem(coords.toString());
    const form = this.createForm(coords, JSON.parse(list));
    this.map.openBalloon(coords, form.innerHTML);
  }

  async onAddBtnClick(e) {
    if (e.target.dataset.role === 'review-add') {
      const reviewForm = document.querySelector('[data-role=review-form]');
      const coords = JSON.parse(reviewForm.dataset.coords);
      const data = {
        name: document.querySelector('[data-role=review-name]').value,
        place: document.querySelector('[data-role=review-place]').value,
        text: document.querySelector('[data-role=review-text]').value,
      };
      let dataArray;
      let keys = Object.keys(localStorage);

      if (keys.length < 1) {
        dataArray = [data];
      }
      for (const key of keys) {
        if (reviewForm.dataset.coords !== "[" + key + "]") {
          dataArray = [data];
        } else {
          dataArray = JSON.parse(localStorage.getItem(key));
          console.log(dataArray);
          dataArray.push(data);
        }
      }
      
      localStorage.setItem(coords, JSON.stringify(dataArray));
      this.map.createPlacemark(coords);
      this.map.closeBalloon();
    }
  }
}