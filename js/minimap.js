//
// Minimap
//

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    window.SQLPromise.then(function(){
        L.tileLayer.mbTiles('tiles/tiles.mbtiles', {
            attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(mymap);
    });

    guess2 = L.marker([-999, -999]).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
