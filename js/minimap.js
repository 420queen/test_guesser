//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap").setView([0, 0], 2);

    pmtilesLayer({
        url: 'offline_assets/planet_z8.pmtiles',
        paint: PAINT_LIGHT,
        attribution: "\u00a9 OpenStreetMap, \u00a9 Protomaps"
    }).addTo(mymap);

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
