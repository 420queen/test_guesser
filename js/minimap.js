//
// Minimap
//

var myCustomIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconRetinaUrl: 'img/marker-icon-2x.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [25, 41], // taille par défaut
    iconAnchor: [12, 41], // centre-bas de l’icône (point de clic)
    popupAnchor: [0, -41], // optionnel : popup au-dessus de la pointe
    shadowSize: [41, 41] // taille par défaut de l’ombre
});

function mminitialize() {
    mymap = L.map("miniMap");

    mymap.setView([30, 10], 1);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(mymap);

    guess2 = L.marker([-999, -999], { icon: myCustomIcon }).addTo(mymap);
    guess2.setLatLng({lat: -999, lng: -999});

    mymap.on("click", function(e) {
        guess2.setLatLng(e.latlng);
        window.guessLatLng = e.latlng;
    })
};
