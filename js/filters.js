let filterBoxClass = 'filters';

function createIndicator(dom) {
  return (`
    <input type="checkbox" name="Filter" id="Filter">
    <label for="Filter">Filter</label>
    <div class="${filterBoxClass}">
      <style>${dom.style}</style>
      ${dom.filter}
    </div>
  `);
}

var scales = [1, 5, 15];
let dom = scales.reduce((all, scale) => {
  all.input.push(`
    <input
      type="checkbox"
      class="ckbox-filter"
      id="ckbox_${scale}" checked />`);
  all.label.push(`<label class="filter-label" for="ckbox_${scale}" data-scale="${scale}"></label>`);
  all.style.push(`
    #ckbox_${scale}:not(:checked) ~ #map .poke-icon[title="${scale}"] { display: none; }
    #ckbox_${scale}:not(:checked) ~ .ctrls label[data-scale="${scale}"] { filter: contrast(0%); }
  `);
  return all;
}, { input: [], label: [], style: [] });

// let filter = document.querySelector(`.${filterBoxClass}`);
// let style = document.createElement('style');
// style.innerHTML = dom.style.join('');
// filter.innerHTML = dom.label.join('');
// filter.insertAdjacentElement('afterbegin', style);
document.querySelector('#map').insertAdjacentHTML('beforebegin', dom.input.join(''));

let filterIndicator = createIndicator({
  style: dom.style.join(''),
  filter: dom.label.join(''),
});

export default filterIndicator;
