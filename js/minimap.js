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
    guess2.setLatLng({ lat: 0, lng: 0 });

    // Click handler to update marker and global guess
    mymap.on("click", function(e) {
        console.log("Map clicked at", e.latlng); // for debugging
        guess2.setLatLng(e.latlng);
        
    });
}
