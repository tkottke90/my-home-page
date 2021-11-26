/** @type {HTMLFormElement} */
const searchForm = document.querySelector('#search-form');

/** @type {HTMLAnchorElement} */
const searchLink = document.querySelector('#search-form--link');

function submitGoogleSearchQuery(queryString) {
  const query = new URLSearchParams()
  query.append('q', queryString);

  searchLink.href = `https://google.com/search?${query.toString()}`;
  searchLink.click();
}



/** @type {HTMLButtonElement} */
const submitBtn = document.querySelector('#search-form .search-form--search');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  /** @type {HTMLInputElement} */
  const searchField = Array.from(searchForm.elements).find(element => element.name === 'search');

  if (searchField) {
    /** @type {String} */
    const searchString = searchField.value;

    submitGoogleSearchQuery(searchString);

    searchField.value = '';
  }
});