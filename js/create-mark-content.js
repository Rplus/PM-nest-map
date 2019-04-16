import { navigation, getPlanText } from './u/u.js';

export default function createMarkerContent(report) {
  let googleNavigation = navigation(
    `${report.lat},${report.lng}`,
    `${window.info.nowlatlng.lat},${window.info.nowlatlng.lng}`
  );

  return `
    <div class="popup-content">
      #${report.dex} ${report.name}: ${report.scale}+/hr
      <div class="note">${getPlanText(report.note || '')}</div>
      <hr>
      <div class="popup-content--footer">
        <a class="fix-reoprt" href="###"
          data-lat="${report.lat}"
          data-lng="${report.lng}"
          data-scale="${report.scale}"
          data-name="${report.name}"
          data-note="${report.note || ''}"
          data-dex="${report.dex}"
        >
          修正拳👊
        </a>
        <a href="${googleNavigation}" target="_blank">Go↗️</a>
      </div>
    </div>
  `;
};
