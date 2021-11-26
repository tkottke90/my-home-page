/** @type {HTMLDivElement} */
const advSearchForm = document.querySelector('#adv-search-form');
/** @type {HTMLButtonElement} */
const advSearchSubmit = advSearchForm.querySelector('button[submit]')
/** @type {HTMLButtonElement} */
const menuToggleBtn = document.querySelector('#search-form .search-form--menu');

searchForm.disable = function(disable = true) {
  searchForm.querySelector('input').disabled = disable;
  searchForm.querySelector('.search-form--search').disabled = disable;
}


function createPositionalStyle(number, prefix = 'px') {
  return `${number}${prefix}`
}

/**
 * 
 * @param {HTMLElement} parent 
 * @param {HTMLElement} menu 
 */
function createMenu(parent, menu) {
  menu.style.position = 'absolute';
  
  return {
    parent,
    menu,
    getParentPosition: function() {
      return this.parent.getBoundingClientRect();
    },
    show: function() {
      const parentPos = this.getParentPosition();

      this.menu.style.top = createPositionalStyle(parentPos.top + parentPos.height);
      this.menu.style.left = createPositionalStyle(parentPos.left);
      this.menu.style.width = createPositionalStyle(parentPos.width)

      this.menu.setAttribute('show', '');

    },
    hide: function() {
      this.menu.removeAttribute('show');
    }
  }

}

const menuInstance = createMenu(searchForm, advSearchForm);

menuToggleBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (!advSearchForm.hasAttribute('show')) {
    menuToggleBtn.classList.add('rotate-180');
    menuInstance.show();

    searchForm.disable();
  } else {
    menuToggleBtn.classList.remove('rotate-180');
    menuInstance.hide();

    searchForm.disable(false);
  }
});

advSearchSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  const data = Array.from(advSearchForm.querySelector('form').elements)
    .filter(element => element.name)
    .reduce((output, current) => {
      return Object.assign(output, { [current.name]: current.value });
    }, {});

  
  // Convert sites to site syntax 
  if (data.sites) {
    let sites = data.sites.split(' ');
    sites = sites.map(site => `site:${site}`);
    data.sites = sites.length <= 1 ? sites.join('') : `( ${ sites.join(' OR ') } )`
  }

  // Convert exclusions to exclusion syntax
  if (data.exclusions) {
    let exclusions = data.exclusions.split(' ');
    exclusions = exclusions.map(exclusion => `-${exclusion}`);
    data.exclusions = exclusions.join(' ');
  }

  const queryString = `${data.sites} ${data.keywords} ${data.exclusions}`

  submitGoogleSearchQuery(queryString);
});