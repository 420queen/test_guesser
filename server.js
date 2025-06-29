const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the project root
app.use(express.static(path.join(__dirname)));

// Explicitly set content-type for .mbtiles files
app.get('*.mbtiles', (req, res, next) => {
  res.type('application/x-sqlite3');
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
