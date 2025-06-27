Wikidata Guessr
===============

Guess the locations of random images stored in `locations.json`.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

License: GPLv3+
===============

Offline Usage
-------------

1. Copy `maptiler-osm-2020-02-10-v3.11-planet.mbtiles` into this directory.
2. Install dependencies with `npm install` (fetches Express, MBTiles, jQuery and Leaflet).
3. Start the server using `npm run serve`.
4. Open `http://localhost:3000` in your browser.

On Android devices you can run the Node server via Termux and access the game completely offline.
