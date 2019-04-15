import { postData } from './post-data.js';
import { getData } from './get-data.js';
import { urls } from './u/urls.js';
import * as u from './u/u.js';

let _dialog = document.createElement('dialog');
_dialog.id = 'dialog';
window._dialog = _dialog;

_dialog.innerHTML = `
  <form id="report-form" class="report-form" action="${urls.GAS}">
    <dl class="report-content">
      <dd id="rp-data--latlng-box">
        <input required type="hidden" id="rp-data--lat" value="">
        <input required type="hidden" id="rp-data--lng" value="">
      </dd>

      <dt>寶可夢編號：</dt>
      <dd id="rp-data--dex-box">
        <input required id="rp-data--dex" type="text" list="rp-data--pm-list">
        <datalist id="rp-data--pm-list"></datalist>
      </dd>

      <dt>巢穴規模(每小時數量)：</dt>
      <dd id="rp-data--scale-box">
        <select required id="rp-data--scale">
          <option value="1" label="1~5"></option>
          <option value="5" label="5+"></option>
          <option value="15" label="15+"></option>
        </select>
      </dd>

      <dt>巢穴/重生點註解：</dt>
      <dd id="rp-data--note-box">
        <input id="rp-data--note" type="text">
      </dd>

      <dd>
        <input required type="hidden" readonly id="rp-data--type" value="">
      </dd>
    </dl>
    <div class="submit-box">
      <input id="submit" disabled type="submit" />
    </div>
  </form>
  <button id="close-dialog">❌</button>
  `;


_dialog.elm = {
  lat: _dialog.querySelector('#rp-data--lat'),
  lng: _dialog.querySelector('#rp-data--lng'),
  dex: _dialog.querySelector('#rp-data--dex'),
  pmList: _dialog.querySelector('#rp-data--pm-list'),
  scale: _dialog.querySelector('#rp-data--scale'),
  type: _dialog.querySelector('#rp-data--type'),
  note: _dialog.querySelector('#rp-data--note'),
  submit: _dialog.querySelector('#submit'),
  closeBtn: _dialog.querySelector('#close-dialog'),
  form: _dialog.querySelector('form'),
};

_dialog.elm.closeBtn.addEventListener('click', _dialog.close.bind(_dialog))


// init pm names
u.fetchJSON(`${urls.GAS}&method=get_pm_name`)
.then(d => {
  _dialog.elm.pmList.innerHTML = d.map(
    (name, idx) => `<option value="${idx + 1}" label="${idx + 1} - ${name}"></option>`
  ).join('');
});


function validateForm(arg = {}) {
  _dialog.elm.submit.disabled = arg.forceDisabled || !_dialog.elm.form.checkValidity();
};

function submitFn(e) {
  e.preventDefault();
  validateForm({ forceDisabled: true });

  postData(_dialog)
  .then(d => {
    validateForm();
    _dialog.close();
    getData();
  });
};

_dialog.elm.form.addEventListener('submit', submitFn);
_dialog.elm.form.addEventListener('change', validateForm);

_dialog.initReport = (param) => {
  if (_dialog.open) {
    return;
  }
  console.log(param);
  _dialog.elm.lat.value = param.lat;
  _dialog.elm.lng.value = param.lng;
  _dialog.elm.dex.value = param.dex || '';
  _dialog.elm.scale.value = param.scale || '';
  _dialog.elm.note.value = param.note || '';
  _dialog.elm.type.value = (param.new ? 'new' : 'update');

  validateForm();

  _dialog.showModal();
};



export default _dialog;
