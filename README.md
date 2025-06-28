Wikidata Guessr
===============

Guess the locations of random images stored in `locations.js`.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

License: GPLv3+
===============

Offline setup
-------------

To run the game without an internet connection place the following assets in the
project root:

* `jquery-3.7.1.min.js` inside a folder named `libs`.
* A folder named `leaflet` containing `leaflet.js` and `leaflet.css`.
* Your map tiles in a `tiles/` folder (`tiles/{z}/{x}/{y}.png`). If you have an
  `.mbtiles` file, convert it to this structure first using a tool such as
  `mb-util`.
* The `locations.js` file (included in the repository) which embeds the
  location data so no server is required.

Once the files are in place, open `index.html` directly from your SD card in the
tablet's browser to play offline. No web server is needed.
