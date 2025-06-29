// import SQL from 'sql.js';

/*
🍂class TileLayer.MBTiles

Loads tiles from a [`.mbtiles` file](https://github.com/mapbox/mbtiles-spec).

If they exist in the given file, it will handle the following metadata rows:
*/

L.TileLayer.MBTiles = L.TileLayer.extend({

	initialize: function(databaseUrl, options) {

		this._databaseIsLoaded = false;

		if (typeof databaseUrl === 'string') {
			// Load .mbtiles file via fetch if a URL is given
			fetch(databaseUrl).then(response => {
				return response.arrayBuffer();
			}).then(buffer => {
				this._openDB(buffer);
			}).catch(err => {
				this.fire('databaseerror', { error: err });
			});
		} else if (databaseUrl instanceof ArrayBuffer) {
			// ✅ FIXED: now passing databaseUrl directly
			this._openDB(databaseUrl);
		} else {
			this.fire('databaseerror');
		}

		return L.TileLayer.prototype.initialize.call(this, '', options);
	},

	_openDB: function(buffer) {
		try {
			// Assumes the `SQL` global variable exists (from sql.js)
			this._db = new SQL.Database(new Uint8Array(buffer));
			this._stmt = this._db.prepare(
				'SELECT tile_data FROM tiles WHERE zoom_level = :z AND tile_column = :x AND tile_row = :y'
			);

			// Try loading metadata
			var metaStmt = this._db.prepare('SELECT value FROM metadata WHERE name = :key');
			var row;

			row = metaStmt.getAsObject({ ':key': 'attribution' });
			if (row.value) { this.options.attribution = row.value; }

			row = metaStmt.getAsObject({ ':key': 'minzoom' });
			if (row.value) { this.options.minZoom = Number(row.value); }

			row = metaStmt.getAsObject({ ':key': 'maxzoom' });
			if (row.value) { this.options.maxZoom = Number(row.value); }

			row = metaStmt.getAsObject({ ':key': 'format' });
			if (row.value && row.value === 'png') {
				this._format = 'image/png';
			} else if (row.value && row.value === 'jpg') {
				this._format = 'image/jpg';
			} else {
				// Fallback
				this._format = 'image/png';
			}

			// 🍂event databaseloaded
			this.fire('databaseloaded');
			this._databaseIsLoaded = true;

		} catch (ex) {
			// 🍂event databaseerror
			this.fire('databaseerror', { error: ex });
		}
	},

	createTile: function(coords, done) {
		var tile = document.createElement('img');

		if (this.options.crossOrigin) {
			tile.crossOrigin = '';
		}

		tile.alt = '';
		tile.setAttribute('role', 'presentation');

		if (this._databaseIsLoaded) {
			L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
			L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

			tile.src = this.getTileUrl(coords);
		} else {
			this.on('databaseloaded', function() {
				L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
				L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

				tile.src = this.getTileUrl(coords);
			}.bind(this));
		}

		return tile;
	},

	getTileUrl: function(coords) {
		var row = this._stmt.getAsObject({
			':x': coords.x,
			':y': this._globalTileRange.max.y - coords.y,
			':z': coords.z
		});

		if ('tile_data' in row) {
			return window.URL.createObjectURL(new Blob([row.tile_data], { type: this._format }));
		} else {
			return L.Util.emptyImageUrl;
		}
	}

});

/*
🍂factory tileLayer.mbTiles(databaseUrl: String, options: TileLayer options)
Returns a new `L.TileLayer.MBTiles`, fetching and using the database given in `databaseUrl`.
🍂alternative
🍂factory tileLayer.mbTiles(databaseBuffer: Uint8Array, options: TileLayer options)
Returns a new `L.TileLayer.MBTiles`, given a MBTiles database as a javascript binary array.
*/
L.tileLayer.mbTiles = function(databaseUrl, options) {
	return new L.TileLayer.MBTiles(databaseUrl, options);
};

