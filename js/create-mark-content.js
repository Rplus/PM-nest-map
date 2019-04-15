import { navigation, getPlanText } from './u/u.js';

export default function createMarkerContent(report) {
  // let task = report.task.split('：');
  // let googleNavigation = navigation(
  //   `${report.lat},${report.lng}`,
  //   `${window.info.nowlatlng.lat},${window.info.nowlatlng.lng}`
  // );

  return `
    <div>
      #${report.dex} ${report.name}: ~${report.scale}/hr
      <div>${getPlanText(report.note || '')}</div>
      <a class="fix-reoprt" href="###"
        data-lat="${report.lat}"
        data-lng="${report.lng}"
        data-scale="${report.scale}"
        data-name="${report.name}"
        data-note="${report.note || ''}"
        data-dex="${report.dex}"
      >
        fix it!
      </a>
    </div>
  `;
  // return `
  //   <div class='pokestops'>
  //     <h3>${report.site_name}</h3>
  //     <hr>
  //     <h4>${task[0]}</h4>
  //     <div>
  //       ${report['T&F'].T} ✔️ / ${report['T&F'].F} ❌
  //     </div>
  //     <div class="crop"></div>
  //     <br>
  //     <a href="${googleNavigation}" target="_blank">google 👣</a>'
  //   </div>
  // `;
};
