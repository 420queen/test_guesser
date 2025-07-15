function rminitialize() {
    roundmap = L.map("roundMap").setView([30, 10], 1);

    // Use online Protomaps vector tiles
    protomapsL.leafletLayer({
        url: 'https://tiles.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf',
        flavor: 'light',
        lang: 'fr',
        attribution: '© OpenStreetMap, © Protomaps'
    }).addTo(roundmap);

    // Define custom icons
    var guessIcon = L.icon({
        iconUrl: "img/guess.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60] // center bottom
    });

    var actualIcon = L.icon({
        iconUrl: "img/actual.png",
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    // Place markers
    guess = L.marker([-999, -999], { icon: guessIcon }).addTo(roundmap);
    actual = L.marker([-999, -999], { icon: actualIcon }).addTo(roundmap);

    // Update positions
    guess.setLatLng(window.guessLatLng);
    actual.setLatLng(window.actualLatLng);

    // Fit bounds
    roundmap.fitBounds(L.latLngBounds(guess.getLatLng(), actual.getLatLng()), {
        padding: [50, 50]
    });
}
