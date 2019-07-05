import { urls } from './u/urls.js';
import * as u from './u/u.js';
import { setMark } from './set-mark.js';
import { earseMarkers } from './map.js';
import { renderMarkersInView } from './map.js';
import { createNamesOption } from './dialog.js';

export function getData() {
  console.log('re-fetching~~~');

  let checkLatLng = (data) => !(isNaN(data.lat) && isNaN(data.lng));

  Promise.all([
    u.fetchJSON(urls.GAS),
    u.fetchJSON(`${urls.GAS}&method=get_pm_name`),
  ])
  .then(d => {
    let data = d[0].data.filter(checkLatLng);
    let pmNames = d[1];

    createNamesOption(pmNames);
    window.info.pmNames = pmNames;

    data.forEach(d => {
      d.name = pmNames.map(n => n[0])[d.dex - 1] || '?';
    });

    if (window.markers) {
      earseMarkers(window.markers);
    }

    window.markers = new Map();
    data.forEach(setMark);
    renderMarkersInView();
  });
}
