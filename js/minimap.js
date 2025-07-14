function mminitialize() {
    mymap = L.map("miniMap").setView([0, 0], 2);

    // Add your Protomaps PMTiles vector layer
    protomapsL.leafletLayer({
        url: 'offline_assets/planet_z8.pmtiles',
        flavor: "light",
        lang: "fr",
        attribution: "© OpenStreetMap, © Protomaps"
    }).addTo(mymap);


    // Initialize marker
    guess2 = L.marker([0, 0]).addTo(mymap);
    // no guess selected until the player clicks
    window.guessLatLng = undefined;
    guess2.setLatLng([0, 0]);

    // Click handler to update marker and global guess
    mymap.on("click", function(e) {
        console.log("Map clicked at", e.latlng); // for debugging
        var coords = {
            lat: parseFloat(e.latlng.lat),
            lng: parseFloat(e.latlng.lng)
        };

        guess2.setLatLng([coords.lat, coords.lng]);
        // keep the coordinates for when the player submits their guess
        window.guessLatLng = coords;

    });
}
