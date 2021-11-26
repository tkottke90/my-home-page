/** @type {HTMLFormElement} */
const searchForm = document.querySelector('#search-container');

/** @type {HTMLAnchorElement} */
const searchLink = document.querySelector('#search-container--link');

/** @type {HTMLButtonElement} */
const submitBtn = document.querySelector('#search-container button');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const query = new URLSearchParams()
  
  /** @type {HTMLInputElement} */
  const searchField = Array.from(searchForm.elements).find(element => element.name === 'search');

  if (searchField) {
    /** @type {String} */
    const searchString = searchField.value;

    query.append('q', searchString);

    searchField.value = '';
  }


  searchLink.href = `https://google.com/search?${query.toString()}`;
  searchLink.click();
});