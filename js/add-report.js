/* global _map */

import dialog from './dialog.js';

export function addReport(params) {
  let { lat, lng } = _map.getCenter();

  let oParams = {
    lat,
    lng,
    scale: 1,
    new: true,
    note: '',
  };

  console.log({
    ...oParams,
    ...params,
  });
  
  
  dialog.initReport({
    ...oParams,
    ...params,
  });
};

document.body.addEventListener('click', (e) => {
  if (e.target.className === 'fix-reoprt') {
    let data = e.target.dataset;
    console.log(data);
    
    addReport({
      lat: +data.lat,
      lng: +data.lng,
      scale: +data.scale,
      dex: +data.dex,
      new: !!data.new,
      note: data.note,
    });
  }
  
})
