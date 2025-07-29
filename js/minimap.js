//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    if (typeof protomaps !== 'undefined' && protomaps.pmtilesLayer) {
        protomaps.pmtilesLayer('http://localhost:8080/planet_z8.pmtiles', {
            maxZoom: 8
        }).addTo(mymap);
    } else {
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 8
        }).addTo(mymap);
    }

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
