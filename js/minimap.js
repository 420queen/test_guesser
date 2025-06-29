//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    // Load tiles from the local MBTiles database for offline usage
    var mb = new L.TileLayer.MBTiles('libs/maptiler-osm-2020-02-10-v3.11-planet.mbtiles', {
        maxZoom: 18
    });
    mb.on('databaseerror', function(err){
        alert('Failed to load map tiles. Please launch a local web server.');
        console.error('MBTiles error', err);
    });
    mb.addTo(mymap);

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
