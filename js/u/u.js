export function toJSON(d) {
  return d.json();
};


export function fetchJSON(url) {
  return fetch(url).then(toJSON);
};


// export function myFetch(url, type = 'json') {
//   return fetch(url).then(res => {
//     switch (type) {
//       case 'text':
//         return res.text();
//       case 'json':
//       default:
//         return res.json();
//     }
//   })
// }


export function navigation(targetLngLat, nowLngLat) {
  if (navigator.userAgent.match(/android/i)) {
    return `google.navigation:q=${targetLngLat}&mode=w`;
  } else if (nowLngLat == 'undefined,undefined') {
    return `http://maps.google.com?q=${targetLngLat}`;
  } else {
    if (navigator.userAgent.match(/(iphone|ipod|ipad);?/i)) {
      return `comgooglemaps://?saddr=&daddr=${targetLngLat}&directionsmode=Driving&zoom=15`;
    } else {
      return `https://www.google.com.tw/maps/dir/${targetLngLat}/${nowLngLat}/@24,120.5,10z/data=!3m1!4b1!4m2!4m1!3e0`;
    }
  };
  return '';
}
