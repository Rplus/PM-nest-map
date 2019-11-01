import { urls } from './u/urls.js';
import * as u from './u/u.js';
import { setMark } from './set-mark.js';
import { earseMarkers } from './map.js';
import { renderMarkersInView } from './map.js';
import { createNamesOption } from './dialog.js';

const twoWeekinMs = 86400000 * 14;

let checkOutdated = (data) => {
  return (new Date() - new Date(data.timestamp)) > twoWeekinMs;
};

let checkLatLng = (data) => !(isNaN(data.lat) && isNaN(data.lng));

export function getData() {
  console.log('re-fetching~~~');


  Promise.all([
    u.fetchJSON(urls.GAS),
    u.fetchJSON(`${urls.GAS}&method=get_pm_name`),
  ])
  .then(d => {
    let data = d[0].data.filter(data => checkLatLng(data));
    let pmNames = d[1];
    data.forEach(data => {
      if (checkOutdated(data)) {
        data.dex = 0.5;
      }
    });

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
