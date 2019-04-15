import { urls } from './u/urls.js';
import * as u from './u/u.js';
import { setMark } from './set-mark.js';
import { earseMarkers } from './map.js';
import { renderMarkersInView } from './map.js';

export function getData() {
  console.log('re-fetching~~~');

  if (window.markers) {
    earseMarkers(window.markers);
  }

  Promise.all([
    u.fetchJSON(urls.GAS),
  ])
  .then(d => {
    let data = d[0].data;
    console.log(data);
    window.markers = new Map();
    data.forEach(setMark);
    renderMarkersInView();
  });
}
