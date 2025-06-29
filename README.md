Wikidata Guessr
===============

Guess the locations of random images stored in `locations.json`.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

## Offline setup

1. Place your MBTiles file at `tiles/tiles.mbtiles` in the project directory.
2. Install dependencies with `npm install` (requires Node).
3. Start the integrated server with `npm start`.
4. Open <http://localhost:3000> in your browser to play.

The server streams tiles directly from the MBTiles file so even very large
files work without loading them into the browser.

License: GPLv3+
===============
