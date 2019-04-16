import map from './map.js';
import ctrls from './ctrls.js';
import dialog from './dialog.js';
import centerMark from './center-mark.js';
import { urls } from './u/urls.js';
import * as u from './u/u.js';

window.info = {
  nowlatlng: {},
  SpreadsheetId: '1N9aa3LZMaFwNbjUSGVD9NloBNE7sM0DY318-DtZHzVo',
  uid: u.UID(),
};

document.body.appendChild(ctrls);
document.body.appendChild(dialog);
document.body.appendChild(centerMark);
