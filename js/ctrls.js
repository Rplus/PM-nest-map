import locateMeBtn from './btn-locate-me.js';
import reFetchBtn from './btn-re-fetch.js';
import addReportBtn from './btn-add-report.js';
import filterIndicator from './filters.js';

let ctrls = document.createElement('div');
ctrls.className = 'ctrls';

ctrls.appendChild(addReportBtn);
ctrls.appendChild(locateMeBtn);
ctrls.appendChild(reFetchBtn);
ctrls.insertAdjacentHTML('beforeend', filterIndicator);

export default ctrls;
