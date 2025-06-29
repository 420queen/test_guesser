const express = require('express');
const path = require('path');
const MBTiles = require('mbtiles');

const app = express();
const port = process.env.PORT || 3000;
const mbtilesPath = path.join(__dirname, 'tiles', 'tiles.mbtiles');

let mbtiles;
let tileFormat = 'png';

new MBTiles(mbtilesPath + '?mode=ro', (err, mb) => {
  if (err) {
    console.error('Failed to open MBTiles:', err);
  } else {
    mbtiles = mb;
    mbtiles.getInfo((err, info) => {
      if (!err && info && info.format) {
        tileFormat = info.format;
      }
      console.log('MBTiles loaded');
    });
  }
});

app.use(express.static(__dirname));

app.get('/tiles/:z/:x/:y.png', (req, res) => {
  if (!mbtiles) {
    res.status(500).send('MBTiles not loaded');
    return;
  }
  const { z, x, y } = req.params;
  mbtiles.getTile(z, x, y, (err, data, headers) => {
    if (err) {
      res.status(404).send('Tile not found');
    } else {
      res.set('Content-Type', 'image/' + tileFormat);
      res.set('Cache-Control', 'public, max-age=3600');
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
