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
3. Prepare your map tiles. If you have a `.mbtiles` file, use a tool such as
   `mb-util` to convert it into a folder structure `tiles/{z}/{x}/{y}.png`.
   The game expects this `tiles` folder next to `index.html`.
4. Copy the entire project (including the `tiles` folder) onto your SD card.
5. Open `index.html` in the tablet's browser. The game should start even in
   airplane mode. If the map stays blank, check that the `tiles` folder exists
   and contains images.

The `locations.js` file already contains the location data so no server is
needed.
