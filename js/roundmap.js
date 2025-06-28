//
// End of round map
//

function rminitialize() {
    roundmap = L.map("roundMap").setView([30, 10], 1);

    var tiles = L.tileLayer.mbTiles('libs/maptiler-osm-2020-02-10-v3.11-planet.mbtiles', {
        maxZoom: 18
    });
    tiles.on('databaseerror', function() {
        alert('Map tiles could not be loaded. Check the MBTiles file in the "libs" folder.');
    });
    tiles.addTo(roundmap);

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
