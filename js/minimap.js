//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    var tiles = L.tileLayer('tiles/{z}/{x}/{y}.png', {
        maxZoom: 18
    });
    tiles.on('tileerror', function() {
        alert('Map tiles could not be loaded. Make sure the "tiles" folder is present.');
    });
    tiles.addTo(mymap);

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
