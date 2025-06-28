Wikidata Guessr
===============

Guess the locations of random images stored in `locations.json`.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

License: GPLv3+
===============

Offline setup
-------------

To run the game without an internet connection place the following assets in the
project root:

* `jquery-3.7.1.min.js` inside a folder named `libs`.
* A folder named `leaflet` containing `leaflet.js` and `leaflet.css`.
* Your map tiles in `maptiler-osm-2020-02-10-v3.11-planet.mbtiles` (or a
  `tiles/` folder if you extract raster tiles).
* Optionally `Leaflet.TileLayer.MBTiles.js` (and its dependency `sql.js`) in the
  `libs` folder if you want to load the `.mbtiles` file directly.

Once the files are in place, open `index.html` from the tablet's browser to play
offline.
