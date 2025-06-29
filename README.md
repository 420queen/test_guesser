Wikidata Guessr
===============

Guess the locations of random images stored in `locations.json`.

Based on [whereami](https://github.com/webdevbrian/whereami), a GeoGuessr reimplementation by [Brian Kinney](http://www.thebriankinney.com/).

## Offline setup

All dependencies are bundled in the repository so the game can run entirely offline.  A very large `tiles.mbtiles` file (placed in the `tiles/` directory) provides map tiles.

1. Put your `tiles.mbtiles` in the `tiles/` folder (replace the `.gitkeep` file).
2. Install the Node.js dependencies once: `npm install`.
3. Start the local server with `npm start`.
4. Open <http://localhost:3000> in your browser.

The server will automatically serve tiles from the mbtiles database and all other assets from this folder.

License: GPLv3+
===============
