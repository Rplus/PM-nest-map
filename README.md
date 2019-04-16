# PM-nest-map
Pokemon Go nest map

Collect Pokemon Go nest from people nearby.

Build with [Leaflet.js](https://leafletjs.com/) map library & Google App Script.

### Develop

0. Dependency: `browser-sync`, `rollup`  
    > `npm i -g browser-sync rollup`

1. `npm install` for installing develop dependency(babel tools).

2. `make rollup_js_watch` to build `main.min.js` file automatically.  
  If you don't want to build every time, just switch to use `main.src.js` in `index.html`.

3. `make browser-sync` to start the localhost.

Welcome to send a PR. ;)
