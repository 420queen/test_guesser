Wikidata Guessr
===============

Guess the locations of random images stored in `locations.js`.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

License: GPLv3+
===============

Offline setup
-------------

Follow these steps to run the game completely offline:

1. Create a folder called `libs` next to `index.html` and put the file
   `jquery-3.7.1.min.js` inside it. Make sure the name matches exactly.
2. Download Leaflet from <https://leafletjs.com/download.html> and copy
   `leaflet.js` and `leaflet.css` into a folder named `leaflet`.
3. Place these additional files in the `libs` folder:
   `Leaflet.TileLayer.MBTiles.js`, `sql-wasm.js`, `sql-wasm.wasm`, and your
   `maptiler-osm-2020-02-10-v3.11-planet.mbtiles` file. Leaflet will read map
   tiles directly from this `.mbtiles` file.
4. Copy the entire project (including the `libs` folder) onto your SD card.
5. Open `index.html` in the tablet's browser. The game should start even in
   airplane mode. If the map stays blank, check that all files in `libs` are
   present.

The `locations.js` file already contains the location data so no server is
needed.
