//desabilitando funções do mapa
const options={
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
}

//pegar valores do html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng


//create and set map
const map = L.map('mapid', options).setView([lat, lng], 15);


//create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
 

//create icon
const icon= L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [38,48],
    iconAnchor: [9,48],
    popupAnchor: [180, 1]

})


//create and add marker
L.marker([lat, lng], { icon }).addTo(map)


/* image gallery */
function selectImage(event) {
    const button = event.currentTarget;

    //remover todas as classes active
    const buttons = document.querySelectorAll(".images button")
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button){
        button.classList.remove("active");
    }

    //selecionar a imagem clicada
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")

    //atualizar o container de imagem
    imageContainer.src = image.src

    //adicionar a classe .active para o botao clicado
    button.classList.add("active")
}
  