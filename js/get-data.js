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
    // u.fetchJSON('./fake.json'),
  ])
  .then(d => {
    let data = d[0].data;
    console.log(data);
    // getIcons(data);
    window.markers = new Map();
    data.forEach(setMark);
    // // updateReportTasks(d[2]);

    // let reports = d[1];
    // reports.forEach(setMark);
    renderMarkersInView();
  });
}
