const advSearchForm = document.querySelector('#adv-search-form');
const searchButton = document.querySelector('#search-container .search-container--menu');

const searchMenuPopup = Popper.createPopper(searchForm, advSearchForm, 
  { 
    placement: 'bottom', 
    flip: {
      enabled: false 
    }
});

searchButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (!advSearchForm.hasAttribute('show')) {
    advSearchForm.setAttribute('show', '');
  } else {
    advSearchForm.removeAttribute('show');
  }
})
