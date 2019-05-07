/* global L */

import getPosition from './u/get-position.js';
import { getData } from './get-data.js';
import { layers, labels } from './map-layers.js';

window.Leaflet = window.L;

let layerName = localStorage.getItem('custom-layer');

const map = Leaflet.map('map', {
  layers: [ layers[layerName] || layers.Google]
});

window._map = map;

let position = getPosition();
Leaflet.control.layers(layers, labels).addTo(map);

map
  .on('moveend', setPosition)
  .on('moveend', renderMarkersInView)
  .on('load', onLoad)
  .on('locationfound', onLocationFound)
  .on('locationerror', onLocationError)
  .on('baselayerchange', saveLayerName)
  .setView(position.latLng, position.zoom)


function setPosition() {
  if (!map) { return; }

  let geo = map.getCenter();
  let [lat, lng] = [geo.lat, geo.lng];

  localStorage.setItem('lat', lat);
  localStorage.setItem('lng', lng);
  localStorage.setItem('zoom', map.getZoom());
};


let markersInView = [];
export function renderMarkersInView() {
  let bounds = map.getBounds();

  let checkInView = (_marker, _latLng) => {
    let inView = bounds.contains(L.latLng.apply(null, _latLng.split(',')));

    if (inView) {
      markersInView.push(_marker);
      _marker.addTo(map);
      if (_marker.isDoubtful) {
        _marker._icon && _marker._icon.classList.add('is-doubtful');
      }
    }
    return inView;
  };

  if (window.markers) {
    earseMarkers(markersInView); // clear markers in view at first
    markersInView = [];
    window.markers.forEach(checkInView);
  }
}


function onLoad() {
  getData();
  setPosition();
};


function onLocationFound(e) {
  window.info.nowlatlng = e.latlng;
  const radius = e.accuracy / 2;
  if (map.circle) {
    map.removeLayer(map.circle);
  }
  map.circle = Leaflet.circle(e.latlng, radius).addTo(map);
};


function onLocationError(e) {
  console.warn(e.message);
  document.title = `[GG] - ${document.title}`;
};

function saveLayerName(e) {
  localStorage.setItem('custom-layer', e.name);
};



export default map;


export function earseMarkers(markers) {
  markers.forEach(m => map.removeLayer(m));
}
