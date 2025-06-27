const express = require('express');
const path = require('path');
const MBTiles = require('mbtiles');

const app = express();
const PORT = process.env.PORT || 3000;

// serve static files
app.use(express.static(path.join(__dirname)));

let mbtiles;

const mbtilesPath = path.join(__dirname, 'maptiler-osm-2020-02-10-v3.11-planet.mbtiles');
new MBTiles(mbtilesPath, (err, mb) => {
  if (err) {
    console.error('Error opening MBTiles file:', err);
  } else {
    mbtiles = mb;
    console.log('MBTiles loaded');
  }
});

app.get('/tiles/:z/:x/:y.png', (req, res) => {
  if (!mbtiles) {
    res.status(503).send('Tiles not loaded yet');
    return;
  }
  const { z, x, y } = req.params;
  mbtiles.getTile(z, x, y, (err, data, headers) => {
    if (err) {
      res.status(404).send('Tile not found');
    } else {
      res.set(headers);
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
