//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    const protocol = new pmtiles.Protocol();
    const layer = new pmtiles.LeafletLayer({
        url: 'offline_assets/planet_z8.pmtiles',
        attribution: 'Map data © OpenStreetMap contributors'
    });
    layer.addTo(mymap);

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
