import * as u from './u/u.js';

export function postData(_dialog) {

  if (!u.isNumeric(_dialog.elm.dex.value)) {
    return Promise.reject(new Error('fail'));
  }

  let data = new URLSearchParams({
    'dex': _dialog.elm.dex.value,
    'lat': _dialog.elm.lat.value,
    'lng': _dialog.elm.lng.value,
    'scale': _dialog.elm.scale.value,
    'note': _dialog.elm.note.value,
    'type': _dialog.elm.type.value,
    'uid': window.info.uid,
    'timestamp': +new Date(),
    'id': window.info.SpreadsheetId,
  });

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", _dialog.elm.form.action, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('loadstart', () => {
      if (_dialog.postTimer) {
        window.clearTimeout(_dialog.postTimer);
        _dialog.postTimer = null;
      }
      _dialog.postTimer = setTimeout(() => {
        if (xhr.status === 200) { return; }

        xhr.abort();
        _dialog.postTimer = null;
        reject();
      }, 1000);
    });
    xhr.addEventListener('load', resolve);
    xhr.addEventListener('error', reject);
    xhr.addEventListener('abort', reject);
    xhr.send(data.toString());
  });
}
