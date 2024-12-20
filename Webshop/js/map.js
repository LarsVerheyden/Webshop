const map = L.map('map').setView([45.923524, 6.868844], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const logoIcon = L.icon({
    iconUrl: "./assets/Images/Logo.png",
    iconSize: [40, 40],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
});

const marker1 = L.marker([45.923524, 6.868844], { icon: logoIcon }).addTo(map);
marker1.bindPopup("All4Trail shop").openPopup();

const marker2 = L.marker([45.922799, 6.873793]).addTo(map);
marker2.bindPopup("Treinstation op wandelafstand");

const circle = L.circle([45.926818, 6.873919], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map);

circle.bindPopup("Atletiekpiste - Testterrein");