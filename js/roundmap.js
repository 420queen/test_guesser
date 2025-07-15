function rminitialize() {
    // Initialize map
    roundmap = L.map("roundMap").setView([30, 10], 1);

    // Add Protomaps vector tiles
    protomapsL.leafletLayer({
        url: 'https://tiles.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf',
        flavor: 'light',
        lang: 'fr',
        attribution: '© OpenStreetMap, © Protomaps'
    }).addTo(roundmap);

    // Custom marker icons
    var guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    var actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    // Add guess and actual location markers
    guess = L.marker([-999, -999], { icon: guessIcon }).addTo(roundmap);
    actual = L.marker([-999, -999], { icon: actualIcon }).addTo(roundmap);

    // Ensure positions are set from global variables
    if (window.guessLatLng && window.actualLatLng) {
        guess.setLatLng(window.guessLatLng);
        actual.setLatLng(window.actualLatLng);

        // Fit bounds
        roundmap.fitBounds(L.latLngBounds(guess.getLatLng(), actual.getLatLng()), {
            padding: [50, 50]
        });
    } else {
        console.warn("Missing guessLatLng or actualLatLng");
    }
}
