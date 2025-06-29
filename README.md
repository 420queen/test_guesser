Wikidata Guessr
===============

Guess the locations of random images stored in `locations.json`.

Offline use
-----------

This project can run entirely without an internet connection. All third party
libraries such as Leaflet, jQuery and the SQLite powered MBTiles loader should
be placed in the `leaflet/` and `libs/` directories.  Include an `.mbtiles`
file (for example `maptiler-osm-2020.mbtiles`) in the `libs/` folder.  The game
will read tiles from this database using `Leaflet.TileLayer.MBTiles.js` so that
maps work offline.

Open `index.html` from your SD card to start playing.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

License: GPLv3+
===============
