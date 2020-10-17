//create and set map
const map = L.map('mapid').setView([-23.3212398,-51.1395138], 15);

//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//create icon
const icon= L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [180, 1]
})

//função addMarker cria o popup e adiciona o marker
function addMarker({id, name, lat, lng}) {
//createpopup overlay
const popup = L.popup({
    closeButton: false,
    className:'map-popup',
    minWidth: 240,
    minHeight: 240,
}).setContent(`${name} <a href="/orphanage?id=${id}" class="choose-orphanage"> <img src="/images/arrow-white.svg"/> </a>`)

//create and add marker
L.marker([lat, lng], { icon })
.addTo(map)
.bindPopup(popup)
}

// pega as informações do span, cria um opjeto que será enviado pra função addMarker()
const orphanagesSpan = document.querySelectorAll('.orphanages span')
orphanagesSpan.forEach(span => {
    const orphanage ={
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng,
    }
    addMarker(orphanage)
})