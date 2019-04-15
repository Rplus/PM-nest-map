import createMarkerContent from './create-mark-content.js';
import map from './map.js';

export function setMark(report) {
  let iconSize = map.getZoom() < 14 ? 32 : 48;

  let marker = Leaflet.marker(
    [report.lat, report.lng],
    {
      icon: L.divIcon({
        className: `poke-icon poke-icon-${report.dex}`,
        html: `
          <img
            class="pm-img"
            src="./img/z/${report.dex}.png"
            title="#${report.dex} ${report.name}, ${report.scale}+/hr"
          >`,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2],
        popupAnchor: [0, -iconSize / 3]
      }),
      title: `${report.scale}`,
      report: report,
    }
  )
  .bindPopup(createMarkerContent(report), {
    autoPan: false,
  });

  window.markers.set(`${report.lat},${report.lng}`, marker);
}
