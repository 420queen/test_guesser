//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    if (L.tileLayer.mbTiles) {
        L.tileLayer.mbTiles('maptiler-osm-2020-02-10-v3.11-planet.mbtiles', {
            maxZoom: 18
        }).addTo(mymap);
    } else {
        L.tileLayer('tiles/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(mymap);
    }

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
