const express = require('express');
const path = require('path');
const MBTiles = require('@mapbox/mbtiles');

const app = express();
const PORT = process.env.PORT || 3000;

const mbtilesPath = path.join(__dirname, 'tiles', 'tiles.mbtiles');
let mbtiles;

new MBTiles(mbtilesPath + '?mode=ro', (err, mb) => {
  if (err) {
    console.error('Failed to load MBTiles', err);
  } else {
    mbtiles = mb;
    console.log('MBTiles loaded');
  }
});

app.use(express.static(__dirname));

app.get('/tiles/:z/:x/:y.:ext', (req, res) => {
  if (!mbtiles) {
    return res.status(503).send('MBTiles not loaded');
  }
  const z = parseInt(req.params.z, 10);
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);
  const tmsY = Math.pow(2, z) - 1 - y;
  mbtiles.getTile(z, x, tmsY, (err, tile, headers) => {
    if (err) {
      res.status(404).send('Tile not found');
    } else {
      res.set(headers);
      res.send(tile);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
