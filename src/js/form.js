function initForm() {
  const body = document.querySelector('body');
  const map = document.querySelector('#map');
  const template = document.querySelector('template');

  body.addEventListener('click', (e)=>{
    console.log(e.pageX, e.pageY);
  })


  map.addEventListener('click', (e) => {
    createReviewsForm(e.pageX, e.pageY);
  })

  function createReviewsForm(x, y) {
    body.append(template.content);
    
    const review = document.querySelector('.review');
    const closeBtn = document.querySelector('#close');
    
    review.style.left = x + 'px';
    review.style.top = y + 'px';

    closeBtn.addEventListener('click', () => {
      review.classList.add('hidden');
    })

    review.classList.remove('hidden');

  }
}

export {
  initForm
}