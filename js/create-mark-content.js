import { navigation, getPlanText } from './u/u.js';

export default function createMarkerContent(report) {

  return `
    <div class="popup-content">
      #${report.dex} ${report.name}: ${report.scale}+/hr
      <div class="note">${getPlanText(report.note || '')}</div>
      <hr>
      <div class="align-right">
      <a class="fix-reoprt" href="###"
        data-lat="${report.lat}"
        data-lng="${report.lng}"
        data-scale="${report.scale}"
        data-name="${report.name}"
        data-note="${report.note || ''}"
        data-dex="${report.dex}"
      >
        修正更新
      </a>
      </div>
    </div>
  `;
};
