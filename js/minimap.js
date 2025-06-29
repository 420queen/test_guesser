//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    // Load tiles from the local MBTiles database for offline usage
    if (!L.TileLayer.MBTiles) {
        console.error('Leaflet.TileLayer.MBTiles plugin not found');
    } else {
        var src = window.mbtilesFile ||
            'libs/maptiler-osm-2020-02-10-v3.11-planet.mbtiles';
        new L.TileLayer.MBTiles(src, {
            maxZoom: 18,
            scheme: 'tms'
        }).addTo(mymap);
    }

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
