const dragContainer = document.querySelector('.drag-container');
const grid = new Muuri('.grid', {
  dragEnabled: true,
  dragHandle: '.grid-column--header'
});

const createHTMLElementOptions = { selector: 'div', classList: '', innerHTML: '', children: [] }

/**
 * Enhanced HTML Element Creator to remove duplicate lines when setting up a Document Fragment
 * @param {Object} createOptions
 * @param {HTMLElement[]} createOptions.children List of child elements to be appended to the parent
 * @param {string} createOptions.classList Space delimited list of classes to be applied to the element
 * @param {string} createOptions.selector The HTML Element selector
 * @param {string} createOptions.innerHTML Preloaded HTML to be applied to the element
 * @returns {HTMLElement}
 */
function createHTMLElement(createOptions) {
  const options = Object.assign(createHTMLElementOptions, createOptions)

  const element = document.createElement(options.selector);
  element.classList.add(options.classList.split(' '));
  element.innerHTML = createOptions.innerHTML;

  options.children.forEach(child => element.appendChild(child));

  return element;
}

function createMuuriItemShell() {
  const item = createHTMLElement({ classList: 'grid-item'});
  const content = document.createHTMLElement({ classList: 'grid-item--content' });

  item.appendChild(content);

  return ({
    shell: item,
    content,
    append: function(node) {
      content.appendChild(node);
    }
  })
}

function createMuuriGridColumn(label) {
  const columnContent = createHTMLElement({ classList: 'grid-column--content' });
  const column = createHTMLElement({
    classList: 'grid-column',
    children: [
      createHTMLElement({
        classList: 'grid-column--container',
        children: [
          createHTMLElement({ selector: 'h4', classList: 'grid-column--header', innerHTML: label }),
          createHTMLElement({
            classList: 'grid-column--content-wrapper',
            children: [ columnContent ]
          })
        ]
      })
    ]
  });


  column.gridContent = columnContent;
  column.appendItem = function(item) {
    this.gridContent.appendChild(item);
  }

  new Muuri(column, { items: '.grid-item', dragEnabled: true, dragContainer });
  grid.add(column);
}

