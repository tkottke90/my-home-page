const advSearchForm = document.querySelector('#adv-search-form');
const searchButton = document.querySelector('#search-container .search-container--menu');

const searchMenuPopup = Popper.createPopper(searchForm, advSearchForm, 
  { 
    placement: 'bottom', 
    flip: {
      enabled: false 
    },
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 95],
        },
      }
    ] 
});

searchButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (!advSearchForm.hasAttribute('show')) {
    searchButton.classList.add('rotate-180');
    advSearchForm.setAttribute('show', '');
  } else {
    searchButton.classList.remove('rotate-180');
    advSearchForm.removeAttribute('show');
  }
})
