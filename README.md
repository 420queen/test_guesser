Wikidata Guessr
===============

Guess the locations of random images stored in `locations.js`.

Offline use
-----------

This project can run entirely without an internet connection. All third party
libraries such as Leaflet, jQuery and the SQLite powered MBTiles loader should
be placed in the `leaflet/` and `libs/` directories.  Include an `.mbtiles`
file (for example `maptiler-osm-2020-02-10-v3.11-planet.mbtiles`) in the `libs/` folder.  The game
will read tiles from this database using `Leaflet.TileLayer.MBTiles.js` so that
maps work offline.  The location data is embedded in `locations.js`, so the
game does not need to fetch anything over the network.

Because most browsers block loading the MBTiles database when opening `index.html` directly from the file system, run a small local web server instead.  Start one with `npm start` (uses `live-server`) or any other HTTP server such as `python -m http.server` and then visit the served page in your browser.  This allows the map tiles to load correctly offline.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

License: GPLv3+
===============
