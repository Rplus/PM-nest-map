import * as u from './u/u.js';

export function postData(_dialog) {
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

  return fetch(_dialog.elm.form.action, {
    method: 'POST',
    body: data.toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  .then(u.toJSON);
}
