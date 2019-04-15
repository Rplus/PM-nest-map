import { urls } from './u/urls.js';
import * as u from './u/u.js';
import { setMark } from './set-mark.js';
import { earseMarkers } from './map.js';
import { renderMarkersInView } from './map.js';

// export let taskIcons;
// export const getTasks = u.fetchJSON(`${urls.macros}?method=get_tasks`);
// // const getTasksFull = u.fetchJSON(`${urls.macros}?method=get_tasks_full`);
// // const getExistingData = u.fetchJSON(`${urls.macros}?method=get_existing_data`);

// function getIcons(data) {
//   let size = document.documentElement.clientWidth > 960 ? 48 : 32;
//   window.info.icons = data.reduce((all, d) => {
//     all[d.pokedex] = Leaflet.icon({
//       iconUrl: `./img/z/${d.pokedex}.png`,
//       iconSize: [size, size], // size of the icon
//       iconAnchor: [size / 2, size / 2], // point of the icon which will correspond to marker's location
//       popupAnchor: [0, -size / 3] // point from which the popup should open relative to the iconAnchor
//     });
//     return all;
//   }, {});
//   console.log('window.info.dataIcons', window.info.dataIcons);
// };

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
