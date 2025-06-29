//
// End of round map
//

function rminitialize() {
    roundmap = L.map("roundMap").setView([30, 10], 1);

    // Use offline tiles from the bundled MBTiles database
    var mb = new L.TileLayer.MBTiles('libs/maptiler-osm-2020-02-10-v3.11-planet.mbtiles', {
        maxZoom: 18
    });
    mb.on('databaseerror', function(err){
        alert('Failed to load map tiles for the round view. Start a local web server.');
        console.error('MBTiles error', err);
    });
    mb.addTo(roundmap);

    var guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconAnchor: [45, 90]
    });

    var actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconAnchor: [45, 90]
    });

    guess = L.marker([-999, -999], {
        icon: guessIcon
    }).addTo(roundmap)

    actual = L.marker([-999, -999], {
        icon: actualIcon
    }).addTo(roundmap)

    guess.setLatLng(window.guessLatLng);
    actual.setLatLng(window.actualLatLng);
    roundmap.fitBounds(L.latLngBounds(guess.getLatLng(), actual.getLatLng()), {
        padding: [50, 50]
    });
};
