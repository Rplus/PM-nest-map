import createMarkerContent from './create-mark-content.js';
import map from './map.js';

export function setMark(report) {
  // if (
  //   isNaN(report.lat) ||
  //   isNaN(report.lng) ||
  //   !report.site_name ||
  //   !report.task ||
  //   !report['T&F']
  // ) {
  //   console.warn('gg report', { report });
  //   return;
  // }

  // report.done = doneTasks[`${report.lat},${report.lng}`];
  // let task = report.task.split('：');
  // let isDoubtful = 1 || report['T&F'].F > report['T&F'].T;

  // if (!window.info.taskIcons[task[1]]) {
  //   console.warn('no icon', report);
  //   return;
  // }

  let iconSize = map.getZoom() < 14 ? 32 : 48;
  let marker = Leaflet.marker(
    [report.lat, report.lng],
    {
      icon: L.divIcon({
        className: `poke-icon poke-icon-${report.dex}`,
        html: `<img class="pm-img" src="./img/z/${report.dex}.png">`,
        iconSize: [iconSize, iconSize], // size of the icon
        iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -iconSize / 3] // point from which the popup should open relative to the iconAnchor
      }),
      // icon: window.info.icons[report.dex],
      title: `#${report.dex} ${report.name}, ~${report.scale}/hr`,
      report: report,
    }
  )
  .bindPopup(createMarkerContent(report), {
    autoPan: false,
  });

  // if (isDoubtful) {
  //   console.info({ Doubtful: marker });
  //   marker.isDoubtful = isDoubtful;
  // }

  // if (report.done) {
  //   marker._icon.classList.toggle('is-done', report.done);
  // }

  window.markers.set(`${report.lat},${report.lng}`, marker);
}
