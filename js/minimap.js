function mminitialize() {
    // Initialize the map
    mymap = L.map("miniMap").setView([0, 0], 2);

    // Add Protomaps vector tiles
    protomapsL.leafletLayer({
        url: "https://tiles.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf",
        flavor: "light",
        lang: "fr",
        attribution: "© OpenStreetMap, © Protomaps"
    }).addTo(mymap);

    // Custom marker icon
    var myCustomIcon = L.icon({
        iconUrl: 'img/marker-icon.png',
        iconRetinaUrl: 'img/marker-icon-2x.png',
        shadowUrl: 'img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
        shadowSize: [41, 41]
    });

    // Add invisible marker for guess
    guess2 = L.marker([0, 0], {
        icon: myCustomIcon,
        opacity: 0
    }).addTo(mymap);

    window.guessLatLng = undefined;

    // Map click handler
    mymap.on("click", function (e) {
        console.log("Map clicked at", e.latlng);

        const coords = {
            lat: parseFloat(e.latlng.lat),
            lng: parseFloat(e.latlng.lng)
        };

        guess2.setLatLng([coords.lat, coords.lng]);
        guess2.setOpacity(1); // Make the marker visible
        window.guessLatLng = coords;
    });
}
