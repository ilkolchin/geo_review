function initForm() {
  const body = document.querySelector('body');
  const map = document.querySelector('#map');
  const template = document.querySelector('template');
  let storage = localStorage;


  map.addEventListener('click', (e) => {
    createReviewsForm(e.pageX, e.pageY);
  })

  function createReviewsForm(x, y) {
    body.append(template.content);

    const review = document.querySelector('.review');
    const reviewPrevName = document.querySelector('.review__prev-name');
    const reviewPrevPlace = document.querySelector('.review__prev-place');
    const reviewPrevText = document.querySelector('.review__prev-text');
    const closeBtn = document.querySelector('#close');
    const addBtn = document.querySelector('.btn');

    const data = JSON.parse(storage.data || '{}');
    reviewPrevName.textContent = data.name || '';
    reviewPrevPlace.textContent = data.place || '';
    reviewPrevText.textContent = data.reviewText || '';

    review.style.left = x + 'px';
    review.style.top = y + 'px';

    const name = document.querySelector('#name');
    const place = document.querySelector('#place');
    const reviewText = document.querySelector('#review_text');

    addBtn.addEventListener('click', () => {
      storage.data = JSON.stringify({
        name: name.value,
        place: place.value,
        reviewText: reviewText.value
      });
      console.log(storage);
    });

    closeBtn.addEventListener('click', () => {
      review.classList.add('hidden');
    })

    review.classList.remove('hidden');

  }
}

export {
  initForm
}