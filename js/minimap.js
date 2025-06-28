//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    var tiles = L.tileLayer.mbTiles('libs/maptiler-osm-2020-02-10-v3.11-planet.mbtiles', {
        maxZoom: 18
    });
    tiles.on('databaseerror', function() {
        alert('Map tiles could not be loaded. Check the MBTiles file in the "libs" folder.');
    });
    tiles.addTo(mymap);

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
